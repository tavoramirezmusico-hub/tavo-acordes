// =====================================================
// TAVO ACORDES - RITMO Y RASGUEO
// Patrones de rasgueo + rítmicas latinas + metrónomo
// Autocontenido: solo se activa si existe el HTML correspondiente
// =====================================================

(function () {
    'use strict';

    // =====================================================
    // DATOS: PATRONES DE RASGUEO
    // =====================================================
    const PATRONES_RASGUEO = [
        {
            id: 'pop-basico',
            name: 'Pop básico',
            level: 'principiante',
            genre: 'pop',
            timeSignature: '4/4',
            bpm: 90,
            description: 'Rasgueo hacia abajo en los pulsos fuertes y hacia arriba en los débiles. La base de casi todo.',
            tip: 'Empieza lento (60 BPM), memoriza el movimiento y sube poco a poco.',
            pattern: [
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: false }
            ]
        },
        {
            id: 'pop-sincopado',
            name: 'Pop sincopado',
            level: 'intermedio',
            genre: 'pop',
            timeSignature: '4/4',
            bpm: 100,
            description: 'Acentos en contratiempo (el "y" del pulso). Suena más moderno y con más groove.',
            tip: 'Cuenta "1-y-2-y-3-y-4-y" en voz alta. Los acentos van en los "y".',
            pattern: [
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: true }
            ]
        },
        {
            id: 'rock-8beats',
            name: 'Rock 8 beats',
            level: 'principiante',
            genre: 'rock',
            timeSignature: '4/4',
            bpm: 110,
            description: 'Ocho corcheas seguidas, sin descanso. El patrón clásico del rock.',
            tip: 'Mantén la mano en movimiento constante: ↓↑↓↑↓↑↓↑. No pares entre golpes.',
            pattern: [
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false }
            ]
        },
        {
            id: 'rock-power',
            name: 'Rock power chords',
            level: 'intermedio',
            genre: 'rock',
            timeSignature: '4/4',
            bpm: 130,
            description: 'Golpes contundentes en los pulsos 1 y 3, con silencios entre medio. Sonido potente.',
            tip: 'Apaga las cuerdas con la mano derecha entre golpe y golpe para que suene limpio.',
            pattern: [
                { stroke: '↓', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '·', accent: false }
            ]
        },
        {
            id: 'balada-68',
            name: 'Balada 6/8',
            level: 'principiante',
            genre: 'balada',
            timeSignature: '6/8',
            bpm: 80,
            description: 'Rasgueo lento en compás de 6/8. Suena romántico y nostálgico, ideal para baladas.',
            tip: 'Cuenta "1-2-3-4-5-6" con acentos en 1 y 4. Movimiento amplio y relajado.',
            pattern: [
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↑', accent: false }
            ]
        },
        {
            id: 'balada-arpegio',
            name: 'Balada arpegiada',
            level: 'intermedio',
            genre: 'balada',
            timeSignature: '4/4',
            bpm: 70,
            description: 'Arpegio suave con el pulgar y los dedos. Suena íntimo y delicado.',
            tip: 'Toca la nota del bajo con el pulgar y las demás con índice, medio y anular.',
            pattern: [
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '↑', accent: false },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: false }
            ]
        },
        {
            id: 'funk-16',
            name: 'Funk 16 beats',
            level: 'avanzado',
            genre: 'funk',
            timeSignature: '4/4',
            bpm: 100,
            description: 'Rasgueo a semicorcheas con acentos sincopados. Suena funky y con mucha energía.',
            tip: 'Silencia las cuerdas entre golpes. El funk vive del silencio y el acento.',
            pattern: [
                { stroke: '↓', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↓', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false }
            ]
        },
        {
            id: 'reggae-skank',
            name: 'Reggae skank',
            level: 'intermedio',
            genre: 'reggae',
            timeSignature: '4/4',
            bpm: 75,
            description: 'Golpes cortos en el contratiempo, con acento en el "y" del pulso. El sonido clásico del reggae.',
            tip: 'Apaga las cuerdas inmediatamente después de cada golpe. El silencio es parte del ritmo.',
            pattern: [
                { stroke: '·', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '·', accent: false },
                { stroke: '↑', accent: true }
            ]
        }
    ];

    // =====================================================
    // DATOS: RÍTMICAS LATINAS
    // =====================================================
    const RITMICAS_LATINAS = [
        {
            id: 'bossa-clasica',
            name: 'Bossa nova clásica',
            level: 'intermedio',
            style: 'bossa',
            timeSignature: '4/4',
            bpm: 130,
            description: 'Bajo alterno con el pulgar y acordes en contratiempo con los dedos. La base de la bossa nova de Jobim.',
            tip: 'La mano derecha hace dos cosas a la vez: bajo en 1 y 3, acordes en los contratiempos.',
            pattern: [
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: false, label: 'acorde' },
                { stroke: '↓', accent: false, label: 'bajo' },
                { stroke: '↑', accent: false, label: 'acorde' },
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: false, label: 'acorde' },
                { stroke: '↓', accent: false, label: 'bajo' },
                { stroke: '↑', accent: false, label: 'acorde' }
            ]
        },
        {
            id: 'bossa-avanzada',
            name: 'Bossa nova con síncopa',
            level: 'avanzado',
            style: 'bossa',
            timeSignature: '4/4',
            bpm: 130,
            description: 'Bossa más elaborada con síncopas en los acordes. Suena más moderna y jazzística.',
            tip: 'Practica primero el patrón básico y luego añade las síncopas.',
            pattern: [
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '·', accent: false, label: '' },
                { stroke: '↑', accent: true, label: 'acorde' },
                { stroke: '·', accent: false, label: '' },
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: true, label: 'acorde' },
                { stroke: '·', accent: false, label: '' },
                { stroke: '↑', accent: true, label: 'acorde' }
            ]
        },
        {
            id: 'salsa-montuno',
            name: 'Salsa montuno',
            level: 'avanzado',
            style: 'salsa',
            timeSignature: '4/4',
            bpm: 180,
            description: 'Guajeo de salsa con acordes en contratiempo y acentos latinos. Suena a fiesta.',
            tip: 'Empieza con el patrón del bajo solo y luego añade los acordes.',
            pattern: [
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: true, label: 'acorde' },
                { stroke: '↓', accent: false, label: 'bajo' },
                { stroke: '↑', accent: true, label: 'acorde' },
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: true, label: 'acorde' },
                { stroke: '↓', accent: false, label: 'bajo' },
                { stroke: '↑', accent: true, label: 'acorde' }
            ]
        },
        {
            id: 'bolero-lento',
            name: 'Bolero lento',
            level: 'principiante',
            style: 'bolero',
            timeSignature: '4/4',
            bpm: 70,
            description: 'Arpegio lento y romántico con bajo en el pulso y acordes en los tiempos débiles.',
            tip: 'Toca con mucha sensibilidad. El bolero vive del silencio y la expresión.',
            pattern: [
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: false, label: 'acorde' },
                { stroke: '↑', accent: false, label: 'acorde' },
                { stroke: '↑', accent: false, label: 'acorde' },
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: false, label: 'acorde' },
                { stroke: '↑', accent: false, label: 'acorde' },
                { stroke: '↑', accent: false, label: 'acorde' }
            ]
        },
        {
            id: 'cumbia-basica',
            name: 'Cumbia básica',
            level: 'principiante',
            style: 'cumbia',
            timeSignature: '4/4',
            bpm: 95,
            description: 'Rasgueo con acento en los pulsos 2 y 4, típico de la cumbia. Suena bailable y festivo.',
            tip: 'Mueve el cuerpo con el ritmo. La cumbia es ante todo baile.',
            pattern: [
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: true },
                { stroke: '↓', accent: false },
                { stroke: '↑', accent: true }
            ]
        },
        {
            id: 'son-cubano',
            name: 'Son cubano',
            level: 'avanzado',
            style: 'son',
            timeSignature: '4/4',
            bpm: 140,
            description: 'Patrón del son cubano con acentos en el "y" del pulso y bajo alterno. Suena a Buena Vista Social Club.',
            tip: 'Escucha mucho son cubano: el "sabor" está en el fraseo.',
            pattern: [
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: true, label: 'acorde' },
                { stroke: '↓', accent: false, label: 'bajo' },
                { stroke: '↑', accent: true, label: 'acorde' },
                { stroke: '↓', accent: true, label: 'bajo' },
                { stroke: '↑', accent: true, label: 'acorde' },
                { stroke: '·', accent: false, label: '' },
                { stroke: '↑', accent: true, label: 'acorde' }
            ]
        }
    ];

    // =====================================================
    // AUDIO CONTEXT COMPARTIDO
    // =====================================================
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }

    // Notas base (afinación estándar, primera posición)
    const NOTE_FREQS = {
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
        'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
        'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
    };

    // Acordes básicos: notas que los componen
    const CHORD_NOTES = {
        'C': ['C', 'E', 'G'],
        'G': ['G', 'B', 'D'],
        'D': ['D', 'F#', 'A'],
        'A': ['A', 'C#', 'E'],
        'E': ['E', 'G#', 'B'],
        'Am': ['A', 'C', 'E'],
        'Em': ['E', 'G', 'B'],
        'Dm': ['D', 'F', 'A']
    };

    // Click corto para el metrónomo
    function playClick(isFirstBeat) {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.value = isFirstBeat ? 1500 : 1000;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
    }

    // Acorde de fondo (arpegiado suave)
    function playChordBackground(chordName) {
        if (!chordName || chordName === 'none') return;
        const notes = CHORD_NOTES[chordName];
        if (!notes) return;
        initAudio();
        notes.forEach((note, i) => {
            const freq = NOTE_FREQS[note];
            if (!freq) return;
            setTimeout(() => {
                const now = audioCtx.currentTime;
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.55);
            }, i * 30);
        });
    }

    // =====================================================
    // REPRODUCTOR DE PATRONES
    // =====================================================
    let currentPlayer = null;

    function playPattern(pattern, bpm, chordName, onBeat, onEnd) {
        stopCurrentPlayer();
        initAudio();

        const beatDuration = 60000 / bpm;
        let stepIndex = 0;
        let intervalId = null;

        const tick = () => {
            if (stepIndex >= pattern.length) {
                if (onEnd) onEnd();
                stopCurrentPlayer();
                return;
            }

            const step = pattern[stepIndex];

            // Click del metrónomo en pulsos principales (cada 2 pasos en 4/4)
            const isMainBeat = stepIndex % 2 === 0;
            if (isMainBeat) {
                playClick(stepIndex === 0);
            }

            // Acorde de fondo en el primer pulso de cada compás
            if (stepIndex === 0 && chordName) {
                playChordBackground(chordName);
            }

            // Callback de UI
            if (onBeat) onBeat(stepIndex, step);

            stepIndex++;
        };

        tick();
        intervalId = setInterval(tick, beatDuration / 2);

        currentPlayer = {
            stop: () => {
                if (intervalId) clearInterval(intervalId);
                intervalId = null;
            }
        };
    }

    function stopCurrentPlayer() {
        if (currentPlayer) {
            currentPlayer.stop();
            currentPlayer = null;
        }
        // Limpiar estados visuales
        document.querySelectorAll('.ritmo-stroke.active').forEach(el => el.classList.remove('active'));
    }

    // =====================================================
    // RENDERIZADO DE PATRONES
    // =====================================================
    function renderPatternDiagram(pattern) {
        return pattern.map((step, i) => {
            const classes = ['ritmo-stroke'];
            if (step.stroke === '↓') classes.push('down');
            else if (step.stroke === '↑') classes.push('up');
            if (step.accent) classes.push('accent');

            const symbol = step.stroke === '·' ? '·' : step.stroke;
            const beatNum = Math.floor(i / 2) + 1;

            return `<div class="${classes.join(' ')}" data-step="${i}">
                ${symbol}
                <span class="ritmo-beat-num">${beatNum}</span>
            </div>`;
        }).join('');
    }

    function renderPatternCard(p, container, playerState) {
        const card = document.createElement('div');
        card.className = 'ritmo-card';
        card.dataset.id = p.id;
        card.dataset.genre = p.genre || p.style || '';
        card.dataset.level = p.level;

        const levelLabel = {
            'principiante': '🌱 Principiante',
            'intermedio': '🌿 Intermedio',
            'avanzado': '🌳 Avanzado'
        }[p.level] || p.level;

        card.innerHTML = `
            <div class="ritmo-card-header">
                <h3 class="ritmo-card-title">${p.name}</h3>
                <div class="ritmo-card-meta">
                    <span class="level-${p.level}">${levelLabel}</span>
                    <span>${p.timeSignature}</span>
                    <span>${p.bpm} BPM</span>
                </div>
            </div>
            <div class="ritmo-pattern">${renderPatternDiagram(p.pattern)}</div>
            <div class="ritmo-card-desc">${p.description}</div>
            <div class="ritmo-card-tip">💡 ${p.tip}</div>
            <div class="ritmo-card-actions">
                <button data-action="play" data-id="${p.id}">
                    <i class="fas fa-play"></i> Escuchar
                </button>
            </div>
        `;
        container.appendChild(card);

        // Listener de reproducción
        card.querySelector('[data-action="play"]').addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const chordName = playerState.getChord();

            if (btn.dataset.playing === 'true') {
                stopCurrentPlayer();
                btn.dataset.playing = 'false';
                btn.innerHTML = '<i class="fas fa-play"></i> Escuchar';
                return;
            }

            // Detener otros botones
            container.querySelectorAll('[data-action="play"]').forEach(b => {
                b.dataset.playing = 'false';
                b.innerHTML = '<i class="fas fa-play"></i> Escuchar';
            });

            btn.dataset.playing = 'true';
            btn.innerHTML = '<i class="fas fa-stop"></i> Detener';

            const strokes = card.querySelectorAll('.ritmo-stroke');
            playPattern(
                p.pattern,
                p.bpm,
                chordName,
                (stepIndex) => {
                    strokes.forEach(s => s.classList.remove('active'));
                    const active = card.querySelector(`.ritmo-stroke[data-step="${stepIndex}"]`);
                    if (active) active.classList.add('active');
                },
                () => {
                    btn.dataset.playing = 'false';
                    btn.innerHTML = '<i class="fas fa-play"></i> Escuchar';
                }
            );
        });
    }

    function renderGrid(data, container, filters, playerState) {
        if (!container) return;
        container.innerHTML = '';

        const filtered = data.filter(p => {
            const genreKey = p.genre || p.style || '';
            const genreOk = !filters.genre || filters.genre === 'all' || genreKey === filters.genre;
            const levelOk = !filters.level || filters.level === 'all' || p.level === filters.level;
            return genreOk && levelOk;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<p class="empty-state">No hay patrones que coincidan con los filtros.</p>';
            return;
        }

        filtered.forEach(p => renderPatternCard(p, container, playerState));
    }

    // =====================================================
    // INICIALIZACIÓN: PATRONES DE RASGUEO
    // =====================================================
    function initRasgueo() {
        const container = document.getElementById('patronesGrid');
        if (!container) return;

        const playerState = {
            getChord: () => {
                const sel = document.getElementById('acordeFondo');
                return sel ? sel.value : 'C';
            }
        };

        const filters = { genre: 'all', level: 'all' };

        const render = () => renderGrid(PATRONES_RASGUEO, container, filters, playerState);

        const genreSel = document.getElementById('filtroGenero');
        const levelSel = document.getElementById('filtroNivel');

        if (genreSel) genreSel.addEventListener('change', () => {
            filters.genre = genreSel.value;
            render();
        });
        if (levelSel) levelSel.addEventListener('change', () => {
            filters.level = levelSel.value;
            render();
        });

        render();
    }

    // =====================================================
    // INICIALIZACIÓN: RÍTMICAS LATINAS
    // =====================================================
    function initLatinas() {
        const container = document.getElementById('patronesLatinosGrid');
        if (!container) return;

        const playerState = {
            getChord: () => {
                const sel = document.getElementById('acordeFondoLatino');
                return sel ? sel.value : 'C';
            }
        };

        const filters = { genre: 'all', level: 'all' };

        const render = () => {
            // Reutilizamos renderGrid pero mapeamos "style" a "genre"
            const adaptedData = RITMICAS_LATINAS.map(p => ({ ...p, genre: p.style }));
            renderGrid(adaptedData, container, filters, playerState);
        };

        const styleSel = document.getElementById('filtroEstilo');
        if (styleSel) {
            styleSel.addEventListener('change', () => {
                filters.genre = styleSel.value;
                render();
            });
        }

        render();
    }

    // =====================================================
    // INICIALIZACIÓN: METRÓNOMO
    // =====================================================
    function initMetronomo() {
        const playBtn = document.getElementById('metronomoPlayBtn');
        if (!playBtn) return;

        const bpmDisplay = document.getElementById('bpmDisplay');
        const bpmSlider = document.getElementById('bpmSlider');
        const compasSelect = document.getElementById('compasSelect');
        const beatsDisplay = document.getElementById('beatsDisplay');
        const tempoPresets = document.getElementById('tempoPresets');
        const acordeSelect = document.getElementById('acordeFondoMetro');

        let isPlaying = false;
        let intervalId = null;
        let currentBeat = 0;
        let bpm = 90;
        let beatsPerBar = 4;

        function parseCompas(value) {
            // "4/4" -> 4 beats, "6/8" -> 6 beats, "3/4" -> 3 beats
            const parts = value.split('/');
            return parseInt(parts[0]) || 4;
        }

        function renderBeats() {
            if (!beatsDisplay) return;
            beatsDisplay.innerHTML = '';
            for (let i = 0; i < beatsPerBar; i++) {
                const beat = document.createElement('div');
                beat.className = 'metronomo-beat';
                beat.dataset.beat = i;
                beat.textContent = i + 1;
                beatsDisplay.appendChild(beat);
            }
        }

        function updateBpm(newBpm) {
            bpm = Math.max(40, Math.min(240, newBpm));
            if (bpmDisplay) bpmDisplay.textContent = bpm;
            if (bpmSlider) bpmSlider.value = bpm;
            if (isPlaying) {
                stopMetronome();
                startMetronome();
            }
        }

        function highlightBeat(beatIndex) {
            if (!beatsDisplay) return;
            const beats = beatsDisplay.querySelectorAll('.metronomo-beat');
            beats.forEach(b => b.classList.remove('active', 'first-beat'));
            const activeBeat = beats[beatIndex];
            if (activeBeat) {
                activeBeat.classList.add('active');
                if (beatIndex === 0) activeBeat.classList.add('first-beat');
            }
        }

        function tick() {
            const isFirstBeat = currentBeat === 0;
            playClick(isFirstBeat);

            // Acorde de fondo en el primer pulso
            const chordName = acordeSelect ? acordeSelect.value : 'none';
            if (isFirstBeat && chordName && chordName !== 'none') {
                playChordBackground(chordName);
            }

            highlightBeat(currentBeat);
            currentBeat = (currentBeat + 1) % beatsPerBar;
        }

        function startMetronome() {
            isPlaying = true;
            currentBeat = 0;
            if (playBtn) {
                playBtn.classList.add('playing');
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            const interval = 60000 / bpm;
            tick();
            intervalId = setInterval(tick, interval);
        }

        function stopMetronome() {
            isPlaying = false;
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            if (playBtn) {
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
            if (beatsDisplay) {
                beatsDisplay.querySelectorAll('.metronomo-beat').forEach(b => {
                    b.classList.remove('active', 'first-beat');
                });
            }
        }

        // Eventos
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (isPlaying) stopMetronome();
                else startMetronome();
            });
        }

        if (bpmSlider) {
            bpmSlider.addEventListener('input', (e) => {
                updateBpm(parseInt(e.target.value));
            });
        }

        if (compasSelect) {
            compasSelect.addEventListener('change', (e) => {
                beatsPerBar = parseCompas(e.target.value);
                renderBeats();
                if (isPlaying) {
                    currentBeat = 0;
                }
            });
        }

        if (tempoPresets) {
            tempoPresets.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    tempoPresets.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    updateBpm(parseInt(btn.dataset.bpm));
                });
            });
        }

        // Inicializar estado
        if (bpmDisplay) bpmDisplay.textContent = bpm;
        if (bpmSlider) bpmSlider.value = bpm;
        beatsPerBar = compasSelect ? parseCompas(compasSelect.value) : 4;
        renderBeats();
    }

    // =====================================================
    // INICIALIZACIÓN GENERAL (solo si los elementos existen)
    // =====================================================
    function init() {
        initRasgueo();
        initLatinas();
        initMetronomo();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exponer para depuración (opcional)
    window.Ritmo = {
        patrones: PATRONES_RASGUEO,
        latinas: RITMICAS_LATINAS,
        stopCurrentPlayer
    };
})();