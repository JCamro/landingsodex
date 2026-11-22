# BRIEF — Landing de salud sexual

## Objetivo
Landing informativa y animada que explique, con claridad y sin juicios, el uso correcto del condón, qué son las ITS y los métodos de cuidado. Se publicará en internet.

## Público
Público general (adolescentes mayores, jóvenes y adultos). Lenguaje simple, respetuoso y no explícito. Español neutro, con referencias a Perú (MINSA).

## Acción principal
Que la persona **se informe y, ante una posible exposición o señal de alerta, acuda a un establecimiento de salud**. No hay venta ni formulario de compra.

## Fuente de verdad del contenido
`docs/Guia_salud_sexual_condon_ITS.docx`, copiado a `docs/CONTENT.md`. El texto de salud **no se reinterpreta ni se resume sin revisión** (por ejemplo el plazo de 72 horas de PEP).

## Producto
Se muestran los empaques Sodex de Kola Escocesa e Inca Kola como apoyo visual, no como producto en venta. La integración actual usa modelos 3D del frente y reverso, con las imágenes de empaque como texturas y respaldo mientras carga WebGL.

## Experiencia
- Sobre en 3D que reacciona al scroll (giro, acercamiento, cambio de cara).
- Línea de tiempo interactiva de los 8 pasos de uso.
- Tarjetas expandibles para ITS y métodos de cuidado.
- Tema claro y oscuro (selector + preferencia del sistema).
- Responsive (móvil primero) y accesible.

## Fuera de alcance
Registro de usuarios, backend, compras, diagnóstico o consejo médico personalizado.

## Riesgos abiertos
- **Marca:** el sobre lleva la marca Sodex. Antes de publicar, confirmar permiso de uso o reemplazar por un empaque genérico.
- **Rendimiento del 3D en móvil:** medir en dispositivos físicos y optimizar sin perder volumen, borde ni reflejos. La referencia de emulación está registrada en `docs/PLAN.md`.
- **Contenido de salud:** revisar con una persona del área antes de publicar.
