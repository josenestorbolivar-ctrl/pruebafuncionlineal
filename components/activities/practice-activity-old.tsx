
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, CheckCircle, X, Calculator, TrendingUp, ExternalLink, Globe, Zap, BookOpen, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Activity } from '@/lib/activities-data'

interface PracticeActivityProps {
  activity: Activity
  onProgressUpdate: (progress: number) => void
  onComplete: (score: number) => void
}

const simulatorActivities = {
  4: {
    phet: {
      title: "Simulador PhET: Graficación de Líneas",
      url: "https://phet.colorado.edu/es/simulations/graphing-lines",
      description: "Usa este simulador interactivo para explorar cómo los cambios en pendiente e intercepto afectan la gráfica",
      tasks: [
        {
          id: 1,
          task: "Abre el simulador y ve a la pestaña 'Línea-Intersección'",
          instruction: "Familiarízate con la interfaz del simulador",
          completed: false
        },
        {
          id: 2,
          task: "Experimenta cambiando la pendiente (m) usando el deslizador",
          instruction: "Observa cómo cambia la inclinación de la línea",
          completed: false
        },
        {
          id: 3,
          task: "Cambia el intercepto (b) y observa el efecto",
          instruction: "Note cómo la línea se mueve arriba o abajo",
          completed: false
        },
        {
          id: 4,
          task: "Crea una línea con pendiente = 2 y intercepto = 3",
          instruction: "Configura m = 2 y b = 3, verifica que la ecuación sea y = 2x + 3",
          completed: false
        },
        {
          id: 5,
          task: "Prueba con pendiente negativa: m = -1, b = 5",
          instruction: "Observa cómo una pendiente negativa hace que la línea baje",
          completed: false
        }
      ]
    },
    geogebra: {
      title: "Práctica con GeoGebra",
      url: "https://www.geogebra.org/calculator",
      description: "Crea y analiza funciones lineales usando esta poderosa herramienta matemática",
      tasks: [
        {
          id: 1,
          task: "Abre GeoGebra Calculator y grafica y = x",
          instruction: "Esta es la función identidad con pendiente 1",
          equation: "y = x",
          completed: false
        },
        {
          id: 2,
          task: "Grafica y = 2x + 1 y compárala con la anterior",
          instruction: "Observa cómo la pendiente mayor hace la línea más empinada",
          equation: "y = 2x + 1",
          completed: false
        },
        {
          id: 3,
          task: "Crea una función con pendiente -0.5: y = -0.5x + 4",
          instruction: "Note la pendiente negativa y suave",
          equation: "y = -0.5x + 4",
          completed: false
        },
        {
          id: 4,
          task: "Experimenta con una línea horizontal: y = 3",
          instruction: "Una línea horizontal tiene pendiente cero",
          equation: "y = 3",
          completed: false
        },
        {
          id: 5,
          task: "Grafica 3 funciones paralelas con diferentes interceptos",
          instruction: "Usa la misma pendiente pero diferentes valores de b",
          equations: ["y = 2x + 1", "y = 2x", "y = 2x - 2"],
          completed: false
        }
      ]
    }
  },
  5: {
    phet: {
      title: "PhET: Aplicaciones del Mundo Real",
      url: "https://phet.colorado.edu/es/simulations/graphing-lines",
      description: "Explora cómo las funciones lineales modelan situaciones reales",
      tasks: [
        {
          id: 1,
          task: "Ve a la pestaña 'Línea de Juego' (Line Game)",
          instruction: "Practica identificando ecuaciones de líneas dadas",
          completed: false
        },
        {
          id: 2,
          task: "Completa al menos 3 niveles del juego",
          instruction: "Esto te ayudará a reconocer ecuaciones visualmente",
          completed: false
        },
        {
          id: 3,
          task: "Experimenta con la sección 'Punto-Pendiente'",
          instruction: "Aprende a crear ecuaciones dados un punto y una pendiente",
          completed: false
        }
      ]
    },
    geogebra: {
      title: "Modelando Situaciones Reales",
      url: "https://www.geogebra.org/calculator",
      description: "Crea modelos matemáticos de situaciones cotidianas",
      tasks: [
        {
          id: 1,
          task: "Modelo de taxi: y = 3000 + 800x",
          instruction: "Donde y es el costo total y x son los kilómetros recorridos",
          equation: "y = 800x + 3000",
          completed: false
        },
        {
          id: 2,
          task: "Modelo de crecimiento poblacional: y = 50000 + 2000x",
          instruction: "Donde y es la población y x son los años transcurridos",
          equation: "y = 2000x + 50000",
          completed: false
        },
        {
          id: 3,
          task: "Compara los dos modelos en la misma gráfica",
          instruction: "Observa las diferentes escalas y significados",
          completed: false
        }
      ]
    }
  }
}

