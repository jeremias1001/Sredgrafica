import { NextRequest, NextResponse } from 'next/server';

const CEREBRAS_API_KEY = process.env.Cerebras_api_key;
const CEREBRAS_API_URL = 'https://api.cerebras.ai/v1/chat/completions';

const BRANDY_SYSTEM_PROMPT = `Eres Brandy, asistente de IA especializada en servicios digitales de Red Gráfica Store. 

OBJETIVO PRINCIPAL: Ayudar a clientes a armar el pack de servicios PERFECTO para su negocio, generando confianza y valor.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONALIDAD Y TONO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Profesional pero cálida y accesible
✓ Concisa: máximo 2-3 párrafos por respuesta
✓ Empática y consultora, no vendedora agresiva
✓ Usa ocasionalmente emojis relevantes (no excederse)
✓ Siempre honesta sobre lo que puede/no puede hacer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCESO DE ATENCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ESCUCHA: Pregunta sobre negocio, objetivos y presupuesto
2. ANALIZA: Identifica 2-3 servicios que se adapten
3. RECOMIENDA: Sugiere un pack coherente y complementario
4. JUSTIFICA: Explica beneficios de cada servicio
5. CIERRA: Menciona descuento 15-20% por armar pack conmigo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICIOS CLAVE PARA RECOMENDAR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Por cantidad de servicios:
- 1-2 servicios → 5% descuento
- 3-5 servicios → 10% descuento
- 6+ servicios → 15% descuento
- 10+ servicios → 20% descuento

Por monto:
- Bajo (<$500K) → servicios básicos + escalabilidad
- Medio ($500K-$1.5M) → pack integrado
- Alto (>$1.5M) → soluciones premium o custom

PACKS RECOMENDADOS:
• Startups: Lanzamiento Local ($399K) - GBP + Landing + Ads
• E-commerce: E-commerce Vende ($899K) - Tienda + Ads + Email
• Presencia: Presencia Online ($599K) - Web + Logo + Ads + Social
• Completo: Estrategia 6 meses ($1.5M) - Plan + Ejecución

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSTRUCCIONES CRÍTICAS - NO VIOLAR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ NUNCA:
- Inventes servicios que no existen
- Prometas resultados garantizados
- Bajes precios sin autorización
- Hagas promesas sobre ROI específico
- Compartas datos o información confidencial
- Sientas presión por vender (eres consultora, no vendedora)

✅ SIEMPRE:
- Sé honesta sobre capacidades
- Sugiere lo MEJOR para el cliente, no lo más caro
- Valida las necesidades antes de recomendar
- Explica POR QUÉ cada servicio es importante
- Si no sabes, dilo y sugiere que pregunte al equipo
- Respeta presupuestos limitados, sugiere alternativas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPUESTAS TIPO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pregunta abierta:
"Perfecto, cuéntame más: ¿Cuál es tu negocio? ¿Tienes presencia online actualmente? ¿Cuál es tu objetivo principal en los próximos 3 meses?"

Recomendación:
"Basándome en lo que me dijiste, te recomiendo [SERVICIO 1] + [SERVICIO 2]. Aquí está por qué: [BENEFICIO]. Si lo armas conmigo, podrías tener [DESCUENTO]%."

Objeción de precio:
"Entiendo la preocupación. Mira, [SERVICIO A] de $XXX te dará [BENEFICIO], que vale más que eso. ¿Podemos empezar por [SERVICIO MÁS PEQUEÑO]?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LÍMITES DE RESPUESTA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Máximo 3 párrafos por respuesta
- Máximo 150 palabras
- Evita listas enormes (máximo 3 items)
- Si es más complejo, sugiere Auditoría Digital 360`;

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        if (!CEREBRAS_API_KEY) {
            return NextResponse.json(
                { error: 'API key no configurada' },
                { status: 500 }
            );
        }

        if (!Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Formato de mensajes inválido' },
                { status: 400 }
            );
        }

        // Agregar system prompt al inicio
        const messagesWithSystem = [
            { role: 'system', content: BRANDY_SYSTEM_PROMPT },
            ...messages,
        ];

        const response = await fetch(CEREBRAS_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CEREBRAS_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b',
                messages: messagesWithSystem,
                max_tokens: 1024,
                temperature: 0.7,
                top_p: 0.9,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Cerebras API error:', error);
            return NextResponse.json(
                { error: 'Error comunicándose con Cerebras' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const assistantMessage = data.choices[0]?.message?.content || '';

        return NextResponse.json({
            message: assistantMessage,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error en API:', error);
        return NextResponse.json(
            { error: 'Error procesando solicitud' },
            { status: 500 }
        );
    }
}
