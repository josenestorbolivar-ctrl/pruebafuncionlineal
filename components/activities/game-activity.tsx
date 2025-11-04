
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Trophy, 
  Target, 
  Timer, 
  CheckCircle, 
  Star,
  RotateCcw,
  ArrowRight,
  Zap,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Activity } from '@/lib/activities-data'

interface GameActivityProps {
  activity: Activity
  onProgressUpdate: (progress: number) => void
  onComplete: (score: number) => void
}

const games = {
  detective: {
    title: "Detective de Pendientes",
    description: "Identifica las pendientes correctas de diferentes líneas",
    questions: [
      {
        id: 1,
        question: "¿Cuál es la pendiente de la línea que pasa por los puntos (0,2) y (3,8)?",
        options: ["2", "3", "6", "1/2"],
        correct: 0,
        explanation: "m = (8-2)/(3-0) = 6/3 = 2"
      },
      {
        id: 2,
        question: "Una línea tiene ecuación y = -3x + 5. ¿Cuál es su pendiente?",
        options: ["-3", "3", "5", "-5"],
        correct: 0,
        explanation: "En y = mx + b, la pendiente es m = -3"
      },
      {
        id: 3,
        question: "Si una línea sube 4 unidades por cada 2 unidades horizontales, ¿cuál es su pendiente?",
        options: ["1/2", "2", "4", "6"],
        correct: 1,
        explanation: "Pendiente = subida/avance = 4/2 = 2"
      },
      {
        id: 4,
        question: "¿Qué pendiente tiene una línea horizontal?",
        options: ["1", "0", "∞", "No tiene"],
        correct: 1,
        explanation: "Las líneas horizontales no suben ni bajan, por lo tanto m = 0"
      },
      {
        id: 5,
        question: "La ecuación 2x + 3y = 6 en forma y = mx + b es:",
        options: ["y = 2x + 6", "y = -2/3x + 2", "y = 3x + 2", "y = -3/2x + 6"],
        correct: 1,
        explanation: "3y = -2x + 6 → y = -2/3x + 2"
      }
    ]
  },
  race: {
    title: "Carrera de Funciones",
    description: "Grafica funciones rápidamente y compite contra el tiempo",
    challenges: [
      {
        id: 1,
        function: "y = 2x + 1",
        points: [{x: 0, y: 1}, {x: 1, y: 3}, {x: 2, y: 5}],
        description: "Grafica la función y = 2x + 1"
      },
      {
        id: 2,
        function: "y = -x + 4",
        points: [{x: 0, y: 4}, {x: 2, y: 2}, {x: 4, y: 0}],
        description: "Grafica la función y = -x + 4"
      },
      {
        id: 3,
        function: "y = 1/2x - 1",
        points: [{x: 0, y: -1}, {x: 2, y: 0}, {x: 4, y: 1}],
        description: "Grafica la función y = ½x - 1"
      }
    ]
  }
}

