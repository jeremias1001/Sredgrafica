/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // Comentado para permitir API routes dinámicas
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'illustrations.popsy.co',
            },
            {
                protocol: 'https',
                hostname: 'undraw.co',
            },
            {
                protocol: 'https',
                hostname: 'blush.design',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dribbble.com',
            },
        ],
    },
};

module.exports = nextConfig;
