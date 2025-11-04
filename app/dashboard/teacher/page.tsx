
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { TeacherDashboard } from '@/components/dashboard/teacher-dashboard'

export const metadata = {
  title: 'Panel del Docente - Función Lineal',
  description: 'Panel administrativo del docente'
}

export default async function TeacherDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/login')
  }

  const userType = (session.user as any)?.userType
  if (userType !== 'teacher') {
    redirect('/dashboard/student')
  }

  return <TeacherDashboard user={session.user} />
}
