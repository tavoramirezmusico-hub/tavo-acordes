// =====================================================
// TAVO ACORDES - LECTURA MUSICAL
// Curso interactivo de 4 niveles (pentagrama, figuras,
// notas en el mástil, lectura práctica).
// Autocontenido: solo se activa si existe el HTML correspondiente.
// =====================================================

(function () {
    'use strict';

    // =====================================================
    // CONSTANTES Y UTILIDADES
    // =====================================================
    const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const NOTES_ES = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];

    // Mapa de nota inglesa a española
    const NOTES_ES_MAP = {
        'C': 'Do', 'C#': 'Do#', 'D': 'Re', 'D#': 'Re#', 'E': 'Mi',
        'F': 'Fa', 'F#': 'Fa#', 'G': 'Sol', 'G#': 'Sol#', 'A': 'La',
        'A#': 'La#', 'B': 'Si'
    };

    // Afinación estándar: notas de las cuerdas al aire (6ª a 1ª)
    const OPEN_STRINGS = ['E', 'A', 'D', 'G', 'B', 'E'];
    const OPEN_STRINGS_ES = ['Mi', 'La', 'Re', 'Sol', 'Si', 'Mi'];

    // Audio
    let audioCtx = null;
    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }

    const NOTE_FREQS = {
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
        'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
        'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
    };

    function playNote(note) {
        if (!NOTE_FREQS[note]) return;
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = NOTE_FREQS[note];
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 1.25);
    }

    function playClick(accent) {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.value = accent ? 1500 : 1000;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
    }

    // =====================================================
    // HELPERS DE PENTAGRAMA
    // =====================================================
    // Posiciones verticales de cada nota en el pentagrama (en píxeles).
    // Rango: de Mi grave (línea 1) a Do agudo (espacio 3 superior).
    // Cada paso (línea o espacio) son 20px.
    // Notas: Mi, Fa, Sol, La, Si, Do, Re, Mi, Fa, Sol, La, Si, Do
    const NOTAS_PENTAGRAMA = [
        { nota: 'E', nombre_es: 'Mi', y: 180, tipo: 'linea', numero: 1 },
        { nota: 'F', nombre_es: 'Fa', y: 170, tipo: 'espacio', numero: 1 },
        { nota: 'G', nombre_es: 'Sol', y: 160, tipo: 'linea', numero: 2 },
        { nota: 'A', nombre_es: 'La', y: 150, tipo: 'espacio', numero: 2 },
        { nota: 'B', nombre_es: 'Si', y: 140, tipo: 'linea', numero: 3 },
        { nota: 'C', nombre_es: 'Do', y: 130, tipo: 'espacio', numero: 3 },
        { nota: 'D', nombre_es: 'Re', y: 120, tipo: 'linea', numero: 4 },
        { nota: 'E', nombre_es: 'Mi', y: 110, tipo: 'espacio', numero: 4 },
        { nota: 'F', nombre_es: 'Fa', y: 100, tipo: 'linea', numero: 5 },
        { nota: 'G', nombre_es: 'Sol', y: 90, tipo: 'espacio', numero: 4 },
        { nota: 'A', nombre_es: 'La', y: 80, tipo: 'linea', numero: 6 },
        { nota: 'B', nombre_es: 'Si', y: 70, tipo: 'espacio', numero: 5 },
        { nota: 'C', nombre_es: 'Do', y: 60, tipo: 'linea', numero: 7 }
    ];

    // Helper para dibujar una nota en SVG de pentagrama
    function drawNoteInPentagrama(x, y, { color = '#000', showLabel = false, label = '' } = {}) {
        // Si y está en una línea (múltiplo de 20), la nota se dibuja con línea de través.
        // Si y está en un espacio, la nota va entre líneas.
        const lineThrough = y % 20 === 0;
        const labelY = y > 120 ? y + 25 : y - 20;
        return `
            <g class="nota-pentagrama">
                <ellipse cx="${x}" cy="${y}" rx="9" ry="7" fill="${color}" transform="rotate(-20 ${x} ${y})"/>
                <line x1="${x + 9}" y1="${y}" x2="${x + 9}" y2="${y - 30}" stroke="${color}" stroke-width="2"/>
                ${showLabel ? `<text x="${x}" y="${labelY}" font-family="Arial" font-size="12" font-weight="bold" fill="${color}" text-anchor="middle">${label}</text>` : ''}
            </g>
        `;
    }

    // Dibuja la clave de sol
    function drawClaveSol() {
        return `
            <g transform="translate(45, 0) scale(0.55)">
                <circle cx="0" cy="145" r="18" fill="none" stroke="#000" stroke-width="5"/>
                <path d="M 0 145 C -20 145, -25 125, -10 105 C 5 85, 20 65, 0 45 C -10 35, -25 40, -22 60 C -20 75, 0 75, 0 60" fill="none" stroke="#000" stroke-width="5"/>
                <line x1="0" y1="30" x2="0" y2="165" stroke="#000" stroke-width="5"/>
            </g>
        `;
    }

    // Dibuja las 5 líneas del pentagrama
    function drawLineasPentagrama(width = 600) {
        return `
            <g stroke="#333" stroke-width="1.2">
                <line x1="30" y1="60" x2="${width}" y2="60" />
                <line x1="30" y1="80" x2="${width}" y2="80" />
                <line x1="30" y1="100" x2="${width}" y2="100" />
                <line x1="30" y1="120" x2="${width}" y2="120" />
                <line x1="30" y1="140" x2="${width}" y2="140" />
            </g>
        `;
    }

    // =====================================================
    // NIVEL 1: EJERCICIO DEL PENTAGRAMA
    // =====================================================
    function initNivel1() {
        const preguntaEl = document.getElementById('n1-pregunta');
        const opcionesEl = document.getElementById('n1-opciones');
        const feedbackEl = document.getElementById('n1-feedback');
        const accionesEl = document.getElementById('n1-acciones');
        const siguienteBtn = document.getElementById('n1-siguiente');
        const aciertosEl = document.getElementById('n1-aciertos');
        const rachaEl = document.getElementById('n1-racha');

        if (!preguntaEl || !opcionesEl) return;

        let aciertos = 0;
        let racha = 0;
        let currentCorrect = null;

        const preguntas = [
            {
                texto: '¿Cuántas líneas tiene el pentagrama?',
                correcta: '5 líneas',
                opciones: ['3 líneas', '4 líneas', '5 líneas', '6 líneas'],
                explicacion: 'El pentagrama tiene exactamente 5 líneas horizontales.'
            },
            {
                texto: '¿Cuántos espacios hay entre las líneas del pentagrama?',
                correcta: '4 espacios',
                opciones: ['3 espacios', '4 espacios', '5 espacios', '6 espacios'],
                explicacion: 'Entre 5 líneas hay 4 espacios.'
            },
            {
                texto: '¿Cómo se cuentan las líneas del pentagrama?',
                correcta: 'De abajo hacia arriba',
                opciones: ['De arriba hacia abajo', 'De abajo hacia arriba', 'De izquierda a derecha', 'No importa el orden'],
                explicacion: 'Siempre se cuentan de abajo (1ª línea) hacia arriba (5ª línea).'
            },
            {
                texto: '¿En qué línea vive la nota Sol en la clave de sol?',
                correcta: '2ª línea',
                opciones: ['1ª línea', '2ª línea', '3ª línea', '4ª línea'],
                explicacion: 'La clave de sol "abraza" la 2ª línea, y esa línea es la nota Sol.'
            },
            {
                texto: '¿Qué nota está en la 3ª línea del pentagrama?',
                correcta: 'Si',
                opciones: ['Sol', 'La', 'Si', 'Do'],
                explicacion: 'Línea 1: Mi, línea 2: Sol, línea 3: Si. (Saltando de línea en línea: Mi-Sol-Si-Re-Fa)'
            },
            {
                texto: '¿Qué nota está en el 2º espacio del pentagrama?',
                correcta: 'La',
                opciones: ['Fa', 'La', 'Do', 'Mi'],
                explicacion: 'Espacio 1: Fa, espacio 2: La. (Saltando de espacio en espacio: Fa-La-Do-Mi)'
            },
            {
                texto: '¿Qué nota está en la 1ª línea del pentagrama?',
                correcta: 'Mi',
                opciones: ['Do', 'Mi', 'Sol', 'Si'],
                explicacion: 'La línea más baja del pentagrama es Mi (Mi grave).'
            },
            {
                texto: '¿Qué nota está en la 4ª línea del pentagrama?',
                correcta: 'Re',
                opciones: ['Do', 'Re', 'Mi', 'Fa'],
                explicacion: 'Línea 1: Mi, línea 2: Sol, línea 3: Si, línea 4: Re, línea 5: Fa.'
            }
        ];

        function nuevaPregunta() {
            const p = preguntas[Math.floor(Math.random() * preguntas.length)];
            currentCorrect = p.correcta;

            preguntaEl.innerHTML = `❓ ${p.texto}`;
            feedbackEl.innerHTML = '';
            accionesEl.style.display = 'none';

            // Mezclar opciones
            const mezcladas = [...p.opciones].sort(() => Math.random() - 0.5);

            opcionesEl.innerHTML = '';
            mezcladas.forEach(op => {
                const btn = document.createElement('button');
                btn.className = 'lectura-opcion';
                btn.textContent = op;
                btn.addEventListener('click', () => comprobar(op, btn, p));
                opcionesEl.appendChild(btn);
            });
        }

        function comprobar(op, btn, p) {
            // Deshabilitar todas las opciones
            opcionesEl.querySelectorAll('button').forEach(b => b.disabled = true);

            if (op === currentCorrect) {
                btn.classList.add('correcta');
                aciertos++;
                racha++;
                feedbackEl.innerHTML = `<div class="lectura-feedback correcta">✅ ¡Correcto! <strong>${p.explicacion}</strong></div>`;
            } else {
                btn.classList.add('incorrecta');
                racha = 0;
                // Marcar la correcta
                opcionesEl.querySelectorAll('button').forEach(b => {
                    if (b.textContent === currentCorrect) b.classList.add('correcta');
                });
                feedbackEl.innerHTML = `<div class="lectura-feedback incorrecta">❌ Casi. La respuesta correcta es <strong>${currentCorrect}</strong>. ${p.explicacion}</div>`;
            }

            aciertosEl.textContent = aciertos;
            rachaEl.textContent = racha;
            accionesEl.style.display = 'flex';
        }

        if (siguienteBtn) {
            siguienteBtn.addEventListener('click', nuevaPregunta);
        }

        nuevaPregunta();
    }

    // =====================================================
    // NIVEL 2: EJERCICIO DE FIGURAS RÍTMICAS
    // =====================================================
    function initNivel2() {
        const preguntaEl = document.getElementById('n2-pregunta');
        const opcionesEl = document.getElementById('n2-opciones');
        const feedbackEl = document.getElementById('n2-feedback');
        const accionesEl = document.getElementById('n2-acciones');
        const siguienteBtn = document.getElementById('n2-siguiente');
        const aciertosEl = document.getElementById('n2-aciertos');
        const rachaEl = document.getElementById('n2-racha');

        if (!preguntaEl || !opcionesEl) return;

        let aciertos = 0;
        let racha = 0;
        let currentCorrect = null;

        const preguntas = [
            {
                texto: '¿Cuántos tiempos dura una redonda en un compás de 4/4?',
                correcta: '4 tiempos',
                opciones: ['1 tiempo', '2 tiempos', '3 tiempos', '4 tiempos'],
                explicacion: 'La redonda es la figura de mayor duración: 4 tiempos completos.'
            },
            {
                texto: '¿Cuántos tiempos dura una blanca?',
                correcta: '2 tiempos',
                opciones: ['1 tiempo', '2 tiempos', '3 tiempos', '4 tiempos'],
                explicacion: 'La blanca dura la mitad que la redonda: 2 tiempos.'
            },
            {
                texto: '¿Cuántos tiempos dura una negra?',
                correcta: '1 tiempo',
                opciones: ['½ tiempo', '1 tiempo', '2 tiempos', '4 tiempos'],
                explicacion: 'La negra es la unidad básica del compás: 1 tiempo.'
            },
            {
                texto: '¿Cuántos tiempos dura una corchea?',
                correcta: '½ tiempo',
                opciones: ['¼ tiempo', '½ tiempo', '1 tiempo', '2 tiempos'],
                explicacion: 'La corchea dura la mitad que una negra: ½ tiempo.'
            },
            {
                texto: '¿Cuántas negras caben en una redonda?',
                correcta: '4 negras',
                opciones: ['2 negras', '3 negras', '4 negras', '8 negras'],
                explicacion: 'Como la redonda dura 4 tiempos y cada negra dura 1, caben 4 negras.'
            },
            {
                texto: '¿Cuántas blancas caben en una redonda?',
                correcta: '2 blancas',
                opciones: ['1 blanca', '2 blancas', '3 blancas', '4 blancas'],
                explicacion: 'La redonda dura 4 tiempos y cada blanca 2. Por eso caben 2 blancas.'
            },
            {
                texto: '¿Cuántas corcheas caben en una negra?',
                correcta: '2 corcheas',
                opciones: ['1 corchea', '2 corcheas', '3 corcheas', '4 corcheas'],
                explicacion: 'La corchea dura la mitad que la negra, así que en 1 negra caben 2 corcheas.'
            },
            {
                texto: '¿Cuántos tiempos dura una blanca con puntillo?',
                correcta: '3 tiempos',
                opciones: ['2 tiempos', '2½ tiempos', '3 tiempos', '4 tiempos'],
                explicacion: 'El puntillo añade la mitad del valor: 2 + 1 = 3 tiempos.'
            },
            {
                texto: '¿Cuántos tiempos dura una negra con puntillo?',
                correcta: '1½ tiempos',
                opciones: ['1 tiempo', '1½ tiempos', '2 tiempos', '3 tiempos'],
                explicacion: 'El puntillo añade la mitad del valor: 1 + 0.5 = 1½ tiempos.'
            },
            {
                texto: '¿Qué figura dura la mitad que una negra?',
                correcta: 'La corchea',
                opciones: ['La redonda', 'La blanca', 'La corchea', 'La semicorchea'],
                explicacion: 'Cada figura nueva dura la mitad que la anterior. Después de la negra viene la corchea.'
            }
        ];

        function nuevaPregunta() {
            const p = preguntas[Math.floor(Math.random() * preguntas.length)];
            currentCorrect = p.correcta;

            preguntaEl.innerHTML = `❓ ${p.texto}`;
            feedbackEl.innerHTML = '';
            accionesEl.style.display = 'none';

            const mezcladas = [...p.opciones].sort(() => Math.random() - 0.5);

            opcionesEl.innerHTML = '';
            mezcladas.forEach(op => {
                const btn = document.createElement('button');
                btn.className = 'lectura-opcion';
                btn.textContent = op;
                btn.addEventListener('click', () => comprobar(op, btn, p));
                opcionesEl.appendChild(btn);
            });
        }

        function comprobar(op, btn, p) {
            opcionesEl.querySelectorAll('button').forEach(b => b.disabled = true);

            if (op === currentCorrect) {
                btn.classList.add('correcta');
                aciertos++;
                racha++;
                feedbackEl.innerHTML = `<div class="lectura-feedback correcta">✅ ¡Correcto! <strong>${p.explicacion}</strong></div>`;
            } else {
                btn.classList.add('incorrecta');
                racha = 0;
                opcionesEl.querySelectorAll('button').forEach(b => {
                    if (b.textContent === currentCorrect) b.classList.add('correcta');
                });
                feedbackEl.innerHTML = `<div class="lectura-feedback incorrecta">❌ Casi. La respuesta correcta es <strong>${currentCorrect}</strong>. ${p.explicacion}</div>`;
            }

            aciertosEl.textContent = aciertos;
            rachaEl.textContent = racha;
            accionesEl.style.display = 'flex';
        }

        if (siguienteBtn) {
            siguienteBtn.addEventListener('click', nuevaPregunta);
        }

        nuevaPregunta();
    }

    // =====================================================
    // NIVEL 3: EJERCICIO DE NOTAS EN EL MÁSTIL
    // =====================================================
    function initNivel3() {
        const preguntaEl = document.getElementById('n3-pregunta');
        const opcionesEl = document.getElementById('n3-opciones');
        const feedbackEl = document.getElementById('n3-feedback');
        const accionesEl = document.getElementById('n3-acciones');
        const siguienteBtn = document.getElementById('n3-siguiente');
        const aciertosEl = document.getElementById('n3-aciertos');
        const rachaEl = document.getElementById('n3-racha');

        if (!preguntaEl || !opcionesEl) return;

        let aciertos = 0;
        let racha = 0;
        let currentCorrect = null;

        const preguntas = [
            {
                texto: '¿Qué nota suena en la 6ª cuerda al aire (sin pisar)?',
                correcta: 'Mi',
                opciones: ['Mi', 'La', 'Re', 'Sol'],
                explicacion: 'La 6ª cuerda al aire es Mi grave (E2).'
            },
            {
                texto: '¿Qué nota suena en la 5ª cuerda al aire?',
                correcta: 'La',
                opciones: ['Mi', 'La', 'Re', 'Si'],
                explicacion: 'La 5ª cuerda al aire es La (A2).'
            },
            {
                texto: '¿Qué nota suena en la 4ª cuerda al aire?',
                correcta: 'Re',
                opciones: ['Mi', 'La', 'Re', 'Sol'],
                explicacion: 'La 4ª cuerda al aire es Re (D3).'
            },
            {
                texto: '¿Qué nota suena en la 3ª cuerda al aire?',
                correcta: 'Sol',
                opciones: ['Re', 'Sol', 'Si', 'Mi'],
                explicacion: 'La 3ª cuerda al aire es Sol (G3).'
            },
            {
                texto: '¿Qué nota suena en la 2ª cuerda al aire?',
                correcta: 'Si',
                opciones: ['Sol', 'Si', 'Re', 'Mi'],
                explicacion: 'La 2ª cuerda al aire es Si (B3).'
            },
            {
                texto: '¿Qué nota suena en la 1ª cuerda al aire?',
                correcta: 'Mi',
                opciones: ['Si', 'Re', 'Mi', 'Sol'],
                explicacion: 'La 1ª cuerda al aire es Mi agudo (E4).'
            },
            {
                texto: 'Si piso la 6ª cuerda en el traste 1, ¿qué nota suena?',
                correcta: 'Fa',
                opciones: ['Mi', 'Fa', 'Sol', 'La'],
                explicacion: 'Mi + 1 semitono = Fa. (La 6ª al aire es Mi, un traste sube un semitono).'
            },
            {
                texto: 'Si piso la 6ª cuerda en el traste 3, ¿qué nota suena?',
                correcta: 'Sol',
                opciones: ['Fa', 'Sol', 'La', 'Si'],
                explicacion: 'Mi + 3 semitonos = Sol.'
            },
            {
                texto: 'Si piso la 5ª cuerda en el traste 2, ¿qué nota suena?',
                correcta: 'Si',
                opciones: ['La', 'Si', 'Do', 'Re'],
                explicacion: 'La + 2 semitonos = Si.'
            },
            {
                texto: 'Si piso la 5ª cuerda en el traste 3, ¿qué nota suena?',
                correcta: 'Do',
                opciones: ['La', 'Si', 'Do', 'Re'],
                explicacion: 'La + 3 semitonos = Do.'
            },
            {
                texto: '¿Cuántos semitonos hay entre Mi y Fa?',
                correcta: '1 semitono',
                opciones: ['1 semitono', '2 semitonos', '3 semitonos', '4 semitonos'],
                explicacion: 'Entre Mi y Fa hay 1 semitono (1 traste). Por eso no existe Mi#.'
            },
            {
                texto: '¿Cuántos semitonos hay entre Si y Do?',
                correcta: '1 semitono',
                opciones: ['1 semitono', '2 semitonos', '3 semitonos', '4 semitonos'],
                explicacion: 'Entre Si y Do hay 1 semitono. Por eso no existe Si#.'
            },
            {
                texto: '¿Cuántos semitonos hay entre Do y Re?',
                correcta: '2 semitonos',
                opciones: ['1 semitono', '2 semitonos', '3 semitonos', '4 semitonos'],
                explicacion: 'Entre Do y Re hay 2 semitonos (Do → Do# → Re).'
            }
        ];

        function nuevaPregunta() {
            const p = preguntas[Math.floor(Math.random() * preguntas.length)];
            currentCorrect = p.correcta;

            preguntaEl.innerHTML = `❓ ${p.texto}`;
            feedbackEl.innerHTML = '';
            accionesEl.style.display = 'none';

            const mezcladas = [...p.opciones].sort(() => Math.random() - 0.5);

            opcionesEl.innerHTML = '';
            mezcladas.forEach(op => {
                const btn = document.createElement('button');
                btn.className = 'lectura-opcion';
                btn.textContent = op;
                btn.addEventListener('click', () => comprobar(op, btn, p));
                opcionesEl.appendChild(btn);
            });
        }

        function comprobar(op, btn, p) {
            opcionesEl.querySelectorAll('button').forEach(b => b.disabled = true);

            if (op === currentCorrect) {
                btn.classList.add('correcta');
                aciertos++;
                racha++;
                feedbackEl.innerHTML = `<div class="lectura-feedback correcta">✅ ¡Correcto! <strong>${p.explicacion}</strong></div>`;
            } else {
                btn.classList.add('incorrecta');
                racha = 0;
                opcionesEl.querySelectorAll('button').forEach(b => {
                    if (b.textContent === currentCorrect) b.classList.add('correcta');
                });
                feedbackEl.innerHTML = `<div class="lectura-feedback incorrecta">❌ Casi. La respuesta correcta es <strong>${currentCorrect}</strong>. ${p.explicacion}</div>`;
            }

            aciertosEl.textContent = aciertos;
            rachaEl.textContent = racha;
            accionesEl.style.display = 'flex';
        }

        if (siguienteBtn) {
            siguienteBtn.addEventListener('click', nuevaPregunta);
        }

        nuevaPregunta();
    }

    // =====================================================
    // NIVEL 4: LECTURA PRÁCTICA
    // =====================================================
    function initNivel4() {
        initModo1();
        initModo2();
    }

    // ---------- MODO 1: Toca la nota en el mástil ----------
    function initModo1() {
        const pentagramaWrap = document.getElementById('n4-pentagrama-wrap');
        const mastilWrap = document.getElementById('n4-mastil-wrap');
        const preguntaEl = document.getElementById('n4-pregunta');
        const feedbackEl = document.getElementById('n4-feedback');
        const siguienteBtn = document.getElementById('n4-siguiente');
        const reiniciarBtn = document.getElementById('n4-reiniciar');
        const aciertosEl = document.getElementById('n4-aciertos');
        const fallosEl = document.getElementById('n4-fallos');
        const rachaEl = document.getElementById('n4-racha');

        if (!pentagramaWrap || !mastilWrap) return;

        let aciertos = 0;
        let fallos = 0;
        let racha = 0;
        let currentNote = null;

        // Notas válidas para el ejercicio (pentagrama completo)
        // Solo usamos notas que estén en cuerdas al aire o primeros trastes
        const notasEjercicio = [
            { nota: 'E', nombre_es: 'Mi', y: 180, trastes: [{ cuerda: 0, traste: 0 }, { cuerda: 5, traste: 0 }] }, // 6ª al aire, 1ª al aire
            { nota: 'F', nombre_es: 'Fa', y: 170, trastes: [{ cuerda: 0, traste: 1 }] }, // 6ª traste 1
            { nota: 'G', nombre_es: 'Sol', y: 160, trastes: [{ cuerda: 5, traste: 3 }, { cuerda: 0, traste: 3 }] }, // 1ª traste 3, 6ª traste 3
            { nota: 'A', nombre_es: 'La', y: 150, trastes: [{ cuerda: 1, traste: 0 }, { cuerda: 0, traste: 5 }] }, // 5ª al aire, 6ª traste 5
            { nota: 'B', nombre_es: 'Si', y: 140, trastes: [{ cuerda: 4, traste: 0 }, { cuerda: 1, traste: 2 }] }, // 2ª al aire, 5ª traste 2
            { nota: 'C', nombre_es: 'Do', y: 130, trastes: [{ cuerda: 1, traste: 3 }, { cuerda: 4, traste: 1 }] }, // 5ª traste 3, 2ª traste 1
            { nota: 'D', nombre_es: 'Re', y: 120, trastes: [{ cuerda: 2, traste: 0 }, { cuerda: 1, traste: 5 }] }, // 4ª al aire, 5ª traste 5
            { nota: 'E', nombre_es: 'Mi', y: 110, trastes: [{ cuerda: 2, traste: 2 }, { cuerda: 5, traste: 0 }] } // 4ª traste 2, 1ª al aire
        ];

        function dibujarPentagrama(nota) {
            const svg = `
                <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="400" height="200" fill="#f5f0e6" rx="8"/>
                    ${drawLineasPentagrama(380)}
                    ${drawClaveSol()}
                    ${drawNoteInPentagrama(200, nota.y, { color: '#ff6b00' })}
                </svg>
            `;
            pentagramaWrap.innerHTML = svg;
        }

        function dibujarMastil() {
            // Mástil simplificado de 6 cuerdas, 6 trastes
            const marginLeft = 40;
            const marginTop = 30;
            const stringSpacing = 22;
            const fretSpacing = 50;
            const numFrets = 6;

            let svg = `<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">`;
            svg += `<rect x="0" y="0" width="420" height="220" fill="#2a1f1a" rx="8"/>`;

            // Cuerdas horizontales
            for (let s = 0; s < 6; s++) {
                const y = marginTop + s * stringSpacing;
                const thickness = 4 - (s * 0.4);
                svg += `<line x1="${marginLeft - 5}" y1="${y}" x2="${marginLeft + numFrets * fretSpacing}" y2="${y}" stroke="#ccc" stroke-width="${thickness}"/>`;
                svg += `<text x="${marginLeft - 12}" y="${y + 4}" font-family="Arial" font-size="11" font-weight="bold" fill="#ff6b00" text-anchor="end">${OPEN_STRINGS_ES[s]}</text>`;
            }

            // Trastes verticales
            for (let f = 0; f <= numFrets; f++) {
                const x = marginLeft + f * fretSpacing;
                const width = f === 0 ? 3 : 1.5;
                svg += `<line x1="${x}" y1="${marginTop - 5}" x2="${x}" y2="${marginTop + 5 * stringSpacing + 5}" stroke="#777" stroke-width="${width}"/>`;
            }

            // Números de trastes
            for (let f = 1; f <= numFrets; f++) {
                const x = marginLeft + (f - 0.5) * fretSpacing;
                svg += `<text x="${x}" y="${marginTop - 12}" font-family="Arial" font-size="10" fill="#888" text-anchor="middle">${f}</text>`;
            }

            // Zonas clickeables
            for (let s = 0; s < 6; s++) {
                for (let f = 0; f <= numFrets; f++) {
                    let x, w;
                    if (f === 0) {
                        // Cuerda al aire: zona a la izquierda del traste 0
                        x = marginLeft - 30;
                        w = 30;
                    } else {
                        x = marginLeft + (f - 0.5) * fretSpacing - fretSpacing / 2;
                        w = fretSpacing;
                    }
                    const y = marginTop + s * stringSpacing - stringSpacing / 2;
                    const h = stringSpacing;
                    svg += `<rect class="traste-clickeable" data-cuerda="${s}" data-traste="${f}" x="${x}" y="${y}" width="${w}" height="${h}" fill="transparent" stroke="none"/>`;
                }
            }

            svg += `</svg>`;
            mastilWrap.innerHTML = svg;

            // Eventos
            mastilWrap.querySelectorAll('.traste-clickeable').forEach(rect => {
                rect.addEventListener('click', (e) => {
                    const cuerda = parseInt(rect.dataset.cuerda);
                    const traste = parseInt(rect.dataset.traste);
                    comprobarPosicion(cuerda, traste, rect);
                });
            });
        }

        function nuevaPregunta() {
            const nota = notasEjercicio[Math.floor(Math.random() * notasEjercicio.length)];
            currentNote = nota;

            preguntaEl.innerHTML = `🎼 ¿En qué posición del mástil tocarías la nota <strong>${nota.nombre_es}</strong>?`;
            feedbackEl.innerHTML = '';
            siguienteBtn.style.display = 'none';

            dibujarPentagrama(nota);
            dibujarMastil();
        }

        function comprobarPosicion(cuerda, traste, rect) {
            if (!currentNote) return;

            // Comprobar si la posición es una de las válidas
            const esCorrecta = currentNote.trastes.some(t => t.cuerda === cuerda && t.traste === traste);

            // Deshabilitar todas las zonas
            mastilWrap.querySelectorAll('.traste-clickeable').forEach(r => {
                r.style.pointerEvents = 'none';
            });

            if (esCorrecta) {
                rect.classList.add('correcto');
                aciertos++;
                racha++;
                feedbackEl.innerHTML = `<div class="lectura-feedback correcta">✅ ¡Correcto! <strong>${currentNote.nombre_es}</strong> se toca ahí.</div>`;
                // Reproducir la nota
                playNote(currentNote.nota);
            } else {
                rect.classList.add('incorrecto');
                fallos++;
                racha = 0;
                // Marcar una posición correcta
                const primeraCorrecta = currentNote.trastes[0];
                mastilWrap.querySelectorAll('.traste-clickeable').forEach(r => {
                    if (parseInt(r.dataset.cuerda) === primeraCorrecta.cuerda && parseInt(r.dataset.traste) === primeraCorrecta.traste) {
                        r.classList.add('correcto');
                    }
                });
                feedbackEl.innerHTML = `<div class="lectura-feedback incorrecta">❌ Casi. <strong>${currentNote.nombre_es}</strong> se toca en otra posición (marcada en verde).</div>`;
            }

            aciertosEl.textContent = aciertos;
            fallosEl.textContent = fallos;
            rachaEl.textContent = racha;
            siguienteBtn.style.display = 'inline-flex';
        }

        if (siguienteBtn) siguienteBtn.addEventListener('click', nuevaPregunta);

        if (reiniciarBtn) {
            reiniciarBtn.addEventListener('click', () => {
                aciertos = 0;
                fallos = 0;
                racha = 0;
                aciertosEl.textContent = 0;
                fallosEl.textContent = 0;
                rachaEl.textContent = 0;
                nuevaPregunta();
            });
        }

        nuevaPregunta();
    }

    // ---------- MODO 2: Lee el compás completo ----------
    function initModo2() {
        const compasWrap = document.getElementById('n4-compas-wrap');
        const compasPregunta = document.getElementById('n4-compas-pregunta');
        const compasOpciones = document.getElementById('n4-compas-opciones');
        const compasFeedback = document.getElementById('n4-compas-feedback');
        const compasAcciones = document.getElementById('n4-compas-acciones');
        const compasSiguiente = document.getElementById('n4-compas-siguiente');
        const compasesEl = document.getElementById('n4-compases');

        if (!compasWrap || !compasOpciones) return;

        let compasesLeidos = 0;

        // Compases predefinidos (cada uno es un compás de 4/4)
        const compases = [
            {
                notas: [
                    { nota: 'E', nombre_es: 'Mi', y: 180, figura: 'redonda' }
                ],
                pregunta: '¿Qué nota aparece en este compás?',
                correcta: 'Mi',
                opciones: ['Do', 'Mi', 'Sol', 'Si'],
                explicacion: 'La nota está en la 1ª línea: Mi.'
            },
            {
                notas: [
                    { nota: 'G', nombre_es: 'Sol', y: 160, figura: 'blanca' },
                    { nota: 'A', nombre_es: 'La', y: 150, figura: 'blanca' }
                ],
                pregunta: '¿Cuántos tiempos suman estas dos figuras?',
                correcta: '4 tiempos',
                opciones: ['2 tiempos', '3 tiempos', '4 tiempos', '6 tiempos'],
                explicacion: 'Dos blancas de 2 tiempos cada una = 4 tiempos.'
            },
            {
                notas: [
                    { nota: 'B', nombre_es: 'Si', y: 140, figura: 'negra' },
                    { nota: 'C', nombre_es: 'Do', y: 130, figura: 'negra' },
                    { nota: 'D', nombre_es: 'Re', y: 120, figura: 'negra' },
                    { nota: 'E', nombre_es: 'Mi', y: 110, figura: 'negra' }
                ],
                pregunta: '¿Cuántas notas hay en este compás?',
                correcta: '4 notas',
                opciones: ['2 notas', '3 notas', '4 notas', '5 notas'],
                explicacion: 'Hay 4 negras, cada una ocupa 1 tiempo.'
            },
            {
                notas: [
                    { nota: 'F', nombre_es: 'Fa', y: 170, figura: 'negra' },
                    { nota: 'A', nombre_es: 'La', y: 150, figura: 'negra' },
                    { nota: 'C', nombre_es: 'Do', y: 130, figura: 'negra' },
                    { nota: 'E', nombre_es: 'Mi', y: 110, figura: 'negra' }
                ],
                pregunta: '¿Qué nota está MÁS AGUDA en este compás?',
                correcta: 'Mi',
                opciones: ['Fa', 'La', 'Do', 'Mi'],
                explicacion: 'La nota Mi está en el 4º espacio, la más alta del compás.'
            },
            {
                notas: [
                    { nota: 'E', nombre_es: 'Mi', y: 180, figura: 'negra' },
                    { nota: 'G', nombre_es: 'Sol', y: 160, figura: 'negra' },
                    { nota: 'B', nombre_es: 'Si', y: 140, figura: 'negra' },
                    { nota: 'D', nombre_es: 'Re', y: 120, figura: 'negra' }
                ],
                pregunta: '¿Qué notas forman este arpegio?',
                correcta: 'Mi - Sol - Si - Re',
                opciones: [
                    'Do - Mi - Sol - Si',
                    'Mi - Sol - Si - Re',
                    'Fa - La - Do - Mi',
                    'Re - Fa - La - Do'
                ],
                explicacion: 'Las notas son Mi (línea 1), Sol (línea 2), Si (línea 3) y Re (línea 4).'
            }
        ];

        // Dibuja una figura rítmica en una posición X
        function drawFigura(x, y, tipo) {
            const stemY = y - 30;
            if (tipo === 'redonda') {
                return `<ellipse cx="${x}" cy="${y}" rx="10" ry="8" fill="none" stroke="#000" stroke-width="2.5" transform="rotate(-20 ${x} ${y})"/>`;
            } else if (tipo === 'blanca') {
                return `
                    <ellipse cx="${x}" cy="${y}" rx="10" ry="8" fill="none" stroke="#000" stroke-width="2.5" transform="rotate(-20 ${x} ${y})"/>
                    <line x1="${x + 10}" y1="${y}" x2="${x + 10}" y2="${stemY}" stroke="#000" stroke-width="2.5"/>
                `;
            } else if (tipo === 'negra') {
                return `
                    <ellipse cx="${x}" cy="${y}" rx="10" ry="8" fill="#000" transform="rotate(-20 ${x} ${y})"/>
                    <line x1="${x + 10}" y1="${y}" x2="${x + 10}" y2="${stemY}" stroke="#000" stroke-width="2.5"/>
                `;
            } else if (tipo === 'corchea') {
                return `
                    <ellipse cx="${x}" cy="${y}" rx="10" ry="8" fill="#000" transform="rotate(-20 ${x} ${y})"/>
                    <line x1="${x + 10}" y1="${y}" x2="${x + 10}" y2="${stemY}" stroke="#000" stroke-width="2.5"/>
                    <path d="M ${x + 10} ${stemY} Q ${x + 22} ${stemY + 8}, ${x + 20} ${stemY + 20}" fill="none" stroke="#000" stroke-width="2.5"/>
                `;
            }
            return '';
        }

        function dibujarCompas(compas) {
            const spacing = 80;
            const startX = 180;
            const numNotas = compas.notas.length;

            let svg = `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">`;
            svg += `<rect x="0" y="0" width="500" height="220" fill="#f5f0e6" rx="8"/>`;
            svg += drawLineasPentagrama(480);
            svg += drawClaveSol();

            // Barras del compás
            svg += `<line x1="${startX - 20}" y1="60" x2="${startX - 20}" y2="140" stroke="#333" stroke-width="2"/>`;
            svg += `<line x1="${startX + numNotas * spacing}" y1="60" x2="${startX + numNotas * spacing}" y2="140" stroke="#333" stroke-width="2"/>`;

            // Dibujar cada nota
            compas.notas.forEach((n, i) => {
                const x = startX + i * spacing;
                svg += `<g>`;
                svg += drawFigura(x, n.y, n.figura);
                svg += `</g>`;
            });

            svg += `</svg>`;
            compasWrap.innerHTML = svg;
        }

        function nuevaPregunta() {
            const compas = compases[Math.floor(Math.random() * compases.length)];

            compasPregunta.innerHTML = `🎼 ${compas.pregunta}`;
            compasFeedback.innerHTML = '';
            compasAcciones.style.display = 'none';

            dibujarCompas(compas);

            // Opciones
            compasOpciones.innerHTML = '';
            const mezcladas = [...compas.opciones].sort(() => Math.random() - 0.5);
            mezcladas.forEach(op => {
                const btn = document.createElement('button');
                btn.className = 'lectura-opcion';
                btn.textContent = op;
                btn.addEventListener('click', () => comprobar(op, btn, compas));
                compasOpciones.appendChild(btn);
            });
        }

        function comprobar(op, btn, compas) {
            compasOpciones.querySelectorAll('button').forEach(b => b.disabled = true);

            if (op === compas.correcta) {
                btn.classList.add('correcta');
                compasesLeidos++;
                compasFeedback.innerHTML = `<div class="lectura-feedback correcta">✅ ¡Correcto! <strong>${compas.explicacion}</strong></div>`;
            } else {
                btn.classList.add('incorrecta');
                compasOpciones.querySelectorAll('button').forEach(b => {
                    if (b.textContent === compas.correcta) b.classList.add('correcta');
                });
                compasFeedback.innerHTML = `<div class="lectura-feedback incorrecta">❌ Casi. La respuesta correcta es <strong>${compas.correcta}</strong>. ${compas.explicacion}</div>`;
            }

            compasesEl.textContent = compasesLeidos;
            compasAcciones.style.display = 'flex';
        }

        if (compasSiguiente) {
            compasSiguiente.addEventListener('click', nuevaPregunta);
        }

        nuevaPregunta();
    }

    // =====================================================
    // INICIALIZACIÓN GENERAL
    // =====================================================
    function init() {
        initNivel1();
        initNivel2();
        initNivel3();
        initNivel4();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exponer para depuración
    window.LecturaMusical = {
        NOTES_ES_MAP,
        playNote
    };
})();