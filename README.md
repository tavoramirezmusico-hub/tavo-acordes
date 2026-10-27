# Tavo Acordes

App web de guitarra y armonía musical. Sin servidor, sin instalación y sin dependencias de compilación: HTML, CSS y JavaScript puros.

## Qué incluye

**🎸 Acordes y mástil**
- Constructor de acordes: trastes por cuerda (X = silenciada, 0 = al aire, 1–12), detección de nombre(s), diagrama del mástil, búsqueda por nombre y audio con Web Audio API
- Análisis armónico, escala del acorde, ¿Qué toco?, progresiones sugeridas y dominantes secundarios / sustituto de tritono
- **Mapa de tríadas y séptimas**: visualiza todas las posiciones de tríadas mayores, menores y acordes de séptima en el mástil, con la 6ª cuerda arriba y notas coloreadas por función (raíz, 3ª, 5ª, 7ª).

**🧭 Tonalidades y modulación**
- Mapa de armonía (campos armónicos vecinos y acordes puente)
- Círculo de quintas interactivo, navegador de tonalidades y modulación paso a paso

**🎓 Modos y escalas**
- Modos (Jónico a Locrio) con usos y sustituciones, y mapa de escalas con vista CAGED

**📚 Aprender y practicar**
- Analizador de progresiones, lecciones interactivas y práctica guiada

## Estructura

ndex.html Portada con todas las categorías
css/styles.css Estilos de todo el sitio
js/
nav.js Menú lateral, migas de pan y portada (una sola fuente de verdad)
script.js Lógica de acordes, escalas, círculo, lecciones, práctica
y mapa de tríadas/séptimas
mapa-armonia.js Mapa de armonía (independiente)
assets/ Logo
pages/
acordes/ constructor, analisis, escala-acorde, que-toco,
progresiones, dominantes, mapa-triadas
tonalidades/ mapa-armonia, circulo-quintas, navegador, modulacion
modos/ modos, mapa-escalas
aprender/ analizador, lecciones, practica


### El acorde se comparte entre páginas

El último acorde que armas en el constructor se guarda en el navegador (`localStorage`). Las páginas de análisis, escala, ¿Qué toco?, progresiones, dominantes, modos y círculo de quintas lo leen y muestran un aviso con el acorde actual y un enlace para cambiarlo.

## Cómo añadir una página nueva

1. Crea el archivo en la carpeta de su categoría, copiando una página existente (por ejemplo `pages/modos/modos.html`).
2. Agrega una entrada en la lista `SITE` al inicio de `js/nav.js`:
   ```js
   { file: "pages/modos/mi-pagina.html", icon: "🎶", title: "Mi página", desc: "Qué hace." }