const practiceExercises = {
  4: [ // Afianzamiento de Conceptos
    {
      id: 1,
      type: 'slope-calculation',
      title: 'Calcular Pendiente',
      question: 'Calcula la pendiente entre los puntos A(2, 4) y B(6, 12)',
      hint: 'Usa la fórmula m = (y₂ - y₁) / (x₂ - x₁)',
      answer: '2',
      explanation: 'm = (12 - 4) / (6 - 2) = 8 / 4 = 2'
    },
    {
      id: 2,
      type: 'identify-components',
      title: 'Identificar Componentes',
      question: 'En la ecuación y = -3x + 7, ¿cuál es la pendiente y cuál es el intercepto?',
      components: { slope: '-3', intercept: '7' },
      explanation: 'En y = mx + b, m es la pendiente (-3) y b es el intercepto (7)'
    },
    {
      id: 3,
      type: 'graph-equation',
      title: 'Graficar Ecuación',
      question: 'Encuentra dos puntos de la recta y = 2x - 1',
      points: [
        { x: 0, y: -1 },
        { x: 2, y: 3 }
      ],
      explanation: 'Cuando x=0: y=2(0)-1=-1. Cuando x=2: y=2(2)-1=3'
    }
  ],
  5: [ // Situaciones del Mundo Real
    {
      id: 1,
      type: 'utility-bill',
      title: 'Recibo de Servicios',
      question: 'Una empresa de telefonía cobra $25,000 fijos + $500 por minuto. Si Juan habló 120 minutos, ¿cuánto debe pagar?',
      context: 'Costo = Tarifa fija + (Tarifa por minuto × Minutos)',
      answer: '85000',
      explanation: 'Costo = 25,000 + (500 × 120) = 25,000 + 60,000 = $85,000'
    },
    {
      id: 2,
      type: 'velocity',
      title: 'Velocidad Constante',
      question: 'Un ciclista viaja a velocidad constante de 15 km/h. Si ya lleva recorridos 30 km, ¿cuántos kilómetros habrá recorrido en total después de 4 horas más?',
      context: 'Distancia total = Distancia inicial + (Velocidad × Tiempo)',
      answer: '90',
      explanation: 'Distancia = 30 + (15 × 4) = 30 + 60 = 90 km'
    },
    {
      id: 3,
      type: 'savings',
      title: 'Plan de Ahorro',
      question: 'María tiene $150,000 ahorrados y ahorra $20,000 cada mes. ¿Cuánto tendrá después de 8 meses?',
      context: 'Ahorro total = Ahorro inicial + (Ahorro mensual × Meses)',
      answer: '310000',
      explanation: 'Ahorro = 150,000 + (20,000 × 8) = 150,000 + 160,000 = $310,000'
    }
  ]
}

