"use client";

import { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./css/style.css";
import PreLoader from "@/components/Common/PreLoader";
import Analytics from "@/components/Common/Analytics";
import { ReduxProvider } from "@/redux/provider";

const inter = localFont({
    src: '../../public/fonts/Inter-Variable.ttf',
    variable: '--font-inter',
    display: 'swap',
});

const outfit = localFont({
    src: '../../public/fonts/Outfit-Variable.ttf',
    variable: '--font-outfit',
    display: 'swap',
});

const googleSansCode = localFont({
    src: '../../public/fonts/GoogleSansCode-Variable.ttf',
    variable: '--font-google-sans-code',
    display: 'swap',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    return (
        <html lang="es" suppressHydrationWarning={true}>
            <head>
                <title>Red Gráfica Store | Diseño & Desarrollo Digital</title>
                <meta name="description" content="Transformamos tu visión en experiencias digitales que impactan. Diseño web, branding, social media y más." />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/logos/logo-main.png" type="image/png" />
                <link rel="apple-touch-icon" href="/logos/logo-main.png" />
            </head>
            <body className={`antialiased bg-white text-black ${inter.variable} ${outfit.variable} ${googleSansCode.variable} font-sans`}>
                {loading ? (
                    <PreLoader />
                ) : (
                    <ReduxProvider>
                        <Analytics />
                        {children}
                    </ReduxProvider>
                )}
            </body>
        </html>
    );
}