export function GameActivity({ activity, onProgressUpdate, onComplete }: GameActivityProps) {
  const [selectedGame, setSelectedGame] = useState<'detective' | 'race' | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameCompleted) {
      handleGameEnd()
    }
  }, [timeLeft, gameStarted, gameCompleted])

  const startGame = (game: 'detective' | 'race') => {
    setSelectedGame(game)
    setCurrentQuestion(0)
    setScore(0)
    setGameCompleted(false)
    setGameStarted(true)
    setTimeLeft(game === 'detective' ? 300 : 180) // 5 min detective, 3 min race
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (selectedGame === 'detective') {
      const question = games.detective.questions[currentQuestion]
      if (answerIndex === question.correct) {
        setScore(prev => prev + 20)
      }
    }

    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const nextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    
    if (selectedGame === 'detective') {
      if (currentQuestion < games.detective.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        handleGameEnd()
      }
    }
  }

  const handleGameEnd = () => {
    setGameCompleted(true)
    setGameStarted(false)
    const finalScore = Math.max(60, score + (timeLeft > 0 ? 10 : 0))
    onProgressUpdate(100)
    setTimeout(() => onComplete(finalScore), 2000)
  }

  if (!selectedGame) {
    return (
      <div className="space-y-6">
        {/* Interactive HTML Games Section */}
        <Card className="activity-card border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-700">
              <Play className="w-6 h-6" />
              <span>Juegos Interactivos H5P</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-purple-700 mb-4">
              Practica los conceptos de función lineal con estos juegos interactivos. ¡Haz clic para abrir cada juego en una nueva pestaña!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Crucigrama */}
              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer bg-white">
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">📝</div>
                    <h4 className="font-bold text-purple-700">Crucigrama</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Resuelve el crucigrama con conceptos de función lineal
                  </p>
                  <Button 
                    onClick={() => window.open('/games/CONCEPTOS_DE_FUNCION_Crucigrama_HTML.html', '_blank')}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Jugar Ahora
                  </Button>
                </CardContent>
              </Card>

              {/* Arrastrar y Soltar */}
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer bg-white">
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">🎯</div>
                    <h4 className="font-bold text-blue-700">Arrastrar y Soltar</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Arrastra las palabras a las casillas correspondientes
                  </p>
                  <Button 
                    onClick={() => window.open('/games/CONCEPTOS_DE_FUNCION_Arrastrar_y_soltar_HTML.html', '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Jugar Ahora
                  </Button>
                </CardContent>
              </Card>
              
              {/* Sopa de Letras */}
              <Card className="border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer bg-white">
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">🔤</div>
                    <h4 className="font-bold text-green-700">Sopa de Letras</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Encuentra las palabras clave sobre función lineal
                  </p>
                  <Button 
                    onClick={() => window.open('/games/CONCEPTOS_DE_FUNCION_Sopa_de_letras_HTML.html', '_blank')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Jugar Ahora
                  </Button>
                </CardContent>
              </Card>

              {/* Tarjetas de Memoria */}
              <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all cursor-pointer bg-white">
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">🃏</div>
                    <h4 className="font-bold text-pink-700">Tarjetas de Memoria</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Aprende y memoriza conceptos clave de función lineal
                  </p>
                  <Button 
                    onClick={() => window.open('/games/FUNCION_LINEAL_Tarjetas_de_memoria_HTML.html', '_blank')}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Jugar Ahora
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-4 p-3 bg-purple-100 rounded-lg">
              <p className="text-sm text-purple-800 text-center">
                💡 <strong>Tip:</strong> Completa los 4 juegos interactivos para dominar el vocabulario y conceptos de funciones lineales.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="activity-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <span>Juegos Matemáticos Interactivos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              ¡Continúa la diversión! Elige uno de los juegos desafiantes para practicar 
              tus conocimientos sobre función lineal de manera competitiva.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Detective Game */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer border-2 border-blue-200 hover:border-blue-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-700">
                      <Target className="w-5 h-5" />
                      <span>{games.detective.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{games.detective.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Timer className="w-4 h-4 mr-2 text-blue-500" />
                        <span>5 minutos</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                        <span>5 preguntas</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Star className="w-4 h-4 mr-2 text-purple-500" />
                        <span>20 puntos por respuesta correcta</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => startGame('detective')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Jugar Detective
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Race Game */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer border-2 border-green-200 hover:border-green-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-700">
                      <Zap className="w-5 h-5" />
                      <span>{games.race.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{games.race.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Timer className="w-4 h-4 mr-2 text-green-500" />
                        <span>3 minutos</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Target className="w-4 h-4 mr-2 text-yellow-500" />
                        <span>3 desafíos de graficación</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Award className="w-4 h-4 mr-2 text-purple-500" />
                        <span>Puntos por velocidad</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => startGame('race')}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Carrera
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameCompleted) {
    return (
      <Card className="activity-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span>¡Juego Completado!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">{score}</div>
            <p className="text-gray-600">Puntos Obtenidos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-blue-800">Precisión</h4>
              <p className="text-sm text-blue-700">
                {selectedGame === 'detective' ? 
                  `${Math.round((score / 100) * 100)}%` : 
                  'Excelente'
                }
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-green-800">Velocidad</h4>
              <p className="text-sm text-green-700">
                {timeLeft > 0 ? 'Rápido' : 'Completado'}
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-semibold text-purple-800">Rango</h4>
              <p className="text-sm text-purple-700">
                {score >= 80 ? 'Experto' : score >= 60 ? 'Avanzado' : 'Principiante'}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => {
                setSelectedGame(null)
                setCurrentQuestion(0)
                setScore(0)
                setGameCompleted(false)
              }}
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Jugar Otro
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Detective Game UI
  if (selectedGame === 'detective') {
    const question = games.detective.questions[currentQuestion]
    
    return (
      <div className="space-y-6">
        {/* Game Header */}
        <Card className="activity-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className="bg-blue-100 text-blue-800">
                  <Target className="w-3 h-3 mr-1" />
                  Detective de Pendientes
                </Badge>
                <Badge variant="outline">
                  Pregunta {currentQuestion + 1} de {games.detective.questions.length}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="font-semibold">Puntos: {score}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Timer className="w-4 h-4 mr-1" />
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
            
            <Progress 
              value={(currentQuestion / games.detective.questions.length) * 100} 
              className="h-2 mt-3"
            />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="activity-card">
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  variant={
                    selectedAnswer === index 
                      ? (index === question.correct ? "default" : "destructive")
                      : selectedAnswer !== null && index === question.correct
                      ? "default"
                      : "outline"
                  }
                  className={`h-auto p-4 text-left justify-start ${
                    selectedAnswer === index 
                      ? (index === question.correct 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "bg-red-600 hover:bg-red-700")
                      : selectedAnswer !== null && index === question.correct
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }`}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                  {selectedAnswer === index && index === question.correct && (
                    <CheckCircle className="w-4 h-4 ml-2" />
                  )}
                </Button>
              ))}
            </div>
            
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 rounded-lg border"
              >
                <h4 className="font-semibold mb-2">Explicación:</h4>
                <p className="text-sm text-gray-700">{question.explanation}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Race Game UI (simplified for now)
  return (
    <Card className="activity-card">
      <CardContent className="p-8 text-center">
        <Zap className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Carrera de Funciones</h3>
        <p className="text-gray-600 mb-4">
          ¡Próximamente! Este juego estará disponible en la siguiente actualización.
        </p>
        <Button onClick={() => handleGameEnd()}>
          Completar Actividad
        </Button>
      </CardContent>
    </Card>
  )
}
