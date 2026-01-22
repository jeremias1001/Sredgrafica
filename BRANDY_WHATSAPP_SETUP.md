# Configuración de WhatsApp con Evolution API para Brandy

## 🎯 Qué hace
Cuando Brandy termina de armar un pack personalizado, solicita al usuario su método de contacto preferido (WhatsApp o email). Una vez proporcionado, envía automáticamente la propuesta con descuentos.

## ⚡ Setup rápido con código QR (RECOMENDADO)

### 1. Configura Evolution API

Agrega estas variables a tu `.env.local`:

```bash
# Evolution API (WhatsApp)
EVOLUTION_API_URL=https://your-evolution-api.com
EVOLUTION_API_KEY=your_global_api_key
EVOLUTION_INSTANCE_NAME=redgrafica
```

### 2. Abre la página de setup

Navega a: **`http://localhost:3000/brandy-setup`**

### 3. Sigue los pasos en pantalla

1. Click en "📱 Generar código QR"
2. Abre WhatsApp Business en tu teléfono
3. Ve a: Menú → Dispositivos vinculados → Vincular dispositivo
4. Escanea el código QR que aparece en pantalla
5. ¡Listo! El sistema detectará automáticamente la conexión

**¡Eso es todo!** No necesitas configurar nada más manualmente.

---

## 📋 Requisitos previos

### 1. Evolution API
Necesitas una instancia activa de Evolution API. Puedes:
- Instalarla localmente: https://github.com/EvolutionAPI/evolution-api
- Usar un servicio hospedado (recomendado)

### 2. Crear una instancia en Evolution API

```bash
curl -X POST "https://your-evolution-api.com/instance/create" \
  -H "apikey: YOUR_GLOBAL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "redgrafica",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS"
  }'
```

### 3. Escanear código QR

Accede a:
```
https://your-evolution-api.com/instance/connect/redgrafica?apikey=YOUR_GLOBAL_API_KEY
```

Escanea el código QR con WhatsApp Business desde tu teléfono.

## ⚙️ Configuración en tu proyecto

### 1. Variables de entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# Evolution API (WhatsApp)
EVOLUTION_API_URL=https://your-evolution-api.com
EVOLUTION_API_KEY=your_global_api_key
EVOLUTION_INSTANCE_NAME=redgrafica

# Resend (Email - opcional)
RESEND_API_KEY=re_your_resend_key
EMAIL_FROM=noreply@redgrafica.com
```

### 2. Verificar que funciona

```bash
# Test de WhatsApp
curl -X POST "http://localhost:3000/api/brandy/send-whatsapp" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+56912345678",
    "message": "Hola, esta es una prueba",
    "discount": 15
  }'

# Test de Email (requiere Resend configurado)
curl -X POST "http://localhost:3000/api/brandy/send-email" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "message": "Hola, esta es una prueba",
    "discount": 15
  }'
```

## 🔄 Flujo de uso

1. **Usuario chatea con Brandy** → Le cuenta qué servicios necesita
2. **Brandy recomienda pack** → Arma propuesta personalizada
3. **Brandy solicita contacto** → "¿Prefieres WhatsApp o correo?"
4. **Usuario elige método** → Aparece formulario inline
5. **Usuario ingresa dato** → Teléfono o email
6. **Sistema envía propuesta** → Via Evolution API o Resend
7. **Confirmación** → Brandy confirma el envío

## 📱 Formato de mensaje WhatsApp

```
🎯 *Propuesta Personalizada - Red Gráfica*

[Mensaje de Brandy con recomendaciones]

📦 *Servicios recomendados:*
1. Logo profesional + Manual de marca
2. Landing Page optimizada
3. Google Ads configurado

💰 *¡Descuento exclusivo: 15%!*

¿Listo para empezar? Responde este mensaje y coordinaremos todo. 🚀
```

## 🐛 Troubleshooting

### Error: "Servicio de WhatsApp no configurado"
- Verifica que las variables EVOLUTION_API_URL, EVOLUTION_API_KEY y EVOLUTION_INSTANCE_NAME estén en `.env.local`
- Reinicia el servidor de desarrollo

### Error: "WhatsApp desconectado"
- Vuelve a escanear el código QR
- Verifica que el teléfono tenga conexión

### Error: "Formato de número inválido"
- El sistema acepta: `+56912345678`, `912345678`, `+56 9 1234 5678`
- Se limpia automáticamente y agrega +56 si falta

## 🎨 Personalización

### Cambiar mensaje de WhatsApp
Edita: `/src/app/api/brandy/send-whatsapp/route.ts`

### Cambiar template de email
Edita: `/src/app/api/brandy/send-email/route.ts`

### Detectar otras frases para formulario
Edita: `/src/components/Brandy/index.tsx` línea ~86

```typescript
if (
    (messageLower.includes("whatsapp") && messageLower.includes("correo")) ||
    (messageLower.includes("prefieres") && messageLower.includes("envíe")) ||
    messageLower.includes("método de contacto") ||
    // Agrega tus propias frases aquí
    messageLower.includes("tu nueva frase")
) {
    setShowContactForm(true);
}
```

## ✅ Checklist de producción

- [ ] Variables de entorno configuradas en Vercel/hosting
- [ ] Evolution API con IP fija o dominio
- [ ] WhatsApp Business verificado
- [ ] Resend API key activa (para emails)
- [ ] Número de WhatsApp verificado en mensaje de email
- [ ] Testear envío de WhatsApp real
- [ ] Testear envío de email real
- [ ] Monitorear logs de Evolution API

## 📚 Referencias

- Evolution API: https://doc.evolution-api.com/
- Resend: https://resend.com/docs
- WhatsApp Business API: https://business.whatsapp.com/
