import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME;

export async function GET(request: NextRequest) {
    try {
        if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY || !EVOLUTION_INSTANCE_NAME) {
            return NextResponse.json(
                { 
                    error: 'Evolution API no configurado',
                    message: 'Configura EVOLUTION_API_URL, EVOLUTION_API_KEY y EVOLUTION_INSTANCE_NAME en .env'
                },
                { status: 500 }
            );
        }

        // Verificar si la instancia existe
        const statusResponse = await fetch(
            `${EVOLUTION_API_URL}/instance/fetchInstances?instanceName=${EVOLUTION_INSTANCE_NAME}`,
            {
                headers: {
                    'apikey': EVOLUTION_API_KEY,
                },
            }
        );

        let instanceExists = false;
        if (statusResponse.ok) {
            const instances = await statusResponse.json();
            instanceExists = instances.some((i: any) => i.instance?.instanceName === EVOLUTION_INSTANCE_NAME);
        }

        // Si no existe, crearla
        if (!instanceExists) {
            const createResponse = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
                method: 'POST',
                headers: {
                    'apikey': EVOLUTION_API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instanceName: EVOLUTION_INSTANCE_NAME,
                    qrcode: true,
                    integration: 'WHATSAPP-BAILEYS',
                }),
            });

            if (!createResponse.ok) {
                const error = await createResponse.text();
                console.error('Error creando instancia:', error);
                return NextResponse.json(
                    { error: 'No se pudo crear la instancia de WhatsApp' },
                    { status: 500 }
                );
            }
        }

        // Obtener QR code
        const qrResponse = await fetch(
            `${EVOLUTION_API_URL}/instance/connect/${EVOLUTION_INSTANCE_NAME}`,
            {
                headers: {
                    'apikey': EVOLUTION_API_KEY,
                },
            }
        );

        if (!qrResponse.ok) {
            const error = await qrResponse.text();
            console.error('Error obteniendo QR:', error);
            return NextResponse.json(
                { error: 'No se pudo obtener el código QR' },
                { status: qrResponse.status }
            );
        }

        const qrData = await qrResponse.json();

        return NextResponse.json({
            success: true,
            qrcode: qrData.base64 || qrData.qrcode?.base64,
            status: qrData.instance?.state || 'connecting',
            message: 'Escanea el código QR con WhatsApp Business',
        });
    } catch (error) {
        console.error('Error en API de QR:', error);
        return NextResponse.json(
            { error: 'Error procesando solicitud' },
            { status: 500 }
        );
    }
}

// Verificar estado de conexión
export async function POST(request: NextRequest) {
    try {
        if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY || !EVOLUTION_INSTANCE_NAME) {
            return NextResponse.json(
                { error: 'Evolution API no configurado' },
                { status: 500 }
            );
        }

        const statusResponse = await fetch(
            `${EVOLUTION_API_URL}/instance/connectionState/${EVOLUTION_INSTANCE_NAME}`,
            {
                headers: {
                    'apikey': EVOLUTION_API_KEY,
                },
            }
        );

        if (!statusResponse.ok) {
            return NextResponse.json(
                { connected: false, status: 'disconnected' },
                { status: 200 }
            );
        }

        const statusData = await statusResponse.json();
        const isConnected = statusData.instance?.state === 'open' || statusData.state === 'open';

        return NextResponse.json({
            connected: isConnected,
            status: statusData.instance?.state || statusData.state || 'unknown',
            instance: EVOLUTION_INSTANCE_NAME,
        });
    } catch (error) {
        console.error('Error verificando estado:', error);
        return NextResponse.json(
            { connected: false, status: 'error' },
            { status: 200 }
        );
    }
}
