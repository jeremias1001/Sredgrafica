# 🤖 BRANDY - Asistente de IA Inteligente

## 🎯 ¿Qué es Brandy?

Brandy es un asistente de IA powered by **Cerebras API** que ayuda a clientes a armar el pack perfecto de servicios, otorgando descuentos dinámicos de hasta **20%**.

---

## 💰 SISTEMA DE DESCUENTOS DINÁMICOS

### Cálculo Automático de Descuento

El descuento se calcula automáticamente según **3 criterios** y se aplica el **máximo**:

#### 1️⃣ **Por Cantidad de Servicios**
```
1 servicio      = 0% descuento
2 servicios     = 5% descuento
4-6 servicios   = 10% descuento
7-9 servicios   = 15% descuento
10+ servicios   = 20% descuento ⭐
```

#### 2️⃣ **Por Monto Total**
```
< $500K         = 0% descuento
$500K - $1M     = 10% descuento
$1M - $1.5M     = 12% descuento
$1.5M - $2M     = 15% descuento
> $2M           = 20% descuento ⭐
```

#### 3️⃣ **Descuento de Brandy**
Cuando Brandy recomienda un pack completado:
```
Recomendación básica  = 15% descuento
Pack completo         = 20% descuento ⭐
```

### Ejemplo de Cálculo

**Escenario:** Cliente agrega 5 servicios por $1,200,000
```
- Por cantidad (5 servicios) → 10% descuento
- Por monto ($1.2M) → 12% descuento
- APLICADO: 12% (el máximo)
- Ahorro: $144,000
- Precio final: $1,056,000
```

---

## 🎤 CÓMO BRANDY OTORGA DESCUENTOS

### Activadores de Descuento
Brandy aplica descuento cuando detecta en su respuesta:

✅ **Nivel 15% (Recomendación)**
- "te recomiendo"
- "perfecto pack"
- "he preparado"
- "especialmente para ti"
- "te propongo"
- "sería ideal"
- "combinar"

✅ **Nivel 20% (Pack Completo)**
- "pack completo"
- "todo lo necesitas"
- Cuando combina 3+ servicios estratégicos

### Ejemplo de Conversación

**Usuario:** "Necesito vender online"

**Brandy:** "Perfecto, te recomiendo nuestro pack de E-commerce. Incluye tienda online ($549K) + setup Meta Ads ($129K) + email marketing ($129K). Este pack integrado es ideal porque..."

→ **Descuento de Brandy: 15% aplicado automáticamente**

---

## 🧠 INSTRUCCIONES DE BRANDY (System Prompt)

### Limitaciones de Seguridad

Brandy está programada para **NUNCA**:
- ❌ Inventar servicios que no existen
- ❌ Prometer resultados garantizados
- ❌ Bajar precios sin autorización
- ❌ Hacer promesas sobre ROI específico
- ❌ Compartir datos confidenciales

### Límites Técnicos

**Máximo por respuesta:**
- 150 palabras
- 3 párrafos
- 3 items en listas

**Si es más complejo** → Sugiere Auditoría Digital 360

### Tono y Estilo

- Profesional pero cálida
- Empática: "Entiendo que..."
- Haz preguntas antes de recomendar
- Respeta presupuestos
- Sugiere alternativas si el cliente tiene budget limitado

---

## 📱 DÓNDE USAR BRANDY

### En el Configurador (`/inicio`)
- Click en botón "Habla con Brandy" (esquina inferior derecha)
- Chat flotante se abre
- Pregunta lo que necesitas
- Brandy recomienda servicios
- Si completa recomendación → descuento aplicado automáticamente

### Visualización del Descuento
En el carrito verás:
- **Banner:** "¡X% OFF aplicado!" (color naranja o púrpura si es de Brandy)
- **Razón:** "Por X servicios" o "✨ Brandy te ayudó a ahorrar $XXX"
- **Resumen:** Subtotal → Descuento → Total

---

## 🔄 FLUJO COMPLETO

