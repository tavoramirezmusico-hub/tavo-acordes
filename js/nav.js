// =====================================================
// TAVO ACORDES - NAVEGACIÓN COMPARTIDA
// Un solo lugar para el menú: para añadir una página nueva,
// agrega una entrada en SITE (y crea su archivo .html).
// =====================================================
(function () {
  const SITE = [
    {
      "id": "acordes",
      "icon": "🎸",
      "title": "Acordes y mástil",
      "desc": "Construye, busca y analiza acordes sobre el mástil.",
      "pages": [
        {
          "file": "pages/acordes/constructor.html",
          "icon": "🔧",
          "title": "Constructor de acordes",
          "desc": "Marca los trastes, busca un acorde por nombre y escúchalo."
        },
        {
          "file": "pages/acordes/analisis.html",
          "icon": "🎓",
          "title": "Análisis armónico",
          "desc": "Función, apariciones y resoluciones del acorde actual."
        },
        {
          "file": "pages/acordes/escala-acorde.html",
          "icon": "🎼",
          "title": "Escala del acorde",
          "desc": "La escala que corresponde al acorde, sobre el mástil."
        },
        {
          "file": "pages/acordes/que-toco.html",
          "icon": "🎯",
          "title": "¿Qué toco?",
          "desc": "Tensiones, notas seguras y acordes sobre los que improvisar."
        },
        {
          "file": "pages/acordes/progresiones.html",
          "icon": "🎵",
          "title": "Progresiones sugeridas",
          "desc": "Progresiones típicas a partir del acorde actual."
        },
        {
          "file": "pages/acordes/dominantes.html",
          "icon": "⚡",
          "title": "Dominantes secundarios",
          "desc": "Dominantes secundarios y sustituto de tritono."
        },
        {
          "file": "pages/acordes/mapa-triadas.html",
          "icon": "🗺️",
          "title": "Mapa de tríadas y séptimas",
          "desc": "Visualiza todas las posiciones de tríadas y séptimas en el mástil."
        }
      ]
    },
    {
      "id": "arpegios",
      "icon": "🎼",
      "title": "Arpegios y Voicings",
      "desc": "Las notas del acorde una por una, distintas formas de tocarlo y sus inversiones.",
      "pages": [
        {
          "file": "pages/arpegios/arpegios.html",
          "icon": "🎼",
          "title": "Arpegios",
          "desc": "Las notas del acorde sobre todo el mástil, con audio y cajones CAGED."
        },
        {
          "file": "pages/arpegios/voicings.html",
          "icon": "🎸",
          "title": "Voicings",
          "desc": "Abierto, cejilla, drop 2 y drop 3 del mismo acorde, con audio."
        },
        {
          "file": "pages/arpegios/inversiones.html",
          "icon": "🔄",
          "title": "Inversiones",
          "desc": "El mismo acorde con distintas notas en el bajo."
        }
      ]
    },
    {
      "id": "tonalidades",
      "icon": "🧭",
      "title": "Tonalidades y modulación",
      "desc": "Relaciones entre tonalidades y cómo pasar de una a otra.",
      "pages": [
        {
          "file": "pages/tonalidades/mapa-armonia.html",
          "icon": "🗺️",
          "title": "Mapa de armonía",
          "desc": "Campos armónicos vecinos y acordes puente para modular."
        },
        {
          "file": "pages/tonalidades/circulo-quintas.html",
          "icon": "🎨",
          "title": "Círculo de quintas",
          "desc": "Círculo interactivo con grados y relativos."
        },
        {
          "file": "pages/tonalidades/navegador.html",
          "icon": "🧭",
          "title": "Navegador de tonalidades",
          "desc": "Muévete por las tonalidades vecinas."
        },
        {
          "file": "pages/tonalidades/modulacion.html",
          "icon": "🔄",
          "title": "Modulación paso a paso",
          "desc": "Ruta de acordes para ir de una tonalidad a otra."
        }
      ]
    },
    {
      "id": "modos",
      "icon": "🎓",
      "title": "Modos y escalas",
      "desc": "Modos, sustituciones y mapas de escalas sobre el mástil.",
      "pages": [
        {
          "file": "pages/modos/modos.html",
          "icon": "🎓",
          "title": "Modos, usos y sustituciones",
          "desc": "De Jónico a Locrio, con usos y sustituciones."
        },
        {
          "file": "pages/modos/mapa-escalas.html",
          "icon": "🗺️",
          "title": "Mapa de escalas",
          "desc": "Escalas por tonalidad, con vista CAGED."
        }
      ]
    },
    {
      "id": "aprender",
      "icon": "📚",
      "title": "Aprender y practicar",
      "desc": "Analiza progresiones, estudia lecciones y practica.",
      "pages": [
        {
          "file": "pages/aprender/analizador.html",
          "icon": "🎼",
          "title": "Analizador de progresiones",
          "desc": "Escribe una progresión y descubre su función armónica."
        },
        {
          "file": "pages/aprender/lecciones.html",
          "icon": "📚",
          "title": "Lecciones interactivas",
          "desc": "Teoría explicada con ejemplos que suenan."
        },
        {
          "file": "pages/aprender/practica.html",
          "icon": "🏋️",
          "title": "Práctica guiada",
          "desc": "Ejercicios con estadísticas de progreso."
        }
      ]
    }
  ];

  // Carpeta raíz del sitio, calculada desde la ruta de este mismo script
  // (funciona igual en GitHub Pages, en un servidor local y abriendo el archivo).
  const ROOT = new URL('../', document.currentScript.src).href;
  const href = (file) => ROOT + file;
  const samePage = (file) => new URL(href(file)).pathname === location.pathname;

  let currentCat = null, currentPage = null;
  SITE.forEach(cat => cat.pages.forEach(p => {
    if (samePage(p.file)) { currentCat = cat; currentPage = p; }
  }));

  function buildMenu() {
    let items = `<li><a href="${ROOT}index.html" class="${currentPage ? '' : 'current'}">🏠 Inicio</a></li>`;
    SITE.forEach(cat => {
      items += `<li class="menu-cat">${cat.icon} ${cat.title}</li>`;
      cat.pages.forEach(p => {
        items += `<li><a href="${href(p.file)}" class="${p === currentPage ? 'current' : ''}">${p.icon} ${p.title}</a></li>`;
      });
    });

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <button id="menu-toggle" class="menu-toggle" aria-label="Menú"><i class="fas fa-bars"></i></button>
      <div id="menu-overlay" class="menu-overlay"></div>
      <nav id="side-menu" class="side-menu" aria-label="Menú principal">
        <div class="menu-header">
          <span class="menu-title">🎸 Tavo Acordes</span>
          <button class="menu-close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
        </div>
        <ul class="menu-list">${items}</ul>
      </nav>`;
    while (wrap.firstChild) document.body.insertBefore(wrap.firstChild, document.body.firstChild);

    document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
    document.getElementById('menu-overlay').addEventListener('click', closeMenu);
    document.querySelector('#side-menu .menu-close').addEventListener('click', closeMenu);
    document.querySelectorAll('#side-menu a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  function toggleMenu() {
    const menu = document.getElementById('side-menu');
    if (menu.classList.contains('active')) return closeMenu();
    menu.classList.add('active');
    document.getElementById('menu-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    document.getElementById('side-menu').classList.remove('active');
    document.getElementById('menu-overlay').classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  }
  window.toggleMenu = toggleMenu;
  window.closeMenu = closeMenu;

  function buildBreadcrumb() {
    const el = document.getElementById('breadcrumb');
    if (!el || !currentPage) return;
    el.innerHTML = `<a href="${ROOT}index.html">Inicio</a> › <span>${currentCat.icon} ${currentCat.title}</span>`;
  }

  function buildHub() {
    const el = document.getElementById('hub');
    if (!el) return;
    el.innerHTML = SITE.map(cat => `
      <section class="hub-cat" id="cat-${cat.id}">
        <h2>${cat.icon} ${cat.title}</h2>
        <p class="hub-cat-desc">${cat.desc}</p>
        <div class="hub-grid">
          ${cat.pages.map(p => `
            <a class="hub-card" href="${href(p.file)}">
              <span class="hub-card-icon">${p.icon}</span>
              <span class="hub-card-title">${p.title}</span>
              <span class="hub-card-desc">${p.desc}</span>
            </a>`).join('')}
        </div>
      </section>`).join('');
  }

  function init() { buildMenu(); buildBreadcrumb(); buildHub(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();