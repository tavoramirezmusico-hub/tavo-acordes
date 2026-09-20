// --- DATOS MUSICALES BÁSICOS ---
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// Orden de cuerdas: 6ª (E) arriba, 1ª (e) abajo
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'e'];
const OPEN_NOTES = ['E', 'A', 'D', 'G', 'B', 'E'];

let currentFretboard = [null, null, null, null, null, null];

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    initFretboardUI();
    initCircleOfFifths();
    initSelectors();
    resetFretboard();
    updateModeInfo();
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

// Dibuja el mástil VERTICAL (6ª cuerda arriba, 1ª abajo)
function drawFretboard() {
    const container = document.querySelector('.fretboard-visual');
    const width = 160;
    const height = 320;
    const stringSpacing = width / 5; // 5 espacios para 6 cuerdas
    const fretSpacing = height / 6;   // Mostramos 5 trastes

    let svg = `<svg class="fretboard-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;

    // Dibujar fondo de madera
    svg += `<rect x="0" y="0" width="${width}" height="${height}" fill="#2a1f1a" rx="5" />`;

    // Dibujar trastes (líneas horizontales)
    for (let i = 0; i <= 6; i++) {
        svg += `<line class="fret-line" x1="0" y1="${i * fretSpacing}" x2="${width}" y2="${i * fretSpacing}" />`;
    }

    // Dibujar cuerdas (líneas verticales)
    // i=0 es la 6ª cuerda (arriba), i=5 es la 1ª cuerda (abajo)
    for (let i = 0; i < 6; i++) {
        const x = i * stringSpacing;
        const strokeW = 4 - (i * 0.5); // Cuerdas más gruesas arriba
        svg += `<line class="string-line" x1="${x}" y1="0" x2="${x}" y2="${height}" stroke-width="${strokeW}" />`;
    }

    // Dibujar notas seleccionadas
    currentFretboard.forEach((fret, stringIndex) => {
        const x = stringIndex * stringSpacing;
        // Si es X, dibujar arriba del todo
        if (fret === 'X') {
            svg += `<text class="mute-mark" x="${x}" y="12">X</text>`;
        } else if (fret !== null && fret >= 0) {
            // Si es 0 (al aire), dibujar arriba del todo
            // Si es traste, dibujar en el espacio del traste
            const y = (fret === 0) ? 12 : (fret - 0.5) * fretSpacing;
            const noteName = getNoteName(stringIndex, fret);
            svg += `
                <circle class="note-circle" cx="${x}" cy="${y}" r="11" />
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

    const root = uniqueNotes[0];
    const chordName = identifyChord(uniqueNotes, root);

    document.getElementById('chord-name').textContent = chordName;
    document.getElementById('chord-alternatives').textContent = `Notas: ${uniqueNotes.join(', ')}`;

    updateProgressions(root, chordName);
}

function identifyChord(notes, root) {
    const rootIndex = NOTES.indexOf(root);
    const getInterval = (n) => (NOTES.indexOf(n) - rootIndex + 12) % 12;
    const intervals = notes.map(getInterval).sort((a, b) => a - b);

    if (intervals.includes(4) && intervals.includes(7) && intervals.includes(11)) return root + 'maj7';
    if (intervals.includes(4) && intervals.includes(7) && intervals.includes(10)) return root + '7';
    if (intervals.includes(4) && intervals.includes(7)) return root;
    if (intervals.includes(3) && intervals.includes(7) && intervals.includes(10)) return root + 'm7';
    if (intervals.includes(3) && intervals.includes(7)) return root + 'm';
    if (intervals.includes(3) && intervals.includes(6)) return root + 'dim';
    if (intervals.includes(4) && intervals.includes(8)) return root + 'aug';

    return root + ' (?)';
}

// --- 3. BÚSQUEDA ---
function searchChord() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    const commonChords = ['C', 'G', 'Am', 'F', 'Em', 'D', 'A', 'E', 'Dm', 'Bm', 'C7', 'G7'];
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

// --- 4. REPRODUCCIÓN DE AUDIO REALISTA (SAMPLING) ---
let audioCtx = null;
const sampleBaseURL = 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_guitar_nylon-mp3/';
const noteSamples = {}; // Caché de buffers

async function loadSample(note) {
    if (noteSamples[note]) return noteSamples[note];
    try {
        const response = await fetch(`${sampleBaseURL}${note}.mp3`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        noteSamples[note] = audioBuffer;
        return audioBuffer;
    } catch (e) {
        console.warn(`No se pudo cargar la muestra para ${note}, usando oscilador.`);
        return null;
    }
}

async function playNote(noteName) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Intentar cargar muestra real
    const buffer = await loadSample(noteName);

    if (buffer) {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;

        // Ajustar velocidad para notas sostenidas (simplificación)
        // En una app real, se mapearían las notas exactas.
        // Aquí usamos la muestra base y ajustamos playbackRate.
        source.playbackRate.value = 1.0;

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);

        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start();
    } else {
        // Fallback a oscilador si falla la carga
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = getFrequency(noteName);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
    }
}

function playCurrentChord() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Reproducir todas las cuerdas pulsadas
    currentFretboard.forEach((fret, i) => {
        if (fret !== null && fret !== 'X') {
            const noteName = getNoteName(i, fret);
            // Añadir un pequeño retardo para simular el rasgueo
            setTimeout(() => playNote(noteName), i * 50);
        }
    });
}

