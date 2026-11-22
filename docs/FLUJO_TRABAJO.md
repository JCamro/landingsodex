# Cómo construir y mejorar este proyecto

Esta guía muestra cómo pasar de una idea a un cambio verificable sin perder de vista el producto. Para aprender, seguí el orden: **entender → decidir → implementar → comprobar → documentar**. Los agentes ayudan con tareas acotadas; la responsabilidad del alcance y de aceptar el resultado sigue siendo humana.

## Mapa de documentación

| Archivo | Responde a |
|---|---|
| `docs/BRIEF.md` | ¿Para quién es el producto y qué problema resuelve? |
| `docs/CONTENT.md` | ¿Qué textos y datos deben mostrarse? |
| `DESIGN.md` | ¿Qué reglas visuales, colores, movimiento y accesibilidad se respetan? |
| `docs/PLAN.md` | ¿Qué se terminó y qué decisiones o pendientes siguen abiertos? |
| `docs/FLUJO_TRABAJO.md` | ¿Cómo organizamos y verificamos el trabajo? |
| `.atl/skill-registry.md` | ¿Qué skills pueden orientar una tarea especializada? |

**Jerarquía práctica:** el brief define el objetivo; contenido y diseño fijan sus límites; el código implementa; el plan y los commits registran el estado. Si dos documentos se contradicen, no adivines: confirma cuál decisión es vigente y actualiza el documento obsoleto junto con el cambio autorizado.

## Recorrido de una mejora

1. **Escribí el resultado esperado.** Describí qué debería notar la persona, en qué pantalla y qué no debe cambiar. Para una propuesta, análisis o revisión solamente, no se modifica código.
2. **Ubicá la fuente de verdad.** Revisá los documentos de arriba y los componentes relacionados. En este proyecto, la página vive en `src/app/`; secciones y componentes reutilizables, en `src/components/`; textos de la guía, en `src/content/`; recursos visuales, en `public/`.
3. **Separá evidencia de suposiciones.** Reproducí el problema o medí el comportamiento actual. Anotá dispositivo, tamaño de pantalla, pasos y resultado. Una captura o una emulación no demuestra por sí sola el rendimiento en un teléfono físico.
4. **Elegí el cambio más pequeño que cumpla el objetivo.** Conservá las decisiones de marca, contenido de salud, accesibilidad y experiencia móvil. Si hay una decisión de producto realmente abierta, resolvela antes de implementar.
5. **Usá agentes por responsabilidad, no por cantidad.**
   - **Explorador:** lectura e investigación cuando hace falta mapear varias partes del sistema; devuelve hallazgos con rutas y líneas.
   - **Implementador:** hace una unidad de cambio autorizada, con alcance de archivos explícito, siguiendo las convenciones del proyecto.
   - **Verificador:** comprueba el resultado frente a los requisitos y busca regresiones; es independiente cuando el riesgo lo justifica.
   - **Orquestación:** mantiene el objetivo, decide el alcance, integra hallazgos y comunica bloqueos. No delegues una tarea que entendés y podés resolver directamente con seguridad.
6. **Verificá desde el uso real.** Para cambios de comportamiento, primero comprobá que una prueba relevante falla antes del arreglo cuando sea viable; luego confirmá que pasa. En esta app, los controles habituales son `pnpm lint` y `pnpm build`. Para UI, probá móvil y escritorio, ambos temas, teclado y movimiento reducido según lo afectado.
7. **Compará con la línea base.** Repetí las mismas acciones y condiciones usadas antes del cambio. Revisá también que el paso anterior siga funcionando y que no cambien comportamientos compartidos que no se pidieron.
8. **Actualizá la documentación útil.** Corregí decisiones o mediciones que ya no describen el producto. No copies el historial entero en varios archivos: el commit explica el cambio y el plan conserva el estado actual.
9. **Cerrá con evidencia.** Informá qué cambió, qué comandos y escenarios pasaron, qué quedó pendiente y si se creó un commit. No hagas push, publicación ni acciones remotas sin autorización explícita.

## Cuándo usar una ficha de tareas

Una mejora pequeña y clara suele necesitar solo el pedido y su diff. Para trabajo grande que continuará en varias sesiones, tiene entregas separadas o necesita una especificación que sobreviva a la pérdida de contexto, creá una ficha bajo `odd/tasks/` antes del primer cambio de código. La ficha debe conservar:

- objetivo y requisitos observables;
- tareas pequeñas vinculadas a esos requisitos;
- decisiones y evidencia en un registro cronológico;
- estado y pruebas de cada tarea.

No conviertas cada ajuste visual en una ceremonia. Si el requisito cabe en una conversación y se puede verificar desde el diff, trabajá directamente.

## Ejemplo de este proyecto: dos empaques 3D

La integración se guardó en `c11b4ca` (`feat: showcase both Sodex flavors in 3D`), en la rama `feat/sodex-inca-kola`; no se publicó. Se conservaron los modelos tridimensionales de frente y reverso para Kola Escocesa e Inca Kola, el giro táctil, la animación y los colores de marca de ambos temas. En los pasos se mantienen los dos lienzos al alternar **1 → 2 → 3 → 2**.

**Línea base móvil registrada antes de optimizar:** compilación de producción, Chrome headless con SwiftShader, viewport de 390 × 844 CSS px, DPR 3 y caché desactivada. En tres corridas, los modelos del hero quedaron listos en 5,6–7,7 s; la animación registró 3–4 FPS bajo renderizado por software. La transferencia observada fue 499 KiB de JavaScript y 613 KiB de recursos de textura/artefactos 3D. Tras visitar portada y pasos permanecieron cuatro lienzos, dos por sección. La secuencia de pasos conservó sus lienzos.

Estos números son una referencia reproducible en ese entorno, **no una medición de un celular real**. La siguiente optimización propuesta —aún no implementada en esa línea base— es compartir un lienzo entre los dos productos por sección y medir otra vez en las mismas condiciones, sin retirar el volumen, el borde ni los reflejos. Para afirmar rendimiento móvil real hace falta una prueba en dispositivos físicos.

## Lista de cierre

- [ ] El cambio responde al objetivo y respeta brief, contenido y diseño.
- [ ] Revisé los estados y tamaños de pantalla afectados.
- [ ] Pasaron las comprobaciones aplicables y registré cualquier límite.
- [ ] La documentación que quedó desactualizada fue corregida.
- [ ] El usuario sabe qué se hizo, qué falta y si hubo commit o publicación.
