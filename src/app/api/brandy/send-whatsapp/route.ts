import { NextRequest, NextResponse } from 'next/server';

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME;

interface WhatsAppRequest {
    phone: string;
    message: string;
    discount?: number;
    services?: string[];
}

export async function POST(request: NextRequest) {
    try {
        const { phone, message, discount, services }: WhatsAppRequest = await request.json();

        if (!phone || !message) {
            return NextResponse.json(
                { error: 'Teléfono y mensaje son requeridos' },
                { status: 400 }
            );
        }

        if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY || !EVOLUTION_INSTANCE_NAME) {
            console.error('Variables de Evolution API no configuradas');
            return NextResponse.json(
                { error: 'Servicio de WhatsApp no configurado' },
                { status: 500 }
            );
        }

        // Formatear número (remover espacios, guiones, etc)
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        
        // Si no tiene código de país, agregar +56 (Chile)
        const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+56${cleanPhone}`;

        // Construir mensaje personalizado
        let fullMessage = `🎯 *Propuesta Personalizada - Red Gráfica*\n\n`;
        fullMessage += `${message}\n\n`;
        
        if (services && services.length > 0) {
            fullMessage += `📦 *Servicios recomendados:*\n`;
            services.forEach((service, idx) => {
                fullMessage += `${idx + 1}. ${service}\n`;
            });
            fullMessage += `\n`;
        }
        
        if (discount && discount > 0) {
            fullMessage += `💰 *¡Descuento exclusivo: ${discount}%!*\n\n`;
        }
        
        fullMessage += `¿Listo para empezar? Responde este mensaje y coordinaremos todo. 🚀`;

        // Enviar mensaje vía Evolution API
        const evolutionResponse = await fetch(`${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': EVOLUTION_API_KEY,
            },
            body: JSON.stringify({
                number: formattedPhone,
                text: fullMessage,
            }),
        });

        if (!evolutionResponse.ok) {
            const error = await evolutionResponse.text();
            console.error('Evolution API error:', error);
            return NextResponse.json(
                { error: 'Error enviando WhatsApp' },
                { status: evolutionResponse.status }
            );
        }

        const evolutionData = await evolutionResponse.json();

        return NextResponse.json({
            success: true,
            message: 'WhatsApp enviado correctamente',
            data: evolutionData,
        });
    } catch (error) {
        console.error('Error en API de WhatsApp:', error);
        return NextResponse.json(
            { error: 'Error procesando solicitud' },
            { status: 500 }
        );
    }
}
