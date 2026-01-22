"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WhatsAppSetup() {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);
    const [checking, setChecking] = useState(false);

    const loadQR = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/brandy/whatsapp-qr");
            const data = await response.json();

            if (data.success && data.qrcode) {
                setQrCode(data.qrcode);
                // Empezar a verificar conexión cada 3 segundos
                startStatusCheck();
            } else {
                setError(data.error || data.message || "No se pudo obtener el código QR");
            }
        } catch (err) {
            setError("Error al cargar el código QR");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const checkStatus = async () => {
        setChecking(true);
        try {
            const response = await fetch("/api/brandy/whatsapp-qr", { method: "POST" });
            const data = await response.json();
            
            if (data.connected) {
                setConnected(true);
                setQrCode(null);
            }
        } catch (err) {
            console.error("Error verificando estado:", err);
        } finally {
            setChecking(false);
        }
    };

    const startStatusCheck = () => {
        const interval = setInterval(() => {
            checkStatus();
        }, 3000);

        // Limpiar después de 2 minutos
        setTimeout(() => clearInterval(interval), 120000);
    };

    useEffect(() => {
        checkStatus();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1E73BE]/5 via-white to-[#F7941D]/5 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1E73BE] to-[#155a9b] p-6 text-white text-center">
                    <h1 className="text-2xl font-bold mb-2">🤖 Brandy WhatsApp Setup</h1>
                    <p className="text-white/90 text-sm">Conecta WhatsApp Business para enviar propuestas</p>
                </div>

                <div className="p-6">
                    {connected ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center space-y-4"
                        >
                            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-black">¡WhatsApp Conectado!</h2>
                            <p className="text-black/60">
                                Brandy ahora puede enviar propuestas automáticamente por WhatsApp
                            </p>
                            <Button
                                onClick={() => window.location.reload()}
                                className="bg-[#F7941D] hover:bg-[#F7941D]/80 text-white rounded-full px-6 py-3"
                            >
                                Cerrar
                            </Button>
                        </motion.div>
                    ) : qrCode ? (
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-sm font-semibold text-black mb-4">
                                    Escanea este código con WhatsApp Business
                                </p>
                                <div className="bg-white border-4 border-[#1E73BE] rounded-2xl p-4 inline-block">
                                    <Image
                                        src={qrCode}
                                        alt="QR Code WhatsApp"
                                        width={280}
                                        height={280}
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-black/70">
                                <p className="font-semibold text-black mb-2">📱 Pasos:</p>
                                <ol className="list-decimal list-inside space-y-1">
                                    <li>Abre WhatsApp Business en tu teléfono</li>
                                    <li>Toca Menú → Dispositivos vinculados</li>
                                    <li>Toca "Vincular un dispositivo"</li>
                                    <li>Apunta tu teléfono a esta pantalla</li>
                                </ol>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-sm text-black/60">
                                {checking ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verificando conexión...
                                    </>
                                ) : (
                                    <>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                        Esperando escaneo...
                                    </>
                                )}
                            </div>

                            <Button
                                onClick={loadQR}
                                variant="outline"
                                className="w-full border-2 border-black/10 hover:border-[#1E73BE] rounded-xl"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Generar nuevo código
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {error ? (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                    <p className="text-sm text-red-700 font-semibold mb-1">Error</p>
                                    <p className="text-xs text-red-600">{error}</p>
                                </div>
                            ) : null}

                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 mx-auto bg-[#25D366]/10 rounded-full flex items-center justify-center">
                                    <span className="text-4xl">💬</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-black mb-2">
                                        Conecta WhatsApp Business
                                    </h2>
                                    <p className="text-sm text-black/60">
                                        Necesitamos vincular tu cuenta de WhatsApp para que Brandy pueda enviar propuestas automáticamente
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={loadQR}
                                disabled={loading}
                                className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl py-6 text-base font-bold"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Generando código QR...
                                    </>
                                ) : (
                                    <>
                                        📱 Generar código QR
                                    </>
                                )}
                            </Button>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-black/60">
                                <p className="font-semibold text-black mb-1">⚠️ Importante:</p>
                                <p>
                                    Asegúrate de tener Evolution API configurado en tus variables de entorno (.env.local)
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
