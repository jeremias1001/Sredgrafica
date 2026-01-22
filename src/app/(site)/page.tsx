"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowRight, Star, Zap, CheckCircle, ShieldCheck,
  Sparkles, Users, Award, TrendingUp, MessageSquare, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/Common/WhatsAppButton";
import CountdownBanner from "@/components/Common/CountdownBanner";
import ExitIntentPopup from "@/components/Common/ExitIntentPopup";
import FAQSection from "@/components/Common/FAQSection";
import Brandy from "@/components/Brandy";

// Animated Counter Component
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="font-display font-black"
    >
      {isInView ? value : 0}{suffix}
    </motion.span>
  );
};

// Service Card - Glassmorphism + Brutalism
const ServiceCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="group relative p-8 rounded-[32px] bg-white/70 backdrop-blur-xl border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer"
  >
    <div className="flex flex-col h-full">
      <div className="w-14 h-14 bg-[#1E73BE]/10 rounded-2xl border border-[#1E73BE]/20 flex items-center justify-center mb-6 group-hover:bg-[#1E73BE] transition-colors">
        <Icon className="w-7 h-7 text-[#1E73BE] group-hover:text-white transition-colors" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-display font-bold uppercase mb-3 text-black">{title}</h3>
      <p className="text-black/70 font-mono text-sm leading-relaxed">{description}</p>
      <div className="mt-auto pt-6 flex items-center gap-2 text-black/60 group-hover:text-[#F7941D] font-bold transition-colors">
        <span className="text-sm">Ver más</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);

