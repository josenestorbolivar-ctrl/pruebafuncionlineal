
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  CheckCircle, 
  TrendingUp, 
  Target, 
  BookOpen,
  Award,
  RefreshCw,
  MessageSquare,
  Star,
  Download,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity } from '@/lib/activities-data'

interface ReflectionActivityProps {
  activity: Activity
  onProgressUpdate: (progress: number) => void
  onComplete: (score: number) => void
}

const reflectionQuestions = {
  feedback: [
    {
      id: 'errors',
      title: 'Análisis de Errores',
      questions: [
        '¿Cuáles fueron los conceptos más difíciles de entender?',
        '¿En qué tipo de problemas cometiste más errores?',
        '¿Qué estrategias usaste para superar las dificultades?'
      ]
    },
    {
      id: 'strengths',
      title: 'Fortalezas Identificadas',
      questions: [
        '¿Qué conceptos dominas mejor?',
        '¿En qué tipo de actividades te sentiste más cómodo?',
        '¿Cuáles fueron tus mejores logros en este módulo?'
      ]
    },
    {
      id: 'improvement',
      title: 'Plan de Mejoramiento',
      questions: [
        '¿Qué temas necesitas reforzar más?',
        '¿Qué recursos adicionales te serían útiles?',
        '¿Cómo planeas seguir practicando estos conceptos?'
      ]
    }
  ],
  selfEvaluation: [
    {
      id: 'learning',
      title: 'Proceso de Aprendizaje',
      questions: [
        '¿Qué esperabas aprender al inicio de este módulo?',
        '¿Qué aprendiste realmente?',
        '¿Cómo ha cambiado tu comprensión de las funciones lineales?'
      ]
    },
    {
      id: 'strategies',
      title: 'Estrategias de Estudio',
      questions: [
        '¿Qué métodos de estudio te funcionaron mejor?',
        '¿Cuándo te sentías más motivado para aprender?',
        '¿Qué cambiarías en tu forma de estudiar?'
      ]
    },
    {
      id: 'application',
      title: 'Aplicación del Conocimiento',
      questions: [
        '¿Cómo puedes aplicar las funciones lineales en tu vida diaria?',
        '¿En qué situaciones reales has visto estos conceptos?',
        '¿Qué te gustaría aprender después de esto?'
      ]
    }
  ]
}

