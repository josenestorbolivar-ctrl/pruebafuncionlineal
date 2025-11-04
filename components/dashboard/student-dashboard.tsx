
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react'
import { 
  BookOpen, 
  Trophy, 
  Target, 
  MessageCircle, 
  LogOut, 
  Play, 
  Lock,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { activities } from '@/lib/activities-data'
import { AIChat } from '@/components/ai/ai-chat'

interface StudentDashboardProps {
  user: any
}

interface UserProgress {
  userId: string
  currentActivity: number
  activities: {
    [activityId: string]: {
      progress: number
      completed: boolean
      started: boolean
      score?: number
      attempts: number
      lastAccessed: string
      timeSpent?: number
    }
  }
  totalProgress: number
  lastAccessed: string
  createdAt: string
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load user progress from server
  useEffect(() => {
    if (!user?.id && !user?.email) return
    
    loadUserProgress()
  }, [user?.id, user?.email])

  const loadUserProgress = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/progress')
      if (!response.ok) {
        throw new Error('Error al cargar el progreso')
      }
      
      const progress = await response.json()
      setUserProgress(progress)
      
      console.log('Progreso cargado para usuario:', user?.email, progress)
    } catch (error) {
      console.error('Error loading progress:', error)
      setError('Error al cargar el progreso')
      
      // Initialize empty progress as fallback
      setUserProgress({
        userId: user?.id || user?.email || '',
        currentActivity: 1,
        activities: {},
        totalProgress: 0,
        lastAccessed: new Date().toISOString(),
        createdAt: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveProgress = async (activityId: number, data: any) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          activityId,
          ...data
        })
      })
      
      if (!response.ok) {
        throw new Error('Error al guardar el progreso')
      }
      
      const updatedProgress = await response.json()
      setUserProgress(updatedProgress)
      
      console.log('Progreso guardado:', activityId, data)
    } catch (error) {
      console.error('Error saving progress:', error)
      setError('Error al guardar el progreso')
    }
  }

  const getActivityStatus = (activityId: number) => {
    if (!userProgress?.activities[activityId]) {
      return activityId === 1 ? 'available' : 'locked'
    }
    
    const activity = userProgress.activities[activityId]
    if (activity.completed) return 'completed'
    if (activity.started || activity.progress > 0) return 'in-progress'
    
    return isActivityUnlocked(activityId) ? 'available' : 'locked'
  }

  const isActivityUnlocked = (activityId: number) => {
    if (activityId === 1) return true
    if (!userProgress) return false
    
    const prevActivity = userProgress.activities[activityId - 1]
    return prevActivity?.completed || false
  }

  const resetProgress = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/progress', {
        method: 'PUT'
      })
      
      if (!response.ok) {
        throw new Error('Error al resetear el progreso')
      }
      
      const freshProgress = await response.json()
      setUserProgress(freshProgress)
      
      console.log('Progreso reseteado para:', user?.email)
    } catch (error) {
      console.error('Error resetting progress:', error)
      setError('Error al resetear el progreso')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando tu progreso...</p>
        </div>
      </div>
    )
  }

  if (!userProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error al cargar el progreso</p>
          <Button onClick={loadUserProgress}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  const completedActivities = userProgress.totalProgress ? 
    Math.round((userProgress.totalProgress / 100) * activities.length) : 0
  const totalProgress = userProgress.totalProgress || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="app-header text-white py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">¡Hola, {user?.name}!</h1>
                <p className="text-white/80 text-sm">Matemáticas 8° Grado</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setShowChat(true)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                IA Tutor
              </Button>
              <Button
                onClick={resetProgress}
                className="bg-white/20 hover:bg-white/30 text-white text-xs"
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
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
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="activity-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Tu Progreso</span>
                </span>
                <Badge className="bg-purple-100 text-purple-800">
                  {completedActivities}/{activities.length} actividades
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Progreso General</span>
                    <span className="text-sm text-gray-600">{totalProgress}%</span>
                  </div>
                  <div className="progress-bar h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${totalProgress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{completedActivities}</div>
                    <div className="text-sm text-gray-600">Completadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{activities.length - completedActivities}</div>
                    <div className="text-sm text-gray-600">Pendientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Object.values(userProgress.activities).reduce((acc: number, p: any) => acc + (p?.score || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Puntos Totales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Object.values(userProgress.activities).filter((p: any) => p?.attempts >= 1).length}
                    </div>
                    <div className="text-sm text-gray-600">Intentos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activities Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Actividades de Aprendizaje</h2>
            <Badge variant="outline" className="text-purple-600">
              Secuencial
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity, index) => {
              const activityId = index + 1
              const status = getActivityStatus(activityId)
              const unlocked = isActivityUnlocked(activityId)
              const activityProgress = userProgress.activities[activityId]

              return (
                <motion.div
                  key={activityId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`activity-card cursor-pointer transition-all duration-300 ${
                    !unlocked ? 'locked' : ''
                  } ${status === 'completed' ? 'border-green-200 bg-green-50/50' : ''}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            status === 'completed' 
                              ? 'bg-green-500 text-white' 
                              : status === 'in-progress'
                              ? 'bg-yellow-500 text-white'
                              : unlocked
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-300 text-gray-500'
                          }`}>
                            {status === 'completed' ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : !unlocked ? (
                              <Lock className="w-6 h-6" />
                            ) : (
                              <Play className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              Actividad {activityId}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                              {activity.title}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-1">
                          {activityProgress?.score && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="w-3 h-3 mr-1" />
                              {activityProgress.score}
                            </Badge>
                          )}
                          {activityProgress?.timeSpent && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {Math.round(activityProgress.timeSpent / 60)}min
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        {activity.description}
                      </p>
                      
                      {activityProgress?.progress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progreso</span>
                            <span>{activityProgress.progress}%</span>
                          </div>
                          <Progress value={activityProgress.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Target className="w-4 h-4" />
                          <span>{activity.estimatedTime}</span>
                        </div>
                        
                        {unlocked ? (
                          <Link href={`/activity/${activityId}`}>
                            <Button 
                              className={
                                status === 'completed' 
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-purple-600 hover:bg-purple-700'
                              }
                            >
                              {status === 'completed' ? 'Revisar' : 'Continuar'}
                              <Play className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        ) : (
                          <Button disabled className="opacity-50">
                            <Lock className="w-4 h-4 mr-2" />
                            Bloqueada
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Card className="activity-card">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => setShowChat(true)}
                  variant="outline"
                  className="flex items-center space-x-2 h-auto p-4"
                >
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Pregunta al Tutor IA</div>
                    <div className="text-sm text-gray-600">Resuelve tus dudas</div>
                  </div>
                </Button>
                
                <Link href="/simulators">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 h-auto p-4 w-full"
                  >
                    <Target className="w-5 h-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">Simuladores</div>
                      <div className="text-sm text-gray-600">PhET y GeoGebra</div>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/progress">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 h-auto p-4 w-full"
                  >
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <div className="text-left">
                      <div className="font-medium">Mi Progreso</div>
                      <div className="text-sm text-gray-600">Ver estadísticas</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Chat Modal */}
      {showChat && (
        <AIChat
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          context="dashboard"
        />
      )}
    </div>
  )
}
