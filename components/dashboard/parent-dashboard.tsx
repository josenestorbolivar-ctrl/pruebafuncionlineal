
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react'
import { 
  Heart, 
  BookOpen, 
  TrendingUp, 
  LogOut,
  Award,
  Clock,
  Target,
  MessageCircle,
  Calendar,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { activities } from '@/lib/activities-data'

interface ParentDashboardProps {
  user: any
}

// Simulated child data (would come from studentId in real app)
const childData = {
  id: '2',
  name: 'María González',
  grade: '8°',
  progress: 60,
  completedActivities: 6,
  lastActivity: '2024-01-15T10:30:00Z',
  averageScore: 85,
  totalTimeSpent: 180, // minutes
  achievements: [
    { name: 'Primera Actividad', icon: '🎯', date: '2024-01-10' },
    { name: 'Evaluación Aprobada', icon: '📝', date: '2024-01-12' },
    { name: 'Juegos Completados', icon: '🎮', date: '2024-01-14' }
  ],
  recentActivity: [
    { activity: 'Juegos Matemáticos', date: '2024-01-15T10:30:00Z', score: 92 },
    { activity: 'Situaciones del Mundo Real', date: '2024-01-14T15:20:00Z', score: 88 },
    { activity: 'Afianzamiento de Conceptos', date: '2024-01-13T14:10:00Z', score: 79 }
  ],
  strengths: ['Cálculo de pendientes', 'Interpretación de gráficas', 'Problemas contextualizados'],
  areasToImprove: ['Graficación manual', 'Ecuaciones complejas']
}

export function ParentDashboard({ user }: ParentDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const progressPercentage = (childData.completedActivities / activities.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="app-header text-white py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Seguimiento de {childData.name}</h1>
                <p className="text-white/80 text-sm">{user?.name} • {childData.grade} Grado</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
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
                    <p className="text-gray-600 text-sm">Progreso General</p>
                    <p className="text-2xl font-bold text-green-600">{Math.round(progressPercentage)}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
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
                    <p className="text-gray-600 text-sm">Actividades Completadas</p>
                    <p className="text-2xl font-bold text-blue-600">{childData.completedActivities}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
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
                    <p className="text-gray-600 text-sm">Promedio de Calificaciones</p>
                    <p className="text-2xl font-bold text-purple-600">{childData.averageScore}/100</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
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
                    <p className="text-gray-600 text-sm">Tiempo de Estudio</p>
                    <p className="text-2xl font-bold text-orange-600">{Math.round(childData.totalTimeSpent / 60)}h</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="activity-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Progreso por Actividades</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.slice(0, 6).map((activity, index) => {
                    const isCompleted = index < childData.completedActivities
                    const isInProgress = index === childData.completedActivities
                    
                    return (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCompleted ? 'bg-green-500 text-white' :
                            isInProgress ? 'bg-yellow-500 text-white' :
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {isCompleted ? '✓' : index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{activity.title}</p>
                            <p className="text-xs text-gray-600">{activity.estimatedTime}</p>
                          </div>
                        </div>
                        <Badge className={
                          isCompleted ? 'bg-green-100 text-green-800' :
                          isInProgress ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-600'
                        }>
                          {isCompleted ? 'Completada' : 
                           isInProgress ? 'En progreso' : 'Pendiente'}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="activity-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Actividad Reciente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {childData.recentActivity.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.activity}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(item.date).toLocaleDateString('es-CO', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        <Award className="w-3 h-3 mr-1" />
                        {item.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements and Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="activity-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Logros Obtenidos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {childData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <p className="font-medium text-sm">{achievement.name}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(achievement.date).toLocaleDateString('es-CO')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Strengths and Areas to Improve */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="activity-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Análisis de Desempeño</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Fortalezas
                  </h4>
                  <div className="space-y-2">
                    {childData.strengths.map((strength, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 mr-2">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Áreas de Oportunidad
                  </h4>
                  <div className="space-y-2">
                    {childData.areasToImprove.map((area, index) => (
                      <Badge key={index} className="bg-orange-100 text-orange-800 mr-2">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Card className="activity-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Recomendaciones para Apoyar el Aprendizaje</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Práctica Adicional</h4>
                  <p className="text-sm text-blue-700">
                    Dedique 15-20 minutos diarios a practicar graficación manual usando papel cuadriculado.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🎯 Celebrar Fortalezas</h4>
                  <p className="text-sm text-green-700">
                    Reconozca su excelente trabajo en cálculo de pendientes y problemas reales.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">📚 Recursos Extra</h4>
                  <p className="text-sm text-purple-700">
                    Use los simuladores PhET y GeoGebra para visualizar mejor las ecuaciones.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
