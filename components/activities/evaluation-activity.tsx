
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ClipboardCheck, 
  Timer, 
  AlertCircle, 
  CheckCircle, 
  X,
  RotateCcw,
  TrendingUp,
  Award,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Activity } from '@/lib/activities-data'

interface EvaluationActivityProps {
  activity: Activity
  onProgressUpdate: (progress: number) => void
  onComplete: (score: number) => void
}

// Banco de 45 preguntas para evaluación
const questionBank = [
  // Conceptuales (15 preguntas)
  {
    id: 1, type: 'conceptual',
    question: "¿Cuál es la forma estándar de una función lineal?",
    options: ["y = mx + b", "ax + by = c", "y = x²", "y = 1/x"],
    correct: 0, points: 5
  },
  {
    id: 2, type: 'conceptual',
    question: "En la ecuación y = 3x + 7, ¿qué representa el número 3?",
    options: ["El intercepto", "La pendiente", "La variable independiente", "El punto de corte"],
    correct: 1, points: 5
  },
  {
    id: 3, type: 'conceptual',
    question: "¿Qué indica una pendiente negativa en una función lineal?",
    options: ["La línea es horizontal", "La línea sube hacia la derecha", "La línea baja hacia la derecha", "La línea es vertical"],
    correct: 2, points: 5
  },
  {
    id: 4, type: 'conceptual',
    question: "El intercepto con el eje y es:",
    options: ["El valor de x cuando y = 0", "El valor de y cuando x = 0", "La pendiente de la línea", "El punto más alto de la línea"],
    correct: 1, points: 5
  },
  {
    id: 5, type: 'conceptual',
    question: "Una función lineal representa gráficamente:",
    options: ["Una parábola", "Una línea recta", "Una curva", "Un círculo"],
    correct: 1, points: 5
  },
  {
    id: 16, type: 'conceptual',
    question: "¿Cuál es la pendiente de una línea horizontal?",
    options: ["1", "0", "-1", "Infinito"],
    correct: 1, points: 5
  },
  {
    id: 17, type: 'conceptual',
    question: "Dos líneas paralelas tienen:",
    options: ["La misma pendiente", "Diferentes pendientes", "La misma intersección", "Pendientes opuestas"],
    correct: 0, points: 5
  },
  {
    id: 18, type: 'conceptual',
    question: "Una pendiente de 3/2 significa que:",
    options: ["Sube 3 y avanza 2", "Sube 2 y avanza 3", "Baja 3 y avanza 2", "Es una línea horizontal"],
    correct: 0, points: 5
  },
  {
    id: 19, type: 'conceptual',
    question: "En y = -4x + 1, el intercepto con el eje y es:",
    options: ["-4", "4", "1", "-1"],
    correct: 2, points: 5
  },
  {
    id: 20, type: 'conceptual',
    question: "¿Cuándo una función lineal es creciente?",
    options: ["Cuando m < 0", "Cuando m > 0", "Cuando m = 0", "Cuando b > 0"],
    correct: 1, points: 5
  },
  {
    id: 21, type: 'conceptual',
    question: "¿Qué representa la variable independiente x?",
    options: ["El resultado", "El valor que controlamos", "La pendiente", "El intercepto"],
    correct: 1, points: 5
  },
  {
    id: 22, type: 'conceptual',
    question: "Una función lineal decreciente tiene:",
    options: ["m > 0", "m < 0", "m = 0", "b < 0"],
    correct: 1, points: 5
  },
  {
    id: 23, type: 'conceptual',
    question: "El dominio de una función lineal es:",
    options: ["Solo números positivos", "Solo números enteros", "Todos los números reales", "Solo números entre 0 y 1"],
    correct: 2, points: 5
  },
  {
    id: 24, type: 'conceptual',
    question: "Dos líneas perpendiculares tienen pendientes que:",
    options: ["Son iguales", "Se suman a cero", "Son opuestas", "Se multiplican dando -1"],
    correct: 3, points: 5
  },
  {
    id: 25, type: 'conceptual',
    question: "En y = mx + b, si b = 0, la línea pasa por:",
    options: ["El eje x", "El origen", "El eje y", "El infinito"],
    correct: 1, points: 5
  },

  // Procedimentales (15 preguntas)
  {
    id: 6, type: 'procedural',
    question: "Calcula la pendiente entre los puntos (2,3) y (6,11):",
    options: ["2", "4", "8", "1/2"],
    correct: 0, points: 6
  },
  {
    id: 7, type: 'procedural',
    question: "Si y = -2x + 5, ¿cuál es el valor de y cuando x = 3?",
    options: ["-1", "1", "11", "-11"],
    correct: 0, points: 6
  },
  {
    id: 8, type: 'procedural',
    question: "Convierte 3x + 2y = 12 a la forma y = mx + b:",
    options: ["y = 3x + 6", "y = -3/2x + 6", "y = 2x + 12", "y = -2/3x + 4"],
    correct: 1, points: 6
  },
  {
    id: 9, type: 'procedural',
    question: "¿Cuál es el intercepto con el eje y de la línea 4x - 2y = 8?",
    options: ["4", "-4", "2", "-2"],
    correct: 1, points: 6
  },
  {
    id: 10, type: 'procedural',
    question: "La ecuación de la línea que pasa por (0,3) con pendiente 2 es:",
    options: ["y = 2x + 3", "y = 3x + 2", "y = 2x - 3", "y = -2x + 3"],
    correct: 0, points: 6
  },
  {
    id: 26, type: 'procedural',
    question: "Encuentra la pendiente entre (-1, 4) y (2, -2):",
    options: ["-2", "2", "-6", "6"],
    correct: 0, points: 6
  },
  {
    id: 27, type: 'procedural',
    question: "Si y = 3x - 7, ¿cuál es y cuando x = -2?",
    options: ["-13", "-1", "1", "13"],
    correct: 0, points: 6
  },
  {
    id: 28, type: 'procedural',
    question: "Convierte x - 3y = 9 a la forma pendiente-intercepto:",
    options: ["y = x/3 - 3", "y = 3x - 9", "y = x/3 + 3", "y = -x/3 + 3"],
    correct: 0, points: 6
  },
  {
    id: 29, type: 'procedural',
    question: "¿En qué punto la línea y = 2x - 4 cruza el eje x?",
    options: ["(-4, 0)", "(0, -4)", "(2, 0)", "(0, 2)"],
    correct: 2, points: 6
  },
  {
    id: 30, type: 'procedural',
    question: "La ecuación de la línea que pasa por (1, 5) y (3, 11) es:",
    options: ["y = 3x + 2", "y = 2x + 3", "y = 3x - 2", "y = 6x - 1"],
    correct: 0, points: 6
  },
  {
    id: 31, type: 'procedural',
    question: "Si f(x) = -x + 8, entonces f(5) es:",
    options: ["3", "13", "-3", "-13"],
    correct: 0, points: 6
  },
  {
    id: 32, type: 'procedural',
    question: "¿Cuál es la pendiente de la línea 2x + 5y = 10?",
    options: ["-2/5", "2/5", "-5/2", "5/2"],
    correct: 0, points: 6
  },
  {
    id: 33, type: 'procedural',
    question: "La línea paralela a y = 4x - 1 que pasa por (0, 3) es:",
    options: ["y = 4x + 3", "y = -4x + 3", "y = x + 3", "y = 4x - 3"],
    correct: 0, points: 6
  },
  {
    id: 34, type: 'procedural',
    question: "Si y = mx + 2 pasa por (4, 10), entonces m es:",
    options: ["2", "3", "1", "4"],
    correct: 0, points: 6
  },
  {
    id: 35, type: 'procedural',
    question: "El punto medio entre (2, 3) y (8, 7) es:",
    options: ["(5, 5)", "(6, 4)", "(4, 6)", "(10, 10)"],
    correct: 0, points: 6
  },

  // Aplicación (15 preguntas)
  {
    id: 11, type: 'application',
    question: "Un taxi cobra $5,000 de banderazo + $800 por km. La ecuación del costo total es:",
    options: ["y = 5000x + 800", "y = 800x + 5000", "y = 5800x", "y = 800 + 5000"],
    correct: 1, points: 7
  },
  {
    id: 12, type: 'application',
    question: "Si el costo de luz es y = 450x + 20000, ¿cuánto pagas si no consumes nada?",
    options: ["$450", "$0", "$20,000", "$20,450"],
    correct: 2, points: 7
  },
  {
    id: 13, type: 'application',
    question: "Una piscina se llena a razón de 200 litros por minuto. Si ya tiene 500 litros, después de t minutos tendrá:",
    options: ["200t litros", "500t litros", "200t + 500 litros", "500t + 200 litros"],
    correct: 2, points: 7
  },
  {
    id: 14, type: 'application',
    question: "El precio de un producto era $10,000 y aumenta $500 cada mes. Después de n meses costará:",
    options: ["10000n + 500", "500n + 10000", "10500n", "500 + 10000"],
    correct: 1, points: 7
  },
  {
    id: 15, type: 'application',
    question: "Un auto consume 8 litros por cada 100 km. Para recorrer x kilómetros necesita:",
    options: ["8x litros", "x/8 litros", "8x/100 litros", "800/x litros"],
    correct: 2, points: 7
  },
  {
    id: 36, type: 'application',
    question: "Una empresa cobra $30,000 fijo + $2,000 por hora. Si trabajas h horas, el costo es:",
    options: ["y = 30000h + 2000", "y = 2000h + 30000", "y = 32000h", "y = 30000 + 2000"],
    correct: 1, points: 7
  },
  {
    id: 37, type: 'application',
    question: "Un tanque tiene 1000L y se vacía a 50L/min. Después de t minutos tendrá:",
    options: ["1000 - 50t litros", "50t - 1000 litros", "1000 + 50t litros", "50t litros"],
    correct: 0, points: 7
  },
  {
    id: 38, type: 'application',
    question: "Si ahorras $15,000/mes y ya tienes $50,000, en m meses tendrás:",
    options: ["15000m pesos", "50000m pesos", "15000m + 50000 pesos", "50000 + 15000 pesos"],
    correct: 2, points: 7
  },
  {
    id: 39, type: 'application',
    question: "Un vendedor gana $800,000 fijo + $50,000 por venta. Con v ventas gana:",
    options: ["y = 800000v + 50000", "y = 50000v + 800000", "y = 850000v", "y = 800000 + 50000"],
    correct: 1, points: 7
  },
  {
    id: 40, type: 'application',
    question: "La temperatura baja 3°C cada 1000m de altura. A h metros de altura será:",
    options: ["T = 3h", "T = -3h", "T = T₀ - 3h/1000", "T = T₀ + 3h"],
    correct: 2, points: 7
  },
  {
    id: 41, type: 'application',
    question: "Un plan de internet cobra $25,000 + $100 por GB. Con g GB el costo es:",
    options: ["y = 25000g + 100", "y = 100g + 25000", "y = 25100g", "y = 25000 + 100"],
    correct: 1, points: 7
  },
  {
    id: 42, type: 'application',
    question: "Un resorte mide 10cm y se estira 2cm por cada kg. Con p kg medirá:",
    options: ["L = 10p + 2", "L = 2p + 10", "L = 12p", "L = 10 + 2"],
    correct: 1, points: 7
  },
  {
    id: 43, type: 'application',
    question: "Una vela de 20cm se consume 1.5cm/hora. Después de h horas medirá:",
    options: ["L = 20 - 1.5h", "L = 1.5h - 20", "L = 20 + 1.5h", "L = 1.5h"],
    correct: 0, points: 7
  },
  {
    id: 44, type: 'application',
    question: "Un ascensor sube del piso -2 a razón de 1 piso cada 3 segundos. En t segundos estará en el piso:",
    options: ["P = t/3 - 2", "P = 3t - 2", "P = t - 6", "P = -2 + t/3"],
    correct: 0, points: 7
  },
  {
    id: 45, type: 'application',
    question: "Una bacteria se duplica cada hora. Si empiezas con 100, después de h horas tendrás:",
    options: ["N = 100h", "N = 100 + h", "N = 100 × 2^h", "N = 200h"],
    correct: 2, points: 7
  }
]

