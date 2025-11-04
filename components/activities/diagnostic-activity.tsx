
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, X, Calculator, Grid, TrendingUp, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Activity } from '@/lib/activities-data'
import Image from 'next/image'

interface DiagnosticActivityProps {
  activity: Activity
  onProgressUpdate: (progress: number) => void
  onComplete: (score: number) => void
}

const diagnosticQuestions = [
  {
    id: 1,
    category: 'Plano Cartesiano',
    icon: <Grid className="w-5 h-5" />,
    question: '¿Cuál es la coordenada del punto A en la gráfica?',
    image: 'https://cdn.abacus.ai/images/c84f3b3e-f62c-446e-b487-0f8187b578a9.png',
    options: [
      { id: 'a', text: '(2, 3)' },
      { id: 'b', text: '(3, 2)' },
      { id: 'c', text: '(-2, 3)' },
      { id: 'd', text: '(2, -3)' }
    ],
    correct: 'a',
    explanation: 'En el plano cartesiano, primero se lee la coordenada x (horizontal) y luego la y (vertical).'
  },
  {
    id: 2,
    category: 'Proporcionalidad',
    icon: <TrendingUp className="w-5 h-5" />,
    question: 'Si 3 cuadernos cuestan $9.000, ¿cuánto costarán 5 cuadernos?',
    options: [
      { id: 'a', text: '$12.000' },
      { id: 'b', text: '$15.000' },
      { id: 'c', text: '$18.000' },
      { id: 'd', text: '$21.000' }
    ],
    correct: 'b',
    explanation: 'Es una proporción directa: 3/9000 = 5/x. Resolviendo: x = 15.000'
  },
  {
    id: 3,
    category: 'Patrones',
    icon: <Calculator className="w-5 h-5" />,
    question: 'En la secuencia 2, 5, 8, 11, ... ¿cuál es el siguiente número?',
    options: [
      { id: 'a', text: '13' },
      { id: 'b', text: '14' },
      { id: 'c', text: '15' },
      { id: 'd', text: '16' }
    ],
    correct: 'b',
    explanation: 'La secuencia aumenta de 3 en 3: 2+3=5, 5+3=8, 8+3=11, 11+3=14'
  },
  {
    id: 4,
    category: 'Gráficas',
    icon: <Grid className="w-5 h-5" />,
    question: '¿Qué representa el eje horizontal (x) en una gráfica?',
    options: [
      { id: 'a', text: 'La variable dependiente' },
      { id: 'b', text: 'La variable independiente' },
      { id: 'c', text: 'El resultado' },
      { id: 'd', text: 'El error' }
    ],
    correct: 'b',
    explanation: 'El eje x representa la variable independiente, la que controlamos o cambiamos.'
  },
  {
    id: 5,
    category: 'Cálculo Básico',
    icon: <Calculator className="w-5 h-5" />,
    question: 'Si y = 2x, ¿cuál es el valor de y cuando x = 4?',
    options: [
      { id: 'a', text: '6' },
      { id: 'b', text: '8' },
      { id: 'c', text: '10' },
      { id: 'd', text: '12' }
    ],
    correct: 'b',
    explanation: 'Sustituimos x = 4 en la ecuación: y = 2(4) = 8'
  },
  {
    id: 6,
    category: 'Operaciones Básicas',
    icon: <Calculator className="w-5 h-5" />,
    question: '¿Cuánto es (-3) × (+4)?',
    options: [
      { id: 'a', text: '-12' },
      { id: 'b', text: '12' },
      { id: 'c', text: '-7' },
      { id: 'd', text: '7' }
    ],
    correct: 'a',
    explanation: 'Al multiplicar signos diferentes, el resultado es negativo: (-3) × (+4) = -12'
  },
  {
    id: 7,
    category: 'Fracciones',
    icon: <Calculator className="w-5 h-5" />,
    question: '¿Cuál es el resultado de 1/2 + 1/4?',
    options: [
      { id: 'a', text: '2/6' },
      { id: 'b', text: '3/4' },
      { id: 'c', text: '1/6' },
      { id: 'd', text: '2/4' }
    ],
    correct: 'b',
    explanation: 'Convertimos a común denominador: 2/4 + 1/4 = 3/4'
  },
  {
    id: 8,
    category: 'Ecuaciones Simples',
    icon: <Calculator className="w-5 h-5" />,
    question: 'Si x + 5 = 12, ¿cuánto vale x?',
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '17' },
      { id: 'c', text: '6' },
      { id: 'd', text: '8' }
    ],
    correct: 'a',
    explanation: 'Despejamos x: x = 12 - 5 = 7'
  },
  {
    id: 9,
    category: 'Plano Cartesiano',
    icon: <Grid className="w-5 h-5" />,
    question: '¿En qué cuadrante se encuentra el punto (-3, 4)?',
    options: [
      { id: 'a', text: 'Cuadrante I' },
      { id: 'b', text: 'Cuadrante II' },
      { id: 'c', text: 'Cuadrante III' },
      { id: 'd', text: 'Cuadrante IV' }
    ],
    correct: 'b',
    explanation: 'El Cuadrante II tiene x negativa y y positiva: (-3, 4)'
  },
  {
    id: 10,
    category: 'Proporcionalidad',
    icon: <TrendingUp className="w-5 h-5" />,
    question: 'Si un auto recorre 120 km en 2 horas, ¿cuántos kilómetros recorrerá en 5 horas a la misma velocidad?',
    options: [
      { id: 'a', text: '240 km' },
      { id: 'b', text: '300 km' },
      { id: 'c', text: '360 km' },
      { id: 'd', text: '480 km' }
    ],
    correct: 'b',
    explanation: 'Velocidad = 120/2 = 60 km/h. En 5 horas: 60 × 5 = 300 km'
  }
]

