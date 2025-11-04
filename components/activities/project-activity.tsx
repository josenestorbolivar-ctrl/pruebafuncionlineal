
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building, 
  Bot, 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowRight,
  BarChart3,
  Users,
  TrendingUp,
  MapPin,
  Calculator,
  Presentation
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity } from '@/lib/activities-data'

interface ProjectActivityProps {
  activity: Activity
  onProgressUpdate: (progress: number) => void
  onComplete: (score: number) => void
}

const projectPhases = [
  {
    id: 'planning',
    title: 'Planificación del Proyecto',
    description: 'Define tu ciudad y los aspectos a analizar',
    icon: MapPin,
    color: 'blue'
  },
  {
    id: 'research',
    title: 'Investigación con IA',
    description: 'Recopila datos usando el asistente IA',
    icon: Bot,
    color: 'purple'
  },
  {
    id: 'analysis',
    title: 'Análisis de Funciones',
    description: 'Aplica funciones lineales a los datos',
    icon: BarChart3,
    color: 'green'
  },
  {
    id: 'presentation',
    title: 'Presentación Final',
    description: 'Crea tu presentación de resultados',
    icon: Presentation,
    color: 'orange'
  }
]

const cityAspects = [
  {
    id: 'population',
    title: 'Crecimiento Poblacional',
    description: 'Analiza cómo crece la población de tu ciudad',
    icon: Users,
    examples: ['Población por años', 'Proyecciones futuras', 'Tasa de crecimiento']
  },
  {
    id: 'transport',
    title: 'Sistema de Transporte',
    description: 'Estudia costos y rutas de transporte público',
    icon: TrendingUp,
    examples: ['Costo por distancia', 'Tarifas de transporte', 'Rutas más utilizadas']
  },
  {
    id: 'utilities',
    title: 'Servicios Públicos',
    description: 'Analiza el consumo de servicios como agua y luz',
    icon: Calculator,
    examples: ['Costo de la luz', 'Consumo de agua', 'Tarifas municipales']
  },
  {
    id: 'economy',
    title: 'Indicadores Económicos',
    description: 'Examina precios, ingresos y costos de vida',
    icon: BarChart3,
    examples: ['Costo de la canasta básica', 'Salario mínimo', 'Precio de vivienda']
  }
]

