// =====================================================
// TAVO ACORDES - SCRIPT PRINCIPAL v8 (Fase 2)
// =====================================================

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'e'];
const OPEN_NOTES = ['E', 'A', 'D', 'G', 'B', 'E'];

// =====================================================
// CALIDADES DE ACORDES
// =====================================================
const CHORD_QUALITIES = {
    '': { intervals: [0, 4, 7], formula: '1 3 5', name: 'Mayor', scale: 'jónico', explanation: 'Tríada mayor: raíz + 3ª mayor + 5ª justa. Es el acorde más común y estable.' },
    'm': { intervals: [0, 3, 7], formula: '1 b3 5', name: 'Menor', scale: 'eólico', explanation: 'Tríada menor: raíz + 3ª menor + 5ª justa. Sonido melancólico.' },
    'dim': { intervals: [0, 3, 6], formula: '1 b3 b5', name: 'Disminuido', scale: 'locrio', explanation: 'Tríada disminuida: raíz + 3ª menor + 5ª disminuida. Muy tenso, resuelve al I.' },
    'aug': { intervals: [0, 4, 8], formula: '1 3 #5', name: 'Aumentado', scale: 'jónico', explanation: 'Tríada aumentada: raíz + 3ª mayor + 5ª aumentada. Sonido flotante.' },
    'sus2': { intervals: [0, 2, 7], formula: '1 2 5', name: 'Suspendido 2', scale: 'jónico', explanation: 'Suspendido: la 3ª se sustituye por la 2ª. Sonido abierto.' },
    'sus4': { intervals: [0, 5, 7], formula: '1 4 5', name: 'Suspendido 4', scale: 'jónico', explanation: 'Suspendido: la 3ª se sustituye por la 4ª. Suele resolver a mayor.' },
    '5': { intervals: [0, 7], formula: '1 5', name: 'Quinta (Power)', scale: 'jónico', explanation: 'Power chord: solo raíz y quinta. Sin 3ª, ambiguo entre mayor y menor.' },
    '6': { intervals: [0, 4, 7, 9], formula: '1 3 5 6', name: 'Sexta', scale: 'jónico', explanation: 'Tríada mayor + 6ª mayor. Sonido estable con color jazzy.' },
    'm6': { intervals: [0, 3, 7, 9], formula: '1 b3 5 6', name: 'Menor Sexta', scale: 'dórico', explanation: 'Tríada menor + 6ª mayor. Usado en jazz manouche.' },
    '7': { intervals: [0, 4, 7, 10], formula: '1 3 5 b7', name: 'Dominante (7)', scale: 'mixolidio', explanation: 'Tríada mayor + 7ª menor. Es el acorde de dominante: genera tensión y resuelve a la tónica.' },
    'maj7': { intervals: [0, 4, 7, 11], formula: '1 3 5 7', name: 'Mayor 7', scale: 'jónico', explanation: 'Tríada mayor + 7ª mayor. Sonido suave y sofisticado.' },
    'm7': { intervals: [0, 3, 7, 10], formula: '1 b3 5 b7', name: 'Menor 7', scale: 'dórico', explanation: 'Tríada menor + 7ª menor. Muy usado en jazz, soul y funk.' },
    'm7b5': { intervals: [0, 3, 6, 10], formula: '1 b3 b5 b7', name: 'Semidisminuido', scale: 'locrio', explanation: 'Tríada disminuida + 7ª menor. También llamado m7(b5). Precede al dominante.' },
    'dim7': { intervals: [0, 3, 6, 9], formula: '1 b3 b5 bb7', name: 'Disminuido 7', scale: 'locrio', explanation: 'Tríada disminuida + 7ª disminuida. Acorde simétrico, muy tenso.' },
    'mMaj7': { intervals: [0, 3, 7, 11], formula: '1 b3 5 7', name: 'Menor Mayor 7', scale: 'eólico', explanation: 'Tríada menor + 7ª mayor. Sonido misterioso, típico del cine negro.' },
    'aug7': { intervals: [0, 4, 8, 10], formula: '1 3 #5 b7', name: 'Aumentado 7', scale: 'jónico', explanation: 'Tríada aumentada + 7ª menor. Domina hacia acordes menores.' },
    'add9': { intervals: [0, 2, 4, 7], formula: '1 2 3 5', name: 'Add 9', scale: 'jónico', explanation: 'Tríada mayor + 9ª (2ª). Añade color sin la tensión del 7.' },
    'madd9': { intervals: [0, 2, 3, 7], formula: '1 2 b3 5', name: 'Menor Add 9', scale: 'eólico', explanation: 'Tríada menor + 9ª. Color melancólico moderno.' },
    '9': { intervals: [0, 2, 4, 7, 10], formula: '1 2 3 5 b7', name: 'Dominante 9', scale: 'mixolidio', explanation: 'Acorde de dominante + 9ª. Sonido funk y blues.' },
    'maj9': { intervals: [0, 2, 4, 7, 11], formula: '1 2 3 5 7', name: 'Mayor 9', scale: 'jónico', explanation: 'Acorde maj7 + 9ª. Sonido brillante y moderno.' },
    'm9': { intervals: [0, 2, 3, 7, 10], formula: '1 2 b3 5 b7', name: 'Menor 9', scale: 'dórico', explanation: 'Acorde m7 + 9ª. Sonido neo-soul.' },
    '7b9': { intervals: [0, 1, 4, 7, 10], formula: '1 b2 3 5 b7', name: 'Dominante 7 b9', scale: 'frigio', explanation: 'Dominante con 9ª menor. Resuelve a menor. Muy usado en jazz.' },
    '7#9': { intervals: [0, 3, 4, 7, 10], formula: '1 #2 3 5 b7', name: 'Dominante 7 #9', scale: 'frigio', explanation: 'Dominante con 9ª aumentada. El famoso acorde Hendrix.' },
    '13': { intervals: [0, 2, 4, 7, 9, 10], formula: '1 2 3 5 6 b7', name: 'Dominante 13', scale: 'mixolidio', explanation: 'Dominante + 13ª. Sonido muy rico.' },
    '7b5': { intervals: [0, 4, 6, 10], formula: '1 3 b5 b7', name: 'Dominante 7 b5', scale: 'locrio', explanation: 'Dominante con 5ª disminuida. Tensión extra.' },
    '7#5': { intervals: [0, 4, 8, 10], formula: '1 3 #5 b7', name: 'Dominante 7 #5', scale: 'jónico', explanation: 'Dominante con 5ª aumentada.' },
    '7sus4': { intervals: [0, 5, 7, 10], formula: '1 4 5 b7', name: 'Dominante 7 Sus4', scale: 'mixolidio', explanation: 'Dominante con 4ª en lugar de 3ª.' },
};

// =====================================================
// BASE DE DATOS DE ACORDES
// =====================================================
const CHORD_DB = {
    'C': [0, 3, 2, 0, 1, 0], 'C#': [null, 4, 6, 6, 6, 4], 'D': [null, null, 0, 2, 3, 2],
    'D#': [null, 6, 8, 8, 8, 6], 'E': [0, 2, 2, 1, 0, 0], 'F': [1, 3, 3, 2, 1, 1],
    'F#': [2, 4, 4, 3, 2, 2], 'G': [3, 2, 0, 0, 0, 3], 'G#': [4, 6, 6, 5, 4, 4],
    'A': [null, 0, 2, 2, 2, 0], 'A#': [null, 1, 3, 3, 3, 1], 'B': [null, 2, 4, 4, 4, 2],
    'Cm': [null, 3, 5, 5, 4, 3], 'C#m': [null, 4, 6, 6, 5, 4], 'Dm': [null, null, 0, 2, 3, 1],
    'D#m': [null, 6, 8, 8, 7, 6], 'Em': [0, 2, 2, 0, 0, 0], 'Fm': [1, 3, 3, 1, 1, 1],
    'F#m': [2, 4, 4, 2, 2, 2], 'Gm': [3, 5, 5, 3, 3, 3], 'G#m': [4, 6, 6, 4, 4, 4],
    'Am': [null, 0, 2, 2, 1, 0], 'A#m': [null, 1, 3, 3, 2, 1], 'Bm': [null, 2, 4, 4, 3, 2],
    'C7': [null, 3, 2, 3, 1, 0], 'D7': [null, null, 0, 2, 1, 2], 'E7': [0, 2, 0, 1, 0, 0],
    'F7': [1, 3, 1, 2, 1, 1], 'G7': [3, 2, 0, 0, 0, 1], 'A7': [null, 0, 2, 0, 2, 0], 'B7': [null, 2, 1, 2, 0, 2],
    'Cmaj7': [null, 3, 2, 0, 0, 0], 'Dmaj7': [null, null, 0, 2, 2, 2], 'Emaj7': [0, 2, 1, 1, 0, 0],
    'Fmaj7': [1, 3, 2, 2, 1, 0], 'Gmaj7': [3, 2, 0, 0, 0, 2], 'Amaj7': [null, 0, 2, 1, 2, 0], 'Bmaj7': [null, 2, 4, 3, 4, 2],
    'Cm7': [null, 3, 5, 3, 4, 3], 'Dm7': [null, null, 0, 2, 1, 1], 'Em7': [0, 2, 0, 0, 0, 0],
    'Fm7': [1, 3, 1, 1, 1, 1], 'Gm7': [3, 5, 3, 3, 3, 3], 'Am7': [null, 0, 2, 0, 1, 0], 'Bm7': [null, 2, 0, 2, 0, 2],
    'Csus2': [null, 3, 0, 0, 1, 3], 'Csus4': [null, 3, 3, 0, 1, 1], 'Dsus2': [null, null, 0, 2, 3, 0],
    'Dsus4': [null, null, 0, 2, 3, 3], 'Esus4': [0, 2, 2, 2, 0, 0], 'Gsus4': [3, 3, 0, 0, 1, 3],
    'Asus2': [null, 0, 2, 2, 0, 0], 'Asus4': [null, 0, 2, 2, 3, 0],
    'Cdim': [null, 3, 4, 5, 4, null], 'Ddim': [null, null, 0, 1, 3, 1], 'Edim': [0, 1, 2, 0, null, null],
    'F#dim': [2, 3, 4, 2, null, null], 'G#dim': [4, 5, 6, 4, null, null], 'Adim': [null, 0, 1, 2, 1, null],
    'Caug': [null, 3, 2, 1, 1, 0], 'Eaug': [0, 3, 2, 1, 1, 0], 'Gaug': [3, 2, 1, 0, 0, 3],
    'C6': [null, 3, 2, 2, 1, 0], 'D6': [null, null, 0, 2, 0, 2], 'E6': [0, 2, 2, 1, 2, 0],
    'F6': [1, 3, 3, 2, 3, 1], 'G6': [3, 2, 0, 0, 0, 0], 'A6': [null, 0, 2, 2, 2, 2],
    'Cm7b5': [null, 3, 4, 3, 4, null], 'Dm7b5': [null, null, 0, 1, 1, 1], 'Bm7b5': [null, 2, 3, 2, 3, null],
    'Cadd9': [null, 3, 2, 0, 3, 0], 'Dadd9': [null, null, 0, 2, 3, 0], 'Eadd9': [0, 2, 2, 1, 0, 2],
    'Gadd9': [3, 2, 0, 2, 0, 3], 'Aadd9': [null, 0, 2, 4, 2, 0],
    'C9': [null, 3, 2, 3, 3, null], 'D9': [null, null, 0, 2, 1, 0], 'E9': [0, 2, 0, 1, 0, 2],
    'G9': [3, 2, 0, 2, 0, 1], 'A9': [null, 0, 2, 0, 2, 2],
};

