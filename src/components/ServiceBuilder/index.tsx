"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe, Palette, Share2, Target, FileText, Search, Package,
    Check, Plus, ShoppingCart, X, ArrowRight, Sparkles, Code, Zap, MessageCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { serviceCategories } from "@/data/serviceCategories";
import { formatCLP } from "@/utils/format";
import { Service, ServiceCategory, CartService } from "@/types/service";
import EnhancedCategoryCard from "./EnhancedCategoryCard";
import WhatsAppButton from "@/components/Common/WhatsAppButton";
import CountdownBanner from "@/components/Common/CountdownBanner";
import ExitIntentPopup from "@/components/Common/ExitIntentPopup";
import ValueStack from "@/components/Common/ValueStack";
import TrustBadges from "@/components/Common/TrustBadges";
import StickyCTA from "@/components/Common/StickyCTA";
import Brandy from "@/components/Brandy";

const iconMap: Record<string, React.ElementType> = {
    Globe, Palette, Share2, Target, FileText, Search, Package, Code, Zap,
};

export default function ServiceBuilder() {
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
    const [cart, setCart] = useState<CartService[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isBrandyOpen, setIsBrandyOpen] = useState(false);
    const [brandyDiscount, setBrandyDiscount] = useState(0);
    const [showBanner, setShowBanner] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Load cart from localStorage on mount
    // Load cart from URL or localStorage on mount
    useEffect(() => {
        // First check URL params
        const searchParams = new URLSearchParams(window.location.search);
        const cartParam = searchParams.get('cart');

        if (cartParam) {
            try {
                const decodedCart = JSON.parse(atob(cartParam));
                setCart(decodedCart);
                // Clean URL
                window.history.replaceState({}, '', window.location.pathname);
                return;
            } catch (e) {
                console.error('Error loading cart from URL:', e);
            }
        }

        // Fallback to localStorage
        const savedCart = localStorage.getItem('rg_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error loading cart:', e);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('rg_cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('rg_cart');
        }
    }, [cart]);

    useEffect(() => {
        if (selectedCategory) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [selectedCategory]);

    // Auto-hide banner on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < 50) {
                setShowBanner(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down
                setShowBanner(false);
            } else {
                // Scrolling up
                setShowBanner(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const addToCart = (service: Service, category: ServiceCategory) => {
        const exists = cart.find(item => item.id === service.id);
        if (!exists) {
            setCart([...cart, { ...service, categoryId: category.id, categoryName: category.name }]);
        }
    };

    const removeFromCart = (serviceId: number) => {
        setCart(cart.filter(item => item.id !== serviceId));
    };

    const shareCart = () => {
        const encodedCart = btoa(JSON.stringify(cart));
        const url = `${window.location.origin}${window.location.pathname}?cart=${encodedCart}`;
        navigator.clipboard.writeText(url);
        alert('¡Enlace copiado! Compártelo con quien quieras para que vean tu pack.');
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Cálculo de descuento dinámico basado en múltiples criterios
    const calculateDiscount = () => {
        let discount = 0;
        
        // Criterio 1: Por cantidad de servicios
        if (cart.length >= 10) discount = Math.max(discount, 20);
        else if (cart.length >= 7) discount = Math.max(discount, 15);
        else if (cart.length >= 4) discount = Math.max(discount, 10);
        else if (cart.length >= 2) discount = Math.max(discount, 5);
        
        // Criterio 2: Por monto total
        if (totalPrice >= 2000000) discount = Math.max(discount, 20);
        else if (totalPrice >= 1500000) discount = Math.max(discount, 15);
        else if (totalPrice >= 1000000) discount = Math.max(discount, 12);
        else if (totalPrice >= 500000) discount = Math.max(discount, 10);
        
        // Criterio 3: Descuento de Brandy (puede ser hasta 20%)
        discount = Math.max(discount, brandyDiscount);
        
        // Máximo descuento: 20%
        return Math.min(discount, 20);
    };
    
    const baseDiscount = calculateDiscount();
    const discountPercent = baseDiscount;
    const discountAmount = Math.round(totalPrice * (discountPercent / 100));
    const finalPrice = totalPrice - discountAmount;
    const isInCart = (serviceId: number) => cart.some(item => item.id === serviceId);

    return (
        <div className="min-h-screen bg-white text-black selection:bg-[#1E73BE]/20 selection:text-black font-sans relative">

            {/* Urgency Countdown Banner */}
            <CountdownBanner />

            {/* Exit Intent Popup */}
            <ExitIntentPopup />

            {/* Fading Grid Pattern Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #1E73BE 1px, transparent 1px),
                            linear-gradient(to bottom, #1E73BE 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)',
                    }}
                />
            </div>

            {/* Navigation - Glassmorphism */}
            <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-black/5">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="relative h-10 w-40">
                            <Image src="/logos/logo-main.png" alt="Red Gráfica" fill className="object-contain object-left" />
                        </div>
                    </Link>

                    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                        <SheetTrigger asChild>
                            <Button className="relative bg-[#1E73BE] text-white hover:bg-[#F7941D] font-bold rounded-full px-6 transition-all border-2 border-[#1E73BE] hover:border-[#F7941D]">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                <span className="hidden sm:inline">Mi Pack</span>
                                {cart.length > 0 && (
                                    <Badge className="absolute -top-2 -right-2 bg-[#F7941D] text-white font-bold border-2 border-black text-xs">
                                        {cart.length}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] bg-white/95 backdrop-blur-2xl border-l-2 border-black p-0 shadow-2xl text-black">
                            <div className="p-6 border-b-2 border-[#1E73BE] bg-[#1E73BE]">
                                <SheetHeader>
                                    <SheetTitle className="text-2xl font-display font-black text-white uppercase flex items-center gap-2">
                                        <Sparkles className="w-6 h-6 text-[#F7941D]" />
                                        Tu Proyecto
                                    </SheetTitle>
                                </SheetHeader>
                            </div>

                            <div className="flex flex-col h-[calc(100vh-100px)]">
                                <ScrollArea className="flex-1 p-6">
                                    {cart.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-4">
                                            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center border border-black/10">
                                                <Package className="w-10 h-10 text-black/50" strokeWidth={1} />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-lg text-black">Carrito vacío</p>
                                                <p className="text-sm mt-1 text-slate-500 font-mono">Selecciona servicios para armar tu pack</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {cart.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/80 backdrop-blur-xl border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                                >
                                                    <div className="mb-3 sm:mb-0">
                                                        <p className="font-bold text-black text-lg">{item.title}</p>
                                                        <Badge variant="outline" className="mt-1 text-xs text-[#1E73BE] border-[#1E73BE]/30 font-mono">
                                                            {item.categoryName}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                                        <span className="font-sans font-black text-black text-lg">
                                                            {formatCLP(item.price)}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-black/70 hover:text-white hover:bg-red-500 rounded-full h-8 w-8 border border-black/20"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </ScrollArea>
                                {cart.length > 0 && (
                                    <div className="p-6 bg-white border-t-2 border-black/10">
                                        <ValueStack />

                                        {/* Discount Banner */}
                                        {discountPercent > 0 ? (
                                            <div className={`rounded-xl p-3 mb-4 text-center border-2 ${
                                                brandyDiscount > 0 
                                                    ? 'bg-[#1E73BE]/10 border-[#1E73BE]' 
                                                    : 'bg-[#F7941D]/10 border-[#F7941D]'
                                            }`}>
                                                <span className={`font-bold ${brandyDiscount > 0 ? 'text-[#1E73BE]' : 'text-[#F7941D]'} flex items-center justify-center gap-2`}>
                                                    <Sparkles className="w-5 h-5" />
                                                    ¡{discountPercent}% OFF aplicado!
                                                </span>
                                                <span className="text-black/70 text-sm block font-medium mt-1">
                                                    {brandyDiscount > 0 
                                                        ? `Brandy te ayudó a ahorrar ${formatCLP(discountAmount)}`
                                                        : `Por ${cart.length} servicios en tu pack`
                                                    }
                                                </span>
                                            </div>
                                        ) : cart.length === 1 ? (
                                            <div className="bg-[#1E73BE]/10 border border-[#1E73BE]/30 rounded-xl p-3 mb-4 text-center">
                                                <span className="text-[#1E73BE] font-bold text-sm flex items-center gap-2 justify-center">
                                                    <Zap className="w-4 h-4" />
                                                    ¡Añade más servicios para obtener descuento!
                                                </span>
                                            </div>
                                        ) : cart.length < 4 ? (
                                            <div className="bg-[#1E73BE]/10 border border-[#1E73BE]/30 rounded-xl p-3 mb-4 text-center">
                                                <span className="text-[#1E73BE] font-bold text-sm flex items-center gap-2 justify-center">
                                                    <Zap className="w-4 h-4" />
                                                    ¡Añade {4 - cart.length} servicio(s) más y obtén 10% OFF!
                                                </span>
                                            </div>
                                        ) : null}

                                        {/* Pricing */}
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-black/60 font-mono text-sm">Subtotal</span>
                                                <span className={`font-sans font-bold ${discountPercent > 0 ? 'line-through text-black/40' : 'text-black'}`}>
                                                    {formatCLP(totalPrice)}
                                                </span>
                                            </div>
                                            {discountPercent > 0 && (
                                                <>
                                                    <div className={`flex items-center justify-between ${
                                                        brandyDiscount > 0 ? 'text-[#1E73BE]' : 'text-[#F7941D]'
                                                    }`}>
                                                        <span className="font-mono text-sm">
                                                            Descuento ({discountPercent}%)
                                                            {brandyDiscount > 0 && <span className="ml-1 text-xs bg-[#1E73BE]/20 text-[#1E73BE] px-2 py-0.5 rounded">Brandy</span>}
                                                        </span>
                                                        <span className="font-bold">-{formatCLP(discountAmount)}</span>
                                                    </div>
                                                    <div className="border-t border-black/10 pt-2 flex items-end justify-between">
                                                        <span className="text-black/60 font-mono font-bold uppercase tracking-wider text-sm">Total</span>
                                                        <span className="text-3xl font-sans font-black text-[#1E73BE] tracking-tight">{formatCLP(finalPrice)}</span>
                                                    </div>
                                                </>
                                            )}
                                            <Button
                                                variant="outline"
                                                className="w-full mt-3 border-dashed border-2 border-black/20 hover:border-[#FAFAFA] hover:text-[#FAFAFA] hover:bg-[#F7941D] font-mono text-sm py-6 rounded-xl transition-all"
                                                onClick={shareCart}
                                            >
                                                <Share2 className="w-4 h-4 mr-2" />
                                                Compartir mi Pack
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            {/* Banner CTA con IA - Sticky y sobrio con auto-hide */}
            {!isBrandyOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                        opacity: showBanner ? 1 : 0, 
                        y: showBanner ? 0 : -100 
                    }}
                    transition={{ duration: 0.3 }}
                    className="sticky top-[73px] z-30 bg-[#1E73BE] text-white py-4 px-6 border-b-4 border-[#F7941D] shadow-lg"
                    style={{ pointerEvents: showBanner ? 'auto' : 'none' }}
                >
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/40 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-[#F7941D]" />
                            </div>
                            <div>
                                <p className="font-bold text-base md:text-lg uppercase tracking-wide">
                                    Personaliza tu pack con Brandy
                                </p>
                                <p className="text-white/80 text-sm font-mono">
                                    Abre la pestaña lateral y comparte tu visión; la IA combina servicios y desbloquea descuentos.
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsBrandyOpen(true)}
                            className="bg-white text-[#1E73BE] hover:bg-[#F7941D] hover:text-white font-bold rounded-full px-6 py-3 transition-all border-2 border-white hover:border-[#F7941D] whitespace-nowrap"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Abrir pestaña Brandy
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Builder Header - Clean & Minimal */}
            <section className="relative py-16 lg:py-24 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-black/10">
                            <span className="w-2 h-2 rounded-full bg-[#F7941D]" />
                            <span className="font-mono text-sm font-medium uppercase tracking-wider text-black/60">Configurador</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-black mb-4 uppercase">
                            Arma tu Pack
                        </h1>
                        <p className="text-xl text-black/70 font-mono max-w-2xl mx-auto">
                            Selecciona las piezas que tu marca necesita. Precios transparentes, sin sorpresas.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Grid */}
            <section className="py-8 lg:py-16 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {serviceCategories.map((category, i) => {
                            const minPrice = Math.min(...category.services.map(s => s.price));
                            const IconComponent = iconMap[category.icon] || Package;
                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                >
                                    <EnhancedCategoryCard
                                        category={category}
                                        onClick={() => setSelectedCategory(category)}
                                        minPrice={minPrice}
                                        icon={IconComponent}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Service Selection Modal - Glassmorphism + Brutalism */}
            <AnimatePresence>
                {selectedCategory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] grid place-items-center p-0 md:p-4 bg-black/40 backdrop-blur-md"
                        onClick={() => setSelectedCategory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                            className="w-full h-full md:max-w-6xl md:h-[90vh] bg-white/95 backdrop-blur-2xl border-2 border-black md:rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header - Clean Glass */}
                            <div className="relative p-6 md:p-10 border-b border-black/10 bg-white flex-shrink-0">
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 rounded-2xl bg-slate-100 border border-black/10">
                                            {React.createElement(iconMap[selectedCategory.icon] || Package, {
                                                className: "w-10 h-10 text-[#1E73BE]",
                                                strokeWidth: 1,
                                            })}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl md:text-5xl font-display font-black text-black mb-1 tracking-tight uppercase">{selectedCategory.name}</h2>
                                            <p className="text-black/70 text-lg font-mono max-w-2xl">{selectedCategory.description}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSelectedCategory(null)}
                                        className="text-black/70 hover:text-black hover:bg-slate-100 rounded-full h-12 w-12 border border-black/10 transition-colors absolute top-0 right-0 md:static"
                                    >
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>

                            {/* Services Grid */}
                            <ScrollArea className="flex-1 bg-slate-50/50">
                                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {selectedCategory.services.map((service, i) => (
                                        <motion.div
                                            key={service.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className={`
                                                relative group rounded-3xl p-8 bg-white/80 backdrop-blur-xl border-2 transition-all duration-200
                                                ${isInCart(service.id)
                                                    ? 'border-[#1E73BE] shadow-[0_0_20px_rgba(30,115,190,0.15)]'
                                                    : 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                                                }
                                            `}
                                        >
                                            {service.popular && (
                                                <Badge className="absolute top-6 right-6 bg-[#F7941D] text-white font-mono text-xs font-bold border-none">
                                                    ⭐ POPULAR
                                                </Badge>
                                            )}

                                            <div className="mb-6">
                                                <h3 className="text-2xl md:text-3xl font-bold font-sans text-black mb-2">
                                                    {service.title}
                                                </h3>
                                                <div className="h-0.5 w-12 bg-black/10 rounded-full group-hover:bg-[#1E73BE] group-hover:w-20 transition-all" />
                                            </div>

                                            <div className="space-y-6">
                                                <p className="text-black/70 text-lg leading-relaxed font-mono">
                                                    {service.description}
                                                </p>

                                                <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-black/5">
                                                    <p className="text-xs font-black text-black/50 uppercase tracking-widest font-mono">INCLUYE</p>
                                                    <ul className="space-y-2">
                                                        {service.inclusions.map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-sm text-black/70 font-medium font-mono">
                                                                <Check className="w-5 h-5 text-[#1E73BE] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-black/50 uppercase font-mono">
                                                            {service.recurring ? 'Mensual' : 'Precio'}
                                                        </span>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-3xl font-black text-black tracking-tight font-sans">
                                                                {formatCLP(service.price)}
                                                            </span>
                                                            {service.recurring && (
                                                                <span className="text-sm text-black/50 font-mono">/mes</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {isInCart(service.id) ? (
                                                        <Button
                                                            size="lg"
                                                            onClick={() => removeFromCart(service.id)}
                                                            className="bg-white text-red-500 hover:bg-red-500 hover:text-white font-bold px-6 rounded-full border-2 border-red-500 transition-all"
                                                        >
                                                            <X className="w-5 h-5 mr-2" />
                                                            QUITAR
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="lg"
                                                            onClick={() => addToCart(service, selectedCategory)}
                                                            className="bg-[#1E73BE] text-white hover:bg-[#F7941D] font-bold px-8 py-6 rounded-full border-2 border-[#1E73BE] hover:border-[#F7941D] shadow-[4px_4px_0px_0px_rgba(30,115,190,0.3)] hover:shadow-none transition-all"
                                                        >
                                                            <Plus className="w-5 h-5 mr-2 text-white" />
                                                            <span className="text-white font-bold">AGREGAR</span>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Mobile Cart */}
            <AnimatePresence>
                {cart.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 inset-x-4 md:hidden z-40"
                    >
                        <Button
                            className="w-full bg-white/90 backdrop-blur-xl text-black hover:bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl py-6 text-lg font-bold flex justify-between items-center px-6 border-2 border-black"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-[#F7941D] text-white rounded-lg px-3 py-1 text-sm font-bold font-mono">
                                    {cart.length}
                                </div>
                            </div>
                            <span className="font-display uppercase">Ver Pack</span>
                            <span className="font-sans font-black">{formatCLP(totalPrice)}</span>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp Button */}
            <WhatsAppButton phoneNumber="56912345678" />

            {/* Mobile Sticky CTA */}
            <StickyCTA
                cartCount={cart.length}
                totalPrice={finalPrice}
                onClick={() => setIsCartOpen(true)}
            />

            {/* Brandy AI Assistant */}
            <Brandy
                isOpen={isBrandyOpen}
                onClose={() => setIsBrandyOpen(false)}
                onApplyDiscount={(discount) => setBrandyDiscount(discount)}
            />

            {/* Brandy Toggle Button */}
            {!isBrandyOpen && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsBrandyOpen(true)}
                    className="fixed bottom-24 left-6 z-50 bg-gradient-to-r from-[#1E73BE] via-[#1E73BE]/80 to-[#F7941D] text-white rounded-full p-4 shadow-[0_20px_40px_rgba(30,115,190,0.3)] transition-all"
                    title="Chatea con Brandy, tu asistente de IA"
                >
                    <Sparkles className="w-6 h-6" />
                </motion.button>
            )}
        </div>
    );
}
