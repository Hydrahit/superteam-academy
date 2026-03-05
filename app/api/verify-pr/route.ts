import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GithubVerificationService } from '@/src/services/GithubVerificationService';

export async function POST(req: Request) {
  try {
    const { userId, lessonId, prUrl, courseId, expectedXp } = await req.json();

    if (!userId || !prUrl || !lessonId) {
      return NextResponse.json({ success: false, error: 'MISSING_PARAMETERS' }, { status: 400 });
    }

    // 1. Verify PR via GitHub API
    const verification = await GithubVerificationService.verifyPR(prUrl);
    
    if (!verification.isValid) {
      return NextResponse.json({ success: false, error: verification.error }, { status: 400 });
    }

    // 2. Initialize Supabase Admin Client (Bypasses RLS for secure backend updates)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Check if this PR was already submitted to prevent double-spending XP
    const { data: existingEntry } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('github_pr_url', prUrl)
      .single();

    if (existingEntry) {
      return NextResponse.json({ success: false, error: 'PR_ALREADY_SUBMITTED' }, { status: 403 });
    }

    // 4. Atomically Award XP and Mark Lesson as Completed via RPC
    const { error: rpcError } = await supabase.rpc('award_xp_for_pr', {
      p_user_id: userId,
      p_lesson_id: lessonId,
      p_course_id: courseId,
      p_pr_url: prUrl,
      p_xp_amount: expectedXp || 500
    });

    if (rpcError) throw rpcError;

    return NextResponse.json({ 
      success: true, 
      message: 'PR_VERIFIED_AND_XP_AWARDED',
      details: verification.details 
    });

  } catch (error: any) {
    console.error("PR Verification Error:", error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