export function DiagnosticActivity({ activity, onProgressUpdate, onComplete }: DiagnosticActivityProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      const progress = ((currentQuestion + 1) / diagnosticQuestions.length) * 100
      onProgressUpdate(progress)
    } else {
      calculateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    let correctAnswers = 0
    diagnosticQuestions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correctAnswers++
      }
    })
    
    const finalScore = Math.round((correctAnswers / diagnosticQuestions.length) * 100)
    setScore(finalScore)
    setShowResults(true)
    onProgressUpdate(100)
  }

  const finishActivity = () => {
    onComplete(score)
  }

  const question = diagnosticQuestions[currentQuestion]
  const currentAnswer = answers[question.id]
  const progress = (currentQuestion / diagnosticQuestions.length) * 100

  if (showResults) {
    return (
      <Card className="activity-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>Diagnóstico Completado</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray={`${score}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{score}%</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">
              {score >= 80 ? '¡Excelente!' : 
               score >= 60 ? '¡Buen trabajo!' : 
               score >= 40 ? 'Necesitas repasar algunos conceptos' :
               'Te recomendamos revisar los conceptos básicos'}
            </h3>
            
            <p className="text-gray-600">
              Respondiste correctamente {diagnosticQuestions.filter(q => answers[q.id] === q.correct).length} de {diagnosticQuestions.length} preguntas
            </p>
          </div>

          {/* Results by Category */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resultados por Área:</h4>
            {diagnosticQuestions.map(question => {
              const isCorrect = answers[question.id] === question.correct
              return (
                <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{question.category}</p>
                      <p className="text-xs text-gray-600">{question.question}</p>
                    </div>
                  </div>
                  {!isCorrect && (
                    <div className="text-xs text-gray-500 max-w-xs">
                      <strong>Respuesta correcta:</strong> {question.options.find(opt => opt.id === question.correct)?.text}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Recomendaciones:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              {score >= 80 && (
                <li>• ¡Estás muy bien preparado! Continúa con las siguientes actividades.</li>
              )}
              {score < 80 && score >= 60 && (
                <>
                  <li>• Repasa los conceptos básicos del plano cartesiano</li>
                  <li>• Practica más ejercicios de proporcionalidad</li>
                </>
              )}
              {score < 60 && (
                <>
                  <li>• Es importante que repases matemáticas básicas antes de continuar</li>
                  <li>• Pide ayuda al tutor IA para resolver dudas específicas</li>
                  <li>• Dedica más tiempo a entender cada concepto</li>
                </>
              )}
              <li>• Usa el chat de IA para hacer preguntas sobre cualquier tema</li>
            </ul>
          </div>

          <div className="text-center">
            <Button 
              onClick={finishActivity}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Continuar a la Siguiente Actividad
            </Button>
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
              Pregunta {currentQuestion + 1} de {diagnosticQuestions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <Card className="activity-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {question.icon}
              <span>{question.category}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium">
              {question.question}
            </div>

            {question.image && (
              <div className="text-center">
                <div className="w-80 h-60 mx-auto relative bg-white rounded-lg border shadow-sm overflow-hidden">
                  <Image
                    src={question.image}
                    alt="Plano cartesiano con el punto A marcado en las coordenadas (2, 3)"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Observa la gráfica y identifica las coordenadas del punto A
                </p>
              </div>
            )}

            <RadioGroup
              value={currentAnswer}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label 
                      htmlFor={option.id} 
                      className="flex-1 cursor-pointer p-3 rounded border hover:bg-gray-50"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                Anterior
              </Button>
              
              <Button
                onClick={nextQuestion}
                disabled={!currentAnswer}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {currentQuestion === diagnosticQuestions.length - 1 ? 'Ver Resultados' : 'Siguiente'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
