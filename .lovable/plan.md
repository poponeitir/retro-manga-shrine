## Objetivo

Generar **un solo archivo `index.html`** autocontenido, listo para subir a Neocities, con TODO lo que tiene el sitio actual:

- Estética Win95 / Y2K completa (bevels, titlebars, marquee, scanlines, CRT flicker, kanji watermarks, cursores pixel)
- Reloj en vivo, marquee, ticker de audio, contador, post-it editable, shoutbox interactiva
- **Panel de subir imágenes con recortador (zoom + drag)** funcionando igual que ahora
- Imágenes de fondo + galería **embebidas en base64** dentro del HTML (sin carpeta /assets externa)
- Persistencia en `localStorage` del navegador (igual que ahora)

## Cómo se hará

1. **Convertir las 7 imágenes** (`manga-collage.jpg` + `thumb1-6.jpg`) a data URLs base64 con un script en `code--exec` y guardarlas en variables JS.
2. **Reescribir el JSX de `src/routes/index.tsx` a HTML puro**, manteniendo exactamente la misma estructura visual y clases.
3. **Migrar `src/styles.css` a un `<style>` inline**, reemplazando las utilidades de Tailwind usadas (`grid`, `flex`, `gap-*`, `p-*`, `text-*`, `col-span-*`, etc.) por CSS equivalente. Sin dependencia de Tailwind en runtime.
4. **Reescribir la lógica React a vanilla JS** en un `<script>` al final del body:
   - Reloj: `setInterval` actualizando el DOM
   - Shoutbox: array en memoria + render manual + listener Enter
   - Post-it: `<textarea>` simple
   - Uploader: input file → `FileReader` → modal recortador (canvas + pointer events para drag + slider de zoom) → guarda data URL en `localStorage` → re-renderiza fondo + galería
5. **Guardar el resultado** en `/mnt/documents/manga-shrine.html` y entregarlo con `<presentation-artifact>` para que lo descargues directamente.
6. **QA**: abrir el HTML generado en un navegador headless, hacer screenshot, verificar que se vea idéntico al preview actual antes de entregar.

## Lo que NO cambia en el proyecto

- No se tocan archivos del proyecto Lovable (`src/`, etc.). El HTML se genera como artefacto aparte en `/mnt/documents/`.
- El sitio Lovable sigue funcionando igual.

## Resultado

Un archivo `manga-shrine.html` (~2-4 MB por las imágenes base64) que arrastras a Neocities y funciona 100% sin servidor, sin build, sin dependencias.

## Notas técnicas

- Tailwind v4 → CSS plano. Las clases responsivas (`md:col-span-*`) se traducen con `@media (min-width: 768px)`.
- React hooks → variables + funciones de render manuales que mutan `innerHTML` o nodos puntuales.
- El recortador usa `<canvas>` con `drawImage` y exporta JPEG con `toDataURL('image/jpeg', 0.85)`, igual que ahora.
- Las fuentes de Google Fonts (Silkscreen, VT323, Press Start 2P) se cargan vía `<link>` como en el proyecto actual.
