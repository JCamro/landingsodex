# PLAN — Avance

## Decisiones tomadas
- Público general, página informativa, se publicará.
- Tema **claro por defecto**, con botón para cambiar a oscuro (sin seguir el sistema).
- 3D solo del sobre (frente y reverso), no del producto interior. Pasos con iconos y filas editoriales.
- Stack: Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui (base-nova), Motion, React Three Fiber + drei.
- Componentes de React Bits copiados a `src/components/reactbits/` (excluidos del lint). 21st.dev se usa para piezas puntuales (plan gratis: 2 descargas/día).

## Estado: implementación cerrada (v1)

| # | Fase | Estado | Notas |
|---|---|---|---|
| 1 | Documentos base (BRIEF, CONTENT, DESIGN, CLAUDE, PLAN) | ✅ | |
| 2 | Setup (Next.js, Tailwind, shadcn, Motion, fuentes, tokens, tema) | ✅ | Fuentes: Bricolage Grotesque + Inter |
| 3 | Página completa sin 3D | ✅ | Hero, pasos, recomendaciones, ITS, alertas, métodos, recuerda, fuentes |
| 3b | Pulido visual | ✅ | Franja ScrollVelocity, iconos, numeración, cierre a todo color |
| 3c | Ajuste de feedback: estilo editorial | ✅ | Sin tarjetas genéricas ni cifras decorativas |
| 4 | Sobre 3D | ✅ | `src/components/three/` — disco abombado, texturas, reflejos sin HDR externo, respaldo en imagen |
| 5 | 3D unido al scroll y a los pasos | ✅ | Hero: sigue cursor y gira al bajar. Pasos: pose distinta en cada paso (solo escritorio) |
| 5b | Navegación | ✅ | Tema claro/oscuro, icono de preservativo, sección activa, barra de lectura, menú lateral móvil |
| 5c | Ajustes finales de feedback | ✅ | Sin etiquetas flotantes en el hero, menú sin desbordes en pantallas estrechas |
| 5d | Sección de pasos sin repetición | ✅ | El panel izquierdo ya no repite el título ni usa "06/08" ni barra: sobre 3D grande centrado en pantalla y 8 puntos clicables (el activo se alarga). En móvil, franja fija solo con los puntos |

Verificado: `npm run lint` y `npm run build` pasan. Revisado en navegador en escritorio y móvil.

**Sin commit todavía.** Los cambios están en el árbol de trabajo.

## Qué queda (en orden)

### Fase 6 — Pulido técnico ✅
Medido con Lighthouse sobre `npm run build` + `next start`, en Chrome headless.

| Métrica | Antes | Después |
|---|---|---|
| Accesibilidad (escritorio) | 90 | **100** |
| Rendimiento (escritorio) | 56 | **72** (LCP 0.8 s, TBT 840 ms) |
| Rendimiento (móvil, CPU lento simulado) | — | **59** (TBT 1.35 s, FCP 1.1 s, CLS 0) |
| Buenas prácticas / SEO | 100 / 100 | 100 / 100 |

Cambios realizados:
- [x] **Contraste:** se quitó la opacidad de los pasos inactivos (bajaba el texto por debajo de AA). Todos los pares de color de tema cumplen AA (comprobado con cálculo WCAG).
- [x] **Estructura de la lista de ITS:** `dl` ahora contiene solo grupos `div > dt + dd` válidos.
- [x] **Movimiento reducido:** título animado (`BlurTitle`), animaciones del encabezado, del menú y del botón de tema respetan `prefers-reduced-motion`.
- [x] **3D diferido:** three.js se carga después del evento `load` y cuando el navegador está libre. Antes bloqueaba el primer render (TBT de escritorio 4.1 s → 0.84 s).
- [x] **Móvil sin 3D:** en pantallas de menos de 640 px se muestra la imagen fija del sobre y no se carga three.js. Es una decisión de rendimiento; si se quiere el 3D también en móvil, se cambia en `sachet-3d.tsx`.
- [x] **Imagen del hero con prioridad** (`priority`), para que el LCP llegue antes.
- [x] **Limpieza:** no quedan componentes de React Bits sin uso (SpotlightCard, CountUp y ShinyText ya se habían retirado). En uso: BlurText, GradientText, Magnet, ScrollVelocity.

Pendiente, fuera de esta fase (para una pasada posterior si hace falta):
- Hidratación de React en móvil: el resto del costo (~3 s de scripting en CPU lento) viene de hidratar la página. Se podría reducir cargando en diferido las secciones de abajo del pliegue.
- Lighthouse en este equipo renderiza el 3D por software (sin GPU), lo que penaliza un poco la medición de escritorio. En un equipo con GPU el resultado real será mejor.
- Prueba con teclado y lector de pantalla hecha solo de forma automatizada (Lighthouse); falta una prueba manual.

### Fase 7 — Contenido y marca (antes de publicar)
- [ ] Revisión del texto de salud por una persona del área (incluye la columna "¿Protege de ITS?" de la tabla de métodos, que es síntesis propia).
- [ ] Confirmar permiso de uso de la marca Sodex, o cambiar el sobre por un empaque genérico (cambia solo `public/textures/` y los textos alt).
- [ ] Decidir nombre y dominio de la página (el título actual es "Guía de salud sexual").

### Fase 8 — Publicación
- [ ] Commit del proyecto (`.gitignore` ya excluye `.env*` y `node_modules`).
- [ ] Repositorio en GitHub y conexión con Vercel.
- [ ] Revisión final en la URL pública (escritorio, móvil, ambos temas).

## Pendientes abiertos
- Permiso de uso de la marca Sodex (o empaque genérico).
- Revisión del texto por una persona de salud.
- Decidir dominio y nombre de la página.
- Cuota de 21st.dev: se restablece cada día; no bloquea nada.
