
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  MessageCircle, 
  BookOpen, 
  Target, 
  CheckCircle, 
  Clock,
  Play,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { AIChat } from '@/components/ai/ai-chat'
import { Activity } from '@/lib/activities-data'
import { DiagnosticActivity } from './diagnostic-activity'
import { LearningActivity } from './learning-activity'
import { PracticeActivity } from './practice-activity'
import { GameActivity } from './game-activity'
import { ProjectActivity } from './project-activity'
import { EvaluationActivity } from './evaluation-activity'
import { ReflectionActivity } from './reflection-activity'

interface ActivityViewProps {
  activity: Activity
  user: any
}

export function ActivityView({ activity, user }: ActivityViewProps) {
  const [showChat, setShowChat] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [startTime] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    // Load saved progress from server
    loadActivityProgress()
  }, [activity.id, user?.id])

  const loadActivityProgress = async () => {
    try {
      const response = await fetch('/api/progress')
      if (response.ok) {
        const userProgress = await response.json()
        const activityProgress = userProgress.activities[activity.id]
        
        if (activityProgress) {
          setProgress(activityProgress.progress || 0)
          setIsCompleted(activityProgress.completed || false)
        }
      }
    } catch (error) {
      console.error('Error loading activity progress:', error)
      
      // Fallback to localStorage for backward compatibility
      const savedProgress = localStorage.getItem(`activity_${activity.id}_${user?.id}`)
      if (savedProgress) {
        const data = JSON.parse(savedProgress)
        setProgress(data.progress || 0)
        setIsCompleted(data.completed || false)
      }
    }
  }

  const saveProgress = async (newProgress: number, completed = false, score?: number) => {
    const progressData = {
      progress: newProgress,
      completed,
      started: true,
      score,
      attempts: 1,
      timeSpent: Math.round((new Date().getTime() - startTime.getTime()) / 1000)
    }
    
    try {
      // Save to server
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          activityId: activity.id,
          ...progressData
        })
      })
      
      if (!response.ok) {
        throw new Error('Error saving to server')
      }
      
      console.log('Progress saved to server:', activity.id, progressData)
    } catch (error) {
      console.error('Error saving progress to server:', error)
      
      // Fallback to localStorage
      localStorage.setItem(`activity_${activity.id}_${user?.id}`, JSON.stringify(progressData))
      
      const studentProgressKey = `student_progress_${user?.id}`
      const studentProgress = JSON.parse(localStorage.getItem(studentProgressKey) || '{}')
      
      studentProgress[activity.id] = {
        ...studentProgress[activity.id],
        ...progressData
      }
      
      localStorage.setItem(studentProgressKey, JSON.stringify(studentProgress))
    }
    
    // Update local state
    setProgress(newProgress)
    if (completed) {
      setIsCompleted(true)
    }
  }

  const handleComplete = (score?: number) => {
    saveProgress(100, true, score)
    setTimeout(() => {
      router.push('/dashboard/student')
    }, 2000)
  }

  const renderActivityContent = () => {
    switch (activity.type) {
      case 'diagnostic':
        return (
          <DiagnosticActivity 
            activity={activity}
            onProgressUpdate={saveProgress}
            onComplete={handleComplete}
          />
        )
      case 'learning':
        return (
          <LearningActivity 
            activity={activity}
            onProgressUpdate={saveProgress}
            onComplete={handleComplete}
          />
        )
      case 'practice':
        return (
          <PracticeActivity 
            activity={activity}
            onProgressUpdate={saveProgress}
            onComplete={handleComplete}
          />
        )
      case 'game':
        return (
          <GameActivity 
            activity={activity}
            onProgressUpdate={saveProgress}
            onComplete={handleComplete}
          />
        )
      case 'project':
        return (
          <ProjectActivity 
            activity={activity}
            onProgressUpdate={saveProgress}
            onComplete={handleComplete}
          />
        )
      case 'evaluation':
        return (
          <EvaluationActivity 
            activity={activity}
            onProgressUpdate={saveProgress}
            onComplete={handleComplete}
          />
        )
      case 'reflection':
        return (
          <ReflectionActivity 
            activity={activity}
            onProgressUpdate={saveProgress}
            onComplete={handleComplete}
          />
        )
      default:
        return (
          <Card className="activity-card">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Actividad en Desarrollo</h3>
              <p className="text-gray-600 mb-4">
                Esta actividad estará disponible próximamente.
              </p>
              <Button onClick={() => handleComplete()}>
                Marcar como Completada
              </Button>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="app-header text-white py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/student">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Actividad {activity.id}</h1>
                <p className="text-white/80 text-sm">{activity.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className="bg-white/20 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {activity.estimatedTime}
              </Badge>
              <Button
                onClick={() => setShowChat(true)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ayuda
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="activity-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progreso de la Actividad</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="activity-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
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
                  <span>{activity.title}</span>
                </span>
                {isCompleted && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completada
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{activity.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-600" />
                    Objetivos de Aprendizaje
                  </h4>
                  <ul className="space-y-1">
                    {activity.content.objectives.map((objective, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {activity.content.materials && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Play className="w-4 h-4 mr-2 text-green-600" />
                      Materiales Necesarios
                    </h4>
                    <ul className="space-y-1">
                      {activity.content.materials.map((material, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {renderActivityContent()}
        </motion.div>

        {/* Navigation */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Card className="activity-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h3 className="text-xl font-bold text-green-700">¡Actividad Completada!</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Excelente trabajo. Has completado esta actividad exitosamente.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/dashboard/student">
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      Volver al Panel
                      <ArrowLeft className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  {activity.id < 10 && (
                    <Link href={`/activity/${activity.id + 1}`}>
                      <Button variant="outline">
                        Siguiente Actividad
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* AI Chat */}
      {showChat && (
        <AIChat
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          context={`actividad ${activity.id}: ${activity.title}`}
        />
      )}
    </div>
  )
}
