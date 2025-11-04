
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Play, ChevronRight, CheckCircle, ExternalLink, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity } from '@/lib/activities-data'

interface LearningActivityProps {
  activity: Activity
  onProgressUpdate: (progress: number) => void
  onComplete: (score: number) => void
}

const learningContent = {
  2: {
    title: "¿Qué voy a aprender?",
    sections: [
      {
        id: 'intro',
        title: 'Introducción a la Función Lineal',
        content: `
          <h3>¿Qué es una función lineal?</h3>
          <p>Una función lineal es una relación matemática entre dos variables que se puede representar con una línea recta. 
          En nuestra vida cotidiana, encontramos funciones lineales constantemente:</p>
          
          <ul>
            <li><strong>Servicios públicos:</strong> El costo de la luz aumenta de manera constante según el consumo</li>
            <li><strong>Velocidad constante:</strong> Si caminas a 5 km/h, en 2 horas habrás recorrido 10 km</li>
            <li><strong>Ahorros:</strong> Si ahorras $10,000 cada mes, en 6 meses tendrás $60,000</li>
          </ul>
        `,
        video: 'https://www.youtube.com/embed/CMIODX_G_EA',
        videoTitle: 'Función Lineal - Introducción y Conceptos Básicos',
        duration: '8 min'
      },
      {
        id: 'importance',
        title: 'Importancia en tu Futuro',
        content: `
          <h3>¿Por qué necesitas aprender esto?</h3>
          <p>La función lineal te ayudará en muchas áreas de tu vida. Aquí te muestro ejemplos concretos y específicos:</p>
          
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2">🎓 En tus estudios</h4>
              <p className="text-sm text-blue-700 mb-2">Base fundamental para múltiples áreas del conocimiento:</p>
              <ul className="text-sm text-blue-700 ml-4 space-y-1">
                <li><strong>Álgebra avanzada:</strong> Es la base para ecuaciones cuadráticas, polinomios y sistemas de ecuaciones</li>
                <li><strong>Cálculo:</strong> Las derivadas e integrales parten del concepto de pendiente y razón de cambio</li>
                <li><strong>Física:</strong> Movimiento rectilíneo uniforme (velocidad = distancia/tiempo)</li>
                <li><strong>Química:</strong> Relaciones estequiométricas y concentraciones</li>
                <li><strong>Economía:</strong> Oferta y demanda, costos fijos y variables</li>
                <li><strong>Estadística:</strong> Regresión lineal para análisis de datos</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-2">💼 En tu trabajo futuro</h4>
              <p className="text-sm text-green-700 mb-2">Aplicaciones profesionales reales:</p>
              <ul className="text-sm text-green-700 ml-4 space-y-1">
                <li><strong>Marketing:</strong> Predecir ventas basándose en inversión publicitaria</li>
                <li><strong>Finanzas:</strong> Calcular intereses, amortizaciones y rentabilidad de inversiones</li>
                <li><strong>Recursos Humanos:</strong> Proyectar costos de nómina según contrataciones</li>
                <li><strong>Producción:</strong> Estimar costos totales según unidades producidas</li>
                <li><strong>Ventas:</strong> Calcular comisiones y metas de ventas</li>
                <li><strong>Logística:</strong> Optimizar rutas y costos de transporte</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-800 mb-2">🏠 En tu vida diaria</h4>
              <p className="text-sm text-purple-700 mb-2">Situaciones cotidianas donde la usarás:</p>
              <ul className="text-sm text-purple-700 ml-4 space-y-1">
                <li><strong>Servicios del hogar:</strong> Calcular el costo total de agua, luz o internet según consumo</li>
                <li><strong>Transporte:</strong> Comparar costos entre taxi, Uber o transporte público</li>
                <li><strong>Telefonía:</strong> Elegir el mejor plan de celular según tu consumo de datos</li>
                <li><strong>Supermercado:</strong> Calcular cuánto pagarás según cantidad de productos</li>
                <li><strong>Gimnasio:</strong> Comparar planes mensuales vs. pago por visita</li>
                <li><strong>Streaming:</strong> Decidir si conviene compartir suscripciones</li>
                <li><strong>Viajes:</strong> Calcular presupuesto según días de vacaciones</li>
              </ul>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-bold text-orange-800 mb-2">🚀 Carreras STEM (Ciencia, Tecnología, Ingeniería y Matemáticas)</h4>
              <p className="text-sm text-orange-700 mb-2">Fundamental en carreras del futuro:</p>
              <ul className="text-sm text-orange-700 ml-4 space-y-1">
                <li><strong>Ingeniería Civil:</strong> Cálculo de pendientes de carreteras y estructuras</li>
                <li><strong>Arquitectura:</strong> Diseño de rampas, escaleras y techos inclinados</li>
                <li><strong>Programación:</strong> Algoritmos de interpolación y machine learning</li>
                <li><strong>Data Science:</strong> Modelos predictivos y análisis de tendencias</li>
                <li><strong>Medicina:</strong> Dosis de medicamentos según peso del paciente</li>
                <li><strong>Biotecnología:</strong> Crecimiento de cultivos y poblaciones</li>
                <li><strong>Inteligencia Artificial:</strong> Redes neuronales y funciones de activación</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-bold text-yellow-800 mb-2">💡 Ejemplo práctico detallado</h4>
              <p className="text-sm text-yellow-700 mb-2"><strong>Situación:</strong> Quieres iniciar un negocio de venta de jugos naturales</p>
              <ul className="text-sm text-yellow-700 ml-4 space-y-1">
                <li>• <strong>Costos fijos:</strong> $200,000 mensuales (arriendo, servicios, salario)</li>
                <li>• <strong>Costo variable:</strong> $2,000 por cada jugo (frutas, vasos, etc.)</li>
                <li>• <strong>Ecuación de costos:</strong> C = 2000x + 200000</li>
                <li>• <strong>Precio de venta:</strong> $5,000 por jugo</li>
                <li>• <strong>Ecuación de ingresos:</strong> I = 5000x</li>
                <li>• <strong>Punto de equilibrio:</strong> Cuando I = C → 5000x = 2000x + 200000</li>
                <li>• <strong>Resultado:</strong> Necesitas vender 67 jugos para no perder dinero</li>
                <li>• <strong>Ganancia:</strong> A partir del jugo 68, empiezas a ganar $3,000 por cada uno</li>
              </ul>
              <p className="text-sm text-yellow-700 mt-2 italic">¡Con funciones lineales puedes planear tu negocio antes de invertir!</p>
            </div>
          </div>
        `,
        duration: '7 min'
      },
      {
        id: 'objectives',
        title: 'Objetivos de Aprendizaje',
        content: `
          <h3>Al final de este módulo podrás:</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
              <div>
                <h4 className="font-semibold">Identificar funciones lineales</h4>
                <p className="text-sm text-gray-600">Reconocer cuando una situación puede modelarse con y = mx + b</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
              <div>
                <h4 className="font-semibold">Interpretar gráficas</h4>
                <p className="text-sm text-gray-600">Leer y entender qué significa una línea en una gráfica</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
              <div>
                <h4 className="font-semibold">Resolver problemas reales</h4>
                <p className="text-sm text-gray-600">Aplicar funciones lineales a situaciones cotidianas</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">4</div>
              <div>
                <h4 className="font-semibold">Hacer predicciones</h4>
                <p className="text-sm text-gray-600">Usar funciones para predecir valores futuros</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">5</div>
              <div>
                <h4 className="font-semibold">Identificar rectas paralelas y perpendiculares</h4>
                <p className="text-sm text-gray-600">Determinar cuándo dos rectas son paralelas (misma pendiente) o perpendiculares (pendientes son recíprocas y opuestas)</p>
              </div>
            </div>
          </div>
        `,
        duration: '2 min'
      }
    ],
    totalDuration: '17 min'
  },
  3: {
    title: "Construcción de Conceptos",
    sections: [
      {
        id: 'definition',
        title: 'Definición Matemática',
        content: `
          <div className="text-center mb-6">
            <div className="math-equation text-3xl font-bold mb-4">
              y = mx + b
            </div>
            <p className="text-gray-600">Esta es la forma estándar de una función lineal</p>
          </div>
          
          <h3>¿Qué significa cada letra?</h3>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-red-500 bg-red-50">
              <h4 className="font-bold text-red-800">y = Variable dependiente</h4>
              <p className="text-red-700">Es el resultado que obtienes. Depende del valor de x.</p>
              <p className="text-sm text-red-600">Ejemplo: El costo total de la luz</p>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h4 className="font-bold text-blue-800">x = Variable independiente</h4>
              <p className="text-blue-700">Es el valor que tú controlas o cambias.</p>
              <p className="text-sm text-blue-600">Ejemplo: Los kilovatios que consumes</p>
            </div>
            
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h4 className="font-bold text-green-800">m = Pendiente</h4>
              <p className="text-green-700">Indica qué tan rápido cambia y cuando cambia x.</p>
              <p className="text-sm text-green-600">Ejemplo: $500 por cada kilovatio</p>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <h4 className="font-bold text-purple-800">b = Intercepto</h4>
              <p className="text-purple-700">Es el valor de y cuando x = 0.</p>
              <p className="text-sm text-purple-600">Ejemplo: El costo fijo mensual ($20,000)</p>
            </div>
          </div>
        `,
        video: 'https://www.youtube.com/embed/83-Z90bntZc',
        videoTitle: 'Función Lineal - Definición Matemática y=mx+b',
        duration: '8 min'
      },
      {
        id: 'slope',
        title: 'La Pendiente (m)',
        content: `
          <h3>¿Cómo calcular la pendiente?</h3>
          <div className="math-equation mb-4">
            m = (y₂ - y₁) / (x₂ - x₁)
          </div>
          
          <p className="mb-4">La pendiente nos dice cuánto sube o baja la línea:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">📈</div>
              <h4 className="font-bold text-green-800">Pendiente Positiva</h4>
              <p className="text-sm text-green-700">m > 0</p>
              <p className="text-xs">La línea sube hacia la derecha</p>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl mb-2">📉</div>
              <h4 className="font-bold text-red-800">Pendiente Negativa</h4>
              <p className="text-sm text-red-700">m < 0</p>
              <p className="text-xs">La línea baja hacia la derecha</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">➖</div>
              <h4 className="font-bold text-gray-800">Pendiente Cero</h4>
              <p className="text-sm text-gray-700">m = 0</p>
              <p className="text-xs">La línea es horizontal</p>
            </div>
          </div>
          
          <h4 className="font-semibold mt-6 mb-3">Ejemplo práctico:</h4>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p>Un taxi cobra $3,000 de banderazo + $1,000 por kilómetro.</p>
            <p className="mt-2"><strong>Ecuación:</strong> y = 1000x + 3000</p>
            <ul className="mt-2 text-sm">
              <li>• <strong>m = 1000:</strong> Cada kilómetro cuesta $1,000 adicional</li>
              <li>• <strong>b = 3000:</strong> El costo mínimo es $3,000</li>
            </ul>
          </div>
        `,
        video: 'https://www.youtube.com/embed/yBg_Vj1_lNg',
        videoTitle: 'Cálculo de Pendiente - Método Detallado',
        duration: '10 min'
      },
      {
        id: 'intercept',
        title: 'El Intercepto (b)',
        content: `
          <h3>¿Qué es el intercepto con el eje y?</h3>
          <p className="mb-4">El intercepto (b) es el punto donde la línea cruza el eje y, es decir, cuando x = 0.</p>
          
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <h4 className="font-bold text-yellow-800 mb-2">🎯 Punto clave</h4>
            <p className="text-yellow-700">El intercepto nos da el "punto de partida" o valor inicial de nuestra función.</p>
          </div>
          
          <h4 className="font-semibold mb-3">Ejemplos en la vida real:</h4>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium">📱 Plan de celular</h5>
              <p className="text-sm text-gray-600">y = 500x + 25000</p>
              <p className="text-xs">b = $25,000 es el costo fijo mensual, aunque no uses datos</p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium">🚗 Alquiler de carro</h5>
              <p className="text-sm text-gray-600">y = 800x + 50000</p>
              <p className="text-xs">b = $50,000 es lo que pagas aunque no manejes ni un kilómetro</p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h5 className="font-medium">💡 Recibo de luz</h5>
              <p className="text-sm text-gray-600">y = 450x + 18000</p>
              <p className="text-xs">b = $18,000 son los costos fijos (alumbrado público, etc.)</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-800">💡 Truco para recordar</h4>
            <p className="text-blue-700">Cuando x = 0 (no hay variable independiente), b es lo que queda.</p>
          </div>
        `,
        video: 'https://www.youtube.com/embed/_-7ZmIdAA3A',
        videoTitle: 'Intercepto con el Eje Y - Conceptos y Ejemplos',
        duration: '7 min'
      }
    ],
    totalDuration: '25 min'
  }
}

