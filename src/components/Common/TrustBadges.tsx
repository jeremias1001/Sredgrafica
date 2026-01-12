"use client";

import { ShieldCheck, Lock, CreditCard, Award } from "lucide-react";

export default function TrustBadges() {
    return (
        <div className="flex flex-col gap-4 py-6 border-t border-black/10 mt-6">
            <div className="flex items-center justify-center gap-6 text-black/40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                {/* Simulated Payment Logos using text/icons for brutalist style */}
                <div className="flex items-center gap-1 font-bold font-mono text-xs border border-black/20 rounded px-2 py-1">
                    <span className="italic font-serif">Visa</span>
                </div>
                <div className="flex items-center gap-1 font-bold font-mono text-xs border border-black/20 rounded px-2 py-1">
                    <span className="italic">Mastercard</span>
                </div>
                <div className="flex items-center gap-1 font-bold font-mono text-xs border border-black/20 rounded px-2 py-1">
                    <span>Stripe</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-[#1E73BE]/5 p-2 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-[#1E73BE]" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-[#1E73BE]">Pago 100% Seguro</span>
                        <span className="text-[10px] text-black/60 leading-tight">Encriptación SSL 256-bit</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-[#F7941D]/5 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-[#F7941D]" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-[#F7941D]">Garantía Total</span>
                        <span className="text-[10px] text-black/60 leading-tight">Satisfacción asegurada</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