// =====================================================
// POSICIONES ALTERNATIVAS
// =====================================================
const CHORD_POSITIONS = {
    'C': [
        { name: 'Abierto', frets: [0, 3, 2, 0, 1, 0], baseFret: 0 },
        { name: '3er traste', frets: [null, 3, 5, 5, 5, 3], baseFret: 3 },
        { name: '8vo traste', frets: [8, 10, 10, 9, 8, 8], baseFret: 8 }
    ],
    'G': [
        { name: 'Abierto', frets: [3, 2, 0, 0, 0, 3], baseFret: 0 },
        { name: 'Barra 3er', frets: [3, 5, 5, 4, 3, 3], baseFret: 3 },
        { name: 'Barra 10mo', frets: [10, 12, 12, 11, 10, 10], baseFret: 10 }
    ],
    'D': [
        { name: 'Abierto', frets: [null, null, 0, 2, 3, 2], baseFret: 0 },
        { name: 'Barra 5to', frets: [null, 5, 7, 7, 7, 5], baseFret: 5 },
        { name: 'Barra 10mo', frets: [10, 12, 12, 11, 10, 10], baseFret: 10 }
    ],
    'A': [
        { name: 'Abierto', frets: [null, 0, 2, 2, 2, 0], baseFret: 0 },
        { name: 'Barra 5to', frets: [5, 7, 7, 6, 5, 5], baseFret: 5 },
        { name: 'Barra 12vo', frets: [12, 14, 14, 13, 12, 12], baseFret: 12 }
    ],
    'E': [
        { name: 'Abierto', frets: [0, 2, 2, 1, 0, 0], baseFret: 0 },
        { name: 'Barra 7mo', frets: [7, 9, 9, 8, 7, 7], baseFret: 7 },
        { name: 'Barra 12vo', frets: [12, 14, 14, 13, 12, 12], baseFret: 12 }
    ],
    'F': [
        { name: 'Barra 1er', frets: [1, 3, 3, 2, 1, 1], baseFret: 1 },
        { name: 'Barra 8vo', frets: [8, 10, 10, 9, 8, 8], baseFret: 8 },
        { name: 'Barra 13vo', frets: [13, 15, 15, 14, 13, 13], baseFret: 13 }
    ],
    'Am': [
        { name: 'Abierto', frets: [null, 0, 2, 2, 1, 0], baseFret: 0 },
        { name: 'Barra 5to', frets: [5, 7, 7, 5, 5, 5], baseFret: 5 },
        { name: 'Barra 12vo', frets: [12, 14, 14, 12, 12, 12], baseFret: 12 }
    ],
    'Em': [
        { name: 'Abierto', frets: [0, 2, 2, 0, 0, 0], baseFret: 0 },
        { name: 'Barra 7mo', frets: [7, 9, 9, 7, 7, 7], baseFret: 7 },
        { name: 'Barra 12vo', frets: [12, 14, 14, 12, 12, 12], baseFret: 12 }
    ],
    'Dm': [
        { name: 'Abierto', frets: [null, null, 0, 2, 3, 1], baseFret: 0 },
        { name: 'Barra 5to', frets: [null, 5, 7, 7, 6, 5], baseFret: 5 },
        { name: 'Barra 10mo', frets: [10, 12, 12, 10, 10, 10], baseFret: 10 }
    ],
    'Cmaj7': [
        { name: 'Abierto', frets: [null, 3, 2, 0, 0, 0], baseFret: 0 },
        { name: 'Barra 3er', frets: [null, 3, 5, 4, 5, 3], baseFret: 3 },
        { name: 'Barra 8vo', frets: [8, 10, 9, 9, 8, null], baseFret: 8 }
    ],
    'Am7': [
        { name: 'Abierto', frets: [null, 0, 2, 0, 1, 0], baseFret: 0 },
        { name: 'Barra 5to', frets: [5, 7, 5, 5, 5, 5], baseFret: 5 },
        { name: 'Barra 12vo', frets: [12, 14, 12, 12, 12, 12], baseFret: 12 }
    ],
    'G7': [
        { name: 'Abierto', frets: [3, 2, 0, 0, 0, 1], baseFret: 0 },
        { name: 'Barra 3er', frets: [3, 5, 3, 4, 3, 3], baseFret: 3 },
        { name: 'Barra 10mo', frets: [10, 12, 10, 12, 10, 10], baseFret: 10 }
    ]
};

const MODE_INTERVALS = {
    'jónico': [0, 2, 4, 5, 7, 9, 11],
    'dórico': [0, 2, 3, 5, 7, 9, 10],
    'frigio': [0, 1, 3, 5, 7, 8, 10],
    'lidio': [0, 2, 4, 6, 7, 9, 11],
    'mixolidio': [0, 2, 4, 5, 7, 9, 10],
    'eólico': [0, 2, 3, 5, 7, 8, 10],
    'locrio': [0, 1, 3, 5, 6, 8, 10]
};

const MODE_INFO = {
    'jónico': { formula: '1 2 3 4 5 6 7', uso: 'Mayor natural. Ideal para pop, rock y música clásica.' },
    'dórico': { formula: '1 2 b3 4 5 6 b7', uso: 'Menor con 6ª mayor. Jazz, funk y rock progresivo.' },
    'frigio': { formula: '1 b2 b3 4 5 b6 b7', uso: 'Sonido español/flamenco. Metal y rock.' },
    'lidio': { formula: '1 2 3 #4 5 6 7', uso: 'Mayor con #4. Sonido etéreo, bandas sonoras.' },
    'mixolidio': { formula: '1 2 3 4 5 6 b7', uso: 'Mayor con b7. Rock, blues y funk.' },
    'eólico': { formula: '1 2 b3 4 5 b6 b7', uso: 'Menor natural. Baladas, rock y pop.' },
    'locrio': { formula: '1 b2 b3 4 b5 b6 b7', uso: 'Disminuido. Jazz y metal extremo.' }
};

const INTERVAL_ROLES = {
    0: 'Raíz (1)',
    1: '2ª menor (b9)',
    2: '2ª mayor (9)',
    3: '3ª menor (b3)',
    4: '3ª mayor (3)',
    5: '4ª justa (11)',
    6: '5ª disminuida (b5)',
    7: '5ª justa (5)',
    8: '5ª aumentada (#5)',
    9: '6ª mayor (13)',
    10: '7ª menor (b7)',
    11: '7ª mayor (7)'
};

// Estado global
let currentFretboard = [null, null, null, null, null, null];
let audioCtx = null;
let currentChordData = null;
let progressionChords = [];
let currentKeyNav = 'C';

// =====================================================
// INICIALIZACIÓN
// =====================================================
window.onload = function () {
    initFretboardUI();
    initCircleOfFifths();
    initSelectors();
    resetFretboard();
    updateModeInfo();
    initMenuEvents();
    initKeyNavigator();
    buildChordPicker();
};