// Process Step Component
const ProcessStep = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full border-2 border-black flex items-center justify-center font-display font-black text-xl group-hover:bg-[#F7941D] group-hover:text-white transition-colors">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-display font-bold mb-2">{title}</h4>
        <p className="text-black/70 font-mono text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function HomePage() {
  const [isBrandyOpen, setIsBrandyOpen] = useState(false);
  const [brandyDiscount, setBrandyDiscount] = useState(0);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#1E73BE]/20 selection:text-black font-sans overflow-x-hidden relative">

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

      {/* NAVIGATION - Glassmorphism */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-black/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-40">
              <Image src="/logos/logo-main.png" alt="Red Gráfica" fill className="object-contain object-left" />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#servicios" className="font-mono text-sm text-black/70 hover:text-black transition-colors">Servicios</Link>
            <Link href="#proceso" className="font-mono text-sm text-black/70 hover:text-black transition-colors">Proceso</Link>
            <Link href="#nosotros" className="font-mono text-sm text-black/70 hover:text-black transition-colors">Nosotros</Link>
          </div>

          <Link href="/servicios">
            <Button className="bg-[#1E73BE] text-white hover:bg-[#F7941D] font-bold rounded-full px-6 transition-all border-2 border-[#1E73BE] hover:border-[#F7941D]">
              Comenzar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* 1. HERO SECTION - Clean & Minimal */}
      <section className="relative min-h-[85vh] flex items-center py-20 lg:py-32 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Subtle Badge */}
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full mb-8 border border-black/10">
                  <span className="w-2 h-2 rounded-full bg-[#F7941D]" />
                  <span className="font-mono text-xs font-medium uppercase tracking-wider text-black/70">Diseño & Desarrollo</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[0.9] mb-8 text-black">
                  Navegando el <br />
                  <span className="relative inline-block">
                    paisaje
                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                      <path d="M2 6C50 2 150 2 298 6" stroke="#F7941D" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  </span>{" "}
                  digital
                </h1>

                <p className="text-lg text-black/70 max-w-lg mb-10 leading-relaxed font-mono">
                  Transformamos tu visión en experiencias digitales que impactan.
                  Sin agencias lentas, sin costos ocultos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => setIsBrandyOpen(true)}
                    className="bg-[#1E73BE] text-white hover:bg-[#F7941D] rounded-full px-10 py-7 text-lg font-bold transition-all border-2 border-[#1E73BE] hover:border-[#F7941D]"
                  >
                    Arma tu proyecto con IA
                  </Button>
                  <Link href="/servicios">
                    <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-all bg-white">
                      Ver Catálogo Completo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                {/* Social Proof */}
                <div className="mt-12 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-black/50">
                        {i === 4 ? <span className="text-[#1E73BE]">50+</span> : <Users className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F7941D] text-[#F7941D]" />
                      ))}
                    </div>
                    <p className="text-xs text-black/60 font-mono">de <strong className="text-black">50+ clientes</strong> satisfechos</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Visual Element - Subtle & Elegant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Solid shapes with brand colors */}
                <div className="absolute top-10 right-10 w-56 h-56 bg-[#F7941D] rounded-[40px] border-2 border-black rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
                <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#1E73BE] rounded-full border-2 border-black" />
                {/* White square with design icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-black rounded-[48px] -rotate-6 bg-white flex items-center justify-center">
                  <Sparkles className="w-20 h-20 text-[#1E73BE] rotate-6" strokeWidth={1} />
                </div>

                {/* Floating elements with subtle brand colors */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-16 left-16 bg-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Award className="w-8 h-8 text-[#1E73BE]" strokeWidth={1} />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-24 right-16 bg-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <TrendingUp className="w-8 h-8 text-[#F7941D]" strokeWidth={1} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE BAND - Subtle */}
      <div className="bg-[#1E73BE] py-4 overflow-hidden border-y border-[#1E73BE]">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-sm font-mono font-bold uppercase tracking-widest text-white flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#F7941D] rounded-full" />
              DISEÑO WEB
              <span className="w-1.5 h-1.5 bg-[#1E73BE] rounded-full" />
              BRANDING
              <span className="w-1.5 h-1.5 bg-[#F7941D] rounded-full" />
              SOCIAL MEDIA
              <span className="w-1.5 h-1.5 bg-[#1E73BE] rounded-full" />
              PUBLICIDAD
            </span>
          ))}
        </div>
      </div>

      {/* 3. SERVICES GRID */}
      <section id="servicios" className="py-24 lg:py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
            <div>
              <span className="font-mono text-xs text-black/50 uppercase tracking-widest mb-2 block">Lo que hacemos</span>
              <h2 className="text-4xl lg:text-5xl font-display font-black uppercase text-black">
                Servicios
              </h2>
            </div>
            <p className="text-lg text-black/70 max-w-xl font-mono lg:ml-auto">
              Soluciones digitales completas para hacer crecer tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="Desarrollo Web"
              description="Sitios modernos, rápidos y optimizados para convertir."
              icon={Zap}
            />
            <ServiceCard
              title="Branding"
              description="Identidad visual que comunica tu esencia."
              icon={Sparkles}
            />
            <ServiceCard
              title="Social Media"
              description="Estrategias que conectan y generan engagement."
              icon={MessageSquare}
            />
            <ServiceCard
              title="Publicidad Digital"
              description="Campañas que maximizan tu retorno."
              icon={TrendingUp}
            />
            <ServiceCard
              title="SEO"
              description="Posicionamiento para que te encuentren primero."
              icon={Award}
            />
            <ServiceCard
              title="Consultoría"
              description="Asesoría estratégica personalizada."
              icon={Users}
            />
          </div>
        </div>
      </section>

      {/* CTA INTERMEDIO - BRANDY IA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1E73BE] via-[#1E73BE]/70 to-[#F7941D] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-white/30">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">Asistente IA Disponible 24/7</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight">
              <span className="inline-flex items-center gap-3 flex-wrap justify-center">
                <Sparkles className="w-12 h-12 text-[#F7941D]" />
                <span className="text-[#F7941D]">Brandy</span> arma tu proyecto
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-white">en minutos, no en días</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto font-mono leading-relaxed">
              Nuestra IA analiza tu negocio, recomienda servicios y calcula descuentos automáticamente.
            </p>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-[#F7941D]/20 p-3 rounded-2xl backdrop-blur-xl">
                <Star className="w-8 h-8 text-[#F7941D] fill-[#F7941D]" />
              </div>
              <p className="text-2xl font-bold text-white">
                Hasta <span className="text-[#F7941D]">20% de descuento</span> en packs completos
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => setIsBrandyOpen(true)}
                className="bg-white text-[#1E73BE] hover:bg-[#F7941D] hover:text-white rounded-full px-12 py-7 text-lg font-bold transition-all border-2 border-white hover:border-[#F7941D]"
              >
                <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Hablar con Brandy (Gratis)
              </Button>

              <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/20 backdrop-blur-xl px-4 py-3 rounded-full border-2 border-white/40">
                <CheckCircle className="w-5 h-5 text-[#1E73BE]" />
                <span>Sin tarjeta • Sin compromiso</span>
              </div>
            </div>

            {/* Mini features */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              {[
                { icon: Zap, text: "Respuestas en menos de 3 segundos" },
                { icon: Star, text: "Descuentos automáticos hasta 20%" },
                { icon: MessageSquare, text: "Entiende tu negocio al instante" },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all">
                  <item.icon className="w-7 h-7 text-[#F7941D] mx-auto mb-3" strokeWidth={2.3} />
                  <p className="text-white/90 text-sm font-bold font-mono">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Social proof mini */}
            <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-mono">
              <Users className="w-5 h-5" />
              <span>Ya ayudó a más de 50+ negocios a ahorrar miles</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#F7941D]/20 rounded-full blur-3xl" />
      </section>

      {/* 4. STATS - Minimal */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-xl border-y border-black/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 50, suffix: "+", label: "Proyectos" },
              { value: 98, suffix: "%", label: "Clientes Satisfechos" },
              { value: 3, suffix: "x", label: "Más Conversiones" },
              { value: 24, suffix: "h", label: "Respuesta" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl lg:text-4xl text-black">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-black/50 mt-1 font-mono uppercase text-xs tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section id="proceso" className="py-24 lg:py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
            <div>
              <span className="font-mono text-xs text-black/50 uppercase tracking-widest mb-2 block">Cómo trabajamos</span>
              <h2 className="text-4xl lg:text-5xl font-display font-black uppercase text-black">
                Proceso
              </h2>
            </div>
            <p className="text-lg text-black/70 max-w-xl font-mono lg:ml-auto">
              Un método probado para resultados excepcionales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep number="01" title="Discovery" description="Entendemos tu negocio y objetivos." />
            <ProcessStep number="02" title="Diseño" description="Creamos propuestas visuales alineadas." />
            <ProcessStep number="03" title="Desarrollo" description="Construimos soluciones optimizadas." />
            <ProcessStep number="04" title="Lanzamiento" description="Desplegamos y monitoreamos." />
          </div>
        </div>
      </section>

      {/* 6. WHY US SECTION */}
      <section id="nosotros" className="py-24 lg:py-32 px-6 bg-white/50 backdrop-blur-xl">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-xs text-black/50 uppercase tracking-widest mb-2 block">Por qué elegirnos</span>
              <h2 className="text-4xl lg:text-5xl font-display font-black uppercase mb-8 text-black">
                Red Gráfica
              </h2>

              <div className="space-y-4">
                {[
                  { icon: Zap, title: "Velocidad", desc: "Entregas en días, no meses." },
                  { icon: ShieldCheck, title: "Garantía", desc: "Satisfacción 100% asegurada." },
                  { icon: Users, title: "Dedicación", desc: "Comunicación directa siempre." },
                  { icon: TrendingUp, title: "Resultados", desc: "Métricas claras y ROI medible." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-black/5 hover:border-black/20 transition-colors group">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-black/10 group-hover:border-[#1E73BE] transition-colors">
                      <item.icon className="w-5 h-5 text-black/70 group-hover:text-[#1E73BE] transition-colors" strokeWidth={1} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-0.5">{item.title}</h4>
                      <p className="text-black/60 font-mono text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial - Glass Card */}
            <div className="relative">
              <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Quote className="w-8 h-8 text-[#1E73BE] mb-4" />
                <p className="text-lg italic leading-relaxed text-black/70 mb-6">
                  "Red Gráfica transformó nuestra presencia digital. En 2 semanas teníamos un sitio que triplicó conversiones.
                  <strong className="text-black"> Profesionalismo de otro nivel.</strong>"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1E73BE] to-[#F7941D] rounded-full flex items-center justify-center text-white font-bold">CM</div>
                  <div>
                    <div className="font-bold">Carlos Mendoza</div>
                    <div className="text-sm text-black/60 font-mono">CEO, TechStartup Chile</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F7941D] text-[#F7941D]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-20 px-6 bg-[#1E73BE]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-white/80 uppercase tracking-wider text-sm font-mono font-bold">Testimonios</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase mt-2">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "María González",
                role: "Dueña, Boutique Bella",
                text: "Mi tienda online aumentó ventas un 280% en el primer mes. La inversión se pagó sola.",
                initials: "MG"
              },
              {
                name: "Roberto Silva",
                role: "Fundador, Fit Academy",
                text: "El equipo de Red Gráfica entiende lo que necesitas. Rápidos, profesionales y muy creativos.",
                initials: "RS"
              },
              {
                name: "Andrea Pérez",
                role: "CMO, Innovate Labs",
                text: "Nuestras campañas de Meta Ads ahora generan 5x más leads. Excelente retorno de inversión.",
                initials: "AP"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#F7941D] text-[#F7941D]" />
                  ))}
                </div>
                <p className="text-black/80 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1E73BE] to-[#F7941D] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-black/60 font-mono">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ SECTION */}
      <FAQSection />

      {/* 7. CTA FINAL */}
      <section className="py-24 lg:py-40 px-6 text-center relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase mb-8 leading-none" style={{ color: '#FFFFFF' }}>
              ¿Listo para escalar?
            </h2>
            <p className="text-lg mb-12 max-w-xl mx-auto font-mono" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Deja de perder clientes por una imagen amateur.
            </p>
            <Link href="/servicios">
              <Button size="lg" className="bg-[#F7941D] text-black hover:bg-white rounded-full px-12 py-8 text-xl font-bold border-2 border-[#F7941D] hover:border-white transition-all">
                <span className="text-black font-bold">COMENZAR PROYECTO</span>
                <ArrowRight className="ml-2 w-6 h-6 text-black" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/20" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative h-8 w-32">
              <Image src="/logos/logo-main.png" alt="Red Gráfica" fill className="object-contain object-left brightness-0 invert" />
            </div>
            <p className="text-sm font-mono" style={{ color: '#FFFFFF' }}>© 2024 RED GRÁFICA STORE</p>
            <div className="flex gap-6">
              <Link href="https://www.instagram.com/redgraficachile" target="_blank" className="text-sm font-mono transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }}>Instagram</Link>
              <Link href="#" className="text-sm font-mono transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }}>LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for Marquee Animation */}
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="56912345678" />

      {/* Brandy AI Assistant */}
      <Brandy
        isOpen={isBrandyOpen}
        onClose={() => setIsBrandyOpen(false)}
        onApplyDiscount={(discount) => setBrandyDiscount(discount)}
      />

      {/* Brandy Toggle Button - Derecha abajo con icono mejorado */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsBrandyOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#1E73BE] via-[#1E73BE]/80 to-[#F7941D] text-white rounded-full p-5 shadow-[0_10px_30px_rgba(30,115,190,0.3)] transition-all group border-2 border-white"
        title="Chatea con Brandy - IA que arma tu proyecto"
      >
        <div className="relative flex items-center justify-center">
          <Sparkles className="w-6 h-6" strokeWidth={2} />
          <div className="absolute inset-0 rounded-full border border-white/60" />
        </div>
        
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1E73BE] to-[#F7941D] animate-ping opacity-30" />
        
        {/* Badge con oferta - más visible */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, type: "spring" }}
          className="absolute -top-3 -right-3 bg-gradient-to-r from-[#F7941D] to-[#ff8c3d] text-white text-xs font-black px-3 py-1.5 rounded-full border-2 border-white flex items-center gap-1"
        >
          <Star className="w-3 h-3 fill-white" />
          20%
        </motion.div>
        
        {/* Texto flotante */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#1E73BE] px-4 py-2 rounded-xl shadow-lg font-bold text-sm whitespace-nowrap hidden md:group-hover:block border-2 border-[#1E73BE]"
        >
          Habla con Brandy
        </motion.div>
      </motion.button>
    </div >
  );
}
