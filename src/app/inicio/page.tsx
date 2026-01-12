import ServiceBuilder from "@/components/ServiceBuilder";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Arma tu Pack | Red Gráfica Store",
    description: "Arma tu pack de servicios digitales a medida. Precios transparentes, sin sorpresas.",
};

export default function InicioPage() {
    return <ServiceBuilder />;
}
