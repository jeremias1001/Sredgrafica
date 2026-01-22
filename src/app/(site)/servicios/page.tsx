import { Metadata } from "next";
import ServiceBuilder from "@/components/ServiceBuilder";

export const metadata: Metadata = {
    title: "Servicios de Marketing Digital & Desarrollo Web | Red Gráfica",
    description: "Catálogo completo de servicios: Desarrollo Web, Branding, Social Media, Automatización, Apps, SEO, Publicidad Digital y más. Precios competitivos, resultados garantizados.",
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen">
            <ServiceBuilder />
        </div>
    );
}