function getFrequency(note) {
    const noteMap = { 'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88 };
    return noteMap[note] || 440;
}

// --- 5. CÍRCULO DE QUINTAS GRÁFICO ---
function initCircleOfFifths() {
    const container = document.getElementById('circle-of-fifths');
    const size = 320;
    const center = size / 2;
    const radiusOuter = 140;
    const radiusInner = 90;

    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const minorKeys = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m', 'Fm', 'Cm', 'Gm', 'Dm'];

    let svg = `<svg viewBox="0 0 ${size} ${size}">`;

    // Dibujar fondo
    svg += `<circle cx="${center}" cy="${center}" r="${radiusOuter + 20}" fill="#1a1a1a" stroke="#333" stroke-width="2"/>`;

    majorKeys.forEach((key, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);

        // Sector exterior (Mayores)
        const x1 = center + radiusOuter * Math.cos(angle - 0.26);
        const y1 = center + radiusOuter * Math.sin(angle - 0.26);
        const x2 = center + radiusOuter * Math.cos(angle + 0.26);
        const y2 = center + radiusOuter * Math.sin(angle + 0.26);
        const x3 = center + radiusInner * Math.cos(angle + 0.26);
        const y3 = center + radiusInner * Math.sin(angle + 0.26);
        const x4 = center + radiusInner * Math.cos(angle - 0.26);
        const y4 = center + radiusInner * Math.sin(angle - 0.26);

        svg += `<path class="circle-segment" d="M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z" onclick="selectKey('${key}')" />`;

        // Texto Mayor
        const textX = center + ((radiusOuter + radiusInner) / 2) * Math.cos(angle);
        const textY = center + ((radiusOuter + radiusInner) / 2) * Math.sin(angle);
        svg += `<text class="circle-text" x="${textX}" y="${textY}" fill="#e8e8e8">${key}</text>`;

        // Sector interior (Menores)
        const ir1 = center + radiusInner * Math.cos(angle - 0.26);
        const ir2 = center + radiusInner * Math.sin(angle - 0.26);
        const ir3 = center + radiusInner * Math.cos(angle + 0.26);
        const ir4 = center + radiusInner * Math.sin(angle + 0.26);
        const ir5 = center + (radiusInner - 40) * Math.cos(angle + 0.26);
        const ir6 = center + (radiusInner - 40) * Math.sin(angle + 0.26);
        const ir7 = center + (radiusInner - 40) * Math.cos(angle - 0.26);
        const ir8 = center + (radiusInner - 40) * Math.sin(angle - 0.26);

        svg += `<path class="circle-segment" d="M ${ir1} ${ir2} L ${ir3} ${ir4} L ${ir5} ${ir6} L ${ir7} ${ir8} Z" onclick="selectKey('${minorKeys[i]}')" style="fill:#111;" />`;

        // Texto Menor
        const mTextX = center + ((radiusInner + (radiusInner - 40)) / 2) * Math.cos(angle);
        const mTextY = center + ((radiusInner + (radiusInner - 40)) / 2) * Math.sin(angle);
        svg += `<text class="circle-text" x="${mTextX}" y="${mTextY}" fill="#888" font-size="10">${minorKeys[i]}</text>`;
    });

    // Centro
    svg += `<circle cx="${center}" cy="${center}" r="40" fill="#0d0d0d" stroke="#333" stroke-width="2"/>`;
    svg += `<text class="circle-text" x="${center}" y="${center}" fill="#ff6b00" font-size="14">Tavo</text>`;

    svg += `</svg>`;
    container.innerHTML = svg;
}

function selectKey(key) {
    const info = document.getElementById('circle-info');
    let root = key.replace('m', '');
    const isMinor = key.includes('m');
    const rootIndex = NOTES.indexOf(root);

    if (isMinor) {
        // Si es menor, la relativa mayor es +3 semitonos
        const relativeMajor = NOTES[(rootIndex + 3) % 12];
        info.innerHTML = `
            <h3>Tonalidad de ${key}</h3>
            <p><strong>Relativa Mayor:</strong> ${relativeMajor}</p>
            <p><strong>IV Grado:</strong> ${NOTES[(rootIndex + 5) % 12]}m</p>
            <p><strong>V Grado:</strong> ${NOTES[(rootIndex + 7) % 12]}m</p>
        `;
    } else {
        const relativeMinor = NOTES[(rootIndex + 9) % 12] + 'm';
        info.innerHTML = `
            <h3>Tonalidad de ${key} Mayor</h3>
            <p><strong>Relativa menor:</strong> ${relativeMinor}</p>
            <p><strong>IV Grado:</strong> ${NOTES[(rootIndex + 5) % 12]}</p>
            <p><strong>V Grado:</strong> ${NOTES[(rootIndex + 7) % 12]}</p>
        `;
    }
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

async function playModeScale() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const mode = document.getElementById('mode-selector').value;
    const root = 'C';
    const scale = getScaleNotes(root, mode);

    for (let i = 0; i < scale.length; i++) {
        setTimeout(() => playNote(scale[i]), i * 300);
    }
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

    originSelect.innerHTML = '';
    destSelect.innerHTML = '';
    dominantSelect.innerHTML = '';

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

    const progressions = [
        `I - IV - V (${root} - ${NOTES[(rootIndex + 5) % 12]} - ${NOTES[(rootIndex + 7) % 12]})`,
        `I - vi - IV - V (${root} - ${NOTES[(rootIndex + 9) % 12]}m - ${NOTES[(rootIndex + 5) % 12]} - ${NOTES[(rootIndex + 7) % 12]})`,
        `ii - V - I (${NOTES[(rootIndex + 2) % 12]}m - ${NOTES[(rootIndex + 7) % 12]} - ${root})`
    ];

    container.innerHTML = progressions.map(p => `<div class="result-item">${p}</div>`).join('');
}