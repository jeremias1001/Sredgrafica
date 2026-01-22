# 🚀 Deploy a Cloudflare Pages

## ⚠️ IMPORTANTE: No uses `wrangler deploy`

Para Next.js en Cloudflare Pages, **NO uses**:
```bash
wrangler deploy  # ❌ Esto es para Workers
npm run deploy:cf  # ❌ Esto también es para Workers
```

Cloudflare Pages está optimizado para aplicaciones con Git. Usa esta opción.

---

## ✅ Opción Correcta: Deploy Automático con GitHub

### Paso 1: Conectar GitHub a Cloudflare Pages

1. Entra a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Ve a **Pages** → **Connect to Git**
3. Autoriza acceso a tu GitHub
4. Selecciona el repositorio `jeremias1001/Sredgrafica`
5. Haz clic en **Begin setup**

### Paso 2: Configurar el Build

En la sección "Build settings":

- **Framework preset**: Selecciona **Next.js**
- **Production branch**: `main`
- **Build command**: `npm run build`
- **Build output directory**: `.next/public` (o automático si seleccionas Next.js)
- **Root directory**: `/` (dejar vacío)

### Paso 3: Agregar Variables de Entorno

Haz clic en **Environment variables** y agrega:

**Variables públicas:**
```
NODE_ENV = production
EVOLUTION_INSTANCE_NAME = redgrafica
EMAIL_FROM = noreply@redgrafica.com
NEXT_PUBLIC_BASE_URL = https://tudominio.com (después de asignar dominio)
```

**Variables secretas** (marca como Secret/Encrypted):
```
Cerebras_api_key = sk_xxxxxxxxx
EVOLUTION_API_KEY = xxxxx
RESEND_API_KEY = re_xxxxxxxxx
EVOLUTION_API_URL = https://your-evolution-api.com
```

### Paso 4: Deploy

Haz clic en **Save and deploy**. 

Cloudflare ahora hará deploy automático cada vez que hagas push a `main`. ✅

---

## 🔄 Después del Deploy Inicial

### Para futuros deploys:
- Solo haz `git push` a `main`
- Cloudflare construirá y desplegará automáticamente
- Ver progreso en: Cloudflare Dashboard → Pages → Tu Proyecto → **Deployments**

### Si necesitas redeploy manual:
1. Ve a tu Proyecto en Pages
2. **Deployments** → Última versión
3. Haz clic en **Redeploy**

---

## 🎯 Configuración de Dominio Personalizado

1. En Cloudflare Pages → Tu Proyecto → **Custom domains**
2. Haz clic en **Set up a custom domain**
3. Entra tu dominio (ej: `redgrafica.store`)
4. Sigue los pasos para actualizar DNS

Si tu dominio está en Cloudflare:
- Se configura automáticamente ✨
- SSL se gestiona automáticamente

Si está en otro registrador:
- Debes apuntar los nameservers a Cloudflare
- O crear registros CNAME

---

## ✅ Verificación Post-Deploy

1. **Accede a tu site**: `https://tudominio.cloudflare.pages.dev`
2. **Prueba Brandy**: Abre el chat, verifica que funciona
3. **Envía propuesta de prueba**: Verifica que los emails se envíen
4. **Monitorea logs**: Dashboard → Tu Proyecto → **Analytics** o **Logs**

---

## 🐛 Troubleshooting

### Error: "Build failed"

Revisa los logs en **Deployments** → Tu deployment fallido → **View build log**

Causas comunes:
- Variables de entorno faltantes
- Dependencias no instaladas
- Errores en TypeScript

### Error: "API routes no funcionan"

Asegúrate de que:
- Tienes `src/app/api/**` (rutas de API)
- Archivo `next.config.js` NO tiene `output: 'export'` (debe estar comentado)
- Compilaste con `npm run build`

### Error: "Variables de entorno no se cargan"

- Verifica el nombre exacto (case-sensitive)
- **Redeploy** después de agregar variables
- Espera 5 minutos antes de verificar

### Error: "Cerebras/Evolution/Resend no responden"

- Verifica que las API keys sean correctas
- Prueba localmente primero: `npm run dev`
- Revisa los logs de Cloudflare Analytics

---

## 📱 Integración con Evolution API

En producción, necesitas que Evolution API sea accesible desde Cloudflare.

**Opción 1: Hostear Evolution en VPS**
- Despliega en DigitalOcean/Linode/AWS EC2
- Usa la URL pública en `EVOLUTION_API_URL`
- Ej: `https://evolution-api.tudominio.com`

**Opción 2: Docker en Render/Railway**
- Crea cuenta en [Render.com](https://render.com) o [Railway.app](https://railway.app)
- Despliega el `docker-compose.yaml` de Evolution
- USA la URL que proporciona

**Opción 3: Cloudflare Workers + Evolution**
- Crea un Worker que haga proxy a Evolution
- Expón como URL pública

Por ahora, en development puede ser localhost. Para production, necesitas una URL pública.

---

## 🚀 Resumen Rápido

```bash
# 1. Push a GitHub
git add .
git commit -m "Preparado para Cloudflare Pages"
git push origin main

# 2. En Cloudflare Dashboard:
#    - Pages → Connect to Git → Selecciona repo
#    - Configura build (Next.js preset)
#    - Agrega environment variables
#    - Deploy!

# 3. Para futuros cambios:
#    - Solo haz git push
#    - Cloudflare despliega automáticamente

# 4. Dominio personalizado (opcional):
#    - Pages → Custom domains
#    - Apunta tu DNS a Cloudflare
```

¡Listo! Tu sitio está en Cloudflare Pages. 🎉