export function PracticeActivity({ activity, onProgressUpdate, onComplete }: PracticeActivityProps) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: any }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({})
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())
  const [showCompletion, setShowCompletion] = useState(false)

  const exercises = practiceExercises[activity.id as keyof typeof practiceExercises] || []

  if (exercises.length === 0) {
    return (
      <Card className="activity-card">
        <CardContent className="p-8 text-center">
          <Target className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Ejercicios en Desarrollo</h3>
          <p className="text-gray-600 mb-4">
            Los ejercicios para esta actividad estarán disponibles próximamente.
          </p>
          <Button onClick={() => onComplete(100)}>
            Marcar como Completada
          </Button>
        </CardContent>
      </Card>
    )
  }

  const handleAnswerSubmit = (exerciseId: number) => {
    const exercise = exercises.find(ex => ex.id === exerciseId)
    if (!exercise) return

    const userAnswer = answers[exerciseId]
    let isCorrect = false

    if (exercise.type === 'slope-calculation' || exercise.type === 'utility-bill' || 
        exercise.type === 'velocity' || exercise.type === 'savings') {
      isCorrect = userAnswer?.toString() === exercise.answer
    } else if (exercise.type === 'identify-components') {
      const components = (exercise as any).components
      isCorrect = userAnswer?.slope === components?.slope && userAnswer?.intercept === components?.intercept
    } else if (exercise.type === 'graph-equation') {
      // Simplified check for graph points
      isCorrect = userAnswer?.point1?.x === '0' && userAnswer?.point1?.y === '-1'
    }

    if (isCorrect) {
      setCompletedExercises(prev => new Set([...prev, exerciseId]))
    }

    setShowFeedback(prev => ({ ...prev, [exerciseId]: true }))

    // Update progress
    const newCompleted = isCorrect ? completedExercises.size + 1 : completedExercises.size
    const progress = (newCompleted / exercises.length) * 100
    onProgressUpdate(progress)

    if (newCompleted === exercises.length) {
      setTimeout(() => setShowCompletion(true), 2000)
    }
  }

  const renderExercise = (exercise: any) => {
    const userAnswer = answers[exercise.id]
    const isCompleted = completedExercises.has(exercise.id)
    const showFeedbackForThis = showFeedback[exercise.id]

    return (
      <Card key={exercise.id} className={`activity-card ${isCompleted ? 'border-green-200 bg-green-50/30' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                isCompleted ? 'bg-green-500' : 'bg-blue-500'
              }`}>
                {isCompleted ? '✓' : exercise.id}
              </div>
              <span>{exercise.title}</span>
            </span>
            {isCompleted && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Correcto
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg font-medium">
            {exercise.question}
          </div>

          {exercise.context && (
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-800 text-sm">
                <strong>Fórmula:</strong> {exercise.context}
              </p>
            </div>
          )}

          {exercise.hint && !isCompleted && (
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Pista:</strong> {exercise.hint}
              </p>
            </div>
          )}

          {/* Input based on exercise type */}
          {exercise.type === 'slope-calculation' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Tu respuesta:</label>
              <Input
                type="number"
                placeholder="Ingresa la pendiente"
                value={userAnswer || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [exercise.id]: e.target.value }))}
                disabled={isCompleted}
              />
            </div>
          )}

          {exercise.type === 'identify-components' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pendiente (m):</label>
                <Input
                  placeholder="Ej: -3"
                  value={userAnswer?.slope || ''}
                  onChange={(e) => setAnswers(prev => ({ 
                    ...prev, 
                    [exercise.id]: { ...prev[exercise.id], slope: e.target.value }
                  }))}
                  disabled={isCompleted}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Intercepto (b):</label>
                <Input
                  placeholder="Ej: 7"
                  value={userAnswer?.intercept || ''}
                  onChange={(e) => setAnswers(prev => ({ 
                    ...prev, 
                    [exercise.id]: { ...prev[exercise.id], intercept: e.target.value }
                  }))}
                  disabled={isCompleted}
                />
              </div>
            </div>
          )}

          {exercise.type === 'graph-equation' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Encuentra dos puntos que estén en la recta:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Punto 1 (x, y):</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="x"
                      value={userAnswer?.point1?.x || ''}
                      onChange={(e) => setAnswers(prev => ({ 
                        ...prev, 
                        [exercise.id]: { 
                          ...prev[exercise.id], 
                          point1: { ...prev[exercise.id]?.point1, x: e.target.value }
                        }
                      }))}
                      disabled={isCompleted}
                    />
                    <Input
                      placeholder="y"
                      value={userAnswer?.point1?.y || ''}
                      onChange={(e) => setAnswers(prev => ({ 
                        ...prev, 
                        [exercise.id]: { 
                          ...prev[exercise.id], 
                          point1: { ...prev[exercise.id]?.point1, y: e.target.value }
                        }
                      }))}
                      disabled={isCompleted}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Punto 2 (x, y):</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="x"
                      value={userAnswer?.point2?.x || ''}
                      onChange={(e) => setAnswers(prev => ({ 
                        ...prev, 
                        [exercise.id]: { 
                          ...prev[exercise.id], 
                          point2: { ...prev[exercise.id]?.point2, x: e.target.value }
                        }
                      }))}
                      disabled={isCompleted}
                    />
                    <Input
                      placeholder="y"
                      value={userAnswer?.point2?.y || ''}
                      onChange={(e) => setAnswers(prev => ({ 
                        ...prev, 
                        [exercise.id]: { 
                          ...prev[exercise.id], 
                          point2: { ...prev[exercise.id]?.point2, y: e.target.value }
                        }
                      }))}
                      disabled={isCompleted}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {(exercise.type === 'utility-bill' || exercise.type === 'velocity' || exercise.type === 'savings') && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Tu respuesta:</label>
              <Input
                type="number"
                placeholder="Ingresa tu respuesta"
                value={userAnswer || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [exercise.id]: e.target.value }))}
                disabled={isCompleted}
              />
            </div>
          )}

          {/* Feedback */}
          {showFeedbackForThis && (
            <div className={`p-4 rounded-lg ${
              isCompleted ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className={`flex items-start space-x-2 ${
                isCompleted ? 'text-green-800' : 'text-red-800'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                ) : (
                  <X className="w-5 h-5 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">
                    {isCompleted ? '¡Correcto!' : 'Incorrecto. Inténtalo de nuevo.'}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Explicación:</strong> {exercise.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isCompleted && (
            <Button
              onClick={() => handleAnswerSubmit(exercise.id)}
              disabled={!userAnswer || (exercise.type === 'identify-components' && (!userAnswer?.slope || !userAnswer?.intercept))}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Verificar Respuesta
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (showCompletion) {
    const score = Math.round((completedExercises.size / exercises.length) * 100)
    
    return (
      <Card className="activity-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>¡Práctica Completada!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div>
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray={`${score}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{score}%</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">¡Excelente práctica!</h3>
            <p className="text-gray-600">
              Completaste {completedExercises.size} de {exercises.length} ejercicios correctamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800">Habilidades Mejoradas</h4>
              <p className="text-sm text-blue-700">
                {activity.id === 4 ? 'Cálculo de pendientes y graficación' : 'Aplicación a problemas reales'}
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">Listos para Avanzar</h4>
              <p className="text-sm text-green-700">Puedes continuar con la siguiente actividad</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={() => onComplete(score)}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Finalizar Práctica
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                PhET Colorado
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                GeoGebra
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card className="activity-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Ejercicios completados: {completedExercises.size} / {exercises.length}
            </span>
            <Badge variant="outline">
              {Math.round((completedExercises.size / exercises.length) * 100)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Exercises */}
      <div className="space-y-6">
        {exercises.map(renderExercise)}
      </div>

      {/* External Resources */}
      <Card className="activity-card">
        <CardHeader>
          <CardTitle>Recursos Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Simulador PhET</div>
                <div className="text-sm text-gray-600">Graficador interactivo de funciones</div>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
            
            <Button variant="outline" className="h-auto p-4">
              <div className="text-left">
                <div className="font-medium">GeoGebra</div>
                <div className="text-sm text-gray-600">Herramientas matemáticas dinámicas</div>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
