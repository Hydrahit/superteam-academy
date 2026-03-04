import { NextResponse } from 'next/server';

export async function GET() {
  // In production, fetch from Sanity/Contentful here
  const courses = [
    { id: '1', slug: 'solana-fundamentals', title: 'Solana Fundamentals', track: 'Foundation', diff: 'Beginner', xp: 600, lessons: 12 },
    { id: '2', slug: 'anchor-dev', title: 'Anchor Development', track: 'Programs', diff: 'Intermediate', xp: 900, lessons: 18 },
  ];
  
  return NextResponse.json(courses);
}
