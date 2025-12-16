import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const [first, ...rest] = params.slug
    
    // Handle Vercel API routes
    if (first === 'v2' && rest[0] === 'projects') {
      const projectId = rest[1]
      
      return NextResponse.json({
        id: projectId || 'unknown',
        name: 'Lavage_app',
        owner: 'Gladys2005',
        framework: 'nextjs',
        hasTrialAvailable: true,
        deploymentInfo: new URL(request.url).searchParams.get('deploymentInfo') || '0'
      })
    }
    
    // Handle other API routes as needed
    return NextResponse.json({ message: 'API endpoint not found' }, { status: 404 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