// Función para generar 15 preguntas aleatorias
const generateRandomQuestions = () => {
  const conceptual = questionBank.filter(q => q.type === 'conceptual')
  const procedural = questionBank.filter(q => q.type === 'procedural')
  const application = questionBank.filter(q => q.type === 'application')
  
  // Validación de que hay suficientes preguntas de cada tipo
  const minConceptual = Math.min(5, conceptual.length)
  const minProcedural = Math.min(5, procedural.length)
  const minApplication = Math.min(5, application.length)
  
  const selectedQuestions = [
    ...conceptual.sort(() => 0.5 - Math.random()).slice(0, minConceptual),
    ...procedural.sort(() => 0.5 - Math.random()).slice(0, minProcedural),
    ...application.sort(() => 0.5 - Math.random()).slice(0, minApplication)
  ]
  
  // Si no hay exactamente 15 preguntas, completar con preguntas adicionales
  if (selectedQuestions.length < 15) {
    const remaining = questionBank.filter(q => !selectedQuestions.some(sq => sq.id === q.id))
    const additionalNeeded = 15 - selectedQuestions.length
    selectedQuestions.push(...remaining.sort(() => 0.5 - Math.random()).slice(0, additionalNeeded))
  }
  
  return selectedQuestions.sort(() => 0.5 - Math.random())
}

