# Guía de Deploy en Cloudflare Pages

## ¿Qué se corrigió?

1. **next.config.js**: Se añadió `output: 'export'` para generar un sitio estático exportado, compatible con Cloudflare Pages
2. **Optimización de imágenes**: Se desactivó la optimización de imágenes (`unoptimized: true`) ya que Cloudflare Pages no la soporta
3. **wrangler.toml**: Se creó la configuración de Wrangler para Cloudflare
4. **GitHub Actions**: Se creó un workflow automático para desplegar en cada push a main

## Requisitos Previos

Necesitas las siguientes variables de entorno en GitHub:
- `CLOUDFLARE_API_TOKEN`: Tu token de API de Cloudflare
- `CLOUDFLARE_ACCOUNT_ID`: Tu ID de cuenta de Cloudflare

### Cómo obtener estas credenciales:

1. Ve a https://dash.cloudflare.com
2. Ve a tu perfil > API Tokens
3. Crea un token con permisos para "Cloudflare Pages - Production"
4. Ve a https://dash.cloudflare.com/profile/account-home y copia tu Account ID

## Cómo configurar los Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Settings > Secrets and variables > Actions
3. Añade `CLOUDFLARE_API_TOKEN` con tu token
4. Añade `CLOUDFLARE_ACCOUNT_ID` con tu ID de cuenta

## Despliegue

### Automático (recomendado)
Simplemente haz push a la rama `main`:
```bash
git add .
git commit -m "Deploy changes"
git push origin main
```

El workflow se ejecutará automáticamente y desplegará tu sitio.

### Manual (si es necesario)
```bash
npm run build
# Luego sube la carpeta "out" a Cloudflare Pages
```

## Verificar el Deploy

1. Ve a https://dash.cloudflare.com/
2. Selecciona tu proyecto "redgrafica-store"
3. Verifica el estado del deploy en la sección de "Deployments"

## Estructura del Proyecto Post-Deploy

- `out/` - Carpeta generada con el sitio estático listo para Cloudflare Pages
- `.github/workflows/deploy.yml` - Workflow automático de GitHub Actions
- `wrangler.toml` - Configuración de Cloudflare
- `next.config.js` - Configuración de Next.js actualizada

¡Tu sitio debería estar funcionando correctamente en Cloudflare Pages!
