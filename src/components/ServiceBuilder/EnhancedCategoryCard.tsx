"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServiceCategory } from "@/types/service";
import { formatCLP } from "@/utils/format";

interface EnhancedCategoryCardProps {
    category: ServiceCategory;
    onClick: () => void;
    minPrice: number;
    icon: React.ElementType;
}

export default function EnhancedCategoryCard({ category, onClick, minPrice, icon: Icon }: EnhancedCategoryCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="h-full"
        >
            {/* Glassmorphism + Brutalism Card */}
            <div
                className="group relative h-full bg-white/70 backdrop-blur-xl rounded-[32px] border-2 border-black overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                onClick={onClick}
            >
                {/* Subtle gradient on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, rgba(30,115,190,0.03) 0%, rgba(247,148,29,0.03) 100%)` }}
                />

                <div className="p-8 flex flex-col h-full relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <Badge
                            variant="outline"
                            className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-black border-black bg-white rounded-full"
                        >
                            {category.services.length} Servicios
                        </Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-black mb-4 leading-[0.95]">
                        {category.name}
                    </h3>
                    <p className="text-black/60 mb-8 line-clamp-3 text-base font-mono leading-relaxed group-hover:text-black transition-colors">
                        {category.description}
                    </p>

                    {/* Icon Area - Subtle color accent */}
                    <div className="flex-1 flex items-center justify-center py-6 mb-6">
                        <motion.div
                            className="relative"
                            whileHover={{ rotate: 6, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {/* Icon container with brand color */}
                            <div className="w-28 h-28 bg-[#1E73BE] rounded-3xl flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                <Icon
                                    strokeWidth={1.5}
                                    className="w-14 h-14 text-white"
                                />
                            </div>
                            {/* Subtle glow on hover */}
                            <div className="absolute inset-0 rounded-3xl bg-[#1E73BE]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                        </motion.div>
                    </div>

                    {/* Footer / Price */}
                    <div className="mt-auto pt-6 border-t border-black/10 flex items-center justify-between group-hover:border-black/30 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-black/60 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">Desde</span>
                            <span className="text-2xl font-sans font-black text-black tracking-tight">
                                {formatCLP(minPrice)}
                            </span>
                        </div>

                        {/* Arrow button with subtle accent */}
                        <div className="rounded-full w-12 h-12 flex items-center justify-center border-2 border-black bg-white group-hover:bg-[#F7941D] group-hover:border-[#F7941D] transition-all duration-300">
                            <ArrowRight className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