export function ReflectionActivity({ activity, onProgressUpdate, onComplete }: ReflectionActivityProps) {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentTab, setCurrentTab] = useState('feedback')
  const [showCertificate, setShowCertificate] = useState(false)

  const isActivityType9 = activity.id === 9 // Retroalimentación
  const currentQuestions = isActivityType9 ? reflectionQuestions.feedback : reflectionQuestions.selfEvaluation

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]))
    
    const progress = ((completedSections.size + 1) / currentQuestions.length) * 100
    onProgressUpdate(progress)
    
    if (completedSections.size + 1 === currentQuestions.length) {
      setShowCertificate(true)
      setTimeout(() => onComplete(95), 2000)
    }
  }

  const getAllResponses = () => {
    return Object.entries(responses).filter(([_, value]) => value.trim().length > 0).length
  }

  const getTotalQuestions = () => {
    return currentQuestions.reduce((total, section) => total + section.questions.length, 0)
  }

  const getEvaluationResults = () => {
    // Simular resultados de evaluación guardados
    const savedResults = JSON.parse(localStorage.getItem('evaluation_results') || '[]')
    return savedResults[savedResults.length - 1] || { score: 0, attempt: 1 }
  }

  if (showCertificate && activity.id === 10) {
    return (
      <Card className="activity-card">
        <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Award className="w-8 h-8" />
            <span>¡Certificado de Completión!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="text-center border-4 border-purple-200 p-8 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="text-4xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-purple-800 mb-2">Certificado de Completión</h2>
            <h3 className="text-xl font-semibold mb-4">Función Lineal - Matemáticas 8° Grado</h3>
            
            <div className="my-6">
              <p className="text-lg">Se certifica que</p>
              <p className="text-2xl font-bold text-blue-700 my-2">ESTUDIANTE</p>
              <p className="text-lg">ha completado exitosamente el módulo de</p>
              <p className="text-xl font-semibold text-purple-700">FUNCIÓN LINEAL</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">10</div>
                <div className="text-sm text-gray-600">Actividades Completadas</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{getEvaluationResults().score}</div>
                <div className="text-sm text-gray-600">Puntuación Final</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-gray-600">Progreso</div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600 mt-6">
              <p>Fecha: {new Date().toLocaleDateString('es-CO')}</p>
              <p>Aplicación Educativa de Matemáticas</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Download className="w-4 h-4 mr-2" />
              Descargar Certificado
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (completedSections.size === currentQuestions.length && !showCertificate) {
    return (
      <Card className="activity-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span>
              {isActivityType9 ? '¡Retroalimentación Completada!' : '¡Reflexión Completada!'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">¡Excelente trabajo de reflexión!</h3>
            <p className="text-gray-600">
              {isActivityType9 
                ? 'Has analizado tu desempeño y creado un plan de mejoramiento personalizado.'
                : 'Has reflexionado profundamente sobre tu proceso de aprendizaje.'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800">Metacognición</h4>
              <p className="text-sm text-blue-700">Desarrollaste consciencia sobre tu aprendizaje</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">Metas Claras</h4>
              <p className="text-sm text-green-700">Estableciste objetivos de mejora</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-800">Crecimiento</h4>
              <p className="text-sm text-purple-700">Identificaste tu progreso y potencial</p>
            </div>
          </div>
          
          {isActivityType9 && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📚 Recursos Recomendados para Reforzar:</h4>
              <ul className="text-sm text-left space-y-1">
                <li>• <strong>Videos:</strong> Revisa los conceptos que más se te dificultaron</li>
                <li>• <strong>Simulador PhET:</strong> Practica graficando más funciones</li>
                <li>• <strong>GeoGebra:</strong> Explora diferentes tipos de funciones</li>
                <li>• <strong>Tutor IA:</strong> Haz preguntas específicas sobre tus dudas</li>
              </ul>
            </div>
          )}
          
          {!isActivityType9 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Para seguir aprendiendo:</h4>
              <ul className="text-sm text-left space-y-1">
                <li>• Explora funciones cuadráticas como siguiente paso</li>
                <li>• Aplica funciones lineales en proyectos personales</li>
                <li>• Ayuda a otros estudiantes con estos conceptos</li>
                <li>• Busca aplicaciones en tu área de interés</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="activity-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              {activity.title}
            </h3>
            <Badge variant="outline">
              {getAllResponses()} / {getTotalQuestions()} respuestas
            </Badge>
          </div>
          
          <Progress 
            value={(completedSections.size / currentQuestions.length) * 100} 
            className="h-2"
          />
          
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600">
              Secciones completadas: {completedSections.size} / {currentQuestions.length}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Activity 9 - Retroalimentación de Evaluación */}
      {isActivityType9 && (
        <Card className="activity-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Resultados de tu Evaluación</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{getEvaluationResults().score}%</div>
                <p className="text-sm text-blue-700">Puntuación Final</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {getEvaluationResults().score >= 70 ? 'APROBADO' : 'NO APROBADO'}
                </div>
                <p className="text-sm text-green-700">Estado</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{getEvaluationResults().attempt}</div>
                <p className="text-sm text-purple-700">Intento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reflection Sections */}
      <div className="space-y-6">
        {currentQuestions.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <Card className={`activity-card ${completedSections.has(section.id) ? 'border-green-200 bg-green-50/30' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    {section.id === 'errors' && <RefreshCw className="w-5 h-5 text-red-600" />}
                    {section.id === 'strengths' && <Star className="w-5 h-5 text-yellow-600" />}
                    {section.id === 'improvement' && <Target className="w-5 h-5 text-blue-600" />}
                    {section.id === 'learning' && <BookOpen className="w-5 h-5 text-purple-600" />}
                    {section.id === 'strategies' && <Brain className="w-5 h-5 text-green-600" />}
                    {section.id === 'application' && <TrendingUp className="w-5 h-5 text-blue-600" />}
                    <span>{section.title}</span>
                  </span>
                  {completedSections.has(section.id) && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completada
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="space-y-2">
                    <label className="block text-sm font-medium">
                      {questionIndex + 1}. {question}
                    </label>
                    <Textarea 
                      placeholder="Escribe tu reflexión aquí..."
                      value={responses[`${section.id}_${questionIndex}`] || ''}
                      onChange={(e) => handleResponseChange(`${section.id}_${questionIndex}`, e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                ))}
                
                {!completedSections.has(section.id) && (
                  <Button 
                    onClick={() => handleSectionComplete(section.id)}
                    disabled={section.questions.some((_, i) => !responses[`${section.id}_${i}`]?.trim())}
                    className="w-full mt-4"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completar {section.title}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      {completedSections.size === currentQuestions.length && (
        <Card className="activity-card">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold mb-4">
              ¡Has completado tu {isActivityType9 ? 'retroalimentación' : 'reflexión'}!
            </h3>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => {
                  if (activity.id === 10) {
                    setShowCertificate(true)
                  }
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {activity.id === 10 ? (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Ver Certificado
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Finalizar
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
