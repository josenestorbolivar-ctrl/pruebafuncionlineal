
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { StudentDashboard } from '@/components/dashboard/student-dashboard'

export const metadata = {
  title: 'Mi Panel - Función Lineal',
  description: 'Panel del estudiante'
}

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/login')
  }

  const userType = (session.user as any)?.userType
  if (userType !== 'student') {
    if (userType === 'teacher') {
      redirect('/dashboard/teacher')
    } else if (userType === 'parent') {
      redirect('/dashboard/parent')
    }
  }

  return <StudentDashboard user={session.user} />
}
