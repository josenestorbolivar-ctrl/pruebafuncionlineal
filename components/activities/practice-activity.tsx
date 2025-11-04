
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  CheckCircle, 
  X, 
  Calculator, 
  TrendingUp, 
  ExternalLink, 
  Globe, 
  Zap, 
  BookOpen, 
  Play,
  Award,
  Users,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Activity } from '@/lib/activities-data'

interface PracticeActivityProps {
  activity: Activity
  onProgressUpdate: (progress: number) => void
  onComplete: (score: number) => void
}

const simulatorActivities = {
  4: {
    title: "Afianzamiento de Conceptos",
    description: "Practica con simuladores interactivos y ejercicios guiados",
    phet: {
      title: "Simulador PhET: Graficación de Líneas",
      url: "https://phet.colorado.edu/es/simulations/graphing-lines",
      description: "Explora cómo los cambios en pendiente e intercepto afectan las gráficas",
      tasks: [
        {
          id: 1,
          task: "Abre el simulador y ve a la pestaña 'Línea-Intersección'",
          instruction: "Familiarízate con la interfaz del simulador",
          points: 10
        },
        {
          id: 2,
          task: "Experimenta cambiando la pendiente (m) de -3 a +3",
          instruction: "Observa cómo cambia la inclinación de la línea",
          points: 15
        },
        {
          id: 3,
          task: "Cambia el intercepto (b) y observa el efecto en la línea",
          instruction: "Note cómo la línea se mueve verticalmente",
          points: 15
        },
        {
          id: 4,
          task: "Crea una línea con pendiente = 2 y intercepto = 3",
          instruction: "Configura m = 2 y b = 3, verifica que sea y = 2x + 3",
          points: 20
        },
        {
          id: 5,
          task: "Prueba con pendiente negativa: m = -1.5, b = 4",
          instruction: "Observa cómo la pendiente negativa hace que baje",
          points: 15
        }
      ]
    },
    geogebra: {
      title: "Práctica con GeoGebra Calculator",
      url: "https://www.geogebra.org/calculator",
      description: "Crea y analiza funciones lineales con herramientas profesionales",
      tasks: [
        {
          id: 1,
          task: "Abre GeoGebra Calculator y grafica y = x",
          instruction: "Esta es la función identidad básica",
          equation: "y = x",
          points: 10
        },
        {
          id: 2,
          task: "Grafica y = 2x + 1 y compárala con la anterior",
          instruction: "Mayor pendiente = línea más empinada",
          equation: "y = 2x + 1",
          points: 15
        },
        {
          id: 3,
          task: "Crea y = -0.5x + 4 (pendiente negativa y suave)",
          instruction: "Observa la pendiente negativa y poco empinada",
          equation: "y = -0.5x + 4",
          points: 15
        },
        {
          id: 4,
          task: "Grafica una línea horizontal: y = 3",
          instruction: "Pendiente cero = línea horizontal",
          equation: "y = 3",
          points: 15
        },
        {
          id: 5,
          task: "Crea 3 líneas paralelas: y = 2x+1, y = 2x, y = 2x-2",
          instruction: "Misma pendiente = líneas paralelas",
          equations: ["y = 2x + 1", "y = 2x", "y = 2x - 2"],
          points: 20
        }
      ]
    },
    traditionalExercises: [
      {
        id: 1,
        type: 'calculation',
        title: 'Calcular Pendiente Entre Puntos',
        question: 'Calcula la pendiente entre A(1, 3) y B(5, 11)',
        options: ['2', '4', '0.5', '8'],
        correct: 0,
        explanation: 'm = (11-3)/(5-1) = 8/4 = 2',
        points: 15
      },
      {
        id: 2,
        type: 'identification',
        title: 'Identificar Componentes',
        question: 'En y = -3x + 7, ¿cuáles son la pendiente y el intercepto?',
        options: ['m = -3, b = 7', 'm = 3, b = -7', 'm = 7, b = -3', 'm = -7, b = 3'],
        correct: 0,
        explanation: 'En y = mx + b, m es la pendiente (-3) y b es el intercepto (7)',
        points: 10
      },
      {
        id: 3,
        type: 'graphing',
        title: 'Interpretar Gráfica',
        question: 'Una línea pasa por (0,2) y (3,8). ¿Cuál es su ecuación?',
        options: ['y = 2x + 2', 'y = 3x + 2', 'y = 2x + 8', 'y = 6x + 2'],
        correct: 0,
        explanation: 'm = (8-2)/(3-0) = 2, intercepto = 2, entonces y = 2x + 2',
        points: 20
      }
    ]
  },
  5: {
    title: "Situaciones del Mundo Real",
    description: "Aplica funciones lineales a problemas reales con simuladores",
    phet: {
      title: "PhET: Aplicaciones del Mundo Real",
      url: "https://phet.colorado.edu/es/simulations/graphing-lines",
      description: "Explora cómo las funciones modelan situaciones cotidianas",
      tasks: [
        {
          id: 1,
          task: "Ve a la pestaña 'Línea de Juego' (Line Game)",
          instruction: "Practica identificando ecuaciones de líneas",
          points: 15
        },
        {
          id: 2,
          task: "Completa al menos 3 niveles del juego",
          instruction: "Desarrolla tu intuición visual-matemática",
          points: 25
        },
        {
          id: 3,
          task: "Experimenta con 'Punto-Pendiente'",
          instruction: "Crea ecuaciones dados punto y pendiente",
          points: 20
        },
        {
          id: 4,
          task: "Practica con diferentes tipos de pendiente",
          instruction: "Positiva, negativa, cero, indefinida",
          points: 15
        }
      ]
    },
    geogebra: {
      title: "Modelado de Situaciones Reales",
      url: "https://www.geogebra.org/calculator",
      description: "Crea modelos matemáticos de situaciones cotidianas",
      tasks: [
        {
          id: 1,
          task: "Modelo de taxi: Costo = $3,000 + $800 por km",
          instruction: "Grafica y = 800x + 3000",
          equation: "y = 800x + 3000",
          points: 20
        },
        {
          id: 2,
          task: "Crecimiento poblacional: 50,000 + 2,000 por año",
          instruction: "Grafica y = 2000x + 50000",
          equation: "y = 2000x + 50000",
          points: 20
        },
        {
          id: 3,
          task: "Plan de celular: $25,000 + $500 por GB",
          instruction: "Grafica y = 500x + 25000",
          equation: "y = 500x + 25000",
          points: 20
        },
        {
          id: 4,
          task: "Compara los 3 modelos en una sola gráfica",
          instruction: "Observa escalas y comportamientos diferentes",
          points: 25
        }
      ]
    },
    traditionalExercises: [
      {
        id: 1,
        type: 'real-world',
        title: 'Problema de Servicios Públicos',
        question: 'El recibo de luz tiene un costo fijo de $20,000 + $450 por kWh. Si consumes 80 kWh, ¿cuánto pagas?',
        options: ['$36,000', '$56,000', '$46,000', '$26,000'],
        correct: 1,
        explanation: 'Costo = 20,000 + 450(80) = 20,000 + 36,000 = $56,000',
        points: 20
      },
      {
        id: 2,
        type: 'real-world',
        title: 'Problema de Velocidad',
        question: 'Un auto viaja a 60 km/h. Si ya ha recorrido 120 km, ¿cuál será la distancia total después de 3 horas más?',
        options: ['240 km', '300 km', '180 km', '360 km'],
        correct: 1,
        explanation: 'Distancia total = 120 + 60(3) = 120 + 180 = 300 km',
        points: 20
      },
      {
        id: 3,
        type: 'real-world',
        title: 'Modelo de Ahorro',
        question: 'Si ahorras $15,000 mensuales y ya tienes $100,000, ¿cuánto tendrás en 8 meses?',
        options: ['$220,000', '$200,000', '$320,000', '$240,000'],
        correct: 0,
        explanation: 'Ahorro total = 100,000 + 15,000(8) = 100,000 + 120,000 = $220,000',
        points: 20
      }
    ]
  }
}

