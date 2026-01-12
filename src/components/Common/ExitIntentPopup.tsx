"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if popup was already shown
        const shown = localStorage.getItem('rg_exit_popup_shown');
        if (shown) {
            setHasShown(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                localStorage.setItem('rg_exit_popup_shown', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasShown]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would send the email to your newsletter service
        console.log('Email submitted:', email);
        localStorage.setItem('rg_newsletter_email', email);
        setIsVisible(false);
        alert('¡Gracias! Te enviaremos tu cupón de descuento.');
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsVisible(false)}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative bg-white rounded-3xl p-8 max-w-md w-full border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Content */}
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#1E73BE] to-[#F7941D] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Gift className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-2xl font-display font-black uppercase mb-2">
                            ¡Espera!
                        </h3>
                        <p className="text-3xl font-black text-[#F7941D] mb-4">
                            10% OFF
                        </p>
                        <p className="text-black/70 mb-6 font-mono">
                            Suscríbete y recibe un cupón de descuento para tu primer proyecto.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-black/20 focus:border-[#1E73BE] outline-none font-mono transition-colors"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-[#1E73BE] text-white hover:bg-[#F7941D] font-bold py-6 rounded-xl border-2 border-[#1E73BE] hover:border-[#F7941D] transition-all"
                            >
                                <span className="text-white">OBTENER MI DESCUENTO</span>
                                <ArrowRight className="w-5 h-5 ml-2 text-white" />
                            </Button>
                        </form>

                        <p className="text-xs text-black/40 mt-4">
                            Sin spam. Cancelar en cualquier momento.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