// =====================================================
// MENÚ
// =====================================================
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    if (!menu || !overlay) return;

    if (menu.classList.contains('active')) {
        closeMenu();
    } else {
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMenu() {
    const menu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    if (!menu || !overlay) return;
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function initMenuEvents() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

// =====================================================
// MÁSTIL
// =====================================================
function initFretboardUI() {
    const container = document.querySelector('.string-selectors');
    if (!container) return;
    container.innerHTML = '';

    STRINGS.forEach((stringName, index) => {
        const div = document.createElement('div');
        div.className = 'string-row';
        div.innerHTML = `
            <label>${stringName}</label>
            <select onchange="updateString(${index}, this.value)">
                <option value="null">-</option>
                <option value="X">X</option>
                <option value="0">0</option>
                ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
            </select>
        `;
        container.appendChild(div);
    });
}

function updateString(stringIndex, value) {
    if (value === 'null') currentFretboard[stringIndex] = null;
    else if (value === 'X') currentFretboard[stringIndex] = 'X';
    else currentFretboard[stringIndex] = parseInt(value);
    drawFretboard();
    detectChord();
}

function drawFretboard() {
    const container = document.querySelector('.fretboard-visual');
    if (!container) return;

    const width = 800, height = 260;
    const marginLeft = 55, marginTop = 35, marginRight = 15, marginBottom = 15;
    const drawWidth = width - marginLeft - marginRight;
    const drawHeight = height - marginTop - marginBottom;
    const stringSpacing = drawHeight / 5;
    const fretSpacing = drawWidth / 12;

    let svg = `<svg class="fretboard-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">`;
    svg += `<rect x="0" y="0" width="${width}" height="${height}" fill="#2a1f1a" rx="10" />`;

    for (let i = 0; i <= 12; i++) {
        const x = marginLeft + (i * fretSpacing);
        const strokeW = (i === 0) ? 6 : 3;
        svg += `<line class="fret-line" x1="${x}" y1="${marginTop}" x2="${x}" y2="${height - marginBottom}" stroke-width="${strokeW}" />`;
    }

    for (let i = 0; i < 6; i++) {
        const y = marginTop + (i * stringSpacing);
        const strokeW = 5 - (i * 0.6);
        svg += `<line class="string-line" x1="${marginLeft}" y1="${y}" x2="${width - marginRight}" y2="${y}" stroke-width="${strokeW}" />`;
        svg += `<text x="${marginLeft - 12}" y="${y}" fill="#ff6b00" font-size="14" font-weight="bold" text-anchor="end" dominant-baseline="middle">${STRINGS[i]}</text>`;
    }

    for (let i = 1; i <= 12; i++) {
        const x = marginLeft + ((i - 0.5) * fretSpacing);
        svg += `<text x="${x}" y="${marginTop - 12}" fill="#888" font-size="12" text-anchor="middle">${i}</text>`;
    }

    currentFretboard.forEach((fret, stringIndex) => {
        const y = marginTop + (stringIndex * stringSpacing);
        if (fret === 'X') {
            svg += `<text x="${marginLeft - 25}" y="${y}" fill="#ff3333" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>`;
        } else if (fret !== null && fret >= 0) {
            const x = (fret === 0) ? marginLeft - 15 : marginLeft + ((fret - 0.5) * fretSpacing);
            const noteName = getNoteName(stringIndex, fret);
            svg += `<circle cx="${x}" cy="${y}" r="15" fill="#ff6b00" stroke="#000" stroke-width="2" />`;
            svg += `<text x="${x}" y="${y}" fill="#000" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${noteName}</text>`;
        }
    });

    svg += `</svg>`;
    container.innerHTML = svg;
}

function getNoteName(stringIndex, fret) {
    const openIndex = NOTES.indexOf(OPEN_NOTES[stringIndex]);
    return NOTES[(openIndex + fret) % 12];
}

// =====================================================
// DETECCIÓN DE ACORDES
// =====================================================
function detectChord() {
    const notes = [];
    currentFretboard.forEach((fret, i) => {
        if (fret !== null && fret !== 'X') notes.push(getNoteName(i, fret));
    });

    const uniqueNotes = [...new Set(notes)];
    const chordNameEl = document.getElementById('chord-name');
    const altEl = document.getElementById('chord-alternatives');
    const positionsEl = document.getElementById('chord-positions');
    const infoEl = document.getElementById('chord-info');

    if (uniqueNotes.length < 2) {
        chordNameEl.textContent = '---';
        altEl.textContent = '';
        if (positionsEl) positionsEl.innerHTML = '';
        if (infoEl) infoEl.innerHTML = '';
        document.getElementById('scale-info').innerHTML = '<p class="empty-state">Toca al menos 2 cuerdas para ver la escala.</p>';
        document.getElementById('scale-fretboard').innerHTML = '';
        document.getElementById('dominant-result').innerHTML = '<p class="empty-state">Toca un acorde primero para ver sus dominantes secundarios y sustitutos de tritono.</p>';
        document.getElementById('analysis-content').innerHTML = '<p class="empty-state">Toca un acorde para ver su análisis armónico completo.</p>';
        currentChordData = null;
        return;
    }

    currentChordData = analyzeChord(uniqueNotes, notes);
    chordNameEl.textContent = currentChordData.primaryName;

    const bassNote = notes[0];
    let altText = '';
    if (currentChordData.root && bassNote !== currentChordData.root && currentChordData.quality) {
        altText += `Inversión: ${currentChordData.primaryName}/${bassNote} · `;
    }
    if (currentChordData.alternatives.length > 1) {
        altText += `También: ${currentChordData.alternatives.slice(1).join(', ')} · `;
    }
    altText += `Notas: ${uniqueNotes.join(' - ')}`;
    altEl.textContent = altText;

    renderPositions(currentChordData.primaryName);
    renderChordInfo(currentChordData, uniqueNotes);
    updateScaleForChord(currentChordData);
    updateProgressionsForChord(currentChordData);
    updateModeForChord(currentChordData);
    calculateDominants();
    renderHarmonicAnalysis(currentChordData, uniqueNotes);
}

function analyzeChord(notes, orderedNotes) {
    const candidates = [];
    const bassNote = orderedNotes ? orderedNotes[0] : notes[0];

    notes.forEach(rootNote => {
        const rootIndex = NOTES.indexOf(rootNote);
        const intervals = notes.map(n => (NOTES.indexOf(n) - rootIndex + 12) % 12).sort((a, b) => a - b);

        for (const [suffix, quality] of Object.entries(CHORD_QUALITIES)) {
            const required = quality.intervals;
            const matches = required.every(i => intervals.includes(i));
            const extras = intervals.filter(i => !required.includes(i));

            if (matches && extras.length === 0) {
                let priority = required.length * 100;
                if (rootNote === bassNote) priority += 150;

                candidates.push({
                    root: rootNote, suffix: suffix,
                    name: rootNote + suffix,
                    quality: quality, priority: priority
                });
            }
        }
    });

    const uniqueCandidates = [];
    const seenNames = new Set();
    candidates.sort((a, b) => b.priority - a.priority);
    for (const c of candidates) {
        if (!seenNames.has(c.name)) {
            seenNames.add(c.name);
            uniqueCandidates.push(c);
        }
    }

    if (uniqueCandidates.length === 0) {
        let bestFlexible = null;
        notes.forEach(rootNote => {
            const rootIndex = NOTES.indexOf(rootNote);
            const intervals = notes.map(n => (NOTES.indexOf(n) - rootIndex + 12) % 12).sort((a, b) => a - b);

            for (const [suffix, quality] of Object.entries(CHORD_QUALITIES)) {
                const matched = quality.intervals.filter(i => intervals.includes(i)).length;
                const ratio = matched / quality.intervals.length;

                if (ratio >= 0.75 && matched >= 3) {
                    let priority = matched * 100 + (rootNote === bassNote ? 100 : 0);
                    if (!bestFlexible || priority > bestFlexible.priority) {
                        bestFlexible = {
                            root: rootNote, suffix: suffix,
                            name: rootNote + suffix + ' (?)',
                            quality: quality, priority: priority
                        };
                    }
                }
            }
        });

        if (bestFlexible) {
            return {
                root: bestFlexible.root, suffix: bestFlexible.suffix,
                primaryName: bestFlexible.name, alternatives: [],
                quality: bestFlexible.quality, intervals: bestFlexible.quality.intervals
            };
        }

        return { root: notes[0], suffix: '', primaryName: notes[0] + ' (?)', alternatives: [], quality: null, intervals: [] };
    }

    const best = uniqueCandidates[0];
    return {
        root: best.root, suffix: best.suffix,
        primaryName: best.name,
        alternatives: uniqueCandidates.map(c => c.name),
        quality: best.quality, intervals: best.quality.intervals
    };
}

// =====================================================
// INFO DEL ACORDE
// =====================================================
function renderChordInfo(chordData, notes) {
    const infoEl = document.getElementById('chord-info');
    if (!infoEl) return;

    if (!chordData || !chordData.quality) {
        infoEl.innerHTML = '<p class="empty-state">Sin información disponible.</p>';
        return;
    }

    const quality = chordData.quality;
    const formulaParts = quality.formula.split(' ');
    let formulaBadges = formulaParts.map(f => `<span class="formula-badge">${f}</span>`).join('');

    infoEl.innerHTML = `
        <h4>Información del acorde: ${chordData.primaryName}</h4>
        <div class="info-row">
            <span class="info-label">Tipo:</span>
            <span>${quality.name}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Fórmula:</span>
            <div>${formulaBadges}</div>
        </div>
        <div class="info-row">
            <span class="info-label">Notas:</span>
            <span>${notes.join(' - ')}</span>
        </div>
        <div class="explanation">
            <strong>¿Por qué se llama ${chordData.primaryName}?</strong> ${quality.explanation}
        </div>
    `;
}

// =====================================================
// POSICIONES ALTERNATIVAS
// =====================================================
function renderPositions(chordName) {
    const positionsEl = document.getElementById('chord-positions');
    if (!positionsEl) return;

    const baseChord = chordName.split('/')[0].split(' ')[0];
    positionsEl.innerHTML = '';

    if (!CHORD_POSITIONS[baseChord]) {
        if (CHORD_DB[baseChord]) {
            const btn = document.createElement('button');
            btn.className = 'position-btn active';
            btn.textContent = 'Posición estándar';
            btn.onclick = () => loadChordFromDB(baseChord);
            positionsEl.appendChild(btn);
        }
        return;
    }

    const title = document.createElement('span');
    title.className = 'positions-title';
    title.textContent = 'Posiciones:';
    positionsEl.appendChild(title);

    CHORD_POSITIONS[baseChord].forEach((pos, idx) => {
        const btn = document.createElement('button');
        btn.className = 'position-btn';
        btn.textContent = pos.name;
        btn.onclick = () => {
            currentFretboard = [...pos.frets];
            const selects = document.querySelectorAll('.string-row select');
            selects.forEach((select, i) => {
                select.value = currentFretboard[i] === null ? 'null' : currentFretboard[i];
            });
            drawFretboard();
            detectChord();
            positionsEl.querySelectorAll('.position-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        if (idx === 0) btn.classList.add('active');
        positionsEl.appendChild(btn);
    });
}

// =====================================================
// ANÁLISIS ARMÓNICO
// =====================================================
function renderHarmonicAnalysis(chordData, notes) {
    const container = document.getElementById('analysis-content');
    if (!container) return;

    if (!chordData || !chordData.quality || !chordData.root) {
        container.innerHTML = '<p class="empty-state">Toca un acorde para ver su análisis armónico completo.</p>';
        return;
    }

    const root = chordData.root;
    const rootIndex = NOTES.indexOf(root);
    const quality = chordData.quality;

    const functionInfo = getHarmonicFunction(chordData);
    const noteRoles = quality.intervals.map(interval => ({
        note: NOTES[(rootIndex + interval) % 12],
        role: INTERVAL_ROLES[interval] || `Intervalo ${interval}`
    }));
    const appearances = getChordAppearances(chordData);
    const tensions = getAvailableTensions(chordData);
    const resolutions = getNaturalResolutions(chordData);

    let html = '';

    html += `
        <div class="analysis-block">
            <h4>📊 ${chordData.primaryName}</h4>
            <p>Análisis armónico de las notas: <strong>${notes.join(' - ')}</strong></p>
        </div>
    `;

    html += `
        <div class="analysis-block">
            <h4>🎯 Función armónica</h4>
            <p>
                <span class="function-badge ${functionInfo.category}">${functionInfo.name}</span>
                ${functionInfo.description}
            </p>
        </div>
    `;

    html += `<div class="analysis-block"><h4>🎼 Notas del acorde y su función</h4><ul>`;
    noteRoles.forEach(nr => {
        html += `<li><strong>${nr.note}</strong><span class="role-tag">${nr.role}</span></li>`;
    });
    html += `</ul></div>`;

    html += `<div class="analysis-block"><h4>🔀 Tonalidades donde aparece</h4><ul>`;
    appearances.forEach(a => {
        html += `<li>En <strong>${a.key}</strong> ${a.mode} → <strong>${a.degree}</strong> (${a.role})</li>`;
    });
    html += `</ul></div>`;

    html += `<div class="analysis-block"><h4>✨ Tensiones disponibles</h4><ul>`;
    tensions.forEach(t => {
        html += `<li><strong>${t.name}</strong> — ${t.description}</li>`;
    });
    html += `</ul></div>`;

    html += `<div class="analysis-block"><h4>➡️ Resoluciones naturales</h4><ul>`;
    resolutions.forEach(r => {
        html += `<li>${r.from} → <strong>${r.to}</strong> (${r.reason})</li>`;
    });
    html += `</ul></div>`;

    container.innerHTML = html;
}

function getHarmonicFunction(chordData) {
    const suffix = chordData.suffix;

    if (suffix === '' || suffix === 'maj7' || suffix === 'm' || suffix === 'mMaj7') {
        return { name: 'Tónica', category: 'tonic', description: 'Puede funcionar como centro tonal. Genera sensación de reposo y estabilidad.' };
    }
    if (suffix.includes('7') && !suffix.includes('maj') && !suffix.includes('m')) {
        return { name: 'Dominante', category: 'dominant', description: 'Genera tensión fuerte. Resuelve naturalmente a la tónica (a una 5ª justa por debajo).' };
    }
    if (suffix === 'm7' || suffix === 'm9' || suffix === 'm11' || suffix === '6' || suffix === 'm6') {
        return { name: 'Subdominante / Predominante', category: 'subdominant', description: 'Prepara el camino hacia el dominante. Aporta color y movimiento sin resolver directamente.' };
    }
    if (suffix.includes('dim')) {
        return { name: 'Tensión / Disminuido', category: 'dominant', description: 'Acorde inestable que resuelve por semitono.' };
    }
    if (suffix.includes('aug')) {
        return { name: 'Tensión / Aumentado', category: 'dominant', description: 'Acorde simétrico con sonido flotante.' };
    }
    if (suffix.includes('sus')) {
        return { name: 'Suspendido', category: 'subdominant', description: 'Sustituye la 3ª por la 2ª o 4ª. Suena ambiguo y suele resolver.' };
    }
    return { name: 'Función variable', category: 'subdominant', description: 'Su función depende del contexto tonal.' };
}

function getChordAppearances(chordData) {
    const root = chordData.root;
    const rootIndex = NOTES.indexOf(root);
    const suffix = chordData.suffix;
    const appearances = [];
    const isMinor = suffix.includes('m') && !suffix.includes('maj');
    const isDominant = suffix.includes('7') && !suffix.includes('maj') && !isMinor;

    if (isMinor) {
        appearances.push({ key: root, mode: 'menor', degree: 'i', role: 'Tónica' });
        appearances.push({ key: NOTES[(rootIndex + 3) % 12], mode: 'mayor', degree: 'vi', role: 'Submediante' });
        appearances.push({ key: NOTES[(rootIndex + 5) % 12], mode: 'mayor', degree: 'ii', role: 'Supertónica' });
        appearances.push({ key: NOTES[(rootIndex + 8) % 12], mode: 'mayor', degree: 'iii', role: 'Mediante' });
    } else if (isDominant) {
        const targetKey = NOTES[(rootIndex + 5) % 12];
        appearances.push({ key: targetKey, mode: 'mayor', degree: 'V7', role: 'Dominante' });
        appearances.push({ key: targetKey, mode: 'menor', degree: 'V7', role: 'Dominante' });
        appearances.push({ key: NOTES[(rootIndex - 2 + 12) % 12], mode: 'mayor', degree: 'V7/IV', role: 'Dominante secundario' });
    } else {
        appearances.push({ key: root, mode: 'mayor', degree: 'I', role: 'Tónica' });
        appearances.push({ key: NOTES[(rootIndex + 7) % 12], mode: 'mayor', degree: 'IV', role: 'Subdominante' });
        appearances.push({ key: NOTES[(rootIndex + 5) % 12], mode: 'mayor', degree: 'V', role: 'Dominante' });
        appearances.push({ key: NOTES[(rootIndex + 9) % 12], mode: 'menor', degree: 'VI', role: 'Submediante' });
    }

    return appearances;
}

function getAvailableTensions(chordData) {
    const suffix = chordData.suffix;
    const isMinor = suffix.includes('m') && !suffix.includes('maj');
    const isDominant = suffix.includes('7') && !suffix.includes('maj') && !isMinor;
    const isMajor7 = suffix.includes('maj7');

    const tensions = [];

    if (isMajor7) {
        tensions.push({ name: '9 (2ª mayor)', description: 'Añade color brillante sin romper la estabilidad.' });
        tensions.push({ name: '#11 (4ª aumentada)', description: 'Sonido lidio, muy cinematográfico.' });
        tensions.push({ name: '13 (6ª mayor)', description: 'Sonido cálido y sofisticado.' });
    } else if (isMinor) {
        tensions.push({ name: '9 (2ª mayor)', description: 'Añade color moderno, muy usado en neo-soul.' });
        tensions.push({ name: '11 (4ª justa)', description: 'Disponible en m7 y m9.' });
        tensions.push({ name: '13 (6ª mayor)', description: 'Cuidado: puede sonar a relativa mayor.' });
    } else if (isDominant) {
        tensions.push({ name: 'b9 (2ª menor)', description: 'Tensión fuerte, resuelve muy bien a menor.' });
        tensions.push({ name: '#9 (2ª aumentada)', description: 'Sonido Hendrix, bluesy y agresivo.' });
        tensions.push({ name: 'b13 (6ª menor)', description: 'Tensión hacia el acorde menor de destino.' });
        tensions.push({ name: '#11 (4ª aumentada)', description: 'Sonido lidio dominante, muy moderno.' });
        tensions.push({ name: '13 (6ª mayor)', description: 'Sonido cálido, común en blues y jazz.' });
    } else {
        tensions.push({ name: '9 (2ª mayor)', description: 'Añade color sin alterar la función del acorde.' });
        tensions.push({ name: '6/13 (6ª mayor)', description: 'Sonido jazzy estable.' });
        tensions.push({ name: 'add9', description: 'Añade la 9ª sin la 7ª, mantiene sencillez.' });
    }

    return tensions;
}

function getNaturalResolutions(chordData) {
    const root = chordData.root;
    const rootIndex = NOTES.indexOf(root);
    const suffix = chordData.suffix;
    const isMinor = suffix.includes('m') && !suffix.includes('maj');
    const isDominant = suffix.includes('7') && !suffix.includes('maj') && !isMinor;

    const resolutions = [];

    if (isDominant) {
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 5) % 12], reason: 'Resolución dominante → tónica' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 5) % 12] + 'm', reason: 'Resolución a tónica menor' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 8) % 12] + 'm', reason: 'Resolución deceptiva (al vi grado)' });
    } else if (isMinor) {
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 5) % 12] + 'm', reason: 'Movimiento por 4ª a iv grado' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 3) % 12], reason: 'A relativa mayor' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 7) % 12] + '7', reason: 'A dominante (V7)' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 8) % 12], reason: 'Al VI grado' });
    } else {
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 5) % 12], reason: 'A IV grado (subdominante)' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 7) % 12], reason: 'A V grado (dominante)' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 9) % 12] + 'm', reason: 'A vi grado (relativo menor)' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 2) % 12] + 'm', reason: 'A ii grado (supertónica)' });
    }

    return resolutions;
}

