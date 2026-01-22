"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppButtonProps {
    phoneNumber: string;
    message?: string;
    position?: 'left' | 'right';
}

export default function WhatsAppButton({
    phoneNumber,
    message = "¡Hola! Me interesa saber más sobre sus servicios de diseño web y marketing digital.",
    position = 'left'
}: WhatsAppButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const positionClasses = position === 'right' 
        ? 'bottom-6 right-6' 
        : 'bottom-6 left-6';

    const bubblePositionClasses = position === 'right'
        ? 'bottom-20 right-0'
        : 'bottom-20 left-0';

    return (
        <div className={`fixed ${positionClasses} z-50`}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className={`absolute ${bubblePositionClasses} w-72 bg-white rounded-2xl shadow-2xl border-2 border-black overflow-hidden`}
                    >
                        {/* Header */}
                        <div className="bg-[#25D366] p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                            </div>
                            <div className="text-white">
                                <p className="font-bold text-sm">Red Gráfica</p>
                                <p className="text-xs opacity-90">Responde en minutos</p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 bg-[#E5DDD5]">
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                <p className="text-sm text-gray-800">
                                    ¡Hola! ¿En qué podemos ayudarte hoy?
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Cuéntanos sobre tu proyecto y te asesoramos gratis.
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="p-4 bg-white">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-center py-3 rounded-xl font-bold transition-colors"
                            >
                                Iniciar Conversación
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all border-2 border-black
                    ${isOpen ? 'bg-gray-700' : 'bg-[#25D366] hover:bg-[#128C7E]'}
                `}
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <MessageCircle className="w-8 h-8 text-white" />
                )}
            </motion.button>

            {/* Pulse animation when closed */}
            {!isOpen && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
        </div>
    );
}
