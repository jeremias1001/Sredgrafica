"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

interface BrandyProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyDiscount?: (discountPercentage: number) => void;
}

export default function Brandy({ isOpen, onClose, onApplyDiscount }: BrandyProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactMethod, setContactMethod] = useState<"whatsapp" | "email" | null>(null);
    const [contactValue, setContactValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Welcome message cuando abre
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage: Message = {
                role: "assistant",
                content: "¡Hola! Soy Brandy, tu asistente de IA especializada en servicios digitales. Te ayudaré a armar el pack perfecto para tu negocio. Cuéntame, ¿en qué puedo ayudarte hoy? ¿Qué tipo de servicios necesitas?",
                timestamp: new Date().toISOString(),
            };
            setMessages([welcomeMessage]);
        }
    }, [isOpen]);

    // Auto-scroll a último mensaje
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: input,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/brandy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: messages.concat(userMessage).map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) throw new Error("Error en respuesta");

            const data = await response.json();
            const assistantMessage: Message = {
                role: "assistant",
                content: data.message || "Disculpa, no pude procesar tu solicitud",
                timestamp: data.timestamp,
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // Detectar solicitud de contacto: SOLO cuando Brandy pregunta por WhatsApp o Correo para ENVIAR la propuesta
            const messageLower = data.message.toLowerCase();
            if (
                // Debe incluir palabras clave que indiquen envío de propuesta
                (messageLower.includes("whatsapp") || messageLower.includes("correo") || messageLower.includes("email")) &&
                // Y debe mencionar "envío", "envíe", "contacto", "propuesta"
                (messageLower.includes("enví") || messageLower.includes("prefieres") || messageLower.includes("método de contacto") || messageLower.includes("contacta"))
            ) {
                setShowContactForm(true);
            }

            // Lógica inteligente de descuento
            
            // Detectar si se completó un pack o se hizo una recomendación
            let recommendedDiscount = 0;
            
            // Criterios para otorgar descuento
            if (
                messageLower.includes("te recomiendo") ||
                messageLower.includes("perfecto pack") ||
                messageLower.includes("he preparado") ||
                messageLower.includes("especialmente para ti") ||
                messageLower.includes("te propongo") ||
                messageLower.includes("sería ideal") ||
                messageLower.includes("combinar") ||
                messageLower.includes("¡perfecto!")
            ) {
                recommendedDiscount = 15; // Descuento por recomendación de Brandy
            }
            
            // Aumentar descuento si menciona pack completado
            if (messageLower.includes("pack completo") || messageLower.includes("todo lo necesitas")) {
                recommendedDiscount = 20; // Máximo descuento por pack completo
            }
            
            // Aplicar descuento si aún no se ha aplicado y hay descuento recomendado
            if (recommendedDiscount > 0 && !discountApplied) {
                setDiscountApplied(true);
                setDiscountPercentage(recommendedDiscount);
                if (onApplyDiscount) {
                    onApplyDiscount(recommendedDiscount);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            const errorMessage: Message = {
                role: "assistant",
                content: "Disculpa, tuve un error. Por favor intenta de nuevo.",
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContactSubmit = async () => {
        if (!contactValue.trim() || !contactMethod) return;

        const contactMessage = contactMethod === "whatsapp" 
            ? `Mi número de WhatsApp es: ${contactValue}`
            : `Mi correo es: ${contactValue}`;

        const userMessage: Message = {
            role: "user",
            content: contactMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setShowContactForm(false);
        setIsLoading(true);

        try {
            // Primero notificar a Brandy que se proporcionó el contacto
            const response = await fetch("/api/brandy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: messages.concat(userMessage).map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) throw new Error("Error en respuesta");

            const data = await response.json();
            const assistantMessage: Message = {
                role: "assistant",
                content: data.message || "Disculpa, no pude procesar tu solicitud",
                timestamp: data.timestamp,
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // Intentar enviar la propuesta real
            const sendEndpoint = contactMethod === "whatsapp" 
                ? "/api/brandy/send-whatsapp"
                : "/api/brandy/send-email";

            const sendPayload = contactMethod === "whatsapp"
                ? {
                    phone: contactValue,
                    message: data.message,
                    discount: discountPercentage,
                }
                : {
                    email: contactValue,
                    message: data.message,
                    discount: discountPercentage,
                };

            try {
                const sendResponse = await fetch(sendEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(sendPayload),
                });

                if (sendResponse.ok) {
                    console.log(`${contactMethod} enviado correctamente`);
                } else {
                    console.warn(`No se pudo enviar ${contactMethod}, pero se guardó el contacto`);
                }
            } catch (sendError) {
                console.warn("Servicio de envío no disponible, contacto guardado:", sendError);
            }

            // Limpiar formulario
            setContactValue("");
            setContactMethod(null);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
                    />

                    {/* Tabbed panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-[420px] border-l border-black/10 bg-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] flex flex-col"
                    >
                        <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
                            <div className="flex items-center gap-2 rounded-r-full border border-[#F7941D]/40 bg-[#F7941D] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                                <Sparkles className="w-4 h-4" />
                                Brandy AI
                            </div>
                        </div>
                        <div className="px-5 py-4 flex items-center justify-between gap-3 bg-[#1E73BE] text-white">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 bg-white/15 rounded-2xl border border-white/40 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-[#F7941D]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Brandy</h3>
                                    <p className="text-xs text-white/80">Asistente para armar tu pack</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-white hover:bg-white/20"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {discountApplied && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="border-b border-[#F7941D]/30 bg-[#F7941D]/10 px-4 py-3 text-center text-sm font-semibold text-[#F7941D]"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Star className="w-4 h-4 fill-[#F7941D]" />
                                    ¡{discountPercentage}% de descuento aplicado!
                                    <Star className="w-4 h-4 fill-[#F7941D]" />
                                </div>
                            </motion.div>
                        )}

                        <div
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[#F7F8FA]"
                        >
                            {messages.map((message, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                                            message.role === "user"
                                                ? "bg-[#1E73BE] text-white rounded-br-none"
                                                : "bg-white border border-black/5 text-black rounded-bl-none"
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {message.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-black/10">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-[#1E73BE] rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-[#1E73BE] rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="w-2 h-2 bg-[#1E73BE] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-black/10 bg-white px-4 py-4">
                            {showContactForm ? (
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-black/70 text-center">¿Cómo prefieres recibir tu propuesta?</p>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => setContactMethod("whatsapp")}
                                            className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                                                contactMethod === "whatsapp"
                                                    ? "bg-[#25D366] text-white border-2 border-[#25D366]"
                                                    : "bg-white text-black border-2 border-black/10 hover:border-[#25D366]"
                                            }`}
                                        >
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            WhatsApp
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setContactMethod("email")}
                                            className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                                                contactMethod === "email"
                                                    ? "bg-[#1E73BE] text-white border-2 border-[#1E73BE]"
                                                    : "bg-white text-black border-2 border-black/10 hover:border-[#1E73BE]"
                                            }`}
                                        >
                                            📧 Correo
                                        </Button>
                                    </div>
                                    {contactMethod && (
                                        <div className="flex gap-2">
                                            <input
                                                type={contactMethod === "whatsapp" ? "tel" : "email"}
                                                value={contactValue}
                                                onChange={(e) => setContactValue(e.target.value)}
                                                placeholder={contactMethod === "whatsapp" ? "+56 9 1234 5678" : "tu@email.com"}
                                                className="flex-1 rounded-full border border-black/10 px-4 py-2 text-sm focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
                                            />
                                            <Button
                                                type="button"
                                                onClick={handleContactSubmit}
                                                disabled={!contactValue.trim()}
                                                className="bg-[#F7941D] hover:bg-[#F7941D]/80 text-white rounded-full p-2 disabled:opacity-50"
                                            >
                                                <Send className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Cuéntame qué necesitas..."
                                        disabled={isLoading}
                                        className="flex-1 rounded-full border border-black/10 px-4 py-2 text-sm focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE] disabled:opacity-50"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="bg-[#F7941D] hover:bg-[#F7941D]/80 text-white rounded-full p-2 disabled:opacity-50"
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
