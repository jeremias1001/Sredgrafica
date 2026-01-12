"use client";

import { Check, Gift, Zap } from "lucide-react";
import { formatCLP } from "@/utils/format";

export default function ValueStack() {
    return (
        <div className="bg-gradient-to-br from-[#1E73BE]/5 to-[#F7941D]/5 border-2 border-dashed border-[#1E73BE]/20 rounded-xl p-4 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#F7941D] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                BONOS GRATIS
            </div>

            <h4 className="font-display font-black uppercase text-sm mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#F7941D]" />
                Incluido en tu pack:
            </h4>

            <ul className="space-y-3">
                <li className="flex items-start justify-between gap-2 text-sm">
                    <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1E73BE] mt-0.5" />
                        <span className="text-black/70 font-mono text-xs">Soporte Prioritario WhatsApp 24/7</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[#F7941D] font-bold text-xs">GRATIS</span>
                        <span className="text-black/30 line-through text-[10px] decoration-1">{formatCLP(50000)}</span>
                    </div>
                </li>
                <li className="flex items-start justify-between gap-2 text-sm">
                    <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1E73BE] mt-0.5" />
                        <span className="text-black/70 font-mono text-xs">Hosting Alta Velocidad (1er Mes)</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[#F7941D] font-bold text-xs">GRATIS</span>
                        <span className="text-black/30 line-through text-[10px] decoration-1">{formatCLP(25000)}</span>
                    </div>
                </li>
                <li className="flex items-start justify-between gap-2 text-sm">
                    <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1E73BE] mt-0.5" />
                        <span className="text-black/70 font-mono text-xs">Video Tutorial de Autoadministración</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[#F7941D] font-bold text-xs">GRATIS</span>
                        <span className="text-black/30 line-through text-[10px] decoration-1">{formatCLP(80000)}</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}
