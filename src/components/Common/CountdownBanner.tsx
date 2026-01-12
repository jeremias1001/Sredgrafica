"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";

interface CountdownBannerProps {
    hoursRemaining?: number;
    message?: string;
}

export default function CountdownBanner({
    hoursRemaining = 48,
    message = "¡Oferta especial! Precios válidos por tiempo limitado"
}: CountdownBannerProps) {
    const [timeLeft, setTimeLeft] = useState({
        hours: hoursRemaining,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Get or set expiry time in localStorage
        const storageKey = 'rg_offer_expiry';
        let expiryTime = localStorage.getItem(storageKey);

        if (!expiryTime) {
            const expiry = Date.now() + (hoursRemaining * 60 * 60 * 1000);
            localStorage.setItem(storageKey, expiry.toString());
            expiryTime = expiry.toString();
        }

        const timer = setInterval(() => {
            const now = Date.now();
            const expiry = parseInt(expiryTime!);
            const diff = expiry - now;

            if (diff <= 0) {
                // Reset the timer when it expires
                const newExpiry = Date.now() + (hoursRemaining * 60 * 60 * 1000);
                localStorage.setItem(storageKey, newExpiry.toString());
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [hoursRemaining]);

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-[#F7941D] to-[#FF6B35] text-white py-3 px-4"
        >
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 animate-pulse" />
                    <span className="font-bold text-sm sm:text-base">{message}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-1">
                    <Clock className="w-4 h-4" />
                    <div className="flex items-center gap-1 font-mono font-bold">
                        <span className="bg-white/20 rounded px-2 py-0.5">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span>:</span>
                        <span className="bg-white/20 rounded px-2 py-0.5">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span>:</span>
                        <span className="bg-white/20 rounded px-2 py-0.5">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