// =====================================================
// ESCALA
// =====================================================
function updateScaleForChord(chordData) {
    const infoBox = document.getElementById('scale-info');
    const fretboardBox = document.getElementById('scale-fretboard');

    if (!chordData || !chordData.quality) {
        infoBox.innerHTML = '<p class="empty-state">Escala no disponible.</p>';
        fretboardBox.innerHTML = '';
        return;
    }

    const root = chordData.root;
    const quality = chordData.quality;
    const scaleRootIndex = NOTES.indexOf(root);
    const scaleMode = quality.scale;

    const scaleNotes = MODE_INTERVALS[scaleMode].map(i => NOTES[(scaleRootIndex + i) % 12]);
    const formulaSymbols = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
    const formula = MODE_INTERVALS[scaleMode].map(i => formulaSymbols[i]).join(' ');

    infoBox.innerHTML = `
        <h4>Escala de ${root} — ${scaleMode.charAt(0).toUpperCase() + scaleMode.slice(1)}</h4>
        <p><strong>Notas:</strong> ${scaleNotes.join(' - ')}</p>
        <p><strong>Fórmula:</strong> ${formula}</p>
        <p><strong>Acorde base:</strong> ${chordData.primaryName} (${quality.name})</p>
        <p style="margin-top:10px; font-size:0.9em; color:#888;">
            <strong>Uso:</strong> Esta es la escala recomendada para improvisar sobre ${chordData.primaryName}.
            La nota naranja en el mástil es la raíz (${root}); las azules son las demás notas.
        </p>
    `;

    drawScaleFretboard('scale-fretboard', scaleNotes, scaleRootIndex);
}