```
1. Cliente abre Configurador
   ↓
2. Click en Brandy
   ↓
3. Brandy pregunta: "¿Qué necesitas?"
   ↓
4. Cliente explica (vender online, presencia, etc)
   ↓
5. Brandy recomienda pack específico
   ↓
6. Sistema detecta recomendación → Aplica 15-20% descuento
   ↓
7. Cliente ve descuento en carrito
   ↓
8. Cliente agrega servicios recomendados
   ↓
9. Descuento se actualiza (máximo aplicable)
   ↓
10. Cliente procede a checkout con ahorro
```

---

## 🎯 CASOS DE USO

### Caso 1: Startup con Presupuesto Limitado
```
Cliente: "Tengo $400K para comenzar"
Brandy: "Te propongo Lanzamiento Local ($399K):
        - Google Business Profile
        - Landing Page
        - 5 Posts en redes
        - Setup Meta Ads
        
Este pack es ideal porque inicia tu presencia sin exceder budget"

Resultado: 
- Cantidad: 4 servicios → 10% descuento
- Descuento Brandy: +5% = 15%
- Total: $399K × 85% = $339K ✨
```

### Caso 2: E-commerce Establecido
```
Cliente: "Vendemos $500K/mes, queremos crecer"
Brandy: "Te propongo E-commerce Vende ($899K):
        - Tienda mejorada
        - Copywriting
        - Setup remarketing
        - Email marketing
        
Este pack completo acelerará tus ventas"

Resultado:
- Monto: $899K → 10% descuento
- Descuento Brandy: +10% = 20%
- Total: $899K × 80% = $719K ✨
```

### Caso 3: Transformación Digital
```
Cliente: "Necesito presencia completa"
Brandy: "Te recomiendo Presencia Online ($599K):
        - Web Corporativa
        - Logo Starter
        - Setup Ads
        - CM 1 mes
        
Un pack completo y estratégico"

Resultado:
- Monto: $599K → 10% descuento
- Descuento Brandy: +5% = 15%
- Total: $599K × 85% = $509K ✨
```

---

## 🔍 MONITOREO DE BRANDY

### Qué Brandy SIEMPRE monitorea:
- ✅ Necesidades reales del cliente
- ✅ Presupuesto disponible
- ✅ Objetivos a 3-6 meses
- ✅ Presencia online actual
- ✅ Dolor principal

### Qué Brandy NUNCA hace:
- ❌ Venta agresiva
- ❌ Promesas imposibles
- ❌ Ignorar el presupuesto
- ❌ Recomendar innecesariamente
- ❌ Contradecir precios reales

---

## 📊 IMPACTO ESPERADO

### Para Clientes
- 📈 15-20% de ahorro automático
- 💡 Recomendaciones expertas
- ⏱️ Ahorra tiempo en decisión
- 🎁 Recibe valor extra

### Para el Negocio
- 📈 Mayor conversión (menos abandono)
- 💰 Tickets más altos (pack vs individual)
- 👥 Mejor experiencia del cliente
- 🔄 Ingresos recurrentes

---

## ⚙️ CONFIGURACIÓN TÉCNICA

### API: Cerebras
**Endpoint:** https://api.cerebras.ai/v1/chat/completions

### Modelo Usado
- Fast Inference (bajo latency)
- Context window: 8K tokens

### Variables de Entorno
```
Cerebras_api_key=xxx (desde .env)
```

### Componentes
- **Backend:** `/app/api/brandy/route.ts`
- **Frontend:** `/components/Brandy/index.tsx`
- **Lógica:** `/components/ServiceBuilder/index.tsx`

---

## 🚀 MEJORAS FUTURAS

- [ ] Historial de conversaciones
- [ ] Exportar recomendación a PDF
- [ ] Integración con CRM
- [ ] Analytics de recomendaciones
- [ ] Brandy en WhatsApp
- [ ] Múltiples idiomas
- [ ] Personalización por industria

---

**Status:** ✅ OPERACIONAL Y FUNCIONANDO
**Última actualización:** 22 de enero de 2026