export function PracticeActivity({ activity, onProgressUpdate, onComplete }: PracticeActivityProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, number>>({})
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({})
  const [currentTab, setCurrentTab] = useState('phet')
  const [totalScore, setTotalScore] = useState(0)

  const activityData = simulatorActivities[activity.id as keyof typeof simulatorActivities]

  if (!activityData) {
    return (
      <Card className="activity-card">
        <CardContent className="p-8 text-center">
          <Target className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Actividad en Desarrollo</h3>
          <p className="text-gray-600 mb-4">
            Esta actividad de práctica estará disponible próximamente.
          </p>
          <Button onClick={() => onComplete(100)}>
            Marcar como Completada
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getTotalPoints = () => {
    const phetPoints = activityData.phet.tasks.reduce((sum, task) => sum + task.points, 0)
    const geogebraPoints = activityData.geogebra.tasks.reduce((sum, task) => sum + task.points, 0)
    const exercisePoints = activityData.traditionalExercises.reduce((sum, ex) => sum + ex.points, 0)
    return phetPoints + geogebraPoints + exercisePoints
  }

  const handleTaskComplete = (taskId: string, points: number) => {
    if (!completedTasks.has(taskId)) {
      setCompletedTasks(prev => new Set([...prev, taskId]))
      setTotalScore(prev => prev + points)
    }
    
    const progress = ((totalScore + points) / getTotalPoints()) * 100
    onProgressUpdate(progress)
    
    if (progress >= 100) {
      setTimeout(() => onComplete(Math.min(100, ((totalScore + points) / getTotalPoints()) * 100)), 2000)
    }
  }

  const handleExerciseAnswer = (exerciseId: number, answerIndex: number) => {
    const exercise = activityData.traditionalExercises.find(ex => ex.id === exerciseId)
    if (!exercise) return

    setExerciseAnswers(prev => ({ ...prev, [exerciseId]: answerIndex }))
    setShowFeedback(prev => ({ ...prev, [exerciseId]: true }))

    if (answerIndex === exercise.correct) {
      handleTaskComplete(`exercise_${exerciseId}`, exercise.points)
    }
  }

  const progress = (totalScore / getTotalPoints()) * 100

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="activity-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{activityData.title}</h3>
              <p className="text-gray-600">{activityData.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{totalScore}</div>
              <div className="text-sm text-gray-600">de {getTotalPoints()} puntos</div>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="text-center mt-2 text-sm text-gray-600">
            Progreso: {Math.round(progress)}%
          </div>
        </CardContent>
      </Card>

      {/* Activity Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="phet" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>PhET Colorado</span>
          </TabsTrigger>
          <TabsTrigger value="geogebra" className="flex items-center space-x-2">
            <Calculator className="w-4 h-4" />
            <span>GeoGebra</span>
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Ejercicios</span>
          </TabsTrigger>
        </TabsList>

        {/* PhET Tab */}
        <TabsContent value="phet" className="space-y-4">
          <Card className="activity-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>{activityData.phet.title}</span>
                </span>
                <Button 
                  onClick={() => window.open(activityData.phet.url, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir PhET
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Globe className="h-4 w-4" />
                <AlertDescription>
                  {activityData.phet.description}
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {activityData.phet.tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-2 transition-all ${
                      completedTasks.has(`phet_${task.id}`) 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge variant="outline" className="bg-blue-50">
                                Tarea {index + 1}
                              </Badge>
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Award className="w-3 h-3 mr-1" />
                                {task.points} pts
                              </Badge>
                            </div>
                            <h4 className="font-semibold mb-2">{task.task}</h4>
                            <p className="text-sm text-gray-600 mb-3">{task.instruction}</p>
                          </div>
                          <div className="ml-4">
                            {completedTasks.has(`phet_${task.id}`) ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completada
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleTaskComplete(`phet_${task.id}`, task.points)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Completar
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GeoGebra Tab */}
        <TabsContent value="geogebra" className="space-y-4">
          <Card className="activity-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <span>{activityData.geogebra.title}</span>
                </span>
                <Button 
                  onClick={() => window.open(activityData.geogebra.url, '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir GeoGebra
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Calculator className="h-4 w-4" />
                <AlertDescription>
                  {activityData.geogebra.description}
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {activityData.geogebra.tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-2 transition-all ${
                      completedTasks.has(`geogebra_${task.id}`) 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:border-green-200'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge variant="outline" className="bg-green-50">
                                Tarea {index + 1}
                              </Badge>
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Award className="w-3 h-3 mr-1" />
                                {task.points} pts
                              </Badge>
                            </div>
                            <h4 className="font-semibold mb-2">{task.task}</h4>
                            <p className="text-sm text-gray-600 mb-2">{task.instruction}</p>
                            {task.equation && (
                              <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                                {task.equation}
                              </div>
                            )}
                            {(task as any).equations && (
                              <div className="bg-gray-100 p-2 rounded">
                                {(task as any).equations.map((eq: string, i: number) => (
                                  <div key={i} className="font-mono text-sm">{eq}</div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            {completedTasks.has(`geogebra_${task.id}`) ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completada
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleTaskComplete(`geogebra_${task.id}`, task.points)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Completar
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Traditional Exercises Tab */}
        <TabsContent value="exercises" className="space-y-4">
          <Card className="activity-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Ejercicios de Práctica</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activityData.traditionalExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span>{exercise.title}</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Award className="w-3 h-3 mr-1" />
                          {exercise.points} pts
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-800 font-medium">{exercise.question}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {exercise.options.map((option, optionIndex) => (
                          <Button
                            key={optionIndex}
                            variant={
                              exerciseAnswers[exercise.id] === optionIndex
                                ? (optionIndex === exercise.correct ? "default" : "destructive")
                                : showFeedback[exercise.id] && optionIndex === exercise.correct
                                ? "default"
                                : "outline"
                            }
                            className={`justify-start h-auto p-3 ${
                              exerciseAnswers[exercise.id] === optionIndex
                                ? (optionIndex === exercise.correct 
                                    ? "bg-green-600 hover:bg-green-700" 
                                    : "bg-red-600 hover:bg-red-700")
                                : showFeedback[exercise.id] && optionIndex === exercise.correct
                                ? "bg-green-600 hover:bg-green-700"
                                : ""
                            }`}
                            onClick={() => handleExerciseAnswer(exercise.id, optionIndex)}
                            disabled={showFeedback[exercise.id]}
                          >
                            <span className="font-semibold mr-2">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            {option}
                            {exerciseAnswers[exercise.id] === optionIndex && optionIndex === exercise.correct && (
                              <CheckCircle className="w-4 h-4 ml-auto" />
                            )}
                            {exerciseAnswers[exercise.id] === optionIndex && optionIndex !== exercise.correct && (
                              <X className="w-4 h-4 ml-auto" />
                            )}
                          </Button>
                        ))}
                      </div>
                      
                      {showFeedback[exercise.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"
                        >
                          <h5 className="font-semibold text-blue-800 mb-1">Explicación:</h5>
                          <p className="text-blue-700 text-sm">{exercise.explanation}</p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Completion Message */}
      {progress >= 80 && (
        <Card className="activity-card border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-800 mb-2">
              ¡Excelente progreso!
            </h3>
            <p className="text-green-700 mb-4">
              Has completado la mayoría de las actividades de práctica. 
              ¡Continúa así para dominar completamente la función lineal!
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-green-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>PhET + GeoGebra</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                <span>Ejercicios prácticos</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                <span>{totalScore} puntos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
