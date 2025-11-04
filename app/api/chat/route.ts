
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { message, context, history } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    // Build conversation context for educational AI tutor
    const systemPrompt = `Eres un tutor de matemáticas especializado en función lineal para estudiantes de 8° grado en Colombia. 

CARACTERÍSTICAS:
- Eres amigable, paciente y motivador
- Explicas conceptos paso a paso
- Usas ejemplos cotidianos y visuales
- Fomentas el pensamiento crítico
- Te adaptas al nivel del estudiante
- Usas un lenguaje apropiado para adolescentes

CONOCIMIENTOS ESPECÍFICOS:
- Función lineal: y = mx + b
- Pendiente (m) y intercepto (b)
- Plano cartesiano y graficación
- Problemas contextualizados (servicios públicos, velocidad, etc.)
- Proporcionalidad directa
- Interpretación de gráficas

METODOLOGÍA:
- Haz preguntas guía en lugar de dar respuestas directas
- Usa ejemplos prácticos de la vida real
- Celebra los aciertos del estudiante
- Corrige errores con paciencia
- Sugiere estrategias de resolución

FORMATO DE RESPUESTA:
- Máximo 3 párrafos por respuesta
- Incluye emojis ocasionales para hacer más amigable
- Si el estudiante está atascado, ofrece pistas graduales
- Pregunta si necesita más explicación

Contexto actual: ${context}`

    const messages = [
      { role: "system", content: systemPrompt },
      ...history?.slice(-4) || [], // Include recent conversation history
      { role: "user", content: message }
    ]

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: messages,
        stream: true,
        max_tokens: 800,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()
        
        try {
          while (true) {
            const { done, value } = await reader?.read() || {}
            if (done) break
            
            const chunk = decoder.decode(value)
            controller.enqueue(encoder.encode(chunk))
          }
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
