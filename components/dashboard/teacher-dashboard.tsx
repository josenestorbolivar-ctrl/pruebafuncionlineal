
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react'
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Download, 
  LogOut,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { activities } from '@/lib/activities-data'

interface TeacherDashboardProps {
  user: any
}

// Simulated student data
const students = [
  {
    id: '2',
    name: 'María González',
    email: 'estudiante@demo.com',
    progress: 60,
    completedActivities: 6,
    lastActivity: '2024-01-15T10:30:00Z',
    averageScore: 85,
    status: 'active'
  },
  {
    id: '4',
    name: 'Carlos Rodríguez',
    email: 'carlos@demo.com',
    progress: 30,
    completedActivities: 3,
    lastActivity: '2024-01-14T15:45:00Z',
    averageScore: 72,
    status: 'inactive'
  },
  {
    id: '5',
    name: 'Ana Martínez',
    email: 'ana@demo.com',
    progress: 90,
    completedActivities: 9,
    lastActivity: '2024-01-15T14:20:00Z',
    averageScore: 92,
    status: 'active'
  },
  {
    id: '6',
    name: 'Diego López',
    email: 'diego@demo.com',
    progress: 45,
    completedActivities: 4,
    lastActivity: '2024-01-13T09:15:00Z',
    averageScore: 68,
    status: 'attention'
  }
]

export function TeacherDashboard({ user }: TeacherDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeStudents = students.filter(s => s.status === 'active').length
  const averageProgress = Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)
  const studentsNeedingAttention = students.filter(s => s.progress < 50 || s.averageScore < 70).length

  const exportProgress = () => {
    const csvContent = [
      ['Nombre', 'Email', 'Progreso (%)', 'Actividades Completadas', 'Puntaje Promedio', 'Última Actividad'],
      ...students.map(student => [
        student.name,
        student.email,
        student.progress.toString(),
        student.completedActivities.toString(),
        student.averageScore.toString(),
        new Date(student.lastActivity).toLocaleDateString('es-CO')
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `progreso_estudiantes_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="app-header text-white py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Panel del Docente</h1>
                <p className="text-white/80 text-sm">Prof. {user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={exportProgress}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button
                onClick={() => signOut()}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="activity-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Estudiantes Activos</p>
                    <p className="text-2xl font-bold text-green-600">{activeStudents}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="activity-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Progreso Promedio</p>
                    <p className="text-2xl font-bold text-blue-600">{averageProgress}%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="activity-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Actividades Totales</p>
                    <p className="text-2xl font-bold text-purple-600">{activities.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="activity-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Necesitan Atención</p>
                    <p className="text-2xl font-bold text-orange-600">{studentsNeedingAttention}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" onClick={() => setSelectedTab("overview")}>Resumen</TabsTrigger>
            <TabsTrigger value="students" onClick={() => setSelectedTab("students")}>Estudiantes</TabsTrigger>
            <TabsTrigger value="activities" onClick={() => setSelectedTab("activities")}>Actividades</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Chart Placeholder */}
              <Card className="activity-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Progreso General del Curso</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.slice(0, 5).map((activity, index) => {
                      const completionRate = Math.floor(Math.random() * 40) + 40 // Simulated data
                      return (
                        <div key={activity.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{activity.title}</span>
                            <span className="text-gray-600">{completionRate}%</span>
                          </div>
                          <Progress value={completionRate} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="activity-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Actividad Reciente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.slice(0, 4).map((student) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{student.name}</p>
                            <p className="text-xs text-gray-600">
                              {new Date(student.lastActivity).toLocaleDateString('es-CO')}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            student.status === 'active' ? 'bg-green-100 text-green-800' :
                            student.status === 'attention' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {student.status === 'active' ? 'Activo' : 
                           student.status === 'attention' ? 'Atención' : 'Inactivo'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <Card className="activity-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Lista de Estudiantes</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Buscar estudiante..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {student.name.split(' ').map(n => n.charAt(0)).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            <Award className="w-3 h-3 mr-1" />
                            {student.averageScore}
                          </Badge>
                          <Badge 
                            className={
                              student.status === 'active' ? 'bg-green-100 text-green-800' :
                              student.status === 'attention' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {student.status === 'active' ? 'Activo' : 
                             student.status === 'attention' ? 'Atención' : 'Inactivo'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso: {student.completedActivities}/{activities.length} actividades</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Última actividad: {new Date(student.lastActivity).toLocaleDateString('es-CO')}</span>
                        <span>Promedio: {student.averageScore}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="mt-6">
            <Card className="activity-card">
              <CardHeader>
                <CardTitle>Estado de las Actividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activities.map((activity) => {
                    const completionRate = Math.floor(Math.random() * 40) + 40 // Simulated data
                    const studentsCompleted = Math.floor((completionRate / 100) * students.length)
                    
                    return (
                      <div key={activity.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                            activity.type === 'diagnostic' ? 'bg-orange-500' :
                            activity.type === 'learning' ? 'bg-blue-500' :
                            activity.type === 'practice' ? 'bg-green-500' :
                            activity.type === 'game' ? 'bg-purple-500' :
                            activity.type === 'evaluation' ? 'bg-red-500' :
                            activity.type === 'project' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`}>
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <Badge variant="outline">
                            {studentsCompleted}/{students.length}
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm">Actividad {activity.id}</h4>
                          <p className="text-xs text-gray-600 mt-1">{activity.title}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Completada por:</span>
                            <span>{completionRate}%</span>
                          </div>
                          <Progress value={completionRate} className="h-2" />
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          Tiempo estimado: {activity.estimatedTime}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
