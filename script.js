// =====================================================
// TAVO ACORDES - SCRIPT PRINCIPAL
// =====================================================

// --- DATOS MUSICALES ---
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'e']; // 6ª cuerda arriba, 1ª abajo
const OPEN_NOTES = ['E', 'A', 'D', 'G', 'B', 'E'];

// --- BASE DE DATOS DE ACORDES (posiciones reales) ---
const CHORD_DB = {
    // Mayores
    'C': [0, 3, 2, 0, 1, 0], 'C#': [null, 4, 6, 6, 6, 4], 'D': [null, null, 0, 2, 3, 2],
    'D#': [null, 6, 8, 8, 8, 6], 'E': [0, 2, 2, 1, 0, 0], 'F': [1, 3, 3, 2, 1, 1],
    'F#': [2, 4, 4, 3, 2, 2], 'G': [3, 2, 0, 0, 0, 3], 'G#': [4, 6, 6, 5, 4, 4],
    'A': [null, 0, 2, 2, 2, 0], 'A#': [null, 1, 3, 3, 3, 1], 'B': [null, 2, 4, 4, 4, 2],
    // Menores
    'Cm': [null, 3, 5, 5, 4, 3], 'C#m': [null, 4, 6, 6, 5, 4], 'Dm': [null, null, 0, 2, 3, 1],
    'D#m': [null, 6, 8, 8, 7, 6], 'Em': [0, 2, 2, 0, 0, 0], 'Fm': [1, 3, 3, 1, 1, 1],
    'F#m': [2, 4, 4, 2, 2, 2], 'Gm': [3, 5, 5, 3, 3, 3], 'G#m': [4, 6, 6, 4, 4, 4],
    'Am': [null, 0, 2, 2, 1, 0], 'A#m': [null, 1, 3, 3, 2, 1], 'Bm': [null, 2, 4, 4, 3, 2],
    // Séptimas dominantes
    'C7': [null, 3, 2, 3, 1, 0], 'D7': [null, null, 0, 2, 1, 2], 'E7': [0, 2, 0, 1, 0, 0],
    'F7': [1, 3, 1, 2, 1, 1], 'G7': [3, 2, 0, 0, 0, 1], 'A7': [null, 0, 2, 0, 2, 0], 'B7': [null, 2, 1, 2, 0, 2],
    // Maj7
    'Cmaj7': [null, 3, 2, 0, 0, 0], 'Dmaj7': [null, null, 0, 2, 2, 2], 'Emaj7': [0, 2, 1, 1, 0, 0],
    'Fmaj7': [1, 3, 2, 2, 1, 0], 'Gmaj7': [3, 2, 0, 0, 0, 2], 'Amaj7': [null, 0, 2, 1, 2, 0], 'Bmaj7': [null, 2, 4, 3, 4, 2],
    // m7
    'Cm7': [null, 3, 5, 3, 4, 3], 'Dm7': [null, null, 0, 2, 1, 1], 'Em7': [0, 2, 0, 0, 0, 0],
    'Fm7': [1, 3, 1, 1, 1, 1], 'Gm7': [3, 5, 3, 3, 3, 3], 'Am7': [null, 0, 2, 0, 1, 0], 'Bm7': [null, 2, 0, 2, 0, 2],
    // Suspendidos
    'Csus2': [null, 3, 0, 0, 1, 3], 'Csus4': [null, 3, 3, 0, 1, 1], 'Dsus2': [null, null, 0, 2, 3, 0],
    'Dsus4': [null, null, 0, 2, 3, 3], 'Esus4': [0, 2, 2, 2, 0, 0], 'Gsus4': [3, 3, 0, 0, 1, 3],
    'Asus2': [null, 0, 2, 2, 0, 0], 'Asus4': [null, 0, 2, 2, 3, 0],
    // Disminuidos
    'Cdim': [null, 3, 4, 5, 4, null], 'Ddim': [null, null, 0, 1, 3, 1], 'Edim': [0, 1, 2, 0, null, null],
    'F#dim': [2, 3, 4, 2, null, null], 'G#dim': [4, 5, 6, 4, null, null], 'Adim': [null, 0, 1, 2, 1, null],
    // Aumentados
    'Caug': [null, 3, 2, 1, 1, 0], 'Eaug': [0, 3, 2, 1, 1, 0], 'Gaug': [3, 2, 1, 0, 0, 3],
    // Sextas
    'C6': [null, 3, 2, 2, 1, 0], 'D6': [null, null, 0, 2, 0, 2], 'E6': [0, 2, 2, 1, 2, 0],
    'F6': [1, 3, 3, 2, 3, 1], 'G6': [3, 2, 0, 0, 0, 0], 'A6': [null, 0, 2, 2, 2, 2],
};