function drawScaleFretboard(containerId, scaleNotes, rootIndex) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = 800, height = 220;
    const marginLeft = 55, marginTop = 35, marginRight = 15, marginBottom = 15;
    const drawWidth = width - marginLeft - marginRight;
    const drawHeight = height - marginTop - marginBottom;
    const stringSpacing = drawHeight / 5;
    const fretSpacing = drawWidth / 13;

    let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" style="background:#2a1f1a; border-radius:10px; width:100%; height:auto; display:block;">`;

    for (let i = 0; i <= 13; i++) {
        const x = marginLeft + (i * fretSpacing);
        svg += `<line x1="${x}" y1="${marginTop}" x2="${x}" y2="${height - marginBottom}" stroke="#777" stroke-width="${i === 0 ? 6 : 2}" />`;
    }

    for (let i = 0; i < 6; i++) {
        const y = marginTop + (i * stringSpacing);
        svg += `<line x1="${marginLeft}" y1="${y}" x2="${width - marginRight}" y2="${y}" stroke="#ccc" stroke-width="${5 - (i * 0.6)}" />`;
        svg += `<text x="${marginLeft - 12}" y="${y}" fill="#ff6b00" font-size="13" font-weight="bold" text-anchor="end" dominant-baseline="middle">${STRINGS[i]}</text>`;
    }

    for (let i = 1; i <= 12; i++) {
        svg += `<text x="${marginLeft + ((i - 0.5) * fretSpacing)}" y="${marginTop - 12}" fill="#888" font-size="11" text-anchor="middle">${i}</text>`;
    }

    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
        const y = marginTop + (stringIndex * stringSpacing);
        const openIndex = NOTES.indexOf(OPEN_NOTES[stringIndex]);

        for (let fret = 0; fret <= 12; fret++) {
            const noteIndex = (openIndex + fret) % 12;
            const noteName = NOTES[noteIndex];

            if (scaleNotes.includes(noteName)) {
                const x = (fret === 0) ? marginLeft - 15 : marginLeft + ((fret - 0.5) * fretSpacing);
                const isRoot = noteIndex === rootIndex;
                const fillColor = isRoot ? '#ff6b00' : '#4a9eff';
                svg += `<circle cx="${x}" cy="${y}" r="11" fill="${fillColor}" stroke="#000" stroke-width="1.5" />`;
                svg += `<text x="${x}" y="${y}" fill="#000" font-size="10" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${noteName}</text>`;
            }
        }
    }

    svg += `</svg>`;
    container.innerHTML = svg;
}

// =====================================================
// PROGRESIONES
// =====================================================
function updateProgressionsForChord(chordData) {
    const container = document.getElementById('progressions-list');
    if (!chordData || !chordData.quality) {
        container.innerHTML = '<p class="empty-state">Progresiones no disponibles.</p>';
        return;
    }

    const root = chordData.root;
    const rootIndex = NOTES.indexOf(root);
    const isMinor = chordData.suffix.includes('m') && !chordData.suffix.includes('maj');

    let degrees;
    if (isMinor) {
        degrees = {
            'i': root + 'm', 'ii°': NOTES[(rootIndex + 2) % 12] + 'dim',
            'III': NOTES[(rootIndex + 3) % 12], 'iv': NOTES[(rootIndex + 5) % 12] + 'm',
            'v': NOTES[(rootIndex + 7) % 12] + 'm', 'VI': NOTES[(rootIndex + 8) % 12],
            'VII': NOTES[(rootIndex + 10) % 12]
        };
    } else {
        degrees = {
            'I': root, 'ii': NOTES[(rootIndex + 2) % 12] + 'm',
            'iii': NOTES[(rootIndex + 4) % 12] + 'm', 'IV': NOTES[(rootIndex + 5) % 12],
            'V': NOTES[(rootIndex + 7) % 12], 'vi': NOTES[(rootIndex + 9) % 12] + 'm',
            'vii°': NOTES[(rootIndex + 11) % 12] + 'dim'
        };
    }

    const progressions = isMinor ? [
        `i - iv - v - i  (${degrees['i']} → ${degrees['iv']} → ${degrees['v']} → ${degrees['i']})`,
        `i - VI - III - VII  (${degrees['i']} → ${degrees['VI']} → ${degrees['III']} → ${degrees['VII']})`,
        `i - iv - VII - III  (${degrees['i']} → ${degrees['iv']} → ${degrees['VII']} → ${degrees['III']})`
    ] : [
        `I - IV - V - I  (${degrees['I']} → ${degrees['IV']} → ${degrees['V']} → ${degrees['I']})`,
        `I - vi - IV - V  (${degrees['I']} → ${degrees['vi']} → ${degrees['IV']} → ${degrees['V']})`,
        `ii - V - I  (${degrees['ii']} → ${degrees['V']} → ${degrees['I']})`
    ];

    let html = `<div style="margin-bottom:15px;"><strong style="color:#ff6b00;">Tonalidad sugerida:</strong> ${root} ${isMinor ? 'menor' : 'mayor'}</div>`;
    html += `<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(100px,1fr)); gap:8px; margin-bottom:15px;">`;

    Object.entries(degrees).forEach(([degree, chord]) => {
        html += `<div class="result-item" style="text-align:center;"><strong style="color:#ff6b00;">${degree}</strong><br>${chord}</div>`;
    });

    html += `</div><h4 style="color:#ff6b00; margin-bottom:10px;">Progresiones sugeridas:</h4>`;
    progressions.forEach(p => {
        html += `<div class="result-item" style="text-align:left; padding:12px; margin-bottom:8px;">${p}</div>`;
    });

    container.innerHTML = html;
}

// =====================================================
// MODOS
// =====================================================
function updateModeForChord(chordData) {
    if (!chordData || !chordData.quality) return;
    const modeSelector = document.getElementById('mode-selector');
    if (modeSelector && chordData.quality.scale) {
        modeSelector.value = chordData.quality.scale;
    }
    updateModeInfo();
}

function updateModeInfo() {
    const mode = document.getElementById('mode-selector').value;
    const infoBox = document.getElementById('mode-info');
    const data = MODE_INFO[mode];
    if (!data) return;

    const root = currentChordData && currentChordData.root ? currentChordData.root : 'C';
    const rootIndex = NOTES.indexOf(root);
    const scaleNotes = MODE_INTERVALS[mode].map(i => NOTES[(rootIndex + i) % 12]);

    infoBox.innerHTML = `
        <p><strong>Fórmula:</strong> ${data.formula}</p>
        <p><strong>Escala de ${root} ${mode.charAt(0).toUpperCase() + mode.slice(1)}:</strong> ${scaleNotes.join(' - ')}</p>
        <p><strong>Uso:</strong> ${data.uso}</p>
        <p><strong>Sustitución:</strong> Prueba sustituir el acorde I por el VI o el III.</p>
    `;

    drawScaleFretboard('mode-fretboard', scaleNotes, rootIndex);
}

function playModeScale() {
    const mode = document.getElementById('mode-selector').value;
    const root = currentChordData && currentChordData.root ? currentChordData.root : 'C';
    const rootIndex = NOTES.indexOf(root);
    const scale = MODE_INTERVALS[mode].map(i => NOTES[(rootIndex + i) % 12]);
    for (let i = 0; i < scale.length; i++) {
        setTimeout(() => playNote(scale[i]), i * 350);
    }
}

// =====================================================
// AUDIO
// =====================================================
function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playNote(noteName) {
    initAudio();
    const freq = getFrequency(noteName);
    const now = audioCtx.currentTime;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    const gain2 = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    const masterGain = audioCtx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.value = freq;
    osc2.type = 'sawtooth';
    osc2.frequency.value = freq;

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(4000, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 1.5);
    filter.Q.value = 2;

    gain1.gain.value = 0.7;
    gain2.gain.value = 0.3;

    osc1.connect(gain1); osc2.connect(gain2);
    gain1.connect(filter); gain2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.008);
    masterGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

    osc1.start(now); osc2.start(now);
    osc1.stop(now + 2.8); osc2.stop(now + 2.8);
}

