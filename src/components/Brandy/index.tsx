"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Sparkles } from "lucide-react";
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
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Welcome message cuando abre
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage: Message = {
                role: "assistant",
                content: "¡Hola! 👋 Soy Brandy, tu asistente de IA especializada en servicios digitales. Te ayudaré a armar el pack perfecto para tu negocio. Cuéntame, ¿en qué puedo ayudarte hoy? ¿Qué tipo de servicios necesitas?",
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

            // Lógica inteligente de descuento
            const messageLower = data.message.toLowerCase();
            
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

                    {/* Chat Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-black/10"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                                    <Sparkles className="relative w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Brandy ✨</h3>
                                    <p className="text-xs text-white/80">Asistente de servicios digitales</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="hover:bg-white/20 text-white"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Discount Badge */}
                        {discountApplied && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-r from-purple-50 to-blue-50 border-b-2 border-purple-300 p-3 text-center"
                            >
                                <p className="text-sm font-bold text-purple-700">
                                    ✅ ¡{discountPercentage}% de descuento aplicado! 🎉
                                </p>
                            </motion.div>
                        )}

                        {/* Messages */}
                        <div
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white"
                        >
                            {messages.map((message, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${
                                        message.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-3 rounded-2xl ${
                                            message.role === "user"
                                                ? "bg-blue-600 text-white rounded-br-none"
                                                : "bg-slate-100 text-black rounded-bl-none border border-slate-200"
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
                                    <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-none">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-black/10 p-4 bg-white rounded-b-2xl">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Cuéntame qué necesitas..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 border border-black/10 rounded-full focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:opacity-50"
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 disabled:opacity-50"
                                >
                                    <Send className="w-5 h-5" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
