module.exports = {
    apps: [{
        name: 'redgrafica-store',
        script: 'npm',
        args: 'run dev',
        cwd: '/home/RedGraficaStore',
        watch: false,
        autorestart: true,
        max_restarts: 10,
        env: {
            NODE_ENV: 'development',
            PORT: 3000
        }
    }]
};
