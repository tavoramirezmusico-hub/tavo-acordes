# Tavo Acordes

App web de guitarra y armonía musical. Sin servidor, sin instalación y sin dependencias de compilación: HTML, CSS y JavaScript puros.

## Qué incluye

**🎸 Acordes y mástil**
- Constructor de acordes: trastes por cuerda (X = silenciada, 0 = al aire, 1–12), detección de nombre(s), diagrama del mástil, búsqueda por nombre y audio con Web Audio API
- Análisis armónico, escala del acorde, ¿Qué toco?, progresiones sugeridas y dominantes secundarios / sustituto de tritono

**🧭 Tonalidades y modulación**
- Mapa de armonía (campos armónicos vecinos y acordes puente)
- Círculo de quintas interactivo, navegador de tonalidades y modulación paso a paso

**🎓 Modos y escalas**
- Modos (Jónico a Locrio) con usos y sustituciones, y mapa de escalas con vista CAGED

**📚 Aprender y practicar**
- Analizador de progresiones, lecciones interactivas y práctica guiada

## Estructura

```
index.html                  Portada con todas las categorías
css/styles.css              Estilos de todo el sitio
js/
  nav.js                    Menú lateral, migas de pan y portada (una sola fuente de verdad)
  script.js                 Lógica de acordes, escalas, círculo, lecciones y práctica
  mapa-armonia.js           Mapa de armonía (independiente)
assets/                     Logo
pages/
  acordes/                  constructor, analisis, escala-acorde, que-toco, progresiones, dominantes
  tonalidades/              mapa-armonia, circulo-quintas, navegador, modulacion
  modos/                    modos, mapa-escalas
  aprender/                 analizador, lecciones, practica
```

### El acorde se comparte entre páginas

El último acorde que armas en el constructor se guarda en el navegador (`localStorage`). Las páginas de análisis, escala, ¿Qué toco?, progresiones, dominantes, modos y círculo de quintas lo leen y muestran un aviso con el acorde actual y un enlace para cambiarlo.

## Cómo añadir una página nueva

1. Crea el archivo en la carpeta de su categoría, copiando una página existente (por ejemplo `pages/modos/modos.html`).
2. Agrega una entrada en la lista `SITE` al inicio de `js/nav.js`:
   ```js
   { file: "pages/modos/mi-pagina.html", icon: "🎶", title: "Mi página", desc: "Qué hace." }
   ```
3. Listo: aparece sola en el menú lateral y en la portada.

## Cómo usar en local

Abre `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).

## GitHub Pages

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / (root)
4. Save

Quedará en: https://tavoramirezmusico-hub.github.io/Tavo-acordes/

---

Creado por **Tavo Ramírez**.