export function ProjectActivity({ activity, onProgressUpdate, onComplete }: ProjectActivityProps) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [projectData, setProjectData] = useState({
    cityName: '',
    selectedAspect: '',
    researchNotes: '',
    functionsCreated: [],
    presentationNotes: ''
  })
  const [isPhaseComplete, setIsPhaseComplete] = useState([false, false, false, false])
  const [showAIChat, setShowAIChat] = useState(false)

  const handlePhaseComplete = (phaseIndex: number) => {
    const newCompleted = [...isPhaseComplete]
    newCompleted[phaseIndex] = true
    setIsPhaseComplete(newCompleted)
    
    const progress = (newCompleted.filter(Boolean).length / projectPhases.length) * 100
    onProgressUpdate(progress)
    
    if (newCompleted.every(Boolean)) {
      setTimeout(() => onComplete(90), 2000) // Buen puntaje por proyecto completo
    }
  }

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case 0:
        return (
          <div className="space-y-6">
            <Card className="activity-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Planificación del Proyecto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    ¿Cuál es tu ciudad? (o una ciudad que te interese)
                  </label>
                  <Input 
                    placeholder="Ej: Bogotá, Medellín, Cali..."
                    value={projectData.cityName}
                    onChange={(e) => setProjectData({...projectData, cityName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Elige un aspecto de la ciudad para analizar:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cityAspects.map((aspect) => (
                      <Card 
                        key={aspect.id}
                        className={`cursor-pointer transition-all ${
                          projectData.selectedAspect === aspect.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => setProjectData({...projectData, selectedAspect: aspect.id})}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <aspect.icon className="w-6 h-6 text-blue-600 mt-1" />
                            <div>
                              <h4 className="font-semibold mb-1">{aspect.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{aspect.description}</p>
                              <div className="text-xs text-gray-500">
                                Ejemplos: {aspect.examples.join(', ')}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handlePhaseComplete(0)}
                  disabled={!projectData.cityName || !projectData.selectedAspect}
                  className="w-full"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completar Planificación
                </Button>
              </CardContent>
            </Card>
          </div>
        )
        
      case 1:
        return (
          <div className="space-y-6">
            <Card className="activity-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <span>Investigación con IA</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Tu Proyecto:</h4>
                  <p><strong>Ciudad:</strong> {projectData.cityName}</p>
                  <p><strong>Aspecto:</strong> {cityAspects.find(a => a.id === projectData.selectedAspect)?.title}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Bot className="w-4 h-4 mr-2" />
                    Preguntas sugeridas para el Asistente IA:
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• "¿Cuál es la población actual de {projectData.cityName}?"</li>
                    <li>• "¿Cómo ha crecido la población en los últimos 10 años?"</li>
                    <li>• "¿Cuáles son las tarifas de servicios públicos en {projectData.cityName}?"</li>
                    <li>• "¿Qué datos económicos puedes darme de {projectData.cityName}?"</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => setShowAIChat(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Abrir Chat con IA
                </Button>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Toma notas de tu investigación:
                  </label>
                  <Textarea 
                    placeholder="Escribe aquí los datos que encuentres sobre tu ciudad..."
                    value={projectData.researchNotes}
                    onChange={(e) => setProjectData({...projectData, researchNotes: e.target.value})}
                    rows={6}
                  />
                </div>
                
                <Button 
                  onClick={() => handlePhaseComplete(1)}
                  disabled={projectData.researchNotes.length < 100}
                  className="w-full"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completar Investigación
                </Button>
              </CardContent>
            </Card>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <Card className="activity-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span>Análisis con Funciones Lineales</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cómo aplicar funciones lineales?</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Busca relaciones donde una variable cambie de manera constante respecto a otra:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Población:</strong> Si crece 10,000 personas cada año: P = 10,000t + P₀</li>
                    <li>• <strong>Transporte:</strong> Si cuesta $2,000 + $500/km: C = 500d + 2,000</li>
                    <li>• <strong>Servicios:</strong> Si la luz cuesta $450/kWh + $20,000 fijo: L = 450k + 20,000</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Ejemplo de Función</h5>
                    <div className="bg-gray-100 p-3 rounded text-center">
                      <div className="text-lg font-mono">y = mx + b</div>
                    </div>
                    <div className="text-sm mt-2">
                      <p><strong>y:</strong> Variable que quieres predecir</p>
                      <p><strong>m:</strong> Cuánto cambia por unidad</p>
                      <p><strong>x:</strong> Variable independiente</p>
                      <p><strong>b:</strong> Valor inicial</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Tu Función</h5>
                    <Input 
                      placeholder="Ej: y = 10000x + 500000"
                      className="mb-2"
                    />
                    <Textarea 
                      placeholder="Explica qué representa cada parte de tu función..."
                      rows={3}
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Análisis de tus datos:</h4>
                  <Textarea 
                    placeholder="Describe las funciones lineales que encontraste en los datos de tu ciudad. ¿Qué patrones observas? ¿Qué predicciones puedes hacer?"
                    rows={6}
                  />
                </div>
                
                <Button 
                  onClick={() => handlePhaseComplete(2)}
                  className="w-full"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completar Análisis
                </Button>
              </CardContent>
            </Card>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <Card className="activity-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Presentation className="w-5 h-5 text-orange-600" />
                  <span>Presentación Final</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Estructura de tu presentación:</h4>
                  <ol className="text-sm space-y-2">
                    <li><strong>1. Introducción:</strong> Tu ciudad y el aspecto elegido</li>
                    <li><strong>2. Datos encontrados:</strong> Información clave recopilada</li>
                    <li><strong>3. Funciones identificadas:</strong> Las relaciones lineales encontradas</li>
                    <li><strong>4. Predicciones:</strong> Qué puedes predecir con tus funciones</li>
                    <li><strong>5. Conclusiones:</strong> Qué aprendiste del proyecto</li>
                  </ol>
                </div>
                
                <Tabs defaultValue="slides" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="slides">Diapositivas</TabsTrigger>
                    <TabsTrigger value="report">Reporte</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="slides" className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-2">Crear Presentación</h5>
                      <p className="text-sm text-gray-600 mb-3">
                        Crea una presentación de 5-7 diapositivas mostrando tu análisis.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-auto p-4">
                          <div className="text-center">
                            <FileText className="w-6 h-6 mx-auto mb-1" />
                            <div className="text-sm">Google Slides</div>
                          </div>
                        </Button>
                        <Button variant="outline" className="h-auto p-4">
                          <div className="text-center">
                            <FileText className="w-6 h-6 mx-auto mb-1" />
                            <div className="text-sm">PowerPoint</div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="report" className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-2">Reporte Escrito</h5>
                      <p className="text-sm text-gray-600 mb-3">
                        Escribe un reporte de 2-3 páginas sobre tu análisis.
                      </p>
                      <Textarea 
                        placeholder="Escribe tu reporte aquí..."
                        rows={10}
                        value={projectData.presentationNotes}
                        onChange={(e) => setProjectData({...projectData, presentationNotes: e.target.value})}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="video" className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-2">Video Explicativo</h5>
                      <p className="text-sm text-gray-600 mb-3">
                        Crea un video de 3-5 minutos explicando tu proyecto.
                      </p>
                      <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Sube tu video aquí</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button 
                  onClick={() => handlePhaseComplete(3)}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completar Presentación
                </Button>
              </CardContent>
            </Card>
          </div>
        )
        
      default:
        return null
    }
  }

  if (isPhaseComplete.every(Boolean)) {
    return (
      <Card className="activity-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span>¡Proyecto Completado!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">¡Excelente trabajo!</h3>
            <p className="text-gray-600">
              Has completado exitosamente tu proyecto "Mi Ciudad en Funciones". 
              Has aplicado conceptos de función lineal a situaciones reales de {projectData.cityName}.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {projectPhases.map((phase, index) => (
              <div key={phase.id} className="p-4 bg-green-50 rounded-lg">
                <phase.icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800 text-sm">{phase.title}</h4>
                <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Lo que lograste:</h4>
            <ul className="text-sm text-left space-y-1">
              <li>✅ Planificaste un proyecto de análisis urbano</li>
              <li>✅ Usaste IA como herramienta de investigación</li>
              <li>✅ Aplicaste funciones lineales a datos reales</li>
              <li>✅ Creaste una presentación profesional</li>
              <li>✅ Desarrollaste habilidades de análisis matemático</li>
            </ul>
          </div>
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
            <h3 className="font-semibold">Mi Ciudad en Funciones</h3>
            <Badge variant="outline">
              Fase {currentPhase + 1} de {projectPhases.length}
            </Badge>
          </div>
          
          <div className="flex space-x-2 mb-4">
            {projectPhases.map((phase, index) => (
              <Button
                key={phase.id}
                size="sm"
                variant={currentPhase === index ? "default" : "outline"}
                onClick={() => setCurrentPhase(index)}
                disabled={index > 0 && !isPhaseComplete[index - 1]}
                className={`flex-1 ${isPhaseComplete[index] ? 'bg-green-100 text-green-800' : ''}`}
              >
                {isPhaseComplete[index] && <CheckCircle className="w-3 h-3 mr-1" />}
                <phase.icon className="w-3 h-3 mr-1" />
                {phase.title.split(' ')[0]}
              </Button>
            ))}
          </div>
          
          <div className="text-center">
            <h4 className="font-semibold">{projectPhases[currentPhase].title}</h4>
            <p className="text-sm text-gray-600">{projectPhases[currentPhase].description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Phase Content */}
      <motion.div
        key={currentPhase}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        {renderPhaseContent()}
      </motion.div>

      {/* Navigation */}
      <Card className="activity-card">
        <CardContent className="p-4">
          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
              disabled={currentPhase === 0}
              variant="outline"
            >
              Fase Anterior
            </Button>
            
            <Button
              onClick={() => setCurrentPhase(Math.min(projectPhases.length - 1, currentPhase + 1))}
              disabled={currentPhase === projectPhases.length - 1 || !isPhaseComplete[currentPhase]}
            >
              Siguiente Fase
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
