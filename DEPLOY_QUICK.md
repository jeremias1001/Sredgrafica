# ⚡ Guía Rápida: Deploy a Cloudflare Pages

## Paso 1: Ir al Dashboard de Cloudflare

Entra a: https://dash.cloudflare.com/

## Paso 2: Crear Proyecto Pages

1. Haz clic en **Pages** (en el menú izquierdo)
2. Haz clic en **Create a project** → **Connect to Git**
3. Autoriza acceso a GitHub
4. Selecciona `jeremias1001/Sredgrafica`

## Paso 3: Configurar Build

Cloudflare te preguntará por estos datos:

| Campo | Valor |
|-------|-------|
| **Framework preset** | Next.js |
| **Production branch** | main |
| **Build command** | npm run build |
| **Build output directory** | .next/public |
| **Root directory** | (dejar vacío) |

👉 **Importante**: Si seleccionas "Next.js" como framework, Cloudflare configura automáticamente los valores correctos.

## Paso 4: Variables de Entorno

ANTES de hacer deploy, agrega las variables:

1. En la pantalla de build settings, haz clic en **Environment variables**
2. Agrega estas variables:

### Variables Normales
```
NODE_ENV = production
EVOLUTION_INSTANCE_NAME = redgrafica
EMAIL_FROM = noreply@redgrafica.com
NEXT_PUBLIC_BASE_URL = https://redgrafica.cloudflare.pages.dev
```

### Variables Secretas (marca como "Secret")
- `Cerebras_api_key` = tu_clave_de_cerebras
- `EVOLUTION_API_KEY` = tu_clave_de_evolution
- `RESEND_API_KEY` = tu_clave_de_resend
- `EVOLUTION_API_URL` = https://your-domain.com (o http://localhost:8080 para testing)

## Paso 5: Deploy

Haz clic en **Save and Deploy**

✅ Cloudflare construirá y desplegará automáticamente

---

## 📊 Ver el Deploy

1. Ve a **Pages** → **Tu Proyecto** → **Deployments**
2. Deberías ver un deployment con estado ✅ **Success**
3. Accede a: `https://redgrafica-store.cloudflare.pages.dev` (o la URL que proporcione Cloudflare)

---

## 🔄 Futuros Deploys

¡Super fácil! Solo haz:

```bash
git add .
git commit -m "Cambios"
git push origin main
```

Cloudflare automáticamente:
1. Detecta el push
2. Construye el proyecto
3. Despliega los cambios

¡Listo! ✨

---

## 🎯 Después: Agregar tu Dominio

1. En **Pages** → Tu Proyecto → **Custom domains**
2. Haz clic en **Add custom domain**
3. Entra: `redgrafica.store` (o tu dominio)
4. Sigue los pasos

Si tu dominio ya está en Cloudflare: ✅ Automático
Si está en otro registrador: Apunta los nameservers a Cloudflare

---

## 🆘 Si Algo Falla

### "Build failed"
→ Revisa **Deployments** → Tu deployment fallido → **View build log**

### "Brandy no envía emails"
→ Verifica que `RESEND_API_KEY` está correcto en **Settings** → **Environment variables**

### "Evolution API no funciona"
→ Verifica que `EVOLUTION_API_URL` es accesible desde internet
→ En desarrollo, puedes usar `http://localhost:8080`

---

## ✅ Checklist Final

- [ ] GitHub conectado a Cloudflare Pages
- [ ] Build settings configurados (Next.js)
- [ ] Variables de entorno agregadas
- [ ] Primer deploy exitoso (✅ Success)
- [ ] Puedo acceder a https://redgrafica-store.cloudflare.pages.dev
- [ ] Brandy funciona y envía emails
- [ ] (Opcional) Dominio personalizado apuntando a Cloudflare

¡Felicidades! Tu app está en Cloudflare Pages 🚀