// --- ESTADO GLOBAL ---
let currentFretboard = [null, null, null, null, null, null];
let audioCtx = null;

// --- INICIALIZACIÓN AL CARGAR LA PÁGINA ---
window.onload = function () {
    initFretboardUI();
    initCircleOfFifths();
    initSelectors();
    resetFretboard();
    updateModeInfo();
};

// =====================================================
// 1. INTERFAZ DEL MÁSTIL
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

// Dibuja el mástil HORIZONTAL (cuerdas de arriba a abajo, trastes de izquierda a derecha)
function drawFretboard() {
    const container = document.querySelector('.fretboard-visual');
    if (!container) return;

    // Dimensiones del viewBox (proporción 800:260)
    const width = 800;
    const height = 260;
    const marginLeft = 55;   // espacio para nombres de cuerdas
    const marginTop = 35;    // espacio para números de traste
    const marginRight = 15;
    const marginBottom = 15;

    const drawWidth = width - marginLeft - marginRight;
    const drawHeight = height - marginTop - marginBottom;
    const stringSpacing = drawHeight / 5; // 5 espacios entre 6 cuerdas
    const fretSpacing = drawWidth / 12;   // 12 trastes

    let svg = `<svg class="fretboard-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">`;

    // Fondo de madera
    svg += `<rect x="0" y="0" width="${width}" height="${height}" fill="#2a1f1a" rx="10" />`;

    // Trastes (líneas verticales) - 13 líneas del 0 al 12
    for (let i = 0; i <= 12; i++) {
        const x = marginLeft + (i * fretSpacing);
        const strokeW = (i === 0) ? 6 : 3; // La cejuela es más gruesa
        svg += `<line class="fret-line" x1="${x}" y1="${marginTop}" x2="${x}" y2="${height - marginBottom}" stroke-width="${strokeW}" />`;
    }

    // Cuerdas (líneas horizontales) - 6 cuerdas
    for (let i = 0; i < 6; i++) {
        const y = marginTop + (i * stringSpacing);
        const strokeW = 5 - (i * 0.6); // 6ª más gruesa, 1ª más fina
        svg += `<line class="string-line" x1="${marginLeft}" y1="${y}" x2="${width - marginRight}" y2="${y}" stroke-width="${strokeW}" />`;

        // Nombre de la cuerda a la izquierda
        svg += `<text class="string-label" x="${marginLeft - 12}" y="${y}" fill="#ff6b00" font-size="14" font-weight="bold" text-anchor="end" dominant-baseline="middle">${STRINGS[i]}</text>`;
    }

    // Números de traste arriba
    for (let i = 1; i <= 12; i++) {
        const x = marginLeft + ((i - 0.5) * fretSpacing);
        svg += `<text class="fret-number" x="${x}" y="${marginTop - 12}" fill="#888" font-size="12" text-anchor="middle">${i}</text>`;
    }

    // Notas seleccionadas
    currentFretboard.forEach((fret, stringIndex) => {
        const y = marginTop + (stringIndex * stringSpacing);

        if (fret === 'X') {
            // Cuerda silenciada
            svg += `<text class="mute-mark" x="${marginLeft - 25}" y="${y}" fill="#ff3333" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">X</text>`;
        } else if (fret !== null && fret >= 0) {
            // Nota pulsada o al aire
            const x = (fret === 0)
                ? marginLeft - 15
                : marginLeft + ((fret - 0.5) * fretSpacing);
            const noteName = getNoteName(stringIndex, fret);
            svg += `<circle class="note-circle" cx="${x}" cy="${y}" r="15" fill="#ff6b00" stroke="#000" stroke-width="2" />`;
            svg += `<text class="note-text" x="${x}" y="${y}" fill="#000" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${noteName}</text>`;
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

// =====================================================
// 2. DETECCIÓN DE ACORDES
// =====================================================
function detectChord() {
    const notes = [];
    currentFretboard.forEach((fret, i) => {
        if (fret !== null && fret !== 'X') notes.push(getNoteName(i, fret));
    });

    const uniqueNotes = [...new Set(notes)];
    const chordNameEl = document.getElementById('chord-name');
    const altEl = document.getElementById('chord-alternatives');

    if (uniqueNotes.length < 2) {
        chordNameEl.textContent = '---';
        altEl.textContent = '';
        return;
    }

    const possibleNames = getChordNames(uniqueNotes);
    chordNameEl.textContent = possibleNames[0] || 'Desconocido';
    altEl.textContent = possibleNames.length > 1
        ? `También conocido como: ${possibleNames.slice(1).join(', ')}`
        : '';

    updateProgressions(uniqueNotes[0], possibleNames[0]);
}

function getChordNames(notes) {
    const names = [];
    const root = notes[0];
    const rootIndex = NOTES.indexOf(root);
    const intervals = notes.map(n => (NOTES.indexOf(n) - rootIndex + 12) % 12).sort((a, b) => a - b);

    if (intervals.includes(4) && intervals.includes(7)) {
        if (intervals.includes(11)) names.push(root + 'maj7');
        else if (intervals.includes(10)) names.push(root + '7');
        else names.push(root);
    }
    if (intervals.includes(3) && intervals.includes(7)) {
        if (intervals.includes(10)) names.push(root + 'm7');
        else names.push(root + 'm');
    }
    if (intervals.includes(3) && intervals.includes(6)) names.push(root + 'dim');
    if (intervals.includes(4) && intervals.includes(8)) names.push(root + 'aug');
    if (intervals.includes(5) && intervals.includes(7)) names.push(root + 'sus4');
    if (intervals.includes(2) && intervals.includes(7)) names.push(root + 'sus2');
    if (intervals.includes(4) && intervals.includes(7) && intervals.includes(9)) names.push(root + '6');
    if (intervals.includes(3) && intervals.includes(7) && intervals.includes(9)) names.push(root + 'm6');

    if (names.length === 0) names.push(root + ' (?)');
    return [...new Set(names)];
}

// =====================================================
// 3. BÚSQUEDA DE ACORDES
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

// =====================================================
// 4. AUDIO REALISTA
// =====================================================
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Reproduce una nota con envolvente de púa realista
function playNote(noteName) {
    initAudio();

    const freq = getFrequency(noteName);
    const now = audioCtx.currentTime;

    // --- Componente principal: cuerda vibrando ---
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    const gain2 = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    const masterGain = audioCtx.createGain();

    // Oscilador principal: triangular (sonido cálido)
    osc1.type = 'triangle';
    osc1.frequency.value = freq;

    // Oscilador secundario: sierra suave para dar cuerpo
    osc2.type = 'sawtooth';
    osc2.frequency.value = freq;

    // Filtro pasa-bajos para suavizar el sonido metálico
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(4000, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 1.5);
    filter.Q.value = 2;

    // Mezcla de osciladores
    gain1.gain.value = 0.7; // principal
    gain2.gain.value = 0.3; // secundario

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    // --- Envolvente ADSR (ataque de púa) ---
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.008); // ataque muy rápido (púa)
    masterGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8); // decaimiento largo

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.8);
    osc2.stop(now + 2.8);
}

function playCurrentChord() {
    initAudio();

    currentFretboard.forEach((fret, i) => {
        if (fret !== null && fret !== 'X') {
            const noteName = getNoteName(i, fret);
            // Rasgueo: retardo entre cuerdas (efecto de púa bajando)
            setTimeout(() => playNote(noteName), i * 70);
        }
    });
}

function getFrequency(note) {
    const noteMap = {
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
        'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
        'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
    };
    return noteMap[note] || 440;
}

// =====================================================
// 5. CÍRCULO DE QUINTAS INTERACTIVO
// =====================================================
function initCircleOfFifths() {
    const container = document.getElementById('circle-of-fifths');
    if (!container) return;

    const size = 400;
    const center = size / 2;
    const radiusOuter = 170;
    const radiusInner = 115;
    const radiusCore = 60;

    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const minorKeys = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m', 'Fm', 'Cm', 'Gm', 'Dm'];

    let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;

    // Fondo exterior
    svg += `<circle cx="${center}" cy="${center}" r="${radiusOuter + 15}" fill="#1a1a1a" stroke="#333" stroke-width="2"/>`;

    majorKeys.forEach((key, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const aw = 0.26; // ancho angular del sector

        // --- Sector Mayor (anillo exterior) ---
        const x1 = center + radiusOuter * Math.cos(angle - aw);
        const y1 = center + radiusOuter * Math.sin(angle - aw);
        const x2 = center + radiusOuter * Math.cos(angle + aw);
        const y2 = center + radiusOuter * Math.sin(angle + aw);
        const x3 = center + radiusInner * Math.cos(angle + aw);
        const y3 = center + radiusInner * Math.sin(angle + aw);
        const x4 = center + radiusInner * Math.cos(angle - aw);
        const y4 = center + radiusInner * Math.sin(angle - aw);

        svg += `<path class="circle-segment" id="seg-major-${key}" 
            d="M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z" 
            onclick="selectKey('${key}')" />`;

        // Texto Mayor
        const tx = center + ((radiusOuter + radiusInner) / 2) * Math.cos(angle);
        const ty = center + ((radiusOuter + radiusInner) / 2) * Math.sin(angle);
        svg += `<text class="circle-text" x="${tx}" y="${ty}" fill="#e8e8e8">${key}</text>`;

        // --- Sector Menor (anillo interior) ---
        const ir1 = center + radiusInner * Math.cos(angle - aw);
        const ir2 = center + radiusInner * Math.sin(angle - aw);
        const ir3 = center + radiusInner * Math.cos(angle + aw);
        const ir4 = center + radiusInner * Math.sin(angle + aw);
        const ir5 = center + radiusCore * Math.cos(angle + aw);
        const ir6 = center + radiusCore * Math.sin(angle + aw);
        const ir7 = center + radiusCore * Math.cos(angle - aw);
        const ir8 = center + radiusCore * Math.sin(angle - aw);

        svg += `<path class="circle-segment" id="seg-minor-${minorKeys[i]}" 
            d="M ${ir1} ${ir2} L ${ir3} ${ir4} L ${ir5} ${ir6} L ${ir7} ${ir8} Z" 
            onclick="selectKey('${minorKeys[i]}')" style="fill:#111;" />`;

        // Texto Menor
        const mtx = center + ((radiusInner + radiusCore) / 2) * Math.cos(angle);
        const mty = center + ((radiusInner + radiusCore) / 2) * Math.sin(angle);
        svg += `<text class="circle-text" x="${mtx}" y="${mty}" fill="#888" font-size="10">${minorKeys[i]}</text>`;
    });

    // Centro
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

    // Resaltar el sector activo
    document.querySelectorAll('.circle-segment').forEach(el => el.classList.remove('active'));
    const activeEl = document.getElementById(isMinor ? `seg-minor-${key}` : `seg-major-${key}`);
    if (activeEl) activeEl.classList.add('active');

    // Calcular los 7 grados de la escala
    const scaleIntervals = isMinor ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11];
    const degreeNames = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    const degreeQualities = isMinor
        ? ['m', 'dim', '', 'm', 'm', '', '']
        : ['', 'm', 'm', '', '', 'm', 'dim'];

    let scaleHTML = '<h4>Grados de la escala:</h4><ul>';
    scaleIntervals.forEach((interval, i) => {
        const note = NOTES[(rootIndex + interval) % 12];
        const degree = degreeNames[i];
        const quality = degreeQualities[i];
        scaleHTML += `<li><strong>${degree}:</strong> ${note}${quality}</li>`;
    });
    scaleHTML += '</ul>';

    const relative = isMinor
        ? NOTES[(rootIndex + 3) % 12]
        : NOTES[(rootIndex + 9) % 12] + 'm';
    const dominant = NOTES[(rootIndex + 7) % 12] + '7';

    info.innerHTML = `
        <h3>Tonalidad de ${key} ${isMinor ? 'Menor' : 'Mayor'}</h3>
        <p><strong>Relativa:</strong> ${relative}</p>
        <p><strong>Dominante (V7):</strong> ${dominant}</p>
        ${scaleHTML}
        <p style="margin-top:12px; font-size:0.9em; color:#888;">
            <strong>Explicación:</strong> Los grados I, IV y V son los pilares de la tonalidad. 
            El ii y vi añaden color. El vii° es el acorde de tensión que resuelve al I.
        </p>
    `;
}