export function LearningActivity({ activity, onProgressUpdate, onComplete }: LearningActivityProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [showCompletion, setShowCompletion] = useState(false)

  const content = learningContent[activity.id as keyof typeof learningContent]
  
  if (!content) {
    return (
      <Card className="activity-card">
        <CardContent className="p-8 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Contenido en Desarrollo</h3>
          <p className="text-gray-600 mb-4">
            Esta actividad de aprendizaje estará disponible próximamente.
          </p>
          <Button onClick={() => onComplete(100)}>
            Marcar como Completada
          </Button>
        </CardContent>
      </Card>
    )
  }

  const handleSectionComplete = () => {
    const newCompleted = new Set(completedSections)
    newCompleted.add(currentSection)
    setCompletedSections(newCompleted)
    
    const progress = (newCompleted.size / content.sections.length) * 100
    onProgressUpdate(progress)
    
    if (newCompleted.size === content.sections.length) {
      setShowCompletion(true)
      // Ensure the activity is marked as completed with 100% progress
      setTimeout(() => {
        onProgressUpdate(100)
      }, 100)
    }
  }

  const nextSection = () => {
    if (currentSection < content.sections.length - 1) {
      setCurrentSection(prev => prev + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  if (showCompletion) {
    return (
      <Card className="activity-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>¡Actividad Completada!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">¡Excelente trabajo!</h3>
            <p className="text-gray-600">
              Has completado exitosamente esta actividad de aprendizaje. 
              Ahora tienes las bases sólidas para continuar con la siguiente actividad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-semibold text-green-800">Conceptos Aprendidos</h4>
              <p className="text-sm text-green-700">Función lineal y = mx + b</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">⏱️</div>
              <h4 className="font-semibold text-blue-800">Tiempo Invertido</h4>
              <p className="text-sm text-blue-700">{content.totalDuration}</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-purple-800">Progreso</h4>
              <p className="text-sm text-purple-700">100% Completado</p>
            </div>
          </div>
          
          <Button 
            onClick={() => onComplete(100)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Continuar a la Siguiente Actividad
          </Button>
        </CardContent>
      </Card>
    )
  }

  const section = content.sections[currentSection]
  
  return (
    <div className="space-y-6">
      {/* Progress Navigation */}
      <Card className="activity-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{content.title}</h3>
            <Badge variant="outline">
              {completedSections.size} / {content.sections.length} secciones
            </Badge>
          </div>
          
          <div className="flex space-x-2">
            {content.sections.map((_, index) => (
              <Button
                key={index}
                variant={currentSection === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentSection(index)}
                className={`flex-1 ${
                  completedSections.has(index) ? 'bg-green-100 text-green-800' : ''
                }`}
              >
                {completedSections.has(index) && <CheckCircle className="w-3 h-3 mr-1" />}
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Content */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <Card className="activity-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>{section.title}</span>
              </span>
              <Badge className="bg-blue-100 text-blue-800">
                {section.duration}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Player (if available) */}
            {(section as any).video && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-blue-700">
                    📹 {(section as any).videoTitle || section.title}
                  </h4>
                  <Button 
                    size="sm" 
                    onClick={() => window.open((section as any).video.replace('/embed/', '/watch?v='), '_blank')}
                    variant="outline"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver en YouTube
                  </Button>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={(section as any).video}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                    title={(section as any).videoTitle || section.title}
                  />
                </div>
              </div>
            )}
            
            {/* Content */}
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            
            {/* Interactive Elements */}
            {section.id === 'definition' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculadora Interactiva
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Pendiente (m):</label>
                    <input 
                      type="number" 
                      className="w-full p-2 border rounded" 
                      placeholder="Ej: 2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Intercepto (b):</label>
                    <input 
                      type="number" 
                      className="w-full p-2 border rounded" 
                      placeholder="Ej: 5"
                    />
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white rounded border">
                  <strong>Ecuación resultante:</strong> y = 2x + 5
                </div>
              </div>
            )}
            
            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevSection}
                disabled={currentSection === 0}
              >
                Anterior
              </Button>
              
              <div className="flex space-x-2">
                {!completedSections.has(currentSection) && (
                  <Button
                    onClick={handleSectionComplete}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completar Sección
                  </Button>
                )}
                
                {currentSection < content.sections.length - 1 && (
                  <Button
                    onClick={() => {
                      handleSectionComplete()
                      nextSection()
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                
                {/* Skip to completion button */}
                {completedSections.size > 0 && completedSections.size < content.sections.length && (
                  <Button
                    onClick={() => {
                      // Mark all sections as completed
                      const allCompleted = new Set(content.sections.map((_, index) => index))
                      setCompletedSections(allCompleted)
                      onProgressUpdate(100)
                      setShowCompletion(true)
                    }}
                    variant="outline"
                    className="border-orange-500 text-orange-700 hover:bg-orange-50"
                  >
                    Finalizar Actividad
                  </Button>
                )}
                
                {/* Complete activity button when all sections read */}
                {completedSections.size === content.sections.length && !showCompletion && (
                  <Button
                    onClick={() => {
                      onProgressUpdate(100)
                      setShowCompletion(true)
                    }}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completar Actividad
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
