# DESIGN — Sistema visual

Los valores son una **propuesta inicial** tomada de los colores del empaque; se ajustan al probarlos en pantalla. Todo estilo debe salir de estos tokens (definidos en Tailwind v4 con `@theme`). No inventar colores ni fuentes fuera de este archivo.

## Personalidad
Cercana, clara y confiable. Con energía (rojo y amarillo) pero sobria: es contenido de salud. Nada explícito ni humorístico a costa del tema.

## Tema claro y oscuro
- **Tema claro por defecto.** Un solo botón alterna claro/oscuro; no se sigue la preferencia del sistema (decisión del usuario).
- Logo e icono del sitio: sobre redondo con un preservativo enrollado visto desde arriba (`BrandIcon` y `src/app/icon.svg`).
- Navegación: píldora que se desliza a la sección actual (escritorio), barra de lectura bajo el encabezado y menú lateral en pantallas pequeñas (shadcn `Sheet`).
- Se implementa con la clase `dark` en `<html>` y variables CSS.
- Ambos temas deben cumplir contraste WCAG AA (4.5:1 en texto normal).

## Color (tokens semánticos)
| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#FBF7F4` | `#140508` | Fondo de página |
| `--surface` | `#FFFFFF` | `#22090E` | Tarjetas |
| `--text` | `#2A0A0E` | `#F8EFEA` | Texto principal |
| `--text-muted` | `#6B4A4F` | `#C9AFB3` | Texto secundario |
| `--primary` | `#B3001B` | `#E5334B` | Acentos, botones, enlaces |
| `--primary-fg` | `#FFFFFF` | `#140508` | Texto sobre primary |
| `--accent` | `#F5C400` | `#FFE11A` | Resaltes puntuales |
| `--accent-fg` | `#2A0A0E` | `#140508` | Texto sobre accent |
| `--border` | `#E8D9D4` | `#3A1A20` | Líneas |
| `--alert` | `#B45309` | `#F59E0B` | Señales de alerta |

Reglas: el amarillo es acento, **no** color de texto sobre fondo claro (no pasa contraste). El rojo no se usa solo para comunicar peligro: acompañar siempre con icono o texto.

## Tipografía
La portada conserva el fondo continuo y la cuadrícula. Para Inca Kola se suman azul profundo (`#021B80`), reflejo azul (`#3C86E0`) y amarillo (`#FDDD04`) tomados del empaque. No sustituyen al rojo de las acciones de la guía.

- **Títulos:** Bricolage Grotesque (700–800), tamaños fluidos con `clamp()`.
- **Cuerpo:** Inter (400–600), 16–18 px, interlineado 1.6, ancho de línea máx. 70 caracteres.
- Cargar con `next/font` para evitar saltos de diseño.

## Espaciado, forma y profundidad
- Escala de 4 px. Secciones con 96–160 px de separación vertical en escritorio y 64–96 px en móvil.
- Radios: 12 px (tarjetas), 999 px (botones y etiquetas).
- Sombras suaves en claro; en oscuro, bordes sutiles en lugar de sombras.
- Contenedor máx. 1200 px, gutter 16 px móvil / 32 px escritorio.

## Movimiento
- Entrada de secciones: fundido y desplazamiento de 24 px, 400–600 ms, curva `easeOut`.
- El sobre 3D responde al scroll con suavizado (sin saltos).
- Interacciones (hover, expandir tarjeta): 150–250 ms.
- **`prefers-reduced-motion`:** sin parallax ni giros; el sobre se muestra estático y el contenido aparece sin animación.
- Nada de parpadeos ni movimiento continuo que distraiga de la lectura.

## 3D (sobre)
Implementado en `src/components/three/` (`Sachet3D` es el componente a usar). Poses por paso en `stepPoses` dentro de `steps.tsx`.
- Se carga después del evento `load` y con el navegador libre (no bloquea el primer render).
- En móvil también se muestran ambos empaques en WebGL cuando está disponible. Las imágenes de respaldo aparecen mientras cargan los modelos.
- Sin WebGL o con movimiento reducido: imagen fija, sin giros.
- Disco con grosor, textura = **frente del empaque recortado**; el reverso solo si se recorta también (opcional).
- Iluminación suave y reflejo metálico leve, acorde al foil.
- Resolución limitada (`dpr` máx. 1.5–2), carga diferida, imagen fija como respaldo en móvil débil o sin WebGL.

## Librerías de componentes (decidido)
- **React Bits** (copiados a `src/components/reactbits/`, excluidos del lint por ser código de terceros): BlurText (título y frase final), ShinyText (etiqueta del hero), GradientText ("Doble protección"), Magnet (botón principal), ScrollVelocity (franja de frases). SpotlightCard y CountUp se probaron y se retiraron (look de tarjeta genérica / cifras irrelevantes). BlurText genera un `<p>`: no meterlo dentro de `<h1>`/`<h2>`, usar un `div` con `role="heading"`. Instalar más con `npx shadcn@latest add "https://reactbits.dev/r/<Nombre>-TS-TW.json"`.
- **21st.dev:** el plan gratis permite 2 descargas de código al día, así que se usa solo para piezas puntuales y se adapta a los tokens de este archivo. Ya usado: patrón de barra de progreso del "Scroll animated timeline" (ibrandify).
- Nota: en shadcn, `--accent` es una superficie suave de hover; el amarillo de marca es `--highlight`.

## Estilo de bloques (decidido tras feedback)
- **Evitar el look de "tarjeta genérica"**: nada de cajas redondeadas con borde, brillo y sombra repetidas en cuadrícula. El usuario las percibe como "hechas por IA".
- Usar composición **editorial**: filas separadas por líneas finas (`border-t`/`border-b`), números grandes como guía visual, columnas divididas por líneas verticales, y una línea roja que se dibuja para marcar lo activo o lo que está bajo el cursor.
- Nada de bloques de cifras o indicadores decorativos en el hero.
- No repetir el mismo texto en dos sitios a la vez. En los pasos, la lista explica y el sobre 3D muestra; el progreso se indica con puntos, no con contadores tipo "06/08" ni barras.

## Componentes previstos
Encabezado con selector de tema · Hero · Línea de tiempo de pasos (con indicador 1/8) · Tarjetas expandibles (ITS) · Aviso de señales de alerta · Tabla/comparador de métodos · Bloque "Recuerda" · Fuentes · Pie con aviso legal.

## Accesibilidad
Orden de lectura lógico, foco visible, navegación completa con teclado, `alt` en imágenes, contenido legible sin JavaScript de 3D, controles con área táctil mínima de 44 px.
