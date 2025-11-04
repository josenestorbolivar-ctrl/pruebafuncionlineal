
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserProgress, updateUserProgress, initializeUserProgress } from '@/lib/progress'

// GET /api/progress - Get user's progress
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Get user ID from session (assuming user has an id field)
    const userId = (session.user as any).id || session.user.email
    
    const progress = getUserProgress(userId)
    
    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error getting progress:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}

// POST /api/progress - Update user's progress
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const userId = (session.user as any).id || session.user.email
    const body = await request.json()
    
    const { activityId, ...progressData } = body
    
    if (!activityId) {
      return NextResponse.json(
        { error: 'ID de actividad requerido' }, 
        { status: 400 }
      )
    }

    const updatedProgress = updateUserProgress(userId, activityId, progressData)
    
    return NextResponse.json(updatedProgress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}

// PUT /api/progress/reset - Reset user's progress (for testing)
export async function PUT() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const userId = (session.user as any).id || session.user.email
    
    // Initialize fresh progress
    const freshProgress = initializeUserProgress(userId)
    
    return NextResponse.json(freshProgress)
  } catch (error) {
    console.error('Error resetting progress:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}