// =====================================================
// 6. MODOS
// =====================================================
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
    const mode = document.getElementById('mode-selector').value;
    const root = 'C';
    const scale = getScaleNotes(root, mode);

    for (let i = 0; i < scale.length; i++) {
        setTimeout(() => playNote(scale[i]), i * 350);
    }
}

function getScaleNotes(root, mode) {
    const rootIndex = NOTES.indexOf(root);
    const intervals = {
        'jónico': [0, 2, 4, 5, 7, 9, 11], 'dórico': [0, 2, 3, 5, 7, 9, 10],
        'frigio': [0, 1, 3, 5, 7, 8, 10], 'lidio': [0, 2, 4, 6, 7, 9, 11],
        'mixolidio': [0, 2, 4, 5, 7, 9, 10], 'eólico': [0, 2, 3, 5, 7, 8, 10],
        'locrio': [0, 1, 3, 5, 6, 8, 10]
    };
    return intervals[mode].map(i => NOTES[(rootIndex + i) % 12]);
}

// =====================================================
// 7. MODULACIÓN
// =====================================================
function initSelectors() {
    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const originSelect = document.getElementById('mod-origin');
    const destSelect = document.getElementById('mod-dest');
    const dominantSelect = document.getElementById('dominant-key');

    if (!originSelect) return;

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

// =====================================================
// 8. DOMINANTES SECUNDARIOS
// =====================================================
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

// =====================================================
// FUNCIONES DE UTILIDAD
// =====================================================
function loadQuickChord(chord) {
    loadChordFromDB(chord);
}

function resetFretboard() {
    currentFretboard = [null, null, null, null, null, null];
    const selects = document.querySelectorAll('.string-row select');
    selects.forEach(select => select.value = 'null');
    drawFretboard();
    detectChord();

    document.getElementById('chord-name').textContent = '---';
    document.getElementById('chord-alternatives').textContent = '';
    document.getElementById('progressions-list').innerHTML =
        '<p class="empty-state">Selecciona un acorde para ver progresiones.</p>';
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