function playCurrentChord() {
    initAudio();
    currentFretboard.forEach((fret, i) => {
        if (fret !== null && fret !== 'X') {
            const noteName = getNoteName(i, fret);
            setTimeout(() => playNote(noteName), i * 70);
        }
    });
}

function getFrequency(note) {
    const map = { 'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88 };
    return map[note] || 440;
}

// =====================================================
// CÍRCULO DE QUINTAS MEJORADO
// =====================================================
function initCircleOfFifths() {
    const container = document.getElementById('circle-of-fifths');
    if (!container) return;

    const size = 420, center = size / 2;
    const radiusOuter = 180, radiusMid = 145, radiusInner = 110, radiusCore = 60;
    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const minorKeys = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m', 'Fm', 'Cm', 'Gm', 'Dm'];
    const degrees = ['I', 'V', 'ii', 'vi', 'iii', 'vii°', 'IV', 'I', 'V', 'ii', 'vi', 'iii'];

    let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<circle cx="${center}" cy="${center}" r="${radiusOuter + 15}" fill="#1a1a1a" stroke="#333" stroke-width="2"/>`;

    majorKeys.forEach((key, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const aw = 0.26;

        const x1 = center + radiusOuter * Math.cos(angle - aw);
        const y1 = center + radiusOuter * Math.sin(angle - aw);
        const x2 = center + radiusOuter * Math.cos(angle + aw);
        const y2 = center + radiusOuter * Math.sin(angle + aw);
        const x3 = center + radiusMid * Math.cos(angle + aw);
        const y3 = center + radiusMid * Math.sin(angle + aw);
        const x4 = center + radiusMid * Math.cos(angle - aw);
        const y4 = center + radiusMid * Math.sin(angle - aw);

        svg += `<path class="circle-segment" id="seg-major-${key}" d="M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z" onclick="selectKey('${key}')" />`;

        const tx = center + ((radiusOuter + radiusMid) / 2) * Math.cos(angle);
        const ty = center + ((radiusOuter + radiusMid) / 2) * Math.sin(angle);
        svg += `<text class="circle-text" x="${tx}" y="${ty}" fill="#e8e8e8">${key}</text>`;

        // Anillo intermedio (grados)
        const dx1 = center + radiusMid * Math.cos(angle - aw);
        const dy1 = center + radiusMid * Math.sin(angle - aw);
        const dx2 = center + radiusMid * Math.cos(angle + aw);
        const dy2 = center + radiusMid * Math.sin(angle + aw);
        const dx3 = center + radiusInner * Math.cos(angle + aw);
        const dy3 = center + radiusInner * Math.sin(angle + aw);
        const dx4 = center + radiusInner * Math.cos(angle - aw);
        const dy4 = center + radiusInner * Math.sin(angle - aw);

        svg += `<path class="circle-segment" d="M ${dx1} ${dy1} L ${dx2} ${dy2} L ${dx3} ${dy3} L ${dx4} ${dy4} Z" style="fill:#0a0a0a;" onclick="selectKey('${key}')" />`;

        const degTx = center + ((radiusMid + radiusInner) / 2) * Math.cos(angle);
        const degTy = center + ((radiusMid + radiusInner) / 2) * Math.sin(angle);
        svg += `<text class="circle-degree-text" x="${degTx}" y="${degTy}">${degrees[i]}</text>`;

        // Anillo interior (relativas menores)
        const ir1 = center + radiusInner * Math.cos(angle - aw);
        const ir2 = center + radiusInner * Math.sin(angle - aw);
        const ir3 = center + radiusInner * Math.cos(angle + aw);
        const ir4 = center + radiusInner * Math.sin(angle + aw);
        const ir5 = center + radiusCore * Math.cos(angle + aw);
        const ir6 = center + radiusCore * Math.sin(angle + aw);
        const ir7 = center + radiusCore * Math.cos(angle - aw);
        const ir8 = center + radiusCore * Math.sin(angle - aw);

        svg += `<path class="circle-segment" id="seg-minor-${minorKeys[i]}" d="M ${ir1} ${ir2} L ${ir3} ${ir4} L ${ir5} ${ir6} L ${ir7} ${ir8} Z" onclick="selectKey('${minorKeys[i]}')" style="fill:#111;" />`;

        const mtx = center + ((radiusInner + radiusCore) / 2) * Math.cos(angle);
        const mty = center + ((radiusInner + radiusCore) / 2) * Math.sin(angle);
        svg += `<text class="circle-text" x="${mtx}" y="${mty}" fill="#888" font-size="10">${minorKeys[i]}</text>`;
    });

    svg += `<circle cx="${center}" cy="${center}" r="${radiusCore}" fill="#0d0d0d" stroke="#333" stroke-width="2"/>`;
    svg += `<text class="circle-text" x="${center}" y="${center}" fill="#ff6b00" font-size="16" font-weight="bold">Tavo</text>`;
    svg += `</svg>`;
    container.innerHTML = svg;
}

function selectKey(key) {
    const info = document.getElementById('circle-info');
    const isMinor = key.includes('m');
    const root = key.replace('m', '');
    const rootIndex = NOTES.indexOf(root);

    document.querySelectorAll('.circle-segment').forEach(el => el.classList.remove('active'));
    const activeEl = document.getElementById(isMinor ? `seg-minor-${key}` : `seg-major-${key}`);
    if (activeEl) activeEl.classList.add('active');

    const scaleIntervals = isMinor ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11];
    const degreeNames = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    const degreeQualities = isMinor ? ['m', 'dim', '', 'm', 'm', '', ''] : ['', 'm', 'm', '', '', 'm', 'dim'];

    let scaleHTML = '<h4>Grados de la escala:</h4><ul>';
    scaleIntervals.forEach((interval, i) => {
        scaleHTML += `<li><strong>${degreeNames[i]}:</strong> ${NOTES[(rootIndex + interval) % 12]}${degreeQualities[i]}</li>`;
    });
    scaleHTML += '</ul>';

    const relative = isMinor ? NOTES[(rootIndex + 3) % 12] : NOTES[(rootIndex + 9) % 12] + 'm';
    const dominant = NOTES[(rootIndex + 7) % 12] + '7';
    const subdominant = NOTES[(rootIndex + 5) % 12] + (isMinor ? 'm' : '');

    info.innerHTML = `
        <h3>Tonalidad de ${key} ${isMinor ? 'Menor' : 'Mayor'}</h3>
        <p><strong>Relativa:</strong> ${relative}</p>
        <div class="circle-axis-info">
            <div class="axis-card tonic">
                <strong>Tónica (I)</strong>
                ${root}${isMinor ? 'm' : ''}
            </div>
            <div class="axis-card subdominant">
                <strong>Subdominante (IV)</strong>
                ${subdominant}
            </div>
            <div class="axis-card dominant">
                <strong>Dominante (V7)</strong>
                ${dominant}
            </div>
        </div>
        ${scaleHTML}
        <p style="margin-top:12px; font-size:0.9em; color:#888;">
            <strong>Explicación:</strong> Los grados I, IV y V son los pilares. 
            El ii y vi añaden color. El vii° es el acorde de tensión que resuelve al I.
        </p>
    `;
}

// =====================================================
// ANALIZADOR DE PROGRESIONES
// =====================================================
function buildChordPicker() {
    const grid = document.getElementById('chord-picker-grid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.keys(CHORD_DB).forEach(chord => {
        const item = document.createElement('div');
        item.className = 'chord-picker-item';
        item.textContent = chord;
        item.onclick = () => addChordToProgression(chord);
        grid.appendChild(item);
    });
}

function showChordPicker() {
    const picker = document.getElementById('chord-picker');
    if (picker) picker.style.display = 'block';
}

function hideChordPicker() {
    const picker = document.getElementById('chord-picker');
    if (picker) picker.style.display = 'none';
}

function addChordToProgression(chord) {
    if (progressionChords.length >= 8) {
        alert('Máximo 8 acordes por progresión');
        return;
    }
    progressionChords.push(chord);
    renderProgressionChips();
    hideChordPicker();
}

function removeChordFromProgression(index) {
    progressionChords.splice(index, 1);
    renderProgressionChips();
}

function clearProgression() {
    progressionChords = [];
    renderProgressionChips();
    document.getElementById('progression-input').value = '';
    document.getElementById('progression-result').innerHTML = '<p class="empty-state">Añade acordes para ver el análisis de la progresión.</p>';
}

function renderProgressionChips() {
    const container = document.getElementById('progression-chips');
    if (!container) return;

    container.innerHTML = '';

    if (progressionChords.length === 0) {
        container.innerHTML = '<span class="empty-state" style="font-size:0.85em;">Sin acordes aún. Añade algunos.</span>';
        return;
    }

    progressionChords.forEach((chord, i) => {
        const chip = document.createElement('span');
        chip.className = 'progression-chip';
        chip.innerHTML = `
            ${chord}
            <button class="chip-remove" onclick="removeChordFromProgression(${i})">×</button>
        `;
        container.appendChild(chip);
    });
}

function analyzeProgression() {
    // Si hay texto en el input, parsear; si hay chips, usar esos
    const input = document.getElementById('progression-input').value.trim();
    let chords = [...progressionChords];

    if (input) {
        // Separar por espacios, guiones o comas
        const parsed = input.split(/[\s,\-]+/).filter(c => c.length > 0);
        chords = parsed.slice(0, 8);
    }

    if (chords.length === 0) {
        alert('Añade al menos un acorde o escribe una progresión');
        return;
    }

    // Analizar
    const result = analyzeProgressionData(chords);
    renderProgressionAnalysis(chords, result);
}

function analyzeProgressionData(chords) {
    // 1. Detectar tonalidad probable
    const keyCandidates = {};

    NOTES.forEach((key, keyIdx) => {
        // Probar como mayor
        const majorScale = MODE_INTERVALS['jónico'].map(i => NOTES[(keyIdx + i) % 12]);
        const minorScale = MODE_INTERVALS['eólico'].map(i => NOTES[(keyIdx + i) % 12]);

        let scoreMajor = 0;
        let scoreMinor = 0;

        chords.forEach(chord => {
            const root = extractRoot(chord);
            if (majorScale.includes(root)) scoreMajor++;
            if (minorScale.includes(root)) scoreMinor++;
        });

        keyCandidates[key + ' mayor'] = scoreMajor;
        keyCandidates[key + ' menor'] = scoreMinor;
    });

    // Encontrar la tonalidad con mayor puntuación
    let bestKey = 'C mayor';
    let bestScore = 0;
    Object.entries(keyCandidates).forEach(([k, score]) => {
        if (score > bestScore) {
            bestScore = score;
            bestKey = k;
        }
    });

    const isMinor = bestKey.includes('menor');
    const keyRoot = bestKey.split(' ')[0];
    const keyIndex = NOTES.indexOf(keyRoot);

    // 2. Grado de cada acorde
    const scale = isMinor
        ? MODE_INTERVALS['eólico'].map(i => NOTES[(keyIndex + i) % 12])
        : MODE_INTERVALS['jónico'].map(i => NOTES[(keyIndex + i) % 12]);

    const degreesMajor = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    const degreesMinor = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];
    const degreeNames = isMinor ? degreesMinor : degreesMajor;

    const chordDegrees = chords.map(chord => {
        const root = extractRoot(chord);
        const degreeIndex = scale.indexOf(root);
        if (degreeIndex === -1) return { chord, degree: '?', function: 'Fuera de la tonalidad', root };

        const degree = degreeNames[degreeIndex];
        let func = 'Variable';
        if (degreeIndex === 0) func = 'Tónica';
        else if (degreeIndex === 3 || degreeIndex === 1) func = 'Subdominante';
        else if (degreeIndex === 4) func = 'Dominante';
        else func = 'Color';

        return { chord, degree, function: func, root };
    });

    // 3. Cadencia detectada
    const cadence = detectCadence(chordDegrees);

    // 4. Escala recomendada
    const recommendedScale = isMinor ? 'eólico' : 'jónico';
    const scaleNotes = MODE_INTERVALS[recommendedScale].map(i => NOTES[(keyIndex + i) % 12]);

    // 5. Sustituciones
    const substitutions = chordDegrees.map(cd => {
        const idx = scale.indexOf(cd.root);
        if (idx === -1) return null;
        // Sustitución de tritono (para dominantes)
        const tritoneRoot = NOTES[(NOTES.indexOf(cd.root) + 6) % 12];
        return { original: cd.chord, tritone: tritoneRoot + (cd.chord.includes('7') ? '7' : '') };
    }).filter(s => s);

    return {
        key: bestKey,
        keyRoot,
        isMinor,
        chordDegrees,
        cadence,
        scale: scaleNotes,
        substitutions
    };
}

function extractRoot(chord) {
    // Extraer la raíz del acorde
    if (chord.length >= 2 && (chord[1] === '#' || chord[1] === 'b')) {
        // Verificar que no sea un acorde como "Cmaj7"
        if (chord[1] === '#' && NOTES.includes(chord.substring(0, 2))) {
            return chord.substring(0, 2);
        }
    }
    return chord[0];
}

function detectCadence(chordDegrees) {
    if (chordDegrees.length < 2) return null;

    const degrees = chordDegrees.map(cd => cd.degree);
    const last = degrees.slice(-2);

    if (last[0] === 'V' && last[1] === 'I') return 'Cadencia Auténtica (V - I)';
    if (last[0] === 'IV' && last[1] === 'I') return 'Cadencia Plagal (IV - I)';
    if (last[0] === 'V' && last[1] === 'vi') return 'Cadencia Rota (V - vi)';
    if (last[0] === 'ii' && last[1] === 'V') return 'Cadencia ii - V (preparación)';
    if (degrees.includes('IV') && degrees.includes('V') && degrees[degrees.length - 1] === 'I') {
        return 'Cadencia completa (IV - V - I)';
    }
    return null;
}

function renderProgressionAnalysis(chords, result) {
    const container = document.getElementById('progression-result');
    if (!container) return;

    let html = '';

    // 1. Tonalidad
    html += `
        <div class="progression-analysis-block">
            <h4>🎼 Tonalidad detectada</h4>
            <p><strong>${result.key}</strong></p>
            <p style="font-size:0.9em; color:#888;">Basado en el análisis de las raíces de los acordes.</p>
        </div>
    `;

    // 2. Grados de cada acorde
    html += `
        <div class="progression-analysis-block">
            <h4>📊 Grados y funciones</h4>
            <div class="degree-grid">
    `;
    result.chordDegrees.forEach(cd => {
        html += `
            <div class="degree-card">
                <span class="degree-roman">${cd.degree}</span>
                <div class="degree-chord">${cd.chord}</div>
                <div class="degree-function">${cd.function}</div>
            </div>
        `;
    });
    html += `</div></div>`;

    // 3. Cadencia
    if (result.cadence) {
        html += `
            <div class="progression-analysis-block">
                <h4>🎯 Cadencia detectada</h4>
                <p><strong>${result.cadence}</strong></p>
            </div>
        `;
    }

    // 4. Escala recomendada
    html += `
        <div class="progression-analysis-block">
            <h4>🎼 Escala recomendada para improvisar</h4>
            <p><strong>${result.keyRoot} ${result.isMinor ? 'menor natural (eólico)' : 'mayor (jónico)'}</strong></p>
            <p><strong>Notas:</strong> ${result.scale.join(' - ')}</p>
        </div>
    `;

    // 5. Sustituciones
    if (result.substitutions.length > 0) {
        html += `
            <div class="progression-analysis-block">
                <h4>✨ Sustituciones sugeridas (tritono)</h4>
                <ul>
        `;
        result.substitutions.forEach(s => {
            html += `<li><strong>${s.original}</strong> puede sustituirse por <strong>${s.tritone}</strong> (tritono)</li>`;
        });
        html += `</ul></div>`;
    }

    container.innerHTML = html;
}

// =====================================================
// NAVEGADOR DE TONALIDADES
// =====================================================
function initKeyNavigator() {
    const selector = document.getElementById('key-nav-selector');
    if (!selector) return;

    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    selector.innerHTML = '';
    keys.forEach(key => {
        selector.innerHTML += `<option value="${key}">${key} mayor</option>`;
    });

    updateKeyNavigator();
}

function updateKeyNavigator() {
    const selector = document.getElementById('key-nav-selector');
    if (!selector) return;

    currentKeyNav = selector.value;
    drawMiniCircle(currentKeyNav);
    renderKeyNavInfo(currentKeyNav);
}

function drawMiniCircle(currentKey) {
    const container = document.getElementById('mini-circle');
    if (!container) return;

    const size = 300, center = size / 2;
    const radiusOuter = 125, radiusInner = 80, radiusCore = 45;
    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const currentIndex = majorKeys.indexOf(currentKey);

    let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<circle cx="${center}" cy="${center}" r="${radiusOuter + 10}" fill="#1a1a1a" stroke="#333" stroke-width="2"/>`;

    majorKeys.forEach((key, i) => {
        // Distancia circular desde la tonalidad actual
        let dist = Math.abs(i - currentIndex);
        dist = Math.min(dist, 12 - dist);

        let cls = 'mini-circle-segment';
        if (dist === 0) cls += ' current';
        else if (dist === 1) cls += ' close';
        else if (dist === 2) cls += ' mid';
        else cls += ' far';

        const angle = (i * 30 - 90) * (Math.PI / 180);
        const aw = 0.26;

        const x1 = center + radiusOuter * Math.cos(angle - aw);
        const y1 = center + radiusOuter * Math.sin(angle - aw);
        const x2 = center + radiusOuter * Math.cos(angle + aw);
        const y2 = center + radiusOuter * Math.sin(angle + aw);
        const x3 = center + radiusInner * Math.cos(angle + aw);
        const y3 = center + radiusInner * Math.sin(angle + aw);
        const x4 = center + radiusInner * Math.cos(angle - aw);
        const y4 = center + radiusInner * Math.sin(angle - aw);

        svg += `<path class="${cls}" d="M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z" onclick="setKeyNav('${key}')" />`;

        const tx = center + ((radiusOuter + radiusInner) / 2) * Math.cos(angle);
        const ty = center + ((radiusOuter + radiusInner) / 2) * Math.sin(angle);
        svg += `<text class="mini-circle-text" x="${tx}" y="${ty}">${key}</text>`;
    });

    svg += `<circle cx="${center}" cy="${center}" r="${radiusCore}" fill="#0d0d0d" stroke="#333" stroke-width="2"/>`;
    svg += `<text class="mini-circle-text" x="${center}" y="${center}" fill="#ff6b00" font-size="14" font-weight="bold">Tavo</text>`;
    svg += `</svg>`;
    container.innerHTML = svg;
}

function setKeyNav(key) {
    const selector = document.getElementById('key-nav-selector');
    if (selector) {
        selector.value = key;
        updateKeyNavigator();
    }
}

function renderKeyNavInfo(currentKey) {
    const container = document.getElementById('key-nav-info');
    if (!container) return;

    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const currentIndex = keys.indexOf(currentKey);

    // Vecinas en el círculo
    const dominant = keys[(currentIndex + 1) % 12];
    const subdominant = keys[(currentIndex + 11) % 12];
    const relativeMinor = NOTES[(NOTES.indexOf(currentKey) + 9) % 12] + 'm';
    const twoFifths = keys[(currentIndex + 2) % 12];
    const twoFourths = keys[(currentIndex + 10) % 12];

    container.innerHTML = `
        <h3>Tonalidad: ${currentKey} mayor</h3>
        
        <h4>🎯 Tonalidades vecinas (más cercanas)</h4>
        <ul>
            <li><strong>Dominante:</strong> ${dominant} mayor (a 1 paso en el círculo)</li>
            <li><strong>Subdominante:</strong> ${subdominant} mayor (a 1 paso en el círculo)</li>
            <li><strong>Relativa menor:</strong> ${relativeMinor} (misma armadura)</li>
        </ul>
        
        <h4>🔀 Modulaciones típicas</h4>
        <ul>
            <li><strong>Modulación a dominante (${dominant}):</strong> muy común en desarrollos</li>
            <li><strong>Modulación a subdominante (${subdominant}):</strong> suaviza la tensión</li>
            <li><strong>Modulación a relativa (${relativeMinor}):</strong> cambio de modo</li>
        </ul>
        
        <h4>🌐 Tonalidades más lejanas</h4>
        <ul>
            <li>${twoFifths} mayor (a 2 pasos)</li>
            <li>${twoFourths} mayor (a 2 pasos)</li>
        </ul>
        
        <p style="margin-top:15px; font-size:0.9em; color:#888; border-left:3px solid #ff6b00; padding-left:12px;">
            <strong>¿Cómo se usa?</strong> Cuanto más cerca estén dos tonalidades en el círculo, 
            más fácil es modular entre ellas. Las tonalidades vecinas comparten 6 de las 7 notas 
            de su escala, por lo que la transición suena natural.
        </p>
    `;
}

// =====================================================
// BÚSQUEDA Y UTILIDADES
// =====================================================
function searchChord() {
    const query = document.getElementById('search-input').value.trim();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (!query) {
        resultsContainer.innerHTML = '<p class="empty-state">Escribe un acorde o pulsa "Mostrar Todos".</p>';
        return;
    }

    const filtered = Object.keys(CHORD_DB).filter(c => c.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = '<p class="empty-state">No se encontraron resultados.</p>';
        return;
    }

    filtered.forEach(chord => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.textContent = chord;
        div.onclick = () => loadChordFromDB(chord);
        resultsContainer.appendChild(div);
    });
}

