
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ActivityView } from '@/components/activities/activity-view'
import { activities } from '@/lib/activities-data'

interface ActivityPageProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: 'Actividad - Función Lineal',
  description: 'Actividad educativa interactiva'
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/login')
  }

  const userType = (session.user as any)?.userType
  if (userType !== 'student') {
    redirect('/dashboard/student')
  }

  const activityId = parseInt(params.id)
  const activity = activities.find(a => a.id === activityId)
  
  if (!activity) {
    redirect('/dashboard/student')
  }

  return <ActivityView activity={activity} user={session.user} />
}
