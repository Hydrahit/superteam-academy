#!/bin/bash

echo "🐙 UPGRADING GITHUB PR API WITH GUARD LOGIC..."

# Ensure directory exists
mkdir -p app/api/verify-pr

# Write the fortified API Route
echo "✍️ Writing app/api/verify-pr/route.ts..."
cat << 'EOF' > app/api/verify-pr/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Octokit } from 'octokit';

// Helper function to extract PR details securely
const parsePrUrl = (url: string) => {
  try {
    const regex = /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/;
    const match = url.match(regex);
    if (!match) return null;
    return { owner: match[1], repo: match[2], pull_number: parseInt(match[3], 10) };
  } catch (e) {
    return null;
  }
};

export async function POST(req: Request) {
  console.log("🛠️ [API: verify-pr] Incoming verification request...");

  try {
    // 1. GUARD: Environment Variable Check
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const githubToken = process.env.GITHUB_TOKEN;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("🚨 [API FATAL]: Missing SUPABASE_SERVICE_ROLE_KEY or URL in .env.local!");
      return NextResponse.json({ success: false, error: 'SERVER_CONFIG_ERROR: Missing Database Keys' }, { status: 500 });
    }

    if (!githubToken) {
      console.warn("⚠️ [API WARNING]: GITHUB_TOKEN is missing. Octokit may hit rate limits.");
    }

    // 2. Parse Request Body
    const body = await req.json();
    const { userId, lessonId, courseId, prUrl, expectedXp } = body;

    if (!userId || !prUrl || !lessonId) {
      console.error("❌ [API ERROR]: Missing required payload parameters.", body);
      return NextResponse.json({ success: false, error: 'INVALID_PAYLOAD' }, { status: 400 });
    }

    // 3. GitHub PR Verification via Octokit
    const prDetails = parsePrUrl(prUrl);
    if (!prDetails) {
      console.error(`❌ [API ERROR]: Invalid GitHub URL format -> ${prUrl}`);
      return NextResponse.json({ success: false, error: 'INVALID_GITHUB_URL' }, { status: 400 });
    }

    console.log(`🔍 [API] Fetching PR from GitHub: ${prDetails.owner}/${prDetails.repo}#${prDetails.pull_number}`);
    const octokit = new Octokit({ auth: githubToken });
    
    let pr;
    try {
      const { data } = await octokit.rest.pulls.get({
        owner: prDetails.owner,
        repo: prDetails.repo,
        pull_number: prDetails.pull_number,
      });
      pr = data;
    } catch (githubError: any) {
      console.error("❌ [API ERROR]: GitHub API rejected the request. Ensure the repo is public or the PR exists.");
      return NextResponse.json({ success: false, error: 'PR_NOT_FOUND_OR_PRIVATE' }, { status: 404 });
    }

    // Accept PRs that are open or successfully merged
    if (pr.state !== 'open' && !pr.merged) {
      return NextResponse.json({ success: false, error: 'PR_CLOSED_OR_REJECTED' }, { status: 400 });
    }

    // 4. Supabase Admin Initialization (Bypass RLS safely on the server)
    console.log("🔌 [API] Connecting to Supabase Admin Client...");
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 5. Anti-Cheat: Check for double-spending
    const { data: existingEntry } = await supabaseAdmin
      .from('user_progress')
      .select('lesson_id')
      .eq('github_pr_url', prUrl)
      .single();

    if (existingEntry) {
      console.error(`🚨 [API ERROR]: PR ${prUrl} was already submitted by someone!`);
      return NextResponse.json({ success: false, error: 'PR_ALREADY_CLAIMED' }, { status: 403 });
    }

    // 6. Atomic XP Award via RPC
    console.log(`⚡ [API] Awarding ${expectedXp || 500} XP to User: ${userId}`);
    const { error: rpcError } = await supabaseAdmin.rpc('award_xp_for_pr', {
      p_user_id: userId,
      p_lesson_id: lessonId,
      p_course_id: courseId || null,
      p_pr_url: prUrl,
      p_xp_amount: expectedXp || 500
    });

    if (rpcError) {
      console.error("❌ [API RPC ERROR]:", rpcError);
      throw rpcError;
    }

    console.log("✅ [API SUCCESS]: PR Verified and XP Awarded!");
    return NextResponse.json({ 
      success: true, 
      message: 'PR_VERIFIED_AND_XP_AWARDED',
      details: { title: pr.title, state: pr.state } 
    });

  } catch (error: any) {
    console.error("💥 [API CRASH]: Internal Server Error ->", error.message);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
EOF

echo "✅ GITHUB PR API SECURED AND READY!"
echo "💡 TIP: Don't forget to add GITHUB_TOKEN to your .env.local file to prevent rate limits."