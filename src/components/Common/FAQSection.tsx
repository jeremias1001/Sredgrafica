"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        question: "¿Cuánto tiempo toma un proyecto web?",
        answer: "Depende de la complejidad. Una landing page toma 3-5 días hábiles. Una web corporativa 1-2 semanas. Un e-commerce 2-4 semanas. Te damos fechas exactas al iniciar."
    },
    {
        question: "¿Qué incluye el precio?",
        answer: "Incluye diseño, desarrollo, textos base, optimización móvil, SEO básico y 2 rondas de revisiones. NO incluye hosting, dominio, ni contenido fotográfico (pero podemos cotizarlo aparte)."
    },
    {
        question: "¿Cómo es el proceso de pago?",
        answer: "50% al iniciar el proyecto y 50% al entregar. Aceptamos transferencia bancaria, MercadoPago y tarjetas de crédito. Proyectos grandes pueden pagarse en cuotas."
    },
    {
        question: "¿Ofrecen soporte post-entrega?",
        answer: "Sí, incluimos 30 días de soporte gratuito para ajustes menores. Después ofrecemos planes de mantenimiento mensual desde $100.000."
    },
    {
        question: "¿Puedo ver ejemplos de trabajos anteriores?",
        answer: "¡Por supuesto! Contáctanos por WhatsApp y te enviamos nuestro portafolio completo con casos de éxito de clientes reales."
    },
    {
        question: "¿Qué pasa si no me gusta el diseño?",
        answer: "Trabajamos con un proceso de aprobación por etapas. Primero apruebas el wireframe, luego el diseño visual. Incluimos revisiones hasta que estés 100% satisfecho."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 px-6 bg-slate-50">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 px-4 py-2 rounded-full mb-4">
                        <HelpCircle className="w-5 h-5 text-[#1E73BE]" />
                        <span className="text-[#1E73BE] font-bold font-mono text-sm">FAQ</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-black uppercase">
                        Preguntas Frecuentes
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border-2 border-black/10 overflow-hidden hover:border-[#1E73BE]/30 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-lg pr-4">{item.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="w-6 h-6 text-[#1E73BE]" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-6 pb-6 text-black/70 font-mono leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
