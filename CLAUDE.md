# CLAUDE.md

Landing informativa de salud sexual (uso del condón, ITS, métodos de cuidado) con sobre 3D animado por scroll. Se publicará. Idioma de la página y de los comentarios: español.

## Documentos de referencia
- Objetivo y alcance: @docs/BRIEF.md
- Textos (fuente de verdad, no alterar datos de salud): @docs/CONTENT.md
- Sistema visual, temas y movimiento: @DESIGN.md
- Avance: @docs/PLAN.md

## Stack (decidido)
Next.js + TypeScript, Tailwind v4, shadcn/ui, Motion, Three.js con React Three Fiber y drei. Lenis solo si hace falta. React Bits y 21st (MCP en `.mcp.json`) como fuentes de efectos y secciones.

Esta versión de Next.js trae cambios respecto a lo habitual: seguir @AGENTS.md y leer `node_modules/next/dist/docs/` antes de escribir código de Next.

## Comandos
- `npm run dev`: servidor de desarrollo (http://localhost:3000)
- `npm run build`: compilación de producción (también revisa tipos)
- `npm run lint`: ESLint

## Estructura
- `src/app/`: rutas, `layout.tsx` (fuentes y tema) y `globals.css` (tokens de color claro/oscuro)
- `src/components/`: componentes propios; `src/components/ui/` es de shadcn
- Colores en Tailwind: `bg-background`, `text-foreground`, `bg-primary`, `bg-highlight` (amarillo), `text-alert`. Tipografía de títulos: `font-heading`.

## Reglas
- Usar solo colores, fuentes y espaciados de `DESIGN.md`. Toda sección debe verse bien en tema claro y oscuro.
- Móvil primero. Respetar `prefers-reduced-motion`. El contenido debe leerse aunque el 3D no cargue.
- No reinterpretar ni resumir contenido médico sin avisar; ante duda, preguntar.
- Tono respetuoso y no explícito. Sin imágenes ni ilustraciones anatómicas.
- El 3D va en un componente aparte, con carga diferida y respaldo estático.
- Antes de usar un componente de 21st o React Bits, revisar su licencia y dependencias. Cada descarga de `get_component` de 21st cuenta contra un límite diario de 2.
- No guardar claves en archivos. La clave de 21st vive en la variable de entorno `API_KEY_21ST`.
- Antes de publicar: confirmar permiso de uso de la marca del empaque y revisión del texto por una persona de salud.
- El usuario está aprendiendo: explicar brevemente qué se hizo y por qué en cada paso.
