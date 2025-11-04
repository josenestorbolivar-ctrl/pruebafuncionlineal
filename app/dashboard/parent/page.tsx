
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ParentDashboard } from '@/components/dashboard/parent-dashboard'

export const metadata = {
  title: 'Panel del Padre - Función Lineal',
  description: 'Panel de seguimiento para padres'
}

export default async function ParentDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/login')
  }

  const userType = (session.user as any)?.userType
  if (userType !== 'parent') {
    redirect('/dashboard/student')
  }

  return <ParentDashboard user={session.user} />
}
