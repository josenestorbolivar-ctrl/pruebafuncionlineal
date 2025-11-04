
export interface Activity {
  id: number
  title: string
  description: string
  type: 'diagnostic' | 'learning' | 'practice' | 'game' | 'evaluation' | 'reflection' | 'project'
  estimatedTime: string
  content: {
    instructions: string
    objectives: string[]
    materials?: string[]
    steps?: string[]
  }
  unlocked: boolean
}

export const activities: Activity[] = [
  {
    id: 1,
    title: "Conocimientos Previos",
    description: "Evaluemos qué sabes sobre plano cartesiano y proporcionalidad",
    type: "diagnostic",
    estimatedTime: "15 min",
    content: {
      instructions: "Responde las siguientes preguntas para evaluar tus conocimientos previos sobre los temas que necesitarás para aprender función lineal.",
      objectives: [
        "Identificar conocimientos sobre el plano cartesiano",
        "Evaluar comprensión de proporcionalidad directa",
        "Reconocer patrones numéricos básicos",
        "Determinar nivel de preparación para función lineal"
      ],
      materials: [
        "Calculadora (opcional)",
        "Papel y lápiz para hacer cálculos"
      ]
    },
    unlocked: true
  },
  {
    id: 2,
    title: "¿Qué voy a aprender?",
    description: "Descubre los objetivos y la importancia de la función lineal",
    type: "learning",
    estimatedTime: "20 min",
    content: {
      instructions: "Explora los conceptos que aprenderás sobre función lineal y cómo se aplican en la vida real.",
      objectives: [
        "Comprender qué es una función lineal",
        "Identificar aplicaciones en la vida cotidiana",
        "Reconocer la importancia en matemáticas",
        "Establecer metas de aprendizaje personales"
      ],
      materials: [
        "Videos explicativos",
        "Ejemplos interactivos",
        "Casos de estudio reales"
      ]
    },
    unlocked: false
  },
  {
    id: 3,
    title: "Construcción de Conceptos",
    description: "Aprende la definición, forma y=mx+b, pendiente e intercepto",
    type: "learning",
    estimatedTime: "30 min",
    content: {
      instructions: "Construye tu comprensión de los conceptos fundamentales de la función lineal paso a paso.",
      objectives: [
        "Definir función lineal matemáticamente",
        "Comprender la forma y = mx + b",
        "Identificar la pendiente (m) y su significado",
        "Reconocer el intercepto con el eje y (b)"
      ],
      materials: [
        "Gráficas interactivas",
        "Ejemplos visuales",
        "Simulador de funciones"
      ]
    },
    unlocked: false
  },
  {
    id: 4,
    title: "Afianzamiento de Conceptos",
    description: "Practica identificando pendientes y graficando funciones",
    type: "practice",
    estimatedTime: "25 min",
    content: {
      instructions: "Refuerza tu comprensión mediante ejercicios prácticos de identificación y graficación.",
      objectives: [
        "Calcular pendientes entre dos puntos",
        "Identificar pendiente e intercepto en ecuaciones",
        "Graficar funciones lineales",
        "Interpretar gráficas existentes"
      ],
      steps: [
        "Ejercicios de cálculo de pendiente",
        "Identificación de componentes en ecuaciones",
        "Práctica de graficación",
        "Interpretación de gráficas"
      ]
    },
    unlocked: false
  },
  {
    id: 5,
    title: "Situaciones del Mundo Real",
    description: "Resuelve problemas contextualizados: servicios públicos, velocidad, etc.",
    type: "practice",
    estimatedTime: "35 min",
    content: {
      instructions: "Aplica tus conocimientos de función lineal a situaciones reales y problemas contextualizados.",
      objectives: [
        "Modelar situaciones reales con funciones lineales",
        "Resolver problemas de servicios públicos",
        "Analizar problemas de velocidad constante",
        "Interpretar resultados en contexto real"
      ],
      materials: [
        "Casos reales de servicios públicos",
        "Problemas de movimiento",
        "Situaciones económicas básicas"
      ]
    },
    unlocked: false
  },
  {
    id: 6,
    title: "Juegos Matemáticos",
    description: "Actividades lúdicas: Detective de Pendientes y Carrera de Funciones",
    type: "game",
    estimatedTime: "30 min",
    content: {
      instructions: "Diviértete mientras aprendes con juegos interactivos diseñados para reforzar conceptos.",
      objectives: [
        "Identificar pendientes de forma lúdica",
        "Competir graficando funciones correctamente",
        "Desarrollar intuición matemática",
        "Consolidar aprendizaje mediante juego"
      ],
      materials: [
        "Juego 'Detective de Pendientes'",
        "Juego 'Carrera de Funciones'",
        "Puntajes y clasificaciones"
      ]
    },
    unlocked: false
  },
  {
    id: 7,
    title: "Mi Ciudad en Funciones",
    description: "Proyecto colaborativo usando IA para análisis urbano",
    type: "project",
    estimatedTime: "45 min",
    content: {
      instructions: "Desarrolla un proyecto donde analices aspectos de tu ciudad usando funciones lineales, con ayuda de IA.",
      objectives: [
        "Aplicar función lineal a análisis urbano",
        "Usar IA como herramienta de investigación",
        "Crear presentación de resultados",
        "Colaborar con compañeros virtualmente"
      ],
      materials: [
        "Asistente IA especializado",
        "Plantillas de proyecto",
        "Herramientas de presentación",
        "Datos reales de ciudades"
      ]
    },
    unlocked: false
  },
  {
    id: 8,
    title: "Evaluación de Aprendizaje",
    description: "Demuestra tu comprensión con 15 preguntas aleatorias",
    type: "evaluation",
    estimatedTime: "40 min",
    content: {
      instructions: "Completa la evaluación que incluye preguntas sobre todos los conceptos aprendidos.",
      objectives: [
        "Demostrar comprensión de función lineal",
        "Aplicar conceptos a problemas diversos",
        "Alcanzar mínimo 70/100 para aprobar",
        "Identificar áreas de fortaleza y mejora"
      ],
      materials: [
        "Banco de 45 preguntas",
        "Calculadora permitida",
        "Máximo 3 intentos",
        "Retroalimentación inmediata"
      ]
    },
    unlocked: false
  },
  {
    id: 9,
    title: "Retroalimentación Personalizada",
    description: "Análisis de errores y recursos de refuerzo específicos",
    type: "reflection",
    estimatedTime: "20 min",
    content: {
      instructions: "Revisa tu desempeño en la evaluación y accede a recursos personalizados de mejora.",
      objectives: [
        "Analizar errores cometidos en la evaluación",
        "Identificar conceptos a reforzar",
        "Acceder a recursos específicos de mejora",
        "Planificar estrategias de estudio"
      ],
      materials: [
        "Análisis detallado de respuestas",
        "Videos de refuerzo específicos",
        "Ejercicios adicionales personalizados",
        "Plan de mejora sugerido"
      ]
    },
    unlocked: false
  },
  {
    id: 10,
    title: "Reflexión de mi Aprendizaje",
    description: "Autoevaluación y reflexión metacognitiva sobre el proceso",
    type: "reflection",
    estimatedTime: "25 min",
    content: {
      instructions: "Reflexiona sobre tu proceso de aprendizaje y establece metas para continuar mejorando.",
      objectives: [
        "Reflexionar sobre el proceso de aprendizaje",
        "Identificar estrategias más efectivas",
        "Establecer metas futuras de aprendizaje",
        "Desarrollar consciencia metacognitiva"
      ],
      materials: [
        "Cuestionario de autoreflexión",
        "Registro de aprendizaje personal",
        "Metas y objetivos futuros",
        "Certificado de completión"
      ]
    },
    unlocked: false
  }
]
