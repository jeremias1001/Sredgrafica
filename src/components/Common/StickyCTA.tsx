"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCLP } from "@/utils/format";

interface StickyCTAProps {
    cartCount: number;
    totalPrice: number;
    onClick: () => void;
}

export default function StickyCTA({ cartCount, totalPrice, onClick }: StickyCTAProps) {
    if (cartCount === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-black/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 md:hidden pb-safe"
            >
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-black/60 font-mono uppercase">Total</span>
                        <span className="font-bold font-sans text-xl">{formatCLP(totalPrice)}</span>
                    </div>
                    <Button
                        onClick={onClick}
                        className="flex-1 bg-[#1E73BE] text-white hover:bg-[#F7941D] font-bold py-6 rounded-xl transition-all shadow-lg"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2 text-white" />
                        <span className="text-white">VER ({cartCount})</span>
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
