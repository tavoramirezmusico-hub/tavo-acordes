// =====================================================
// TAVO ACORDES - SCRIPT PRINCIPAL v4
// =====================================================

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'e'];
const OPEN_NOTES = ['E', 'A', 'D', 'G', 'B', 'E'];

// --- BASE DE DATOS DE ACORDES (orden: 6ª a 1ª cuerda) ---
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
};

// --- POSICIONES ALTERNATIVAS DE ACORDES ---
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
    ],
    'E7': [
        { name: 'Abierto', frets: [0, 2, 0, 1, 0, 0], baseFret: 0 },
        { name: 'Barra 7mo', frets: [7, 9, 7, 8, 7, 7], baseFret: 7 }
    ],
    'D7': [
        { name: 'Abierto', frets: [null, null, 0, 2, 1, 2], baseFret: 0 },
        { name: 'Barra 5to', frets: [null, 5, 7, 5, 7, 5], baseFret: 5 }
    ],
    'A7': [
        { name: 'Abierto', frets: [null, 0, 2, 0, 2, 0], baseFret: 0 },
        { name: 'Barra 5to', frets: [5, 7, 5, 6, 5, 5], baseFret: 5 }
    ]
};

// --- CALIDADES DE ACORDES ---
const CHORD_QUALITIES = {
    '': { name: 'Mayor', intervals: [0, 4, 7], scale: 'jónico', scaleName: 'Jónica (Mayor)' },
    'm': { name: 'Menor', intervals: [0, 3, 7], scale: 'eólico', scaleName: 'Eólica (Menor Natural)' },
    '7': { name: 'Dominante', intervals: [0, 4, 7, 10], scale: 'mixolidio', scaleName: 'Mixolidia' },
    'maj7': { name: 'Mayor 7', intervals: [0, 4, 7, 11], scale: 'jónico', scaleName: 'Jónica (Mayor)' },
    'm7': { name: 'Menor 7', intervals: [0, 3, 7, 10], scale: 'dórico', scaleName: 'Dórica' },
    'dim': { name: 'Disminuido', intervals: [0, 3, 6], scale: 'locrio', scaleName: 'Locria' },
    'aug': { name: 'Aumentado', intervals: [0, 4, 8], scale: 'jónico', scaleName: 'Jónica con #5' },
    'sus2': { name: 'Suspendido 2', intervals: [0, 2, 7], scale: 'jónico', scaleName: 'Jónica (Mayor)' },
    'sus4': { name: 'Suspendido 4', intervals: [0, 5, 7], scale: 'jónico', scaleName: 'Jónica (Mayor)' },
    '6': { name: 'Sexta', intervals: [0, 4, 7, 9], scale: 'jónico', scaleName: 'Jónica (Mayor)' },
    'm6': { name: 'Menor Sexta', intervals: [0, 3, 7, 9], scale: 'dórico', scaleName: 'Dórica' },
    'm7b5': { name: 'Semidisminuido', intervals: [0, 3, 6, 10], scale: 'locrio', scaleName: 'Locria' },
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

let currentFretboard = [null, null, null, null, null, null];
let audioCtx = null;
let currentChordData = null;

// =====================================================
// INICIALIZACIÓN
// =====================================================
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

function drawFretboard() {
    const container = document.querySelector('.fretboard-visual');
    if (!container) return;

    const width = 800;
    const height = 260;
    const marginLeft = 55;
    const marginTop = 35;
    const marginRight = 15;
    const marginBottom = 15;

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
    const positionsEl = document.getElementById('chord-positions');

    if (uniqueNotes.length < 2) {
        chordNameEl.textContent = '---';
        altEl.textContent = '';
        if (positionsEl) positionsEl.innerHTML = '';
        document.getElementById('scale-info').innerHTML = '<p class="empty-state">Toca al menos 2 cuerdas para ver la escala.</p>';
        document.getElementById('scale-fretboard').innerHTML = '';
        currentChordData = null;
        return;
    }

    currentChordData = analyzeChord(uniqueNotes, notes);

    // Nombre principal (SIN inversión)
    chordNameEl.textContent = currentChordData.primaryName;

    // Alternativas (incluye inversiones)
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

    // Mostrar posiciones alternativas
    renderPositions(currentChordData.primaryName);

    updateScaleForChord(currentChordData);
    updateProgressionsForChord(currentChordData);
    updateModeForChord(currentChordData);
}

function analyzeChord(notes, orderedNotes) {
    const candidates = [];
    const bassNote = orderedNotes ? orderedNotes[0] : notes[0];

    notes.forEach(rootNote => {
        const rootIndex = NOTES.indexOf(rootNote);
        const intervals = notes.map(n => (NOTES.indexOf(n) - rootIndex + 12) % 12).sort((a, b) => a - b);

        for (const [suffix, quality] of Object.entries(CHORD_QUALITIES)) {
            const requiredIntervals = quality.intervals;
            const matches = requiredIntervals.every(i => intervals.includes(i));
            const extras = intervals.filter(i => !requiredIntervals.includes(i));

            if (matches && extras.length === 0) {
                let priority = requiredIntervals.length * 100;
                if (rootNote === bassNote) priority += 150;

                candidates.push({
                    root: rootNote,
                    suffix: suffix,
                    name: rootNote + suffix,
                    quality: quality,
                    priority: priority
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
        return {
            root: notes[0],
            suffix: '',
            primaryName: notes[0] + ' (?)',
            alternatives: [],
            quality: null,
            intervals: []
        };
    }

    const best = uniqueCandidates[0];
    return {
        root: best.root,
        suffix: best.suffix,
        primaryName: best.name,
        alternatives: uniqueCandidates.map(c => c.name),
        quality: best.quality,
        intervals: best.quality.intervals
    };
}

// =====================================================
// 3. POSICIONES ALTERNATIVAS DEL ACORDE
// =====================================================
function renderPositions(chordName) {
    const positionsEl = document.getElementById('chord-positions');
    if (!positionsEl) return;

    const baseChord = chordName.split('/')[0];
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
// 4. ESCALA DEL ACORDE
// =====================================================
function updateScaleForChord(chordData) {
    const infoBox = document.getElementById('scale-info');
    const fretboardBox = document.getElementById('scale-fretboard');

    if (!chordData || !chordData.quality) {
        infoBox.innerHTML = '<p class="empty-state">Escala no disponible para este acorde.</p>';
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
        <h4>Escala de ${root} ${quality.scaleName}</h4>
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

    const width = 800;
    const height = 220;
    const marginLeft = 55;
    const marginTop = 35;
    const marginRight = 15;
    const marginBottom = 15;

    const drawWidth = width - marginLeft - marginRight;
    const drawHeight = height - marginTop - marginBottom;
    const stringSpacing = drawHeight / 5;
    const fretSpacing = drawWidth / 13;

    let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" style="background:#2a1f1a; border-radius:10px; width:100%; height:auto; display:block;">`;

    for (let i = 0; i <= 13; i++) {
        const x = marginLeft + (i * fretSpacing);
        const strokeW = (i === 0) ? 6 : 2;
        svg += `<line x1="${x}" y1="${marginTop}" x2="${x}" y2="${height - marginBottom}" stroke="#777" stroke-width="${strokeW}" />`;
    }

    for (let i = 0; i < 6; i++) {
        const y = marginTop + (i * stringSpacing);
        const strokeW = 5 - (i * 0.6);
        svg += `<line x1="${marginLeft}" y1="${y}" x2="${width - marginRight}" y2="${y}" stroke="#ccc" stroke-width="${strokeW}" />`;
        svg += `<text x="${marginLeft - 12}" y="${y}" fill="#ff6b00" font-size="13" font-weight="bold" text-anchor="end" dominant-baseline="middle">${STRINGS[i]}</text>`;
    }

    for (let i = 1; i <= 12; i++) {
        const x = marginLeft + ((i - 0.5) * fretSpacing);
        svg += `<text x="${x}" y="${marginTop - 12}" fill="#888" font-size="11" text-anchor="middle">${i}</text>`;
    }

    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
        const y = marginTop + (stringIndex * stringSpacing);
        const openNote = OPEN_NOTES[stringIndex];
        const openIndex = NOTES.indexOf(openNote);

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
// 5. PROGRESIONES
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
            'i': root + 'm',
            'ii°': NOTES[(rootIndex + 2) % 12] + 'dim',
            'III': NOTES[(rootIndex + 3) % 12],
            'iv': NOTES[(rootIndex + 5) % 12] + 'm',
            'v': NOTES[(rootIndex + 7) % 12] + 'm',
            'VI': NOTES[(rootIndex + 8) % 12],
            'VII': NOTES[(rootIndex + 10) % 12]
        };
    } else {
        degrees = {
            'I': root,
            'ii': NOTES[(rootIndex + 2) % 12] + 'm',
            'iii': NOTES[(rootIndex + 4) % 12] + 'm',
            'IV': NOTES[(rootIndex + 5) % 12],
            'V': NOTES[(rootIndex + 7) % 12],
            'vi': NOTES[(rootIndex + 9) % 12] + 'm',
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

    let html = `
        <div style="margin-bottom:15px;">
            <strong style="color:#ff6b00;">Tonalidad sugerida:</strong> ${root} ${isMinor ? 'menor' : 'mayor'}
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(100px,1fr)); gap:8px; margin-bottom:15px;">
    `;

    Object.entries(degrees).forEach(([degree, chord]) => {
        html += `<div class="result-item" style="text-align:center;"><strong style="color:#ff6b00;">${degree}</strong><br>${chord}</div>`;
    });

    html += `</div><h4 style="color:#ff6b00; margin-bottom:10px;">Progresiones sugeridas para ${chordData.primaryName}:</h4>`;

    progressions.forEach(p => {
        html += `<div class="result-item" style="text-align:left; padding:12px; margin-bottom:8px;">${p}</div>`;
    });

    container.innerHTML = html;
}

// =====================================================
// 6. MODOS CON MÁSTIL
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
// 7. AUDIO
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

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.008);
    masterGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

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
// 8. CÍRCULO DE QUINTAS
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
    svg += `<circle cx="${center}" cy="${center}" r="${radiusOuter + 15}" fill="#1a1a1a" stroke="#333" stroke-width="2"/>`;

    majorKeys.forEach((key, i) => {
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

        svg += `<path class="circle-segment" id="seg-major-${key}" d="M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z" onclick="selectKey('${key}')" />`;

        const tx = center + ((radiusOuter + radiusInner) / 2) * Math.cos(angle);
        const ty = center + ((radiusOuter + radiusInner) / 2) * Math.sin(angle);
        svg += `<text class="circle-text" x="${tx}" y="${ty}" fill="#e8e8e8">${key}</text>`;

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
        const note = NOTES[(rootIndex + interval) % 12];
        const degree = degreeNames[i];
        const quality = degreeQualities[i];
        scaleHTML += `<li><strong>${degree}:</strong> ${note}${quality}</li>`;
    });
    scaleHTML += '</ul>';

    const relative = isMinor ? NOTES[(rootIndex + 3) % 12] : NOTES[(rootIndex + 9) % 12] + 'm';
    const dominant = NOTES[(rootIndex + 7) % 12] + '7';

    info.innerHTML = `
        <h3>Tonalidad de ${key} ${isMinor ? 'Menor' : 'Mayor'}</h3>
        <p><strong>Relativa:</strong> ${relative}</p>
        <p><strong>Dominante (V7):</strong> ${dominant}</p>
        ${scaleHTML}
        <p style="margin-top:12px; font-size:0.9em; color:#888;">
            <strong>Explicación:</strong> Los grados I, IV y V son los pilares. 
            El ii y vi añaden color. El vii° es el acorde de tensión que resuelve al I.
        </p>
    `;
}

// =====================================================
// 9. BÚSQUEDA Y UTILIDADES
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
    document.getElementById('progressions-list').innerHTML = '<p class="empty-state">Selecciona un acorde para ver progresiones.</p>';
    document.getElementById('scale-info').innerHTML = '<p class="empty-state">Selecciona un acorde para ver la escala.</p>';
    document.getElementById('scale-fretboard').innerHTML = '';
}