import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@redgrafica.com';

interface EmailRequest {
    email: string;
    message: string;
    discount?: number;
    services?: string[];
}

export async function POST(request: NextRequest) {
    try {
        const { email, message, discount, services }: EmailRequest = await request.json();

        if (!email || !message) {
            return NextResponse.json(
                { error: 'Email y mensaje son requeridos' },
                { status: 400 }
            );
        }

        if (!RESEND_API_KEY) {
            console.error('API key de Resend no configurada');
            return NextResponse.json(
                { error: 'Servicio de email no configurado' },
                { status: 500 }
            );
        }

        // Construir HTML del email
        const servicesHtml = services && services.length > 0
            ? `
                <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #1E73BE; margin-top: 0;">📦 Servicios recomendados</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${services.map((service, idx) => `
                            <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                <strong>${idx + 1}.</strong> ${service}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `
            : '';

        const discountHtml = discount && discount > 0
            ? `
                <div style="background: linear-gradient(135deg, #F7941D 0%, #FF6B35 100%); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
                    <h2 style="color: white; margin: 0; font-size: 32px;">🎉 ${discount}% OFF</h2>
                    <p style="color: white; margin: 10px 0 0 0;">¡Descuento exclusivo para ti!</p>
                </div>
            `
            : '';

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #1E73BE 0%, #155a9b 100%); border-radius: 16px 16px 0 0; padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Red Gráfica Store</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Tu propuesta personalizada está lista</p>
    </div>
    
    <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="font-size: 16px; margin-top: 0;">Hola,</p>
        
        <p style="font-size: 16px;">${message}</p>
        
        ${servicesHtml}
        ${discountHtml}
        
        <div style="background: #f8f9fa; border-left: 4px solid #1E73BE; padding: 20px; margin: 20px 0;">
            <p style="margin: 0;"><strong>¿Listo para empezar?</strong></p>
            <p style="margin: 10px 0 0 0;">Responde este correo o contáctanos por WhatsApp para coordinar tu proyecto.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <a href="https://wa.me/56912345678" style="display: inline-block; background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                💬 Chatear por WhatsApp
            </a>
        </div>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 16px 16px;">
        <p style="color: #666; font-size: 14px; margin: 0;">Red Gráfica Store</p>
        <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">Servicios digitales para impulsar tu negocio</p>
    </div>
</body>
</html>
        `;

        // Usar fetch en lugar de SDK para evitar errores de inicialización
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: EMAIL_FROM,
                to: email,
                subject: `🎯 Tu propuesta personalizada${discount ? ` con ${discount}% OFF` : ''}`,
                html: htmlContent,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Error enviando email:', error);
            return NextResponse.json(
                { error: 'Error enviando email' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            message: 'Email enviado correctamente',
            data,
        });
    } catch (error) {
        console.error('Error en API de email:', error);
        return NextResponse.json(
            { error: 'Error procesando solicitud' },
            { status: 500 }
        );
    }
}
