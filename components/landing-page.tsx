
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Brain, Smartphone, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export function LandingPage() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(true)

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "10 Actividades Secuenciales",
      description: "Aprende función lineal paso a paso con actividades interactivas diseñadas para estudiantes de 8° grado"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Asistente IA Educativo",
      description: "Chat inteligente disponible 24/7 para resolver dudas y guiar tu aprendizaje"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Múltiples Usuarios",
      description: "Acceso para estudiantes, docentes y padres con funciones específicas para cada rol"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Sistema de Evaluación",
      description: "Evaluaciones aleatorias con retroalimentación instantánea y múltiples intentos"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Funciona Offline",
      description: "Aplicación Progressive Web App que funciona sin conexión a internet"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Simuladores Integrados",
      description: "Acceso directo a PhET Colorado y GeoGebra para visualizaciones avanzadas"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="app-header text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Función Lineal</h1>
                <p className="text-white/80 text-sm">Matemáticas 8° Grado</p>
              </div>
            </motion.div>
            
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-white text-purple-600 hover:bg-white/90">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* PWA Install Banner */}
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3"
        >
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm font-medium">
                ¡Instala la app en tu dispositivo para una mejor experiencia!
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                id="pwa-install-button"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => {
                  // PWA install is handled by the PWA provider
                  console.log('Install button clicked')
                }}
              >
                Instalar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => setShowInstallPrompt(false)}
              >
                ×
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Aprende <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Función Lineal</span> de manera interactiva
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Una aplicación educativa completa con IA, actividades interactivas y evaluaciones personalizadas para estudiantes de 8° grado
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Comenzar Gratis
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Ver Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Todo lo que necesitas para aprender función lineal
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Diseñado siguiendo los estándares del Ministerio de Educación de Colombia para 8° grado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="activity-card h-full p-6 border-0">
                  <CardContent className="p-0">
                    <div className="text-purple-600 mb-4">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Math Example */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              Domina la ecuación de la recta
            </h3>
            
            <div className="math-equation text-2xl mb-8">
              <strong>y = mx + b</strong>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardContent className="p-0">
                  <h4 className="text-lg font-semibold mb-4 text-purple-600">
                    ¿Qué aprenderás?
                  </h4>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>• Identificar la pendiente (m) y el intercepto (b)</li>
                    <li>• Graficar funciones lineales</li>
                    <li>• Resolver problemas del mundo real</li>
                    <li>• Interpretar gráficas y tablas</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="p-0">
                  <h4 className="text-lg font-semibold mb-4 text-blue-600">
                    Metodología
                  </h4>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>• Aprendizaje secuencial y progresivo</li>
                    <li>• Actividades interactivas y juegos</li>
                    <li>• Asistente IA personalizado</li>
                    <li>• Evaluaciones con retroalimentación</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Función Lineal</h4>
                  <p className="text-sm text-gray-400">Educación Matemática</p>
                </div>
              </div>
              <p className="text-gray-400">
                Herramienta educativa diseñada para estudiantes, docentes y padres.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Recursos</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Guía del Docente</li>
                <li>Manual de Usuario</li>
                <li>Preguntas Frecuentes</li>
                <li>Soporte Técnico</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contacto</h5>
              <ul className="space-y-2 text-gray-400">
                <li>educacion@funcionlineal.com</li>
                <li>+57 300 123 4567</li>
                <li>Bogotá, Colombia</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Función Lineal. Todos los derechos reservados.</p>
            <p className="mt-2">Desarrollado con ❤️ para la educación matemática</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
