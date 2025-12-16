import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Return project information for Vercel Analytics
    return NextResponse.json({
      id: 'lavage-app-wdan',
      name: 'Lavage_app',
      owner: 'Gladys2005',
      framework: 'nextjs',
      hasTrialAvailable: true
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