export function EvaluationActivity({ activity, onProgressUpdate, onComplete }: EvaluationActivityProps) {
  const [questions] = useState(() => {
    const generatedQuestions = generateRandomQuestions()
    console.log('Preguntas generadas:', generatedQuestions.length, generatedQuestions)
    return generatedQuestions
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(15).fill(null))
  const [timeLeft, setTimeLeft] = useState(40 * 60) // 40 minutos
  const [showResults, setShowResults] = useState(false)
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem('evaluation_attempts')
    return saved ? parseInt(saved) : 0
  })
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleFinishEvaluation()
    }
  }, [timeLeft, isStarted, showResults])

  const startEvaluation = () => {
    setIsStarted(true)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    localStorage.setItem('evaluation_attempts', newAttempts.toString())
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleFinishEvaluation = () => {
    // Validar que todas las preguntas estén respondidas
    const unansweredCount = answers.filter(a => a === null).length
    if (unansweredCount > 0) {
      alert(`Por favor responde todas las preguntas. Faltan ${unansweredCount} preguntas.`)
      return
    }
    
    // Validar que hay exactamente 15 preguntas
    if (questions.length !== 15) {
      console.error('Error: No hay exactamente 15 preguntas generadas:', questions.length)
      alert('Error en la evaluación. Por favor contacta al profesor.')
      return
    }
    
    setShowResults(true)
    
    // Calcular puntuación con validación
    let totalScore = 0
    const maxPoints = questions.reduce((sum, q) => sum + q.points, 0)
    
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        totalScore += question.points
      }
    })
    
    const percentage = Math.round((totalScore / maxPoints) * 100)
    onProgressUpdate(100)
    
    // Guardar resultado con manejo de errores
    try {
      const result = {
        score: percentage,
        totalScore,
        maxPoints,
        attempt: attempts,
        date: new Date().toISOString(),
        timeUsed: 40 * 60 - timeLeft,
        questionsAnswered: questions.length,
        correctAnswers: questions.filter((q, i) => answers[i] === q.correct).length
      }
      
      const savedResults = JSON.parse(localStorage.getItem('evaluation_results') || '[]')
      savedResults.push(result)
      localStorage.setItem('evaluation_results', JSON.stringify(savedResults))
      
      console.log('Evaluación completada:', result)
    } catch (error) {
      console.error('Error guardando resultados:', error)
    }
    
    setTimeout(() => onComplete(percentage), 3000)
  }

  const calculateScore = () => {
    let totalScore = 0
    const maxPoints = questions.reduce((sum, q) => sum + q.points, 0)
    
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        totalScore += question.points
      }
    })
    return Math.round((totalScore / maxPoints) * 100)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (attempts >= 3) {
    return (
      <Card className="activity-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <span>Límite de Intentos Alcanzado</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Has utilizado los 3 intentos permitidos para esta evaluación. 
              Contacta a tu profesor para revisar tu progreso.
            </AlertDescription>
          </Alert>
          
          <div className="text-center">
            <Button onClick={() => onComplete(0)} variant="outline">
              Continuar al Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isStarted) {
    return (
      <Card className="activity-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ClipboardCheck className="w-6 h-6 text-blue-600" />
            <span>Evaluación de Función Lineal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">¡Es hora de demostrar lo que has aprendido!</h3>
            <p className="text-gray-600">
              Esta evaluación consta de 15 preguntas sobre función lineal. 
              Tendrás 40 minutos para completarla.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Instrucciones:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Lee cada pregunta cuidadosamente</li>
                <li>• Puedes navegar entre preguntas</li>
                <li>• Puedes cambiar tus respuestas antes de finalizar</li>
                <li>• Al finalizar el tiempo, se envía automáticamente</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Detalles:</h4>
              <div className="text-sm space-y-2">
                <div className="flex items-center">
                  <Timer className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Tiempo límite: 40 minutos</span>
                </div>
                <div className="flex items-center">
                  <ClipboardCheck className="w-4 h-4 mr-2 text-green-500" />
                  <span>15 preguntas</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Puntaje mínimo: 70/100</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-4 h-4 mr-2 text-purple-500" />
                  <span>Intento {attempts + 1} de 3</span>
                </div>
              </div>
            </div>
          </div>
          
          {attempts > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Este es tu intento número {attempts + 1}. 
                {attempts === 2 && " ¡Es tu último intento!"}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="text-center">
            <Button 
              onClick={startEvaluation}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Comenzar Evaluación
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    const finalScore = calculateScore()
    const passed = finalScore >= 70
    
    return (
      <Card className="activity-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            {passed ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <X className="w-8 h-8 text-red-500" />
            )}
            <span>Evaluación Completada</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(finalScore)}`}>
              {finalScore}
            </div>
            <p className="text-gray-600">de 100 puntos</p>
            <Badge className={`mt-2 ${passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {passed ? '¡APROBADO!' : 'No Aprobado'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Respuestas Correctas</h4>
              <p className="text-2xl font-bold text-blue-600">
                {answers.filter((answer, index) => answer === questions[index].correct).length}/15
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <Timer className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold">Tiempo Usado</h4>
              <p className="text-2xl font-bold text-purple-600">
                {Math.floor((40 * 60 - timeLeft) / 60)} min
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-semibold">Intento</h4>
              <p className="text-2xl font-bold text-orange-600">
                {attempts}/3
              </p>
            </div>
          </div>
          
          {!passed && attempts < 3 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No alcanzaste el puntaje mínimo de 70 puntos. 
                Puedes intentar nuevamente después de revisar los temas.
              </AlertDescription>
            </Alert>
          )}
          
          {passed && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-green-600 mb-2">¡Felicitaciones!</h3>
              <p className="text-gray-600">
                Has demostrado un excelente dominio de la función lineal. 
                ¡Continúa con la siguiente actividad!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Evaluation in progress
  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="activity-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">
                Evaluación
              </Badge>
              <Badge variant="outline">
                Pregunta {currentQuestion + 1} de {questions.length}
              </Badge>
              <Badge variant="outline" className={question.type === 'conceptual' ? 'border-green-500' : question.type === 'procedural' ? 'border-blue-500' : 'border-purple-500'}>
                {question.type === 'conceptual' ? 'Conceptual' : question.type === 'procedural' ? 'Procedimental' : 'Aplicación'} - {question.points}pts
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="font-semibold">
                  Respondidas: {answers.filter(a => a !== null).length}/15
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Timer className="w-4 h-4 mr-1" />
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="activity-card">
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant={answers[currentQuestion] === index ? "default" : "outline"}
                className={`h-auto p-4 text-left justify-start ${
                  answers[currentQuestion] === index ? "bg-blue-600 hover:bg-blue-700" : ""
                }`}
              >
                <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
                {answers[currentQuestion] === index && (
                  <CheckCircle className="w-4 h-4 ml-auto" />
                )}
              </Button>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Anterior
            </Button>
            
            <div className="flex space-x-2">
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={nextQuestion}>
                  Siguiente
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={handleFinishEvaluation}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={answers.filter(a => a !== null).length < questions.length}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Finalizar Evaluación
                  </Button>
                  {answers.filter(a => a !== null).length < questions.length && (
                    <p className="text-sm text-red-600 text-center">
                      Responde todas las preguntas para finalizar ({answers.filter(a => a !== null).length}/15)
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Navigator */}
      <Card className="activity-card">
        <CardHeader>
          <CardTitle className="text-lg">Navegador de Preguntas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                size="sm"
                variant={currentQuestion === index ? "default" : "outline"}
                className={`${
                  answers[index] !== null ? 'bg-green-100 border-green-300' : ''
                }`}
              >
                {index + 1}
                {answers[index] !== null && (
                  <CheckCircle className="w-3 h-3 ml-1" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
