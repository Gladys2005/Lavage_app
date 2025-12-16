import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params
    
    // Return project information for Vercel Analytics
    return NextResponse.json({
      id: projectId,
      name: 'Lavage_app',
      owner: 'Gladys2005',
      framework: 'nextjs',
      hasTrialAvailable: true,
      deploymentInfo: 0
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
