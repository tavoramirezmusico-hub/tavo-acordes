// --- DATOS MUSICALES BÁSICOS ---
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'e']; // 6ª a 1ª
const OPEN_NOTES = ['E', 'A', 'D', 'G', 'B', 'E']; // Nota al aire de cada cuerda

// Estado actual del mástil (null = no seleccionado, 'X' = mute, 0 = aire, 1-12 = traste)
let currentFretboard = [null, null, null, null, null, null];

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    initFretboardUI();
    initCircleOfFifths();
    initSelectors();
    resetFretboard();
});

// --- 1. INTERFAZ DEL MÁSTIL ---
function initFretboardUI() {
    const container = document.querySelector('.string-selectors');
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
    const width = 300;
    const height = 200;
    const stringSpacing = width / 5;
    const fretSpacing = height / 5;

    let svg = `<svg class="fretboard-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;

    // Dibujar trastes
    for (let i = 0; i <= 5; i++) {
        svg += `<line class="fret-line" x1="0" y1="${i * fretSpacing}" x2="${width}" y2="${i * fretSpacing}" />`;
    }

    // Dibujar cuerdas
    for (let i = 0; i < 6; i++) {
        svg += `<line class="string-line" x1="${i * stringSpacing}" y1="0" x2="${i * stringSpacing}" y2="${height}" stroke-width="${2 + (i * 0.5)}" />`;
    }

    // Dibujar notas seleccionadas
    currentFretboard.forEach((fret, stringIndex) => {
        const x = stringIndex * stringSpacing;
        if (fret === 'X') {
            svg += `<text class="mute-mark" x="${x}" y="-5">X</text>`;
        } else if (fret !== null && fret >= 0) {
            const y = (fret === 0) ? -5 : (fret - 0.5) * fretSpacing;
            const noteName = getNoteName(stringIndex, fret);
            svg += `
                <circle class="note-circle" cx="${x}" cy="${y}" r="12" />
                <text class="note-text" x="${x}" y="${y}">${noteName}</text>
            `;
        }
    });

    svg += `</svg>`;
    container.innerHTML = svg;
}

function getNoteName(stringIndex, fret) {
    const openNote = OPEN_NOTES[stringIndex];
    const openIndex = NOTES.indexOf(openNote);
    const noteIndex = (openIndex + fret) % 12;
    return NOTES[noteIndex];
}

// --- 2. DETECCIÓN DE ACORDES ---
function detectChord() {
    const notes = [];
    currentFretboard.forEach((fret, i) => {
        if (fret !== null && fret !== 'X') {
            notes.push(getNoteName(i, fret));
        }
    });

    const uniqueNotes = [...new Set(notes)];

    if (uniqueNotes.length < 2) {
        document.getElementById('chord-name').textContent = '---';
        document.getElementById('chord-alternatives').textContent = '';
        return;
    }

    // Lógica simplificada de detección
    const root = uniqueNotes[0];
    const chordName = identifyChord(uniqueNotes, root);

    document.getElementById('chord-name').textContent = chordName;
    document.getElementById('chord-alternatives').textContent = `Notas: ${uniqueNotes.join(', ')}`;

    // Actualizar progresiones
    updateProgressions(root, chordName);
}

function identifyChord(notes, root) {
    // Esta es una simplificación. En una app real usaríamos un diccionario de voicings.
    const has = (n) => notes.includes(n);
    const rootIndex = NOTES.indexOf(root);
    const getInterval = (n) => (NOTES.indexOf(n) - rootIndex + 12) % 12;

    const intervals = notes.map(getInterval).sort((a, b) => a - b);

    // Detección básica
    if (intervals.includes(4) && intervals.includes(7)) return root; // Mayor
    if (intervals.includes(3) && intervals.includes(7)) return root + 'm'; // Menor
    if (intervals.includes(3) && intervals.includes(6)) return root + 'dim'; // Disminuido
    if (intervals.includes(4) && intervals.includes(8)) return root + 'aug'; // Aumentado
    if (intervals.includes(4) && intervals.includes(7) && intervals.includes(11)) return root + 'maj7';
    if (intervals.includes(4) && intervals.includes(7) && intervals.includes(10)) return root + '7';
    if (intervals.includes(3) && intervals.includes(7) && intervals.includes(10)) return root + 'm7';

    return root + ' (?)'; // Fallback
}

// --- 3. BÚSQUEDA ---
function searchChord() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    // Simulación de búsqueda: mostramos opciones predefinidas
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    const commonChords = ['C', 'G', 'Am', 'F', 'Em', 'D', 'A', 'E', 'Dm', 'Bm'];
    const filtered = commonChords.filter(c => c.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = '<p class="empty-state">No se encontraron resultados.</p>';
        return;
    }

    filtered.forEach(chord => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.textContent = chord;
        div.onclick = () => loadQuickChord(chord);
        resultsContainer.appendChild(div);
    });
}

// --- 4. REPRODUCCIÓN DE AUDIO (WEB AUDIO API) ---
let audioCtx = null;

function playCurrentChord() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    currentFretboard.forEach((fret, i) => {
        if (fret !== null && fret !== 'X') {
            const noteName = getNoteName(i, fret);
            playNote(noteName);
        }
    });
}

function playNote(noteName) {
    const freq = getFrequency(noteName);
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'triangle'; // Sonido más suave
    osc.frequency.value = freq;

    // Envolvente para simular púa
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.5);
}

function getFrequency(note) {
    const noteMap = { 'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88 };
    return noteMap[note] || 440;
}

// --- 5. CÍRCULO DE QUINTAS ---
function initCircleOfFifths() {
    const container = document.getElementById('circle-of-fifths');
    const size = 300;
    const radius = 120;
    const center = size / 2;

    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];

    let svg = `<svg viewBox="0 0 ${size} ${size}">`;

    keys.forEach((key, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        svg += `
            <circle class="circle-segment" cx="${x}" cy="${y}" r="25" onclick="selectKey('${key}')" />
            <text class="circle-text" x="${x}" y="${y}">${key}</text>
        `;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
}

function selectKey(key) {
    const info = document.getElementById('circle-info');
    const rootIndex = NOTES.indexOf(key);
    const fourth = NOTES[(rootIndex + 5) % 12];
    const fifth = NOTES[(rootIndex + 7) % 12];

    info.innerHTML = `
        <h3>Tonalidad de ${key} Mayor</h3>
        <p><strong>Relativa menor:</strong> ${NOTES[(rootIndex + 9) % 12]}m</p>
        <p><strong>IV Grado:</strong> ${fourth}</p>
        <p><strong>V Grado:</strong> ${fifth}</p>
    `;
}

// --- 6. MODOS ---
function updateModeInfo() {
    const mode = document.getElementById('mode-selector').value;
    const infoBox = document.getElementById('mode-info');

    const modesData = {
        'jónico': { formula: '1 2 3 4 5 6 7', uso: 'Mayor natural. Ideal para pop, rock y música clásica.' },
        'dórico': { formula: '1 2 b3 4 5 6 b7', uso: 'Menor con 6ª mayor. Jazz, funk y rock progresivo.' },
        'frigio': { formula: '1 b2 b3 4 5 b6 b7', uso: 'Sonido español/flamenco. Metal y rock.' },
        'lidio': { formula: '1 2 3 #4 5 6 7', uso: 'Mayor con #4. Sonido etéreo, bandas sonoras.' },
        'mixolidio': { formula: '1 2 3 4 5 6 b7', uso: 'Mayor con b7. Rock, blues y funk.' },
        'eólico': { formula: '1 2 b3 4 5 b6 b7', uso: 'Menor natural. Baladas, rock y pop.' },
        'locrio': { formula: '1 b2 b3 4 b5 b6 b7', uso: 'Disminuido. Jazz y metal extremo.' }
    };

    const data = modesData[mode];
    infoBox.innerHTML = `
        <p><strong>Fórmula:</strong> ${data.formula}</p>
        <p><strong>Uso:</strong> ${data.uso}</p>
        <p><strong>Sustitución:</strong> Prueba sustituir el acorde I por el VI o el III.</p>
    `;
}

function playModeScale() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const mode = document.getElementById('mode-selector').value;
    const root = 'C'; // Simplificación
    const scale = getScaleNotes(root, mode);

    scale.forEach((note, i) => {
        setTimeout(() => playNote(note), i * 300);
    });
}

function getScaleNotes(root, mode) {
    const rootIndex = NOTES.indexOf(root);
    const intervals = {
        'jónico': [0, 2, 4, 5, 7, 9, 11],
        'dórico': [0, 2, 3, 5, 7, 9, 10],
        'frigio': [0, 1, 3, 5, 7, 8, 10],
        'lidio': [0, 2, 4, 6, 7, 9, 11],
        'mixolidio': [0, 2, 4, 5, 7, 9, 10],
        'eólico': [0, 2, 3, 5, 7, 8, 10],
        'locrio': [0, 1, 3, 5, 6, 8, 10]
    };

    return intervals[mode].map(i => NOTES[(rootIndex + i) % 12]);
}

// --- 7. MODULACIÓN ---
function initSelectors() {
    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const originSelect = document.getElementById('mod-origin');
    const destSelect = document.getElementById('mod-dest');
    const dominantSelect = document.getElementById('dominant-key');

    keys.forEach(key => {
        originSelect.innerHTML += `<option value="${key}">${key}</option>`;
        destSelect.innerHTML += `<option value="${key}">${key}</option>`;
        dominantSelect.innerHTML += `<option value="${key}">${key}</option>`;
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

    // Ruta simple por el círculo de quintas
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

// --- 8. DOMINANTES SECUNDARIOS ---
function calculateDominants() {
    const key = document.getElementById('dominant-key').value;
    const resultBox = document.getElementById('dominant-result');
    const rootIndex = NOTES.indexOf(key);

    const dominants = [
        { grado: 'V7/II', acorde: NOTES[(rootIndex + 9) % 12] + '7', tritono: NOTES[(rootIndex + 3) % 12] + '7' },
        { grado: 'V7/III', acorde: NOTES[(rootIndex + 4) % 12] + '7', tritono: NOTES[(rootIndex + 10) % 12] + '7' },
        { grado: 'V7/IV', acorde: NOTES[(rootIndex + 0) % 12] + '7', tritono: NOTES[(rootIndex + 6) % 12] + '7' },
        { grado: 'V7/V', acorde: NOTES[(rootIndex + 2) % 12] + '7', tritono: NOTES[(rootIndex + 8) % 12] + '7' },
        { grado: 'V7/VI', acorde: NOTES[(rootIndex + 9) % 12] + '7', tritono: NOTES[(rootIndex + 3) % 12] + '7' }
    ];

    let html = `<p>Tonalidad: <strong>${key} Mayor</strong></p><ul>`;
    dominants.forEach(d => {
        html += `<li><strong>${d.grado}:</strong> ${d.acorde} (Sust. Tritono: ${d.tritono})</li>`;
    });
    html += `</ul>`;

    resultBox.innerHTML = html;
}

// --- FUNCIONES DE UTILIDAD ---
function loadQuickChord(chord) {
    // Diccionario de posiciones comunes
    const chords = {
        'C': [0, 3, 2, 0, 1, 0],
        'G': [3, 2, 0, 0, 0, 3],
        'Em': [0, 2, 2, 0, 0, 0],
        'Am': [0, 0, 2, 2, 1, 0],
        'D': [2, 3, 2, 0, null, null],
        'F': [1, 3, 3, 2, 1, 1],
        'E': [0, 2, 2, 1, 0, 0]
    };

    if (chords[chord]) {
        currentFretboard = chords[chord].map(v => v === null ? null : v);
        // Actualizar selects
        const selects = document.querySelectorAll('.string-row select');
        selects.forEach((select, i) => {
            select.value = currentFretboard[i] === null ? 'null' : currentFretboard[i];
        });
        drawFretboard();
        detectChord();
    }
}

function resetFretboard() {
    currentFretboard = [null, null, null, null, null, null];
    const selects = document.querySelectorAll('.string-row select');
    selects.forEach(select => select.value = 'null');
    drawFretboard();
    detectChord();
    document.getElementById('chord-name').textContent = '---';
    document.getElementById('chord-alternatives').textContent = '';
    document.getElementById('progressions-list').innerHTML = '<p class="empty-state">Selecciona un acorde para ver progresiones.</p>';
}

function updateProgressions(root, chordName) {
    const container = document.getElementById('progressions-list');
    const rootIndex = NOTES.indexOf(root);

    // Progresiones comunes basadas en la raíz
    const progressions = [
        `I - IV - V (${root} - ${NOTES[(rootIndex + 5) % 12]} - ${NOTES[(rootIndex + 7) % 12]})`,
        `I - vi - IV - V (${root} - ${NOTES[(rootIndex + 9) % 12]}m - ${NOTES[(rootIndex + 5) % 12]} - ${NOTES[(rootIndex + 7) % 12]})`,
        `ii - V - I (${NOTES[(rootIndex + 2) % 12]}m - ${NOTES[(rootIndex + 7) % 12]} - ${root})`
    ];

    container.innerHTML = progressions.map(p => `<div class="result-item">${p}</div>`).join('');
}