function showAllChords() {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    Object.keys(CHORD_DB).forEach(chord => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.textContent = chord;
        div.onclick = () => loadChordFromDB(chord);
        resultsContainer.appendChild(div);
    });
}

function loadChordFromDB(chord) {
    if (CHORD_DB[chord]) {
        currentFretboard = [...CHORD_DB[chord]];
        const selects = document.querySelectorAll('.string-row select');
        selects.forEach((select, i) => {
            select.value = currentFretboard[i] === null ? 'null' : currentFretboard[i];
        });
        drawFretboard();
        detectChord();
        document.getElementById('trastes').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function initSelectors() {
    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const originSelect = document.getElementById('mod-origin');
    const destSelect = document.getElementById('mod-dest');

    if (!originSelect) return;

    originSelect.innerHTML = '';
    destSelect.innerHTML = '';

    keys.forEach(key => {
        originSelect.innerHTML += `<option value="${key}">${key}</option>`;
        destSelect.innerHTML += `<option value="${key}">${key}</option>`;
    });
}

function calculateModulation() {
    const origin = document.getElementById('mod-origin').value;
    const dest = document.getElementById('mod-dest').value;
    const resultBox = document.getElementById('modulation-result');

    if (origin === dest) {
        resultBox.innerHTML = '<p>Ya estás en esa tonalidad.</p>';
        return;
    }

    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    let originIdx = keys.indexOf(origin);
    let destIdx = keys.indexOf(dest);
    let path = [];
    let current = originIdx;

    while (current !== destIdx) {
        current = (current + 1) % 12;
        path.push(keys[current]);
    }

    resultBox.innerHTML = `
        <p><strong>Ruta:</strong> ${origin} → ${path.join(' → ')}</p>
        <p><strong>Paso 1:</strong> Tocar el V grado de ${origin} (${keys[(originIdx + 7) % 12]})</p>
        <p><strong>Paso 2:</strong> Modular a ${path[0]} y continuar.</p>
    `;
}

function calculateDominants() {
    const resultBox = document.getElementById('dominant-result');
    if (!resultBox) return;

    if (!currentChordData || !currentChordData.root || !currentChordData.quality) {
        resultBox.innerHTML = '<p class="empty-state">Toca un acorde primero.</p>';
        return;
    }

    const root = currentChordData.root;
    const rootIndex = NOTES.indexOf(root);
    const isMinor = currentChordData.suffix.includes('m') && !currentChordData.suffix.includes('maj');

    let dominantsList;
    let subtitle;

    if (isMinor) {
        subtitle = `Tonalidad menor detectada: <strong>${root} menor</strong>`;
        dominantsList = [
            { grado: 'V7/III', target: NOTES[(rootIndex + 3) % 12], rootOfDominant: NOTES[(rootIndex + 10) % 12] },
            { grado: 'V7/iv', target: NOTES[(rootIndex + 5) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 0) % 12] },
            { grado: 'V7/v', target: NOTES[(rootIndex + 7) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 2) % 12] },
            { grado: 'V7/VI', target: NOTES[(rootIndex + 8) % 12], rootOfDominant: NOTES[(rootIndex + 3) % 12] },
            { grado: 'V7/VII', target: NOTES[(rootIndex + 10) % 12], rootOfDominant: NOTES[(rootIndex + 5) % 12] }
        ];
    } else {
        subtitle = `Tonalidad mayor detectada: <strong>${root} mayor</strong>`;
        dominantsList = [
            { grado: 'V7/ii', target: NOTES[(rootIndex + 2) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 9) % 12] },
            { grado: 'V7/iii', target: NOTES[(rootIndex + 4) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 11) % 12] },
            { grado: 'V7/IV', target: NOTES[(rootIndex + 5) % 12], rootOfDominant: NOTES[(rootIndex + 0) % 12] },
            { grado: 'V7/V', target: NOTES[(rootIndex + 7) % 12], rootOfDominant: NOTES[(rootIndex + 2) % 12] },
            { grado: 'V7/vi', target: NOTES[(rootIndex + 9) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 4) % 12] }
        ];
    }

    let html = `
        <div style="margin-bottom:15px;">
            <p>${subtitle}</p>
            <p style="font-size:0.9em; color:#888;">
                Los <strong>dominantes secundarios</strong> son acordes V7 que resuelven a un grado distinto del I.
            </p>
        </div>
    `;

    html += `<h4 style="color:#ff6b00; margin-bottom:10px;">Dominantes secundarios:</h4>`;
    html += `<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:8px; margin-bottom:20px;">`;

    dominantsList.forEach(d => {
        const domRootIndex = NOTES.indexOf(d.rootOfDominant);
        const tritoneRoot = NOTES[(domRootIndex + 6) % 12];
        const tritoneChord = tritoneRoot + '7';

        html += `
            <div class="result-item" style="text-align:left; padding:12px;">
                <div style="color:#ff6b00; font-weight:bold; font-size:1.1em;">${d.grado}</div>
                <div style="margin:5px 0;"><strong>Acorde:</strong> ${d.rootOfDominant}7</div>
                <div style="margin:5px 0;"><strong>Resuelve a:</strong> ${d.target}</div>
                <div style="margin:5px 0; color:#888; font-size:0.85em;"><strong>Sust. Tritono:</strong> ${tritoneChord}</div>
            </div>
        `;
    });
    html += `</div>`;

    const vRoot = NOTES[(rootIndex + 7) % 12];
    const vTritone = NOTES[(NOTES.indexOf(vRoot) + 6) % 12] + '7';

    html += `
        <h4 style="color:#ff6b00; margin-bottom:10px;">Dominante principal (V7):</h4>
        <div class="result-item" style="text-align:left; padding:12px;">
            <div style="margin:5px 0;"><strong>Acorde:</strong> ${vRoot}7</div>
            <div style="margin:5px 0;"><strong>Resuelve a:</strong> ${root}${isMinor ? 'm' : ''}</div>
            <div style="margin:5px 0; color:#888; font-size:0.9em;">
                <strong>Sustituto de tritono:</strong> ${vTritone}
            </div>
        </div>
    `;

    resultBox.innerHTML = html;
}

function loadQuickChord(chord) { loadChordFromDB(chord); }

function resetFretboard() {
    currentFretboard = [null, null, null, null, null, null];
    const selects = document.querySelectorAll('.string-row select');
    selects.forEach(select => select.value = 'null');
    drawFretboard();
    detectChord();
    document.getElementById('chord-name').textContent = '---';
    document.getElementById('chord-alternatives').textContent = '';
    const posEl = document.getElementById('chord-positions');
    if (posEl) posEl.innerHTML = '';
    const infoEl = document.getElementById('chord-info');
    if (infoEl) infoEl.innerHTML = '';
    document.getElementById('progressions-list').innerHTML = '<p class="empty-state">Selecciona un acorde para ver progresiones.</p>';
    document.getElementById('scale-info').innerHTML = '<p class="empty-state">Selecciona un acorde para ver la escala.</p>';
    document.getElementById('scale-fretboard').innerHTML = '';
    document.getElementById('dominant-result').innerHTML = '<p class="empty-state">Toca un acorde primero.</p>';
    document.getElementById('analysis-content').innerHTML = '<p class="empty-state">Toca un acorde para ver su análisis armónico completo.</p>';
}