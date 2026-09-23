// =====================================================
// TAVO ACORDES - SCRIPT PRINCIPAL v14.0
// Base de datos expandida (~180 acordes) + inversiones
// =====================================================

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'e'];
const OPEN_NOTES = ['E', 'A', 'D', 'G', 'B', 'E'];

// =====================================================
// CALIDADES DE ACORDES
// =====================================================
const CHORD_QUALITIES = {
    '': { intervals: [0, 4, 7], formula: '1 3 5', name: 'Mayor', scale: 'jónico', explanation: 'Tríada mayor: raíz + 3ª mayor + 5ª justa.' },
    'm': { intervals: [0, 3, 7], formula: '1 b3 5', name: 'Menor', scale: 'eólico', explanation: 'Tríada menor: raíz + 3ª menor + 5ª justa.' },
    'dim': { intervals: [0, 3, 6], formula: '1 b3 b5', name: 'Disminuido', scale: 'locrio', explanation: 'Tríada disminuida: raíz + 3ª menor + 5ª disminuida.' },
    'aug': { intervals: [0, 4, 8], formula: '1 3 #5', name: 'Aumentado', scale: 'jónico', explanation: 'Tríada aumentada: raíz + 3ª mayor + 5ª aumentada.' },
    'sus2': { intervals: [0, 2, 7], formula: '1 2 5', name: 'Suspendido 2', scale: 'jónico', explanation: 'La 3ª se sustituye por la 2ª.' },
    'sus4': { intervals: [0, 5, 7], formula: '1 4 5', name: 'Suspendido 4', scale: 'jónico', explanation: 'La 3ª se sustituye por la 4ª.' },
    '5': { intervals: [0, 7], formula: '1 5', name: 'Quinta (Power)', scale: 'jónico', explanation: 'Solo raíz y quinta, sin 3ª.' },
    '6': { intervals: [0, 4, 7, 9], formula: '1 3 5 6', name: 'Sexta', scale: 'jónico', explanation: 'Tríada mayor + 6ª mayor.' },
    'm6': { intervals: [0, 3, 7, 9], formula: '1 b3 5 6', name: 'Menor Sexta', scale: 'dórico', explanation: 'Tríada menor + 6ª mayor.' },
    '7': { intervals: [0, 4, 7, 10], formula: '1 3 5 b7', name: 'Dominante (7)', scale: 'mixolidio', explanation: 'Tríada mayor + 7ª menor.' },
    'maj7': { intervals: [0, 4, 7, 11], formula: '1 3 5 7', name: 'Mayor 7', scale: 'jónico', explanation: 'Tríada mayor + 7ª mayor.' },
    'm7': { intervals: [0, 3, 7, 10], formula: '1 b3 5 b7', name: 'Menor 7', scale: 'dórico', explanation: 'Tríada menor + 7ª menor.' },
    'm7b5': { intervals: [0, 3, 6, 10], formula: '1 b3 b5 b7', name: 'Semidisminuido', scale: 'locrio', explanation: 'Tríada disminuida + 7ª menor.' },
    'dim7': { intervals: [0, 3, 6, 9], formula: '1 b3 b5 bb7', name: 'Disminuido 7', scale: 'locrio', explanation: 'Tríada disminuida + 7ª disminuida.' },
    'mMaj7': { intervals: [0, 3, 7, 11], formula: '1 b3 5 7', name: 'Menor Mayor 7', scale: 'eólico', explanation: 'Tríada menor + 7ª mayor.' },
    'aug7': { intervals: [0, 4, 8, 10], formula: '1 3 #5 b7', name: 'Aumentado 7', scale: 'jónico', explanation: 'Tríada aumentada + 7ª menor.' },
    'add9': { intervals: [0, 2, 4, 7], formula: '1 2 3 5', name: 'Add 9', scale: 'jónico', explanation: 'Tríada mayor + 9ª sin 7ª.' },
    'madd9': { intervals: [0, 2, 3, 7], formula: '1 2 b3 5', name: 'Menor Add 9', scale: 'eólico', explanation: 'Tríada menor + 9ª sin 7ª.' },
    '9': { intervals: [0, 2, 4, 7, 10], formula: '1 2 3 5 b7', name: 'Dominante 9', scale: 'mixolidio', explanation: 'Dominante + 9ª.' },
    'maj9': { intervals: [0, 2, 4, 7, 11], formula: '1 2 3 5 7', name: 'Mayor 9', scale: 'jónico', explanation: 'maj7 + 9ª.' },
    'm9': { intervals: [0, 2, 3, 7, 10], formula: '1 2 b3 5 b7', name: 'Menor 9', scale: 'dórico', explanation: 'm7 + 9ª.' },
    '7b9': { intervals: [0, 1, 4, 7, 10], formula: '1 b2 3 5 b7', name: 'Dominante 7 b9', scale: 'frigio', explanation: 'Dominante con 9ª menor.' },
    '7#9': { intervals: [0, 3, 4, 7, 10], formula: '1 #2 3 5 b7', name: 'Dominante 7 #9', scale: 'frigio', explanation: 'Dominante con 9ª aumentada.' },
    '13': { intervals: [0, 2, 4, 7, 9, 10], formula: '1 2 3 5 6 b7', name: 'Dominante 13', scale: 'mixolidio', explanation: 'Dominante + 13ª.' },
    '7b5': { intervals: [0, 4, 6, 10], formula: '1 3 b5 b7', name: 'Dominante 7 b5', scale: 'locrio', explanation: 'Dominante con 5ª disminuida.' },
    '7#5': { intervals: [0, 4, 8, 10], formula: '1 3 #5 b7', name: 'Dominante 7 #5', scale: 'jónico', explanation: 'Dominante con 5ª aumentada.' },
    '7sus4': { intervals: [0, 5, 7, 10], formula: '1 4 5 b7', name: 'Dominante 7 Sus4', scale: 'mixolidio', explanation: 'Dominante con 4ª en lugar de 3ª.' },
};

// =====================================================
// ESCALAS DISPONIBLES
// =====================================================
const SCALES_DB = {
    'jónico': { name: 'Jónica (Mayor)', intervals: [0, 2, 4, 5, 7, 9, 11], uso: 'Mayor natural. Pop, rock, clásico.' },
    'dórico': { name: 'Dórica', intervals: [0, 2, 3, 5, 7, 9, 10], uso: 'Menor con 6ª mayor. Jazz, funk, rock.' },
    'frigio': { name: 'Frigia', intervals: [0, 1, 3, 5, 7, 8, 10], uso: 'Sonido español/flamenco. Metal.' },
    'lidio': { name: 'Lidia', intervals: [0, 2, 4, 6, 7, 9, 11], uso: 'Mayor con #4. Bandas sonoras, etéreo.' },
    'mixolidio': { name: 'Mixolidia', intervals: [0, 2, 4, 5, 7, 9, 10], uso: 'Mayor con b7. Rock, blues, funk.' },
    'eólico': { name: 'Eólica (Menor Natural)', intervals: [0, 2, 3, 5, 7, 8, 10], uso: 'Menor natural. Baladas, rock.' },
    'locrio': { name: 'Locria', intervals: [0, 1, 3, 5, 6, 8, 10], uso: 'Disminuido. Jazz, metal extremo.' },
    'pent_mayor': { name: 'Pentatónica Mayor', intervals: [0, 2, 4, 7, 9], uso: 'Muy usada en rock, country y pop.' },
    'pent_menor': { name: 'Pentatónica Menor', intervals: [0, 3, 5, 7, 10], uso: 'Rock, blues, metal. Solos.' },
    'blues': { name: 'Blues', intervals: [0, 3, 5, 6, 7, 10], uso: 'Pentatónica menor + blue note (b5).' },
    'menor_armonica': { name: 'Menor Armónica', intervals: [0, 2, 3, 5, 7, 8, 11], uso: 'Clásico/oriental. Metal neoclásico.' },
    'menor_melodica': { name: 'Menor Melódica', intervals: [0, 2, 3, 5, 7, 9, 11], uso: 'Jazz, música clásica.' },
};

const INTERVAL_NAMES = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];

const INTERVAL_ROLES = {
    0: 'Raíz (1)', 1: '2ª menor (b9)', 2: '2ª mayor (9)', 3: '3ª menor (b3)',
    4: '3ª mayor (3)', 5: '4ª justa (11)', 6: '5ª disminuida (b5)', 7: '5ª justa (5)',
    8: '5ª aumentada (#5)', 9: '6ª mayor (13)', 10: '7ª menor (b7)', 11: '7ª mayor (7)'
};

const MODE_INTERVALS = {
    'jónico': [0, 2, 4, 5, 7, 9, 11], 'dórico': [0, 2, 3, 5, 7, 9, 10],
    'frigio': [0, 1, 3, 5, 7, 8, 10], 'lidio': [0, 2, 4, 6, 7, 9, 11],
    'mixolidio': [0, 2, 4, 5, 7, 9, 10], 'eólico': [0, 2, 3, 5, 7, 8, 10],
    'locrio': [0, 1, 3, 5, 6, 8, 10]
};

const MODE_INFO = {
    'jónico': { formula: '1 2 3 4 5 6 7', uso: 'Mayor natural.' },
    'dórico': { formula: '1 2 b3 4 5 6 b7', uso: 'Menor con 6ª mayor. Jazz, funk.' },
    'frigio': { formula: '1 b2 b3 4 5 b6 b7', uso: 'Sonido español/flamenco.' },
    'lidio': { formula: '1 2 3 #4 5 6 7', uso: 'Mayor con #4. Etéreo.' },
    'mixolidio': { formula: '1 2 3 4 5 6 b7', uso: 'Mayor con b7. Rock, blues.' },
    'eólico': { formula: '1 2 b3 4 5 b6 b7', uso: 'Menor natural.' },
    'locrio': { formula: '1 b2 b3 4 b5 b6 b7', uso: 'Disminuido.' }
};

// =====================================================
// LECCIONES
// =====================================================
const LESSONS_DB = [
    { id: 'intervalos', icon: '🎵', title: 'Los intervalos', subtitle: 'Las distancias entre notas', content: '<p>Un <strong>intervalo</strong> es la distancia entre dos notas. Se mide en semitonos (1 traste = 1 semitono).</p><ul><li><strong>3ª mayor:</strong> Do → Mi. Alegre.</li><li><strong>3ª menor:</strong> Do → Mib. Melancólico.</li><li><strong>5ª justa:</strong> Do → Sol. Muy consonante.</li><li><strong>Octava:</strong> Do → Do agudo. Misma nota.</li></ul><p><strong>Clave:</strong> la 3ª define si un acorde es mayor o menor.</p>', exampleNotes: ['C', 'E', 'G', 'B'], exampleTitle: 'Intervalos de C mayor', exercise: 'Toca cada intervalo en el mástil: la 3ª mayor está 4 trastes arriba.' },
    { id: 'acordes', icon: '🎸', title: 'Formación de acordes', subtitle: 'Cómo se construyen las tríadas', content: '<p>Un <strong>acorde</strong> tiene 3+ notas. La base es la <strong>tríada</strong>: raíz + 3ª + 5ª.</p><p>Mayor: <strong>1 - 3 - 5</strong>. Menor: <strong>1 - b3 - 5</strong>.</p><p>Ej: <strong>C</strong> = C-E-G. <strong>Cm</strong> = C-Eb-G.</p>', exampleNotes: ['C', 'E', 'G', 'C', 'Eb', 'G'], exampleTitle: 'C mayor vs C menor', exercise: 'Toca C y Cm. Solo cambia un traste.' },
    { id: 'funciones', icon: '🎯', title: 'Funciones armónicas', subtitle: 'Tónica, subdominante, dominante', content: '<p>3 funciones en cualquier tonalidad:</p><ul><li><strong>Tónica (I):</strong> reposo. Ej: C</li><li><strong>Subdominante (IV):</strong> movimiento. Ej: F</li><li><strong>Dominante (V):</strong> tensión. Ej: G7</li></ul><p>Flujo: <strong>I → IV → V → I</strong>.</p>', exampleNotes: ['C', 'E', 'G', 'F', 'A', 'C', 'G', 'B', 'D', 'C', 'E', 'G'], exampleTitle: 'Cadencia I - IV - V - I', exercise: 'Toca C - F - G7 - C despacio.' },
    { id: 'circulo', icon: '🎨', title: 'El círculo de quintas', subtitle: 'El mapa maestro', content: '<p>Ordena las 12 notas por 5ª justa.</p><ul><li><strong>Vecinos:</strong> 1 paso = 6 notas compartidas</li><li><strong>Relativa:</strong> misma armadura</li><li><strong>Dominante:</strong> vecino derecho</li><li><strong>Subdominante:</strong> vecino izquierdo</li></ul>', exampleNotes: ['C', 'G', 'D', 'A', 'E', 'B', 'F#'], exampleTitle: 'Quintas ascendentes', exercise: 'Selecciona tonalidades en el círculo y compara.' },
    { id: 'cadencias', icon: '🎼', title: 'Cadencias', subtitle: 'Los "puntos y comas"', content: '<ul><li><strong>Auténtica (V-I):</strong> cierre fuerte</li><li><strong>Plagal (IV-I):</strong> cierre suave</li><li><strong>Rota (V-vi):</strong> sorpresa</li><li><strong>ii-V-I:</strong> la del jazz</li></ul>', exampleNotes: ['G', 'B', 'D', 'F', 'C', 'E', 'G'], exampleTitle: 'Cadencia auténtica G7 → C', exercise: 'Toca V-I, IV-I y V-vi en C.' },
    { id: 'modos', icon: '🎓', title: 'Modos griegos', subtitle: 'Las 7 personalidades', content: '<p>7 escalas de la mayor empezando desde cada nota:</p><ul><li>Jónico (I): mayor</li><li>Dórico (II): menor funky</li><li>Frigio (III): español</li><li>Lidio (IV): etéreo</li><li>Mixolidio (V): rock</li><li>Eólico (VI): menor</li><li>Locrio (VII): tenso</li></ul>', exampleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], exampleTitle: 'Escala mayor de C', exercise: 'Prueba cada modo en el selector.' },
    { id: 'pentatonica', icon: '⚡', title: 'Escala pentatónica', subtitle: 'La más usada en rock', content: '<p>5 notas, fácil y versátil.</p><p><strong>Menor:</strong> 1 - b3 - 4 - 5 - b7</p><p><strong>Mayor:</strong> 1 - 2 - 3 - 5 - 6</p><p><strong>Blues:</strong> menor + b5</p>', exampleNotes: ['A', 'C', 'D', 'E', 'G', 'A'], exampleTitle: 'Pentatónica menor de A', exercise: 'Aprende la posición 1 (traste 5).' },
    { id: 'septimas', icon: '🎷', title: 'Acordes de séptima', subtitle: 'Añadiendo color', content: '<ul><li><strong>maj7 (1-3-5-7):</strong> suave, jazz</li><li><strong>7 (1-3-5-b7):</strong> tensión</li><li><strong>m7 (1-b3-5-b7):</strong> menor con color</li><li><strong>m7b5:</strong> semidisminuido</li></ul>', exampleNotes: ['C', 'E', 'G', 'B', 'G', 'B', 'D', 'F', 'A', 'C', 'E', 'G'], exampleTitle: 'Cmaj7 → G7 → Am7', exercise: 'Compara Cmaj7 con C7.' },
    { id: 'sustituciones', icon: '🔄', title: 'Sustituciones', subtitle: 'Cómo reemplazar acordes', content: '<ul><li><strong>Tritono:</strong> G7 → Db7</li><li><strong>Diatónica:</strong> C → Am</li><li><strong>Relativa:</strong> C → Am</li><li><strong>Paso:</strong> añade acorde entre dos</li></ul>', exampleNotes: ['G', 'B', 'D', 'F', 'Db', 'F', 'Ab', 'Cb', 'C', 'E', 'G'], exampleTitle: 'Sustitución de tritono', exercise: 'Toca G7→C, luego Db7→C.' },
    { id: 'modulacion', icon: '🧭', title: 'Modulación', subtitle: 'Cambiar de tonalidad', content: '<ul><li><strong>Por dominante:</strong> usa V7 de la nueva</li><li><strong>Por relativa:</strong> C → Am</li><li><strong>Por quinta:</strong> C → G → D</li><li><strong>Por pivote:</strong> acorde común</li></ul>', exampleNotes: ['C', 'E', 'G', 'D', 'F#', 'A', 'G', 'B', 'D'], exampleTitle: 'Modulación C → G', exercise: 'Toca C, D7, G. Modulaste.' }
];

// =====================================================
// BASE DE DATOS DE ACORDES (EXPANDIDA ~180 acordes)
// =====================================================
const CHORD_DB = {
    // ===== MAYORES =====
    'C': [0, 3, 2, 0, 1, 0], 'C#': [null, 4, 6, 6, 6, 4], 'Db': [null, 4, 6, 6, 6, 4],
    'D': [null, null, 0, 2, 3, 2], 'D#': [null, 6, 8, 8, 8, 6], 'Eb': [null, 6, 8, 8, 8, 6],
    'E': [0, 2, 2, 1, 0, 0], 'F': [1, 3, 3, 2, 1, 1], 'F#': [2, 4, 4, 3, 2, 2],
    'Gb': [2, 4, 4, 3, 2, 2], 'G': [3, 2, 0, 0, 0, 3], 'G#': [4, 6, 6, 5, 4, 4],
    'Ab': [4, 6, 6, 5, 4, 4], 'A': [null, 0, 2, 2, 2, 0], 'A#': [null, 1, 3, 3, 3, 1],
    'Bb': [null, 1, 3, 3, 3, 1], 'B': [null, 2, 4, 4, 4, 2],

    // ===== MENORES =====
    'Cm': [null, 3, 5, 5, 4, 3], 'C#m': [null, 4, 6, 6, 5, 4], 'Dbm': [null, 4, 6, 6, 5, 4],
    'Dm': [null, null, 0, 2, 3, 1], 'D#m': [null, 6, 8, 8, 7, 6], 'Ebm': [null, 6, 8, 8, 7, 6],
    'Em': [0, 2, 2, 0, 0, 0], 'Fm': [1, 3, 3, 1, 1, 1], 'F#m': [2, 4, 4, 2, 2, 2],
    'Gbm': [2, 4, 4, 2, 2, 2], 'Gm': [3, 5, 5, 3, 3, 3], 'G#m': [4, 6, 6, 4, 4, 4],
    'Abm': [4, 6, 6, 4, 4, 4], 'Am': [null, 0, 2, 2, 1, 0], 'A#m': [null, 1, 3, 3, 2, 1],
    'Bbm': [null, 1, 3, 3, 2, 1], 'Bm': [null, 2, 4, 4, 3, 2],

    // ===== DOMINANTES 7 =====
    'C7': [null, 3, 2, 3, 1, 0], 'C#7': [null, 4, 6, 4, 6, 4], 'Db7': [null, 4, 6, 4, 6, 4],
    'D7': [null, null, 0, 2, 1, 2], 'D#7': [null, 6, 8, 6, 8, 6], 'Eb7': [null, 6, 8, 6, 8, 6],
    'E7': [0, 2, 0, 1, 0, 0], 'F7': [1, 3, 1, 2, 1, 1], 'F#7': [2, 4, 2, 3, 2, 2],
    'Gb7': [2, 4, 2, 3, 2, 2], 'G7': [3, 2, 0, 0, 0, 1], 'G#7': [4, 6, 4, 5, 4, 4],
    'Ab7': [4, 6, 4, 5, 4, 4], 'A7': [null, 0, 2, 0, 2, 0], 'A#7': [null, 1, 3, 1, 3, 1],
    'Bb7': [null, 1, 3, 1, 3, 1], 'B7': [null, 2, 1, 2, 0, 2],

    // ===== MAJ7 =====
    'Cmaj7': [null, 3, 2, 0, 0, 0], 'C#maj7': [null, 4, 6, 5, 6, 4], 'Dbmaj7': [null, 4, 6, 5, 6, 4],
    'Dmaj7': [null, null, 0, 2, 2, 2], 'D#maj7': [null, 6, 8, 7, 8, 6], 'Ebmaj7': [null, 6, 8, 7, 8, 6],
    'Emaj7': [0, 2, 1, 1, 0, 0], 'Fmaj7': [1, 3, 2, 2, 1, 0], 'F#maj7': [2, 4, 3, 3, 2, 2],
    'Gbmaj7': [2, 4, 3, 3, 2, 2], 'Gmaj7': [3, 2, 0, 0, 0, 2], 'G#maj7': [4, 6, 5, 5, 4, 4],
    'Abmaj7': [4, 6, 5, 5, 4, 4], 'Amaj7': [null, 0, 2, 1, 2, 0], 'A#maj7': [null, 1, 3, 2, 3, 1],
    'Bbmaj7': [null, 1, 3, 2, 3, 1], 'Bmaj7': [null, 2, 4, 3, 4, 2],

    // ===== m7 =====
    'Cm7': [null, 3, 5, 3, 4, 3], 'C#m7': [null, 4, 6, 4, 5, 4], 'Dbm7': [null, 4, 6, 4, 5, 4],
    'Dm7': [null, null, 0, 2, 1, 1], 'D#m7': [null, 6, 8, 6, 7, 6], 'Ebm7': [null, 6, 8, 6, 7, 6],
    'Em7': [0, 2, 0, 0, 0, 0], 'Fm7': [1, 3, 1, 1, 1, 1], 'F#m7': [2, 4, 2, 2, 2, 2],
    'Gbm7': [2, 4, 2, 2, 2, 2], 'Gm7': [3, 5, 3, 3, 3, 3], 'G#m7': [4, 6, 4, 4, 4, 4],
    'Abm7': [4, 6, 4, 4, 4, 4], 'Am7': [null, 0, 2, 0, 1, 0], 'A#m7': [null, 1, 3, 1, 2, 1],
    'Bbm7': [null, 1, 3, 1, 2, 1], 'Bm7': [null, 2, 0, 2, 0, 2],

    // ===== m7b5 (semidisminuidos) =====
    'Cm7b5': [null, 3, 4, 3, 4, null], 'C#m7b5': [null, 4, 5, 4, 5, null],
    'Dm7b5': [null, null, 0, 1, 1, 1], 'D#m7b5': [null, 6, 7, 6, 7, null],
    'Em7b5': [0, 1, 2, 0, 3, null], 'Fm7b5': [1, 2, 3, 1, 4, null],
    'F#m7b5': [2, 3, 4, 2, 5, null], 'Gm7b5': [3, 4, 5, 3, 6, null],
    'G#m7b5': [4, 5, 6, 4, 7, null], 'Am7b5': [null, 0, 1, 0, 1, null],
    'A#m7b5': [null, 1, 2, 1, 2, null], 'Bm7b5': [null, 2, 3, 2, 3, null],

    // ===== SUS2 =====
    'Csus2': [null, 3, 0, 0, 1, 3], 'C#sus2': [null, 4, 6, 6, 4, 4], 'Dsus2': [null, null, 0, 2, 3, 0],
    'D#sus2': [null, 6, 8, 8, 6, 6], 'Esus2': [0, 2, 4, 4, 0, 0], 'Fsus2': [1, 3, 3, 0, 1, 1],
    'F#sus2': [2, 4, 4, 1, 2, 2], 'Gsus2': [3, 0, 0, 0, 3, 3], 'G#sus2': [4, 6, 6, 3, 4, 4],
    'Asus2': [null, 0, 2, 2, 0, 0], 'A#sus2': [null, 1, 3, 3, 1, 1], 'Bsus2': [null, 2, 4, 4, 2, 2],

    // ===== SUS4 =====
    'Csus4': [null, 3, 3, 0, 1, 1], 'C#sus4': [null, 4, 6, 6, 7, 4], 'Dsus4': [null, null, 0, 2, 3, 3],
    'D#sus4': [null, 6, 8, 8, 9, 6], 'Esus4': [0, 2, 2, 2, 0, 0], 'Fsus4': [1, 3, 3, 3, 1, 1],
    'F#sus4': [2, 4, 4, 4, 2, 2], 'Gsus4': [3, 3, 0, 0, 1, 3], 'G#sus4': [4, 6, 6, 6, 4, 4],
    'Asus4': [null, 0, 2, 2, 3, 0], 'A#sus4': [null, 1, 3, 3, 4, 1], 'Bsus4': [null, 2, 4, 4, 5, 2],

    // ===== 6 =====
    'C6': [null, 3, 2, 2, 1, 0], 'C#6': [null, 4, 6, 6, 6, 6], 'D6': [null, null, 0, 2, 0, 2],
    'D#6': [null, 6, 8, 8, 8, 8], 'E6': [0, 2, 2, 1, 2, 0], 'F6': [1, 3, 3, 2, 3, 1],
    'F#6': [2, 4, 4, 3, 4, 2], 'G6': [3, 2, 0, 0, 0, 0], 'G#6': [4, 6, 6, 5, 6, 4],
    'A6': [null, 0, 2, 2, 2, 2], 'A#6': [null, 1, 3, 3, 3, 3], 'B6': [null, 2, 4, 4, 4, 4],

    // ===== m6 =====
    'Cm6': [null, 3, 5, 5, 4, 5], 'C#m6': [null, 4, 6, 6, 5, 6], 'Dm6': [null, null, 0, 2, 0, 1],
    'D#m6': [null, 6, 8, 8, 7, 8], 'Em6': [0, 2, 2, 0, 2, 0], 'Fm6': [1, 3, 3, 1, 3, 1],
    'F#m6': [2, 4, 4, 2, 4, 2], 'Gm6': [3, 5, 5, 3, 5, 3], 'G#m6': [4, 6, 6, 4, 6, 4],
    'Am6': [null, 0, 2, 2, 1, 2], 'A#m6': [null, 1, 3, 3, 2, 3], 'Bm6': [null, 2, 4, 4, 3, 4],

    // ===== dim =====
    'Cdim': [null, 3, 4, 5, 4, null], 'C#dim': [null, 4, 5, 6, 5, null], 'Ddim': [null, null, 0, 1, 3, 1],
    'D#dim': [null, 6, 7, 8, 7, null], 'Edim': [0, 1, 2, 0, null, null], 'Fdim': [1, 2, 3, 1, null, null],
    'F#dim': [2, 3, 4, 2, null, null], 'Gdim': [3, 4, 5, 3, null, null], 'G#dim': [4, 5, 6, 4, null, null],
    'Adim': [null, 0, 1, 2, 1, null], 'A#dim': [null, 1, 2, 3, 2, null], 'Bdim': [null, 2, 3, 4, 3, null],

    // ===== dim7 =====
    'Cdim7': [null, 3, 4, 2, 4, null], 'C#dim7': [null, 4, 5, 3, 5, null], 'Ddim7': [null, null, 0, 1, 0, 1],
    'D#dim7': [null, 6, 7, 5, 7, null], 'Edim7': [0, 1, 2, 0, 2, 0], 'Fdim7': [1, 2, 3, 1, 3, 1],
    'F#dim7': [2, 3, 4, 2, 4, 2], 'Gdim7': [3, 4, 5, 3, 5, 3], 'G#dim7': [4, 5, 6, 4, 6, 4],
    'Adim7': [null, 0, 1, 2, 1, 2], 'A#dim7': [null, 1, 2, 3, 2, 3], 'Bdim7': [null, 2, 3, 4, 3, 4],

    // ===== aug =====
    'Caug': [null, 3, 2, 1, 1, 0], 'C#aug': [null, 4, 3, 2, 2, 1], 'Daug': [null, null, 0, 3, 3, 2],
    'D#aug': [null, 6, 5, 4, 4, 3], 'Eaug': [0, 3, 2, 1, 1, 0], 'Faug': [1, 4, 3, 2, 2, 1],
    'F#aug': [2, 5, 4, 3, 3, 2], 'Gaug': [3, 6, 5, 4, 4, 3], 'G#aug': [4, 7, 6, 5, 5, 4],
    'Aaug': [null, 0, 3, 2, 2, 1], 'A#aug': [null, 1, 4, 3, 3, 2], 'Baug': [null, 2, 5, 4, 4, 3],

    // ===== add9 =====
    'Cadd9': [null, 3, 2, 0, 3, 0], 'C#add9': [null, 4, 6, 6, 4, 4], 'Dadd9': [null, null, 0, 2, 3, 0],
    'D#add9': [null, 6, 8, 8, 6, 6], 'Eadd9': [0, 2, 2, 1, 0, 2], 'Fadd9': [1, 3, 3, 2, 1, 3],
    'F#add9': [2, 4, 4, 3, 2, 4], 'Gadd9': [3, 2, 0, 2, 0, 3], 'G#add9': [4, 6, 6, 5, 4, 6],
    'Aadd9': [null, 0, 2, 4, 2, 0], 'A#add9': [null, 1, 3, 5, 3, 1], 'Badd9': [null, 2, 4, 6, 4, 2],

    // ===== madd9 =====
    'Cmadd9': [null, 3, 5, 5, 3, 3], 'Dmadd9': [null, null, 0, 2, 3, 0], 'Emadd9': [0, 2, 2, 0, 0, 2],
    'Fmadd9': [1, 3, 3, 1, 1, 3], 'Gmadd9': [3, 5, 5, 3, 3, 5], 'Amadd9': [null, 0, 2, 2, 1, 0],
    'Bmadd9': [null, 2, 4, 4, 3, 2],

    // ===== 9 =====
    'C9': [null, 3, 2, 3, 3, null], 'C#9': [null, 4, 6, 4, 6, 6], 'D9': [null, null, 0, 2, 1, 0],
    'D#9': [null, 6, 8, 6, 8, 8], 'E9': [0, 2, 0, 1, 0, 2], 'F9': [1, 3, 1, 2, 1, 3],
    'F#9': [2, 4, 2, 3, 2, 4], 'G9': [3, 2, 0, 2, 0, 1], 'G#9': [4, 6, 4, 5, 4, 6],
    'A9': [null, 0, 2, 0, 2, 2], 'A#9': [null, 1, 3, 1, 3, 3], 'B9': [null, 2, 1, 2, 2, 2],

    // ===== maj9 =====
    'Cmaj9': [null, 3, 0, 0, 0, 0], 'Dmaj9': [null, null, 0, 2, 2, 0], 'Emaj9': [0, 2, 1, 1, 0, 2],
    'Fmaj9': [1, 3, 0, 2, 1, 0], 'Gmaj9': [3, 2, 0, 2, 0, 2], 'Amaj9': [null, 0, 2, 1, 2, 2],
    'Bmaj9': [null, 2, 4, 3, 4, 4],

    // ===== m9 =====
    'Cm9': [null, 3, 5, 3, 3, 3], 'Dm9': [null, null, 0, 2, 1, 0], 'Em9': [0, 2, 0, 0, 0, 2],
    'Fm9': [1, 3, 1, 1, 1, 3], 'Gm9': [3, 5, 3, 3, 3, 5], 'Am9': [null, 0, 2, 0, 1, 0],
    'Bm9': [null, 2, 0, 2, 0, 2],

    // ===== 7b9 =====
    'C7b9': [null, 3, 2, 3, 2, null], 'D7b9': [null, null, 0, 2, 1, 1], 'E7b9': [0, 2, 0, 1, 0, 1],
    'F7b9': [1, 3, 1, 2, 1, 2], 'G7b9': [3, 2, 0, 1, 0, 1], 'A7b9': [null, 0, 2, 0, 2, 1],
    'B7b9': [null, 2, 1, 2, 1, 2],

    // ===== 7#9 =====
    'C7#9': [null, 3, 2, 3, 4, null], 'D7#9': [null, null, 0, 2, 1, 4], 'E7#9': [0, 2, 0, 1, 3, 0],
    'F7#9': [1, 3, 1, 2, 4, 1], 'G7#9': [3, 2, 0, 3, 0, 1], 'A7#9': [null, 0, 2, 0, 2, 3],
    'B7#9': [null, 2, 1, 2, 4, 2],

    // ===== 13 =====
    'C13': [null, 3, 2, 3, 5, null], 'D13': [null, null, 0, 2, 1, 2], 'E13': [0, 2, 0, 1, 2, 0],
    'F13': [1, 3, 1, 2, 3, 1], 'G13': [3, 2, 0, 2, 0, 1], 'A13': [null, 0, 2, 0, 2, 2],
    'B13': [null, 2, 1, 2, 2, 2],

    // ===== 7b5 =====
    'C7b5': [null, 3, 2, 3, 2, 1], 'D7b5': [null, null, 0, 2, 1, 0], 'E7b5': [0, 2, 0, 1, 3, 0],
    'F7b5': [1, 3, 1, 2, 2, 1], 'G7b5': [3, 2, 0, 3, 0, 1], 'A7b5': [null, 0, 2, 0, 3, 0],
    'B7b5': [null, 2, 1, 2, 4, 2],

    // ===== 7#5 =====
    'C7#5': [null, 3, 2, 3, 1, 2], 'D7#5': [null, null, 0, 2, 1, 3], 'E7#5': [0, 2, 0, 1, 2, 3],
    'F7#5': [1, 3, 1, 2, 4, 2], 'G7#5': [3, 2, 0, 3, 3, 1], 'A7#5': [null, 0, 2, 0, 2, 3],
    'B7#5': [null, 2, 1, 2, 4, 4],

    // ===== 7sus4 =====
    'C7sus4': [null, 3, 3, 3, 1, 1], 'D7sus4': [null, null, 0, 2, 1, 3], 'E7sus4': [0, 2, 0, 2, 0, 0],
    'F7sus4': [1, 3, 1, 3, 1, 1], 'G7sus4': [3, 3, 0, 0, 1, 1], 'A7sus4': [null, 0, 2, 0, 3, 0],
    'B7sus4': [null, 2, 4, 2, 0, 0],

    // ===== 5 (Power) =====
    'C5': [null, 3, 5, 5, null, null], 'D5': [null, null, 0, 2, 3, null],
    'E5': [0, 2, 2, null, null, null], 'F5': [1, 3, 3, null, null, null],
    'G5': [3, 5, 5, null, null, null], 'A5': [null, 0, 2, 2, null, null],
    'B5': [null, 2, 4, 4, null, null],

    // ===== INVERSIONES Y BAJOS ALTERNATIVOS =====
    // C con bajo alternativo
    'C/E': [0, 3, 2, 0, 1, 0], 'C/G': [3, 3, 2, 0, 1, 0],
    'C/B': [null, 3, 2, 0, 0, 0], 'C/F': [1, 3, 2, 0, 1, 0],
    'C/A': [null, 0, 2, 0, 1, 0], 'C/D': [null, null, 0, 2, 3, 0],

    // D con bajo alternativo
    'D/F#': [2, 0, 0, 2, 3, 2], 'D/A': [null, 0, 0, 2, 3, 2],
    'D/C': [null, 3, 0, 2, 3, 2], 'D/B': [null, 2, 0, 2, 3, 2],
    'D/G': [3, 0, 0, 2, 3, 2], 'D/E': [0, 0, 0, 2, 3, 2],

    // E con bajo alternativo
    'E/G#': [4, 2, 2, 1, 0, 0], 'E/B': [null, 2, 2, 1, 0, 0],
    'E/D': [null, 2, 2, 1, 0, 0], 'E/C#': [null, 4, 2, 1, 0, 0],
    'E/A': [null, 0, 2, 1, 0, 0], 'E/F#': [2, 2, 2, 1, 0, 0],

    // F con bajo alternativo
    'F/A': [null, 0, 3, 2, 1, 1], 'F/C': [null, 3, 3, 2, 1, 1],
    'F/E': [0, 3, 3, 2, 1, 1], 'F/D': [null, null, 0, 2, 1, 1],
    'F/G': [3, 3, 3, 2, 1, 1], 'F/Bb': [null, 1, 3, 2, 1, 1],

    // G con bajo alternativo
    'G/B': [null, 2, 0, 0, 0, 3], 'G/D': [null, null, 0, 0, 0, 3],
    'G/F': [1, 2, 0, 0, 0, 3], 'G/E': [0, 2, 0, 0, 0, 3],
    'G/A': [null, 0, 0, 0, 0, 3], 'G/C': [null, 3, 0, 0, 0, 3],

    // A con bajo alternativo
    'A/C#': [null, 4, 2, 2, 2, 0], 'A/E': [0, 0, 2, 2, 2, 0],
    'A/G': [3, 0, 2, 2, 2, 0], 'A/F#': [2, 0, 2, 2, 2, 0],
    'A/B': [null, 2, 2, 2, 2, 0], 'A/D': [null, null, 0, 2, 2, 0],

    // B con bajo alternativo
    'B/D#': [null, 6, 4, 4, 4, 2], 'B/F#': [2, 2, 4, 4, 4, 2],
    'B/A': [null, 0, 4, 4, 4, 2], 'B/G#': [4, 2, 4, 4, 4, 2],
    'B/C#': [null, 4, 4, 4, 4, 2], 'B/E': [0, 2, 4, 4, 4, 2],

    // Inversiones de menores
    'Am/C': [null, 3, 2, 2, 1, 0], 'Am/E': [0, 0, 2, 2, 1, 0],
    'Am/G': [3, 0, 2, 2, 1, 0], 'Am/F': [1, 0, 2, 2, 1, 0],
    'Am/D': [null, null, 0, 2, 1, 0], 'Am/B': [null, 2, 2, 2, 1, 0],

    'Em/G': [3, 2, 2, 0, 0, 0], 'Em/B': [null, 2, 2, 0, 0, 0],
    'Em/D': [null, null, 0, 0, 0, 0], 'Em/C': [null, 3, 2, 0, 0, 0],

    'Dm/F': [1, null, 0, 2, 3, 1], 'Dm/A': [null, 0, 0, 2, 3, 1],
    'Dm/C': [null, 3, 0, 2, 3, 1], 'Dm/G': [3, null, 0, 2, 3, 1],

    // Inversiones de séptimas
    'G7/B': [null, 2, 0, 0, 0, 1], 'G7/F': [1, 2, 0, 0, 0, 1],
    'D7/F#': [2, null, 0, 2, 1, 2], 'D7/C': [null, 3, 0, 2, 1, 2],
    'C7/E': [0, 3, 2, 3, 1, 0], 'C7/Bb': [null, 1, 2, 3, 1, 0],

    // Cmaj7 inversiones
    'Cmaj7/E': [0, 3, 2, 0, 0, 0], 'Cmaj7/B': [null, 2, 2, 0, 0, 0],
    'Cmaj7/G': [3, 3, 2, 0, 0, 0],

    // Am7 inversiones
    'Am7/G': [3, 0, 2, 0, 1, 0], 'Am7/C': [null, 3, 2, 0, 1, 0],
    'Am7/E': [0, 0, 2, 0, 1, 0],

    // Fmaj7 inversiones
    'Fmaj7/A': [null, 0, 3, 2, 1, 0], 'Fmaj7/C': [null, 3, 3, 2, 1, 0],
    'Fmaj7/E': [0, 3, 2, 2, 1, 0],

    // Dm7 inversiones
    'Dm7/F': [1, null, 0, 2, 1, 1], 'Dm7/A': [null, 0, 0, 2, 1, 1],
    'Dm7/C': [null, 3, 0, 2, 1, 1],
};

const CHORD_POSITIONS = {
    'C': [{ name: 'Abierto', frets: [0, 3, 2, 0, 1, 0] }, { name: '3er traste', frets: [null, 3, 5, 5, 5, 3] }, { name: '8vo traste', frets: [8, 10, 10, 9, 8, 8] }],
    'G': [{ name: 'Abierto', frets: [3, 2, 0, 0, 0, 3] }, { name: 'Barra 3er', frets: [3, 5, 5, 4, 3, 3] }, { name: 'Barra 10mo', frets: [10, 12, 12, 11, 10, 10] }],
    'D': [{ name: 'Abierto', frets: [null, null, 0, 2, 3, 2] }, { name: 'Barra 5to', frets: [null, 5, 7, 7, 7, 5] }, { name: 'Barra 10mo', frets: [10, 12, 12, 11, 10, 10] }],
    'A': [{ name: 'Abierto', frets: [null, 0, 2, 2, 2, 0] }, { name: 'Barra 5to', frets: [5, 7, 7, 6, 5, 5] }, { name: 'Barra 12vo', frets: [12, 14, 14, 13, 12, 12] }],
    'E': [{ name: 'Abierto', frets: [0, 2, 2, 1, 0, 0] }, { name: 'Barra 7mo', frets: [7, 9, 9, 8, 7, 7] }, { name: 'Barra 12vo', frets: [12, 14, 14, 13, 12, 12] }],
    'F': [{ name: 'Barra 1er', frets: [1, 3, 3, 2, 1, 1] }, { name: 'Barra 8vo', frets: [8, 10, 10, 9, 8, 8] }, { name: 'Barra 13vo', frets: [13, 15, 15, 14, 13, 13] }],
    'Am': [{ name: 'Abierto', frets: [null, 0, 2, 2, 1, 0] }, { name: 'Barra 5to', frets: [5, 7, 7, 5, 5, 5] }, { name: 'Barra 12vo', frets: [12, 14, 14, 12, 12, 12] }],
    'Em': [{ name: 'Abierto', frets: [0, 2, 2, 0, 0, 0] }, { name: 'Barra 7mo', frets: [7, 9, 9, 7, 7, 7] }, { name: 'Barra 12vo', frets: [12, 14, 14, 12, 12, 12] }],
    'Dm': [{ name: 'Abierto', frets: [null, null, 0, 2, 3, 1] }, { name: 'Barra 5to', frets: [null, 5, 7, 7, 6, 5] }, { name: 'Barra 10mo', frets: [10, 12, 12, 10, 10, 10] }],
    'Cmaj7': [{ name: 'Abierto', frets: [null, 3, 2, 0, 0, 0] }, { name: 'Barra 3er', frets: [null, 3, 5, 4, 5, 3] }, { name: 'Barra 8vo', frets: [8, 10, 9, 9, 8, null] }],
    'Am7': [{ name: 'Abierto', frets: [null, 0, 2, 0, 1, 0] }, { name: 'Barra 5to', frets: [5, 7, 5, 5, 5, 5] }],
    'G7': [{ name: 'Abierto', frets: [3, 2, 0, 0, 0, 1] }, { name: 'Barra 3er', frets: [3, 5, 3, 4, 3, 3] }]
};

// Estado global
let currentFretboard = [null, null, null, null, null, null];
let audioCtx = null;
let currentChordData = null;
let progressionChords = [];
let cagedActive = false;
let openLessonId = null;
let currentExercise = null;
let exerciseState = null;
let practiceStats = null;

// =====================================================
// INICIALIZACIÓN
// =====================================================
window.onload = function () {
    initFretboardUI();
    initCircleOfFifths();
    initSelectors();
    initScaleMap();
    drawLegendExampleFretboard();
    renderLessons();
    initPractice();
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
    if (menu.classList.contains('active')) closeMenu();
    else {
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
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

// =====================================================
// MÁSTIL PRINCIPAL
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
        svg += `<line class="fret-line" x1="${x}" y1="${marginTop}" x2="${x}" y2="${height - marginBottom}" stroke-width="${i === 0 ? 6 : 3}" />`;
    }

    for (let i = 0; i < 6; i++) {
        const y = marginTop + (i * stringSpacing);
        svg += `<line class="string-line" x1="${marginLeft}" y1="${y}" x2="${width - marginRight}" y2="${y}" stroke-width="${5 - (i * 0.6)}" />`;
        svg += `<text x="${marginLeft - 12}" y="${y}" fill="#ff6b00" font-size="14" font-weight="bold" text-anchor="end" dominant-baseline="middle">${STRINGS[i]}</text>`;
    }

    for (let i = 1; i <= 12; i++) {
        svg += `<text x="${marginLeft + ((i - 0.5) * fretSpacing)}" y="${marginTop - 12}" fill="#888" font-size="12" text-anchor="middle">${i}</text>`;
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
// DETECCIÓN
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
        document.getElementById('dominant-result').innerHTML = '<p class="empty-state">Toca un acorde primero.</p>';
        document.getElementById('analysis-content').innerHTML = '<p class="empty-state">Toca un acorde para ver su análisis armónico.</p>';
        document.getElementById('what-to-play-content').innerHTML = '<p class="empty-state">Aún no hay un acorde detectado.</p>';
        currentChordData = null;
        clearCircleHighlight();
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
    renderWhatToPlay(currentChordData);
    highlightCircleForKey(currentChordData.root);
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
                candidates.push({ root: rootNote, suffix, name: rootNote + suffix, quality, priority });
            }
        }
    });

    const uniqueCandidates = [];
    const seen = new Set();
    candidates.sort((a, b) => b.priority - a.priority);
    for (const c of candidates) {
        if (!seen.has(c.name)) { seen.add(c.name); uniqueCandidates.push(c); }
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
                        bestFlexible = { root: rootNote, suffix, name: rootNote + suffix + ' (?)', quality, priority };
                    }
                }
            }
        });

        if (bestFlexible) return { root: bestFlexible.root, suffix: bestFlexible.suffix, primaryName: bestFlexible.name, alternatives: [], quality: bestFlexible.quality, intervals: bestFlexible.quality.intervals };
        return { root: notes[0], suffix: '', primaryName: notes[0] + ' (?)', alternatives: [], quality: null, intervals: [] };
    }

    const best = uniqueCandidates[0];
    return { root: best.root, suffix: best.suffix, primaryName: best.name, alternatives: uniqueCandidates.map(c => c.name), quality: best.quality, intervals: best.quality.intervals };
}

// =====================================================
// INFO DEL ACORDE
// =====================================================
function renderChordInfo(chordData, notes) {
    const infoEl = document.getElementById('chord-info');
    if (!infoEl || !chordData || !chordData.quality) return;

    const quality = chordData.quality;
    const formulaBadges = quality.formula.split(' ').map(f => `<span class="formula-badge">${f}</span>`).join('');

    infoEl.innerHTML = `
        <h4>Información del acorde: ${chordData.primaryName}</h4>
        <div class="info-row"><span class="info-label">Tipo:</span><span>${quality.name}</span></div>
        <div class="info-row"><span class="info-label">Fórmula:</span><div>${formulaBadges}</div></div>
        <div class="info-row"><span class="info-label">Notas:</span><span>${notes.join(' - ')}</span></div>
        <div class="explanation"><strong>¿Por qué se llama ${chordData.primaryName}?</strong> ${quality.explanation}</div>
    `;
}

// =====================================================
// POSICIONES
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
            document.querySelectorAll('.string-row select').forEach((select, i) => {
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
    if (!container || !chordData || !chordData.quality) return;

    const rootIndex = NOTES.indexOf(chordData.root);
    const quality = chordData.quality;

    const functionInfo = getHarmonicFunction(chordData);
    const noteRoles = quality.intervals.map(interval => ({
        note: NOTES[(rootIndex + interval) % 12],
        role: INTERVAL_ROLES[interval] || `Intervalo ${interval}`
    }));
    const appearances = getChordAppearances(chordData);
    const tensions = getAvailableTensions(chordData);
    const resolutions = getNaturalResolutions(chordData);

    let html = `
        <div class="analysis-block"><h4>📊 ${chordData.primaryName}</h4><p>Notas: <strong>${notes.join(' - ')}</strong></p></div>
        <div class="analysis-block"><h4>🎯 Función armónica</h4><p><span class="function-badge ${functionInfo.category}">${functionInfo.name}</span>${functionInfo.description}</p></div>
        <div class="analysis-block"><h4>🎼 Notas del acorde y su función</h4><ul>`;
    noteRoles.forEach(nr => { html += `<li><strong>${nr.note}</strong><span class="role-tag">${nr.role}</span></li>`; });
    html += `</ul></div><div class="analysis-block"><h4>🔀 Tonalidades donde aparece</h4><ul>`;
    appearances.forEach(a => { html += `<li>En <strong>${a.key}</strong> ${a.mode} → <strong>${a.degree}</strong> (${a.role})</li>`; });
    html += `</ul></div><div class="analysis-block"><h4>✨ Tensiones disponibles</h4><ul>`;
    tensions.forEach(t => { html += `<li><strong>${t.name}</strong> — ${t.description}</li>`; });
    html += `</ul></div><div class="analysis-block"><h4>➡️ Resoluciones naturales</h4><ul>`;
    resolutions.forEach(r => { html += `<li>${r.from} → <strong>${r.to}</strong> (${r.reason})</li>`; });
    html += `</ul></div>`;

    container.innerHTML = html;
}

function getHarmonicFunction(chordData) {
    const suffix = chordData.suffix;
    if (suffix === '' || suffix === 'maj7' || suffix === 'm' || suffix === 'mMaj7') return { name: 'Tónica', category: 'tonic', description: 'Centro tonal. Reposo y estabilidad.' };
    if (suffix.includes('7') && !suffix.includes('maj') && !suffix.includes('m')) return { name: 'Dominante', category: 'dominant', description: 'Tensión fuerte. Resuelve a la tónica.' };
    if (suffix === 'm7' || suffix === 'm9' || suffix === 'm11' || suffix === '6' || suffix === 'm6') return { name: 'Subdominante', category: 'subdominant', description: 'Prepara al dominante.' };
    if (suffix.includes('dim')) return { name: 'Tensión / Disminuido', category: 'dominant', description: 'Inestable.' };
    if (suffix.includes('aug')) return { name: 'Tensión / Aumentado', category: 'dominant', description: 'Flotante.' };
    if (suffix.includes('sus')) return { name: 'Suspendido', category: 'subdominant', description: 'Ambiguo.' };
    return { name: 'Función variable', category: 'subdominant', description: 'Depende del contexto.' };
}

function getChordAppearances(chordData) {
    const rootIndex = NOTES.indexOf(chordData.root);
    const suffix = chordData.suffix;
    const isMinor = suffix.includes('m') && !suffix.includes('maj');
    const isDominant = suffix.includes('7') && !suffix.includes('maj') && !isMinor;
    const appearances = [];

    if (isMinor) {
        appearances.push({ key: chordData.root, mode: 'menor', degree: 'i', role: 'Tónica' });
        appearances.push({ key: NOTES[(rootIndex + 3) % 12], mode: 'mayor', degree: 'vi', role: 'Submediante' });
        appearances.push({ key: NOTES[(rootIndex + 5) % 12], mode: 'mayor', degree: 'ii', role: 'Supertónica' });
        appearances.push({ key: NOTES[(rootIndex + 8) % 12], mode: 'mayor', degree: 'iii', role: 'Mediante' });
    } else if (isDominant) {
        appearances.push({ key: NOTES[(rootIndex + 5) % 12], mode: 'mayor', degree: 'V7', role: 'Dominante' });
        appearances.push({ key: NOTES[(rootIndex + 5) % 12], mode: 'menor', degree: 'V7', role: 'Dominante' });
    } else {
        appearances.push({ key: chordData.root, mode: 'mayor', degree: 'I', role: 'Tónica' });
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
        tensions.push({ name: '9', description: 'Color brillante.' });
        tensions.push({ name: '#11', description: 'Sonido lidio.' });
        tensions.push({ name: '13', description: 'Cálido y sofisticado.' });
    } else if (isMinor) {
        tensions.push({ name: '9', description: 'Color moderno.' });
        tensions.push({ name: '11', description: 'Disponible en m7/m9.' });
    } else if (isDominant) {
        tensions.push({ name: 'b9', description: 'Resuelve a menor.' });
        tensions.push({ name: '#9', description: 'Sonido Hendrix.' });
        tensions.push({ name: 'b13', description: 'Hacia menor.' });
        tensions.push({ name: '#11', description: 'Lidio dominante.' });
        tensions.push({ name: '13', description: 'Blues, jazz.' });
    } else {
        tensions.push({ name: '9', description: 'Color.' });
        tensions.push({ name: '6/13', description: 'Jazzy estable.' });
    }
    return tensions;
}

function getNaturalResolutions(chordData) {
    const rootIndex = NOTES.indexOf(chordData.root);
    const suffix = chordData.suffix;
    const isMinor = suffix.includes('m') && !suffix.includes('maj');
    const isDominant = suffix.includes('7') && !suffix.includes('maj') && !isMinor;
    const resolutions = [];

    if (isDominant) {
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 5) % 12], reason: 'Dominante → tónica' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 5) % 12] + 'm', reason: 'A tónica menor' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 8) % 12] + 'm', reason: 'Deceptiva' });
    } else if (isMinor) {
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 5) % 12] + 'm', reason: 'Movimiento por 4ª' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 3) % 12], reason: 'A relativa mayor' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 7) % 12] + '7', reason: 'A dominante' });
    } else {
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 5) % 12], reason: 'A IV' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 7) % 12], reason: 'A V' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 9) % 12] + 'm', reason: 'A vi' });
        resolutions.push({ from: chordData.primaryName, to: NOTES[(rootIndex + 2) % 12] + 'm', reason: 'A ii' });
    }
    return resolutions;
}

// =====================================================
// ESCALA DEL ACORDE
// =====================================================
function updateScaleForChord(chordData) {
    const infoBox = document.getElementById('scale-info');
    const fretboardBox = document.getElementById('scale-fretboard');
    if (!infoBox) return;

    if (!chordData || !chordData.quality) {
        infoBox.innerHTML = '<p class="empty-state">Escala no disponible.</p>';
        fretboardBox.innerHTML = '';
        return;
    }

    const root = chordData.root;
    const scaleMode = chordData.quality.scale;
    const scaleRootIndex = NOTES.indexOf(root);
    const scaleNotes = MODE_INTERVALS[scaleMode].map(i => NOTES[(scaleRootIndex + i) % 12]);
    const formula = MODE_INTERVALS[scaleMode].map(i => INTERVAL_NAMES[i]).join(' ');

    infoBox.innerHTML = `
        <h4>Escala de ${root} — ${scaleMode.charAt(0).toUpperCase() + scaleMode.slice(1)}</h4>
        <p><strong>Notas:</strong> ${scaleNotes.join(' - ')}</p>
        <p><strong>Fórmula:</strong> ${formula}</p>
        <p><strong>Acorde base:</strong> ${chordData.primaryName} (${chordData.quality.name})</p>
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

    const scaleNotesSet = new Set(scaleNotes);

    let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" style="background:#2a1f1a; border-radius:10px; width:100%; height:auto; display:block;">`;

    for (let i = 0; i <= 13; i++) {
        svg += `<line x1="${marginLeft + (i * fretSpacing)}" y1="${marginTop}" x2="${marginLeft + (i * fretSpacing)}" y2="${height - marginBottom}" stroke="#777" stroke-width="${i === 0 ? 6 : 2}" />`;
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
            if (scaleNotesSet.has(noteName)) {
                const x = (fret === 0) ? marginLeft - 15 : marginLeft + ((fret - 0.5) * fretSpacing);
                const intervalFromRoot = (noteIndex - rootIndex + 12) % 12;

                let fillColor = 'var(--tension-color)';
                if (intervalFromRoot === 0) fillColor = 'var(--root-color)';
                else if (intervalFromRoot === 3 || intervalFromRoot === 4) fillColor = 'var(--third-color)';
                else if (intervalFromRoot === 6 || intervalFromRoot === 7 || intervalFromRoot === 8) fillColor = 'var(--fifth-color)';
                else if (intervalFromRoot === 10 || intervalFromRoot === 11) fillColor = 'var(--seventh-color)';

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
    if (!container || !chordData || !chordData.quality) return;

    const root = chordData.root;
    const rootIndex = NOTES.indexOf(root);
    const isMinor = chordData.suffix.includes('m') && !chordData.suffix.includes('maj');

    let degrees;
    if (isMinor) {
        degrees = { 'i': root + 'm', 'ii°': NOTES[(rootIndex + 2) % 12] + 'dim', 'III': NOTES[(rootIndex + 3) % 12], 'iv': NOTES[(rootIndex + 5) % 12] + 'm', 'v': NOTES[(rootIndex + 7) % 12] + 'm', 'VI': NOTES[(rootIndex + 8) % 12], 'VII': NOTES[(rootIndex + 10) % 12] };
    } else {
        degrees = { 'I': root, 'ii': NOTES[(rootIndex + 2) % 12] + 'm', 'iii': NOTES[(rootIndex + 4) % 12] + 'm', 'IV': NOTES[(rootIndex + 5) % 12], 'V': NOTES[(rootIndex + 7) % 12], 'vi': NOTES[(rootIndex + 9) % 12] + 'm', 'vii°': NOTES[(rootIndex + 11) % 12] + 'dim' };
    }

    const progressions = isMinor ? [
        `i - iv - v - i  (${degrees['i']} → ${degrees['iv']} → ${degrees['v']} → ${degrees['i']})`,
        `i - VI - III - VII  (${degrees['i']} → ${degrees['VI']} → ${degrees['III']} → ${degrees['VII']})`
    ] : [
        `I - IV - V - I  (${degrees['I']} → ${degrees['IV']} → ${degrees['V']} → ${degrees['I']})`,
        `I - vi - IV - V  (${degrees['I']} → ${degrees['vi']} → ${degrees['IV']} → ${degrees['V']})`,
        `ii - V - I  (${degrees['ii']} → ${degrees['V']} → ${degrees['I']})`
    ];

    let html = `<div style="margin-bottom:15px;"><strong style="color:#ff6b00;">Tonalidad sugerida:</strong> ${root} ${isMinor ? 'menor' : 'mayor'}</div>`;
    html += `<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(100px,1fr)); gap:8px; margin-bottom:15px;">`;
    Object.entries(degrees).forEach(([degree, chord]) => { html += `<div class="result-item" style="text-align:center;"><strong style="color:#ff6b00;">${degree}</strong><br>${chord}</div>`; });
    html += `</div><h4 style="color:#ff6b00; margin-bottom:10px;">Progresiones sugeridas:</h4>`;
    progressions.forEach(p => { html += `<div class="result-item" style="text-align:left; padding:12px; margin-bottom:8px;">${p}</div>`; });
    container.innerHTML = html;
}

// =====================================================
// MODOS CON COLORES
// =====================================================
function updateModeForChord(chordData) {
    if (!chordData || !chordData.quality) return;
    const sel = document.getElementById('mode-selector');
    if (sel && chordData.quality.scale) sel.value = chordData.quality.scale;
    updateModeInfo();
}

function updateModeInfo() {
    const mode = document.getElementById('mode-selector').value;
    const infoBox = document.getElementById('mode-info');
    const data = MODE_INFO[mode];
    if (!data || !infoBox) return;

    const root = currentChordData && currentChordData.root ? currentChordData.root : 'C';
    const scaleNotes = MODE_INTERVALS[mode].map(i => NOTES[(NOTES.indexOf(root) + i) % 12]);

    infoBox.innerHTML = `
        <p><strong>Fórmula:</strong> ${data.formula}</p>
        <p><strong>Escala de ${root}:</strong> ${scaleNotes.join(' - ')}</p>
        <p><strong>Uso:</strong> ${data.uso}</p>
    `;

    const legendBox = document.getElementById('mode-legend');
    if (legendBox) {
        legendBox.innerHTML = `
            <div class="mode-legend-item"><span class="mode-legend-color" style="background: var(--root-color);"></span> Raíz (1)</div>
            <div class="mode-legend-item"><span class="mode-legend-color" style="background: var(--third-color);"></span> 3ª (b3/3)</div>
            <div class="mode-legend-item"><span class="mode-legend-color" style="background: var(--fifth-color);"></span> 5ª (b5/5/#5)</div>
            <div class="mode-legend-item"><span class="mode-legend-color" style="background: var(--seventh-color);"></span> 7ª (b7/7)</div>
            <div class="mode-legend-item"><span class="mode-legend-color" style="background: var(--tension-color);"></span> Otras (2, 4, 6)</div>
        `;
    }

    drawScaleFretboard('mode-fretboard', scaleNotes, NOTES.indexOf(root));
}

function playModeScale() {
    const mode = document.getElementById('mode-selector').value;
    const root = currentChordData && currentChordData.root ? currentChordData.root : 'C';
    const scale = MODE_INTERVALS[mode].map(i => NOTES[(NOTES.indexOf(root) + i) % 12]);
    for (let i = 0; i < scale.length; i++) setTimeout(() => playNote(scale[i]), i * 350);
}

// =====================================================
// MAPA DE ESCALAS
// =====================================================
function initScaleMap() {
    const tonicSel = document.getElementById('map-tonic');
    const scaleSel = document.getElementById('map-scale');
    if (!tonicSel || !scaleSel) return;

    tonicSel.innerHTML = '';
    NOTES.forEach(note => { tonicSel.innerHTML += `<option value="${note}">${note}</option>`; });

    scaleSel.innerHTML = '';
    Object.entries(SCALES_DB).forEach(([key, s]) => {
        scaleSel.innerHTML += `<option value="${key}">${s.name}</option>`;
    });

    updateScaleMap();
}

function updateScaleMap() {
    const tonic = document.getElementById('map-tonic').value;
    const scaleKey = document.getElementById('map-scale').value;
    const viewMode = document.getElementById('map-view').value;
    const scale = SCALES_DB[scaleKey];

    if (!scale) return;

    const rootIndex = NOTES.indexOf(tonic);
    const scaleNotes = scale.intervals.map(i => NOTES[(rootIndex + i) % 12]);
    const formula = scale.intervals.map(i => INTERVAL_NAMES[i]).join(' ');

    const infoBox = document.getElementById('scale-map-info');
    infoBox.innerHTML = `
        <h4>${scale.name} en ${tonic}</h4>
        <p><strong>Notas:</strong> ${scaleNotes.join(' - ')}</p>
        <p><strong>Fórmula:</strong> ${formula}</p>
        <p><strong>Uso:</strong> ${scale.uso}</p>
    `;

    drawScaleMapFretboard(tonic, scale, viewMode);
}

function drawScaleMapFretboard(tonic, scale, viewMode) {
    const container = document.getElementById('scale-map-fretboard');
    if (!container) return;

    const width = 900, height = 260;
    const marginLeft = 60, marginTop = 40, marginRight = 20, marginBottom = 20;
    const drawWidth = width - marginLeft - marginRight;
    const drawHeight = height - marginTop - marginBottom;
    const stringSpacing = drawHeight / 5;
    const fretSpacing = drawWidth / 13;

    const rootIndex = NOTES.indexOf(tonic);
    const scaleIntervals = scale.intervals;
    const scaleNotesSet = new Set(scaleIntervals.map(i => (rootIndex + i) % 12));

    let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" style="background:#2a1f1a; border-radius:10px; width:100%; height:auto; display:block;">`;

    if (cagedActive) {
        const cagedNames = ['C', 'A', 'G', 'E', 'D'];
        const cagedRanges = [[0, 3], [2, 5], [4, 7], [7, 10], [9, 12]];
        cagedRanges.forEach((range, i) => {
            const x1 = marginLeft + (range[0] * fretSpacing);
            const x2 = marginLeft + (range[1] * fretSpacing);
            const centerX = (x1 + x2) / 2;

            svg += `<rect class="caged-region" x="${x1}" y="${marginTop - 10}" width="${x2 - x1}" height="${drawHeight + 20}" />`;
            svg += `<rect x="${centerX - 30}" y="${marginTop - 32}" width="60" height="18" rx="9" fill="#ff6b00" opacity="0.9" />`;
            svg += `<text class="caged-label" x="${centerX}" y="${marginTop - 19}" text-anchor="middle" fill="#000" font-size="11" font-weight="bold">Caja ${cagedNames[i]}</text>`;
        });
    }

    for (let i = 0; i <= 12; i++) {
        svg += `<line x1="${marginLeft + (i * fretSpacing)}" y1="${marginTop}" x2="${marginLeft + (i * fretSpacing)}" y2="${height - marginBottom}" stroke="#777" stroke-width="${i === 0 ? 6 : 2}" />`;
    }

    for (let i = 0; i < 6; i++) {
        const y = marginTop + (i * stringSpacing);
        svg += `<line x1="${marginLeft}" y1="${y}" x2="${width - marginRight}" y2="${y}" stroke="#ccc" stroke-width="${5 - (i * 0.6)}" />`;
        svg += `<text x="${marginLeft - 15}" y="${y}" fill="#ff6b00" font-size="14" font-weight="bold" text-anchor="end" dominant-baseline="middle">${STRINGS[i]}</text>`;
    }

    for (let i = 1; i <= 12; i++) {
        svg += `<text x="${marginLeft + ((i - 0.5) * fretSpacing)}" y="${marginTop - 12}" fill="#888" font-size="12" text-anchor="middle">${i}</text>`;
    }

    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
        const y = marginTop + (stringIndex * stringSpacing);
        const openIndex = NOTES.indexOf(OPEN_NOTES[stringIndex]);

        for (let fret = 0; fret <= 12; fret++) {
            const noteIndex = (openIndex + fret) % 12;
            if (scaleNotesSet.has(noteIndex)) {
                const x = (fret === 0) ? marginLeft - 18 : marginLeft + ((fret - 0.5) * fretSpacing);
                const intervalFromRoot = (noteIndex - rootIndex + 12) % 12;

                let fillColor = 'var(--tension-color)';
                if (intervalFromRoot === 0) fillColor = 'var(--root-color)';
                else if (intervalFromRoot === 3 || intervalFromRoot === 4) fillColor = 'var(--third-color)';
                else if (intervalFromRoot === 6 || intervalFromRoot === 7 || intervalFromRoot === 8) fillColor = 'var(--fifth-color)';
                else if (intervalFromRoot === 10 || intervalFromRoot === 11) fillColor = 'var(--seventh-color)';

                let displayText = viewMode === 'notes' ? NOTES[noteIndex] : INTERVAL_NAMES[intervalFromRoot];

                svg += `<circle cx="${x}" cy="${y}" r="12" fill="${fillColor}" stroke="#000" stroke-width="1.5" />`;
                svg += `<text x="${x}" y="${y}" fill="#000" font-size="10" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${displayText}</text>`;
            }
        }
    }

    svg += `</svg>`;
    container.innerHTML = svg;
}

function toggleCaged() {
    cagedActive = !cagedActive;
    const btn = document.getElementById('caged-toggle');
    if (btn) btn.classList.toggle('active', cagedActive);

    const explanation = document.getElementById('caged-explanation');
    if (explanation) {
        explanation.style.display = cagedActive ? 'block' : 'none';
        if (cagedActive) {
            setTimeout(() => explanation.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }
    }

    updateScaleMap();
}

function playScaleMap() {
    const tonic = document.getElementById('map-tonic').value;
    const scaleKey = document.getElementById('map-scale').value;
    const scale = SCALES_DB[scaleKey];
    if (!scale) return;

    const rootIndex = NOTES.indexOf(tonic);
    const scaleNotes = scale.intervals.map(i => NOTES[(rootIndex + i) % 12]);

    for (let i = 0; i < scaleNotes.length; i++) setTimeout(() => playNote(scaleNotes[i]), i * 320);
    for (let i = scaleNotes.length - 2; i >= 0; i--) {
        setTimeout(() => playNote(scaleNotes[i]), (scaleNotes.length + (scaleNotes.length - 2 - i)) * 320);
    }
}

// =====================================================
// ¿QUÉ TOCO?
// =====================================================
function renderWhatToPlay(chordData) {
    const container = document.getElementById('what-to-play-content');
    if (!container || !chordData || !chordData.quality) {
        if (container) container.innerHTML = '<p class="empty-state">Toca un acorde primero.</p>';
        return;
    }

    const root = chordData.root;
    const suffix = chordData.suffix;
    const isMinor = suffix.includes('m') && !suffix.includes('maj');
    const isDominant = suffix.includes('7') && !suffix.includes('maj') && !isMinor;
    const isMajor7 = suffix.includes('maj7');
    const isDim = suffix.includes('dim');
    const isAug = suffix.includes('aug');

    const scalesList = [];

    if (isMajor7) {
        scalesList.push({ name: `${root} Jónica`, key: 'jónico', desc: 'Mayor natural.' });
        scalesList.push({ name: `${root} Lidia`, key: 'lidio', desc: 'Mayor con #4.' });
        scalesList.push({ name: `${root} Pentatónica Mayor`, key: 'pent_mayor', desc: 'Simple.' });
    } else if (isMinor) {
        scalesList.push({ name: `${root} Eólica`, key: 'eólico', desc: 'Menor natural.' });
        scalesList.push({ name: `${root} Dórica`, key: 'dórico', desc: 'Menor con 6ª mayor.' });
        scalesList.push({ name: `${root} Pentatónica Menor`, key: 'pent_menor', desc: 'Rock y blues.' });
        scalesList.push({ name: `${root} Blues`, key: 'blues', desc: 'Pentatónica + blue note.' });
    } else if (isDominant) {
        scalesList.push({ name: `${root} Mixolidia`, key: 'mixolidio', desc: 'La del dominante.' });
        scalesList.push({ name: `${root} Blues`, key: 'blues', desc: 'Con blue note.' });
        scalesList.push({ name: `${root} Frigia Dominante`, key: null, customIntervals: [0, 1, 4, 5, 7, 8, 10], desc: 'V7 con b9 y b13.' });
    } else if (isDim) {
        scalesList.push({ name: `${root} Locria`, key: 'locrio', desc: 'Base del disminuido.' });
    } else if (isAug) {
        scalesList.push({ name: `${root} Aumentada`, key: null, customIntervals: [0, 2, 4, 6, 8, 10], desc: 'Tonos enteros.' });
    } else {
        scalesList.push({ name: `${root} Jónica`, key: 'jónico', desc: 'Mayor natural.' });
        scalesList.push({ name: `${root} Lidia`, key: 'lidio', desc: 'Mayor con #4.' });
        scalesList.push({ name: `${root} Pentatónica Mayor`, key: 'pent_mayor', desc: 'Simple.' });
    }

    const arpeggio = chordData.quality.intervals.map(i => NOTES[(NOTES.indexOf(root) + i) % 12]);
    const tensions = getAvailableTensions(chordData);

    const rootIdx = NOTES.indexOf(root);
    const nextChords = [];
    if (isDominant) {
        nextChords.push(NOTES[(rootIdx + 5) % 12]);
        nextChords.push(NOTES[(rootIdx + 5) % 12] + 'm');
    } else if (isMinor) {
        nextChords.push(NOTES[(rootIdx + 5) % 12] + 'm');
        nextChords.push(NOTES[(rootIdx + 3) % 12]);
        nextChords.push(NOTES[(rootIdx + 7) % 12] + '7');
    } else {
        nextChords.push(NOTES[(rootIdx + 5) % 12]);
        nextChords.push(NOTES[(rootIdx + 7) % 12]);
        nextChords.push(NOTES[(rootIdx + 9) % 12] + 'm');
        nextChords.push(NOTES[(rootIdx + 2) % 12] + 'm');
    }

    let html = '';

    html += `<div class="wtp-section"><h4>🎼 Escalas para improvisar</h4><div class="wtp-suggestions">`;
    scalesList.forEach((s, i) => {
        html += `<div class="wtp-card" onclick="showWtpDetail('scale', ${i}, '${root}')">
            <div class="wtp-card-title">${s.name}</div>
            <div class="wtp-card-desc">${s.desc}</div>
            <span class="wtp-card-tag">Ver en mástil</span>
        </div>`;
    });
    html += `</div></div>`;

    html += `<div class="wtp-section"><h4>🎸 Arpegio del acorde</h4><div class="wtp-suggestions">`;
    html += `<div class="wtp-card" onclick="showWtpDetail('arpeggio', 0, '${root}')">
        <div class="wtp-card-title">${chordData.primaryName} (arpegio)</div>
        <div class="wtp-card-desc">Notas: ${arpeggio.join(' - ')}</div>
        <span class="wtp-card-tag">Ver en mástil</span>
    </div>`;
    html += `</div></div>`;

    html += `<div class="wtp-section"><h4>✨ Tensiones que puedes añadir</h4><div class="wtp-info">`;
    tensions.forEach(t => { html += `<div style="margin-bottom:8px;"><strong>${t.name}:</strong> ${t.description}</div>`; });
    html += `</div></div>`;

    html += `<div class="wtp-section"><h4>➡️ Acordes que suelen seguir</h4><div class="wtp-suggestions">`;
    nextChords.forEach(chord => {
        html += `<div class="wtp-card" onclick="loadChordFromDB('${chord}')"><div class="wtp-card-title">${chord}</div><div class="wtp-card-desc">Clic para cargar</div></div>`;
    });
    html += `</div></div>`;

    html += `<div id="wtp-detail"></div>`;

    container.innerHTML = html;

    window.__wtpScalesList = scalesList;
    window.__wtpArpeggio = arpeggio;
    window.__wtpRoot = root;
}

function showWtpDetail(type, index, root) {
    const detail = document.getElementById('wtp-detail');
    if (!detail) return;

    let scaleNotes = [];
    let title = '';

    if (type === 'scale') {
        const scaleInfo = window.__wtpScalesList[index];
        title = scaleInfo.name;

        if (scaleInfo.key) {
            const s = SCALES_DB[scaleInfo.key];
            scaleNotes = s.intervals.map(i => NOTES[(NOTES.indexOf(root) + i) % 12]);
        } else if (scaleInfo.customIntervals) {
            scaleNotes = scaleInfo.customIntervals.map(i => NOTES[(NOTES.indexOf(root) + i) % 12]);
        }
    } else if (type === 'arpeggio') {
        title = `Arpegio de ${root}`;
        scaleNotes = window.__wtpArpeggio;
    }

    detail.className = 'wtp-detail-panel';
    detail.innerHTML = `
        <h5>${title}</h5>
        <p><strong>Notas:</strong> ${scaleNotes.join(' - ')}</p>
        <div id="wtp-mini-fretboard" style="margin-top:10px;"></div>
        <div class="wtp-detail-actions">
            <button class="btn-primary" onclick="playNotes(['${scaleNotes.join("','")}'])">
                <i class="fas fa-play"></i> Escuchar
            </button>
            <button class="btn-reset" onclick="document.getElementById('wtp-detail').innerHTML=''">Cerrar</button>
        </div>
    `;

    drawMiniFretboard('wtp-mini-fretboard', scaleNotes, root);
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function drawMiniFretboard(containerId, scaleNotes, root) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = 700, height = 160;
    const marginLeft = 50, marginTop = 25, marginRight = 15, marginBottom = 10;
    const drawWidth = width - marginLeft - marginRight;
    const drawHeight = height - marginTop - marginBottom;
    const stringSpacing = drawHeight / 5;
    const fretSpacing = drawWidth / 13;

    const rootIndex = NOTES.indexOf(root);

    let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" style="background:#2a1f1a; border-radius:8px; width:100%; height:auto; display:block;">`;

    for (let i = 0; i <= 13; i++) {
        svg += `<line x1="${marginLeft + (i * fretSpacing)}" y1="${marginTop}" x2="${marginLeft + (i * fretSpacing)}" y2="${height - marginBottom}" stroke="#777" stroke-width="${i === 0 ? 5 : 1.5}" />`;
    }
    for (let i = 0; i < 6; i++) {
        const y = marginTop + (i * stringSpacing);
        svg += `<line x1="${marginLeft}" y1="${y}" x2="${width - marginRight}" y2="${y}" stroke="#ccc" stroke-width="${4 - (i * 0.5)}" />`;
        svg += `<text x="${marginLeft - 8}" y="${y}" fill="#ff6b00" font-size="10" font-weight="bold" text-anchor="end" dominant-baseline="middle">${STRINGS[i]}</text>`;
    }
    for (let i = 1; i <= 12; i++) {
        svg += `<text x="${marginLeft + ((i - 0.5) * fretSpacing)}" y="${marginTop - 8}" fill="#888" font-size="9" text-anchor="middle">${i}</text>`;
    }

    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
        const y = marginTop + (stringIndex * stringSpacing);
        const openIndex = NOTES.indexOf(OPEN_NOTES[stringIndex]);
        for (let fret = 0; fret <= 12; fret++) {
            const noteIndex = (openIndex + fret) % 12;
            const noteName = NOTES[noteIndex];
            if (scaleNotes.includes(noteName)) {
                const x = (fret === 0) ? marginLeft - 12 : marginLeft + ((fret - 0.5) * fretSpacing);
                const isRoot = noteIndex === rootIndex;
                const fillColor = isRoot ? '#ff6b00' : '#4a9eff';
                svg += `<circle cx="${x}" cy="${y}" r="8" fill="${fillColor}" stroke="#000" stroke-width="1" />`;
                svg += `<text x="${x}" y="${y}" fill="#000" font-size="8" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${noteName}</text>`;
            }
        }
    }
    svg += `</svg>`;
    container.innerHTML = svg;
}

function playNotes(notes) {
    for (let i = 0; i < notes.length; i++) setTimeout(() => playNote(notes[i]), i * 320);
}

// =====================================================
// HIGHLIGHT CÍRCULO
// =====================================================
function highlightCircleForKey(key) {
    document.querySelectorAll('.circle-segment').forEach(el => el.classList.remove('auto-highlight', 'active'));
    const majorSeg = document.getElementById(`seg-major-${key}`);
    if (majorSeg) majorSeg.classList.add('auto-highlight');
    selectKey(key);
}

function clearCircleHighlight() {
    document.querySelectorAll('.circle-segment').forEach(el => el.classList.remove('auto-highlight', 'active'));
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
// CÍRCULO DE QUINTAS
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
    if (!info) return;

    const isMinor = key.includes('m');
    const root = key.replace('m', '');
    const rootIndex = NOTES.indexOf(root);

    const activeEl = document.getElementById(isMinor ? `seg-minor-${key}` : `seg-major-${key}`);
    if (activeEl && !activeEl.classList.contains('auto-highlight')) {
        document.querySelectorAll('.circle-segment').forEach(el => el.classList.remove('active'));
        activeEl.classList.add('active');
    }

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
            <div class="axis-card tonic"><strong>Tónica (I)</strong>${root}${isMinor ? 'm' : ''}</div>
            <div class="axis-card subdominant"><strong>Subdominante (IV)</strong>${subdominant}</div>
            <div class="axis-card dominant"><strong>Dominante (V7)</strong>${dominant}</div>
        </div>
        ${scaleHTML}
    `;
}

// =====================================================
// LECCIONES
// =====================================================
function renderLessons() {
    const container = document.getElementById('lessons-content');
    if (!container) return;

    container.innerHTML = '';

    LESSONS_DB.forEach(lesson => {
        const item = document.createElement('div');
        item.className = 'lesson-item';
        item.id = `lesson-${lesson.id}`;

        item.innerHTML = `
            <div class="lesson-header" onclick="toggleLesson('${lesson.id}')">
                <div class="lesson-icon">${lesson.icon}</div>
                <div class="lesson-title-group">
                    <div class="lesson-title">${lesson.title}</div>
                    <div class="lesson-subtitle">${lesson.subtitle}</div>
                </div>
                <div class="lesson-toggle-icon">▼</div>
            </div>
            <div class="lesson-body">
                <div class="lesson-content">
                    ${lesson.content}
                    <div class="lesson-example">
                        <div class="lesson-example-title">🎧 ${lesson.exampleTitle}</div>
                        <div id="lesson-fret-${lesson.id}"></div>
                        <div class="lesson-example-actions">
                            <button class="btn-primary" onclick="playLessonExample('${lesson.id}')">
                                <i class="fas fa-play"></i> Escuchar ejemplo
                            </button>
                        </div>
                    </div>
                    <div class="lesson-exercise">
                        <div class="lesson-exercise-title">✏️ Ejercicio práctico</div>
                        <p>${lesson.exercise}</p>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(item);
    });
}

function toggleLesson(lessonId) {
    const item = document.getElementById(`lesson-${lessonId}`);
    if (!item) return;

    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('open'));

    if (!isOpen) {
        item.classList.add('open');
        openLessonId = lessonId;

        const lesson = LESSONS_DB.find(l => l.id === lessonId);
        if (lesson) {
            setTimeout(() => {
                drawMiniFretboard(`lesson-fret-${lessonId}`, lesson.exampleNotes, lesson.exampleNotes[0]);
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    } else {
        openLessonId = null;
    }
}

function playLessonExample(lessonId) {
    const lesson = LESSONS_DB.find(l => l.id === lessonId);
    if (!lesson) return;
    for (let i = 0; i < lesson.exampleNotes.length; i++) {
        setTimeout(() => playNote(lesson.exampleNotes[i]), i * 400);
    }
}

// =====================================================
// PRÁCTICA GUIADA
// =====================================================
const EXERCISE_TYPES = [
    { id: 'intervalos', title: '🎵 Identifica el intervalo', desc: 'Te damos dos notas, elige el intervalo correcto' },
    { id: 'terceras', title: '🎸 Mayor o menor', desc: 'Te damos un intervalo de 3ª, di si es mayor o menor' },
    { id: 'notas_acorde', title: '🎼 Encuentra las notas', desc: 'Te damos un acorde, elige sus notas correctas' },
    { id: 'funciones', title: '🎯 Función armónica', desc: 'Te damos un acorde, elige su función en la tonalidad' },
    { id: 'raiz', title: '🔍 Encuentra la raíz', desc: 'Te damos varias notas, elige cuál es la raíz' }
];

const ALL_INTERVALS = [
    { semitones: 0, name: 'Unísono' },
    { semitones: 1, name: '2ª menor' },
    { semitones: 2, name: '2ª mayor' },
    { semitones: 3, name: '3ª menor' },
    { semitones: 4, name: '3ª mayor' },
    { semitones: 5, name: '4ª justa' },
    { semitones: 6, name: 'Tritono' },
    { semitones: 7, name: '5ª justa' },
    { semitones: 8, name: '6ª menor' },
    { semitones: 9, name: '6ª mayor' },
    { semitones: 10, name: '7ª menor' },
    { semitones: 11, name: '7ª mayor' }
];

function initPractice() {
    loadPracticeStats();
    renderPracticeStats();
    renderPracticeMenu();
}

function loadPracticeStats() {
    try {
        const saved = localStorage.getItem('tavo_practice_stats');
        if (saved) {
            practiceStats = JSON.parse(saved);
        } else {
            practiceStats = { correct: 0, wrong: 0, streak: 0, best: 0, byExercise: {} };
        }
    } catch (e) {
        practiceStats = { correct: 0, wrong: 0, streak: 0, best: 0, byExercise: {} };
    }
}

function savePracticeStats() {
    try {
        localStorage.setItem('tavo_practice_stats', JSON.stringify(practiceStats));
    } catch (e) { /* ignore */ }
}

function renderPracticeStats() {
    const container = document.getElementById('practice-stats');
    if (!container) return;

    const total = practiceStats.correct + practiceStats.wrong;
    const rate = total > 0 ? Math.round((practiceStats.correct / total) * 100) : 0;

    container.innerHTML = `
        <div class="stat-card">
            <span class="stat-value">${practiceStats.correct}</span>
            <span class="stat-label">Aciertos</span>
        </div>
        <div class="stat-card">
            <span class="stat-value">${practiceStats.wrong}</span>
            <span class="stat-label">Fallos</span>
        </div>
        <div class="stat-card">
            <span class="stat-value">${rate}%</span>
            <span class="stat-label">Precisión</span>
        </div>
        <div class="stat-card">
            <span class="stat-value">${practiceStats.streak}</span>
            <span class="stat-label">Racha</span>
        </div>
        <div class="stat-card">
            <span class="stat-value">${practiceStats.best}</span>
            <span class="stat-label">Mejor racha</span>
        </div>
    `;
}

function renderPracticeMenu() {
    const container = document.getElementById('practice-menu');
    if (!container) return;

    container.innerHTML = '';

    EXERCISE_TYPES.forEach(ex => {
        const btn = document.createElement('button');
        btn.className = 'practice-menu-btn';
        btn.innerHTML = `
            <span class="btn-title">${ex.title}</span>
            <span class="btn-desc">${ex.desc}</span>
        `;
        btn.onclick = () => startExercise(ex.id);
        container.appendChild(btn);
    });

    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-stats-btn';
    resetBtn.textContent = '🗑️ Reiniciar estadísticas';
    resetBtn.onclick = () => {
        if (confirm('¿Seguro que quieres reiniciar las estadísticas?')) {
            practiceStats = { correct: 0, wrong: 0, streak: 0, best: 0, byExercise: {} };
            savePracticeStats();
            renderPracticeStats();
        }
    };
    container.appendChild(resetBtn);
}

function startExercise(typeId) {
    currentExercise = typeId;

    document.querySelectorAll('.practice-menu-btn').forEach(btn => btn.classList.remove('active'));
    const btns = document.querySelectorAll('.practice-menu-btn');
    EXERCISE_TYPES.forEach((ex, i) => {
        if (ex.id === typeId && btns[i]) btns[i].classList.add('active');
    });

    generateExercise();
}

function generateExercise() {
    const container = document.getElementById('practice-exercise');
    if (!container || !currentExercise) return;

    let question, options, correctIndex, explanation;

    if (currentExercise === 'intervalos') {
        const rootIndex = Math.floor(Math.random() * 12);
        const intervalSemitones = [2, 3, 4, 5, 7, 9, 10, 11][Math.floor(Math.random() * 8)];
        const secondIndex = (rootIndex + intervalSemitones) % 12;
        const rootNote = NOTES[rootIndex];
        const secondNote = NOTES[secondIndex];
        const correctInterval = ALL_INTERVALS.find(i => i.semitones === intervalSemitones);

        question = `¿Qué intervalo hay entre <strong>${rootNote}</strong> y <strong>${secondNote}</strong>?`;

        const nearbySemitones = ALL_INTERVALS
            .filter(i => i.semitones !== intervalSemitones)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const allOptions = [
            correctInterval.name,
            nearbySemitones[0].name,
            nearbySemitones[1].name,
            nearbySemitones[2].name
        ];

        options = allOptions.sort(() => 0.5 - Math.random());
        correctIndex = options.indexOf(correctInterval.name);
        explanation = `${rootNote} → ${secondNote} = ${intervalSemitones} semitonos = ${correctInterval.name}`;

    } else if (currentExercise === 'terceras') {
        const rootIndex = Math.floor(Math.random() * 12);
        const isMajor = Math.random() < 0.5;
        const semitones = isMajor ? 4 : 3;
        const secondIndex = (rootIndex + semitones) % 12;
        const rootNote = NOTES[rootIndex];
        const secondNote = NOTES[secondIndex];

        question = `La 3ª entre <strong>${rootNote}</strong> y <strong>${secondNote}</strong> es...`;
        options = ['Mayor', 'Menor'];
        correctIndex = isMajor ? 0 : 1;
        explanation = isMajor
            ? `${rootNote} → ${secondNote} = 4 semitonos = 3ª mayor (alegre)`
            : `${rootNote} → ${secondNote} = 3 semitonos = 3ª menor (melancólico)`;

    } else if (currentExercise === 'notas_acorde') {
        const chordNames = ['C', 'G', 'D', 'A', 'E', 'F', 'Am', 'Em', 'Dm', 'Cmaj7', 'G7', 'Am7'];
        const chord = chordNames[Math.floor(Math.random() * chordNames.length)];
        const rootNote = extractRoot(chord);
        const isMinor = chord.includes('m') && !chord.includes('maj');
        const isMaj7 = chord.includes('maj7');
        const is7 = chord.includes('7') && !isMaj7 && !isMinor;
        const isM7 = chord.includes('m7') && !chord.includes('maj');

        let intervals;
        if (isMaj7) intervals = [0, 4, 7, 11];
        else if (isM7) intervals = [0, 3, 7, 10];
        else if (is7) intervals = [0, 4, 7, 10];
        else if (isMinor) intervals = [0, 3, 7];
        else intervals = [0, 4, 7];

        const rootIndex = NOTES.indexOf(rootNote);
        const notes = intervals.map(i => NOTES[(rootIndex + i) % 12]);

        question = `¿Qué notas forman <strong>${chord}</strong>?`;

        const correctAnswer = notes.join(' - ');
        const wrong1 = notes.map((n, i) => i === 1 ? NOTES[(NOTES.indexOf(n) + 1) % 12] : n).join(' - ');
        const wrong2 = notes.map((n, i) => i === notes.length - 1 ? NOTES[(NOTES.indexOf(n) + 1) % 12] : n).join(' - ');
        const wrong3 = notes.map((n, i) => i === 0 ? NOTES[(NOTES.indexOf(n) + 2) % 12] : n).join(' - ');

        options = [correctAnswer, wrong1, wrong2, wrong3].sort(() => 0.5 - Math.random());
        correctIndex = options.indexOf(correctAnswer);
        explanation = `${chord}: raíz + ${isMinor ? '3ª menor' : '3ª mayor'} + 5ª justa${(is7 || isMaj7 || isM7) ? ' + 7ª' : ''}`;

    } else if (currentExercise === 'funciones') {
        const tones = ['C', 'Dm', 'Em', 'F', 'G7', 'Am'];
        const functions = ['Tónica (I)', 'Subdominante (ii)', 'Mediante (iii)', 'Subdominante (IV)', 'Dominante (V7)', 'Submediante (vi)'];
        const idx = Math.floor(Math.random() * tones.length);
        const chord = tones[idx];
        const correctFunction = functions[idx];

        question = `En la tonalidad de <strong>C mayor</strong>, ¿qué función tiene <strong>${chord}</strong>?`;

        const wrongOptions = functions.filter((f, i) => i !== idx).sort(() => 0.5 - Math.random()).slice(0, 3);
        options = [correctFunction, ...wrongOptions].sort(() => 0.5 - Math.random());
        correctIndex = options.indexOf(correctFunction);
        explanation = `${chord} es el ${correctFunction} en C mayor`;

    } else if (currentExercise === 'raiz') {
        const chordNames = ['C', 'G', 'D', 'A', 'E', 'F', 'Am', 'Em', 'Dm', 'G7', 'Cmaj7'];
        const chord = chordNames[Math.floor(Math.random() * chordNames.length)];
        const rootNote = extractRoot(chord);
        const isMinor = chord.includes('m') && !chord.includes('maj');
        const isMaj7 = chord.includes('maj7');
        const is7 = chord.includes('7') && !isMaj7;

        let intervals;
        if (isMaj7) intervals = [0, 4, 7, 11];
        else if (is7) intervals = [0, 4, 7, 10];
        else if (isMinor) intervals = [0, 3, 7];
        else intervals = [0, 4, 7];

        const rootIndex = NOTES.indexOf(rootNote);
        const notes = intervals.map(i => NOTES[(rootIndex + i) % 12]);

        question = `¿Cuál es la <strong>raíz</strong> del acorde formado por las notas <strong>${notes.join(' - ')}</strong>?`;

        const wrongRoots = NOTES.filter(n => n !== rootNote).sort(() => 0.5 - Math.random()).slice(0, 3);
        options = [rootNote, ...wrongRoots].sort(() => 0.5 - Math.random());
        correctIndex = options.indexOf(rootNote);
        explanation = `La raíz es ${rootNote} porque el acorde se llama ${chord}`;
    }

    exerciseState = {
        type: currentExercise,
        question: question,
        options: options,
        correctIndex: correctIndex,
        explanation: explanation,
        answered: false
    };

    renderExercise();
}

function renderExercise() {
    const container = document.getElementById('practice-exercise');
    if (!container || !exerciseState) return;

    const total = practiceStats.correct + practiceStats.wrong;

    let html = `
        <div class="exercise-header">
            <h3 class="exercise-title">${EXERCISE_TYPES.find(e => e.id === exerciseState.type).title}</h3>
            <div class="exercise-progress">
                Aciertos: <strong>${practiceStats.correct}</strong> ·
                Racha: <strong>${practiceStats.streak}</strong> ·
                Total: <strong>${total}</strong>
            </div>
        </div>
        <div class="exercise-question">${exerciseState.question}</div>
        <div class="exercise-options">
    `;

    exerciseState.options.forEach((opt, i) => {
        html += `<button class="exercise-option" onclick="checkAnswer(${i})" ${exerciseState.answered ? 'disabled' : ''}>${opt}</button>`;
    });

    html += `</div>`;

    if (exerciseState.answered) {
        html += `<div class="exercise-feedback ${exerciseState.isCorrect ? 'correct' : 'wrong'}">
            ${exerciseState.isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}<br>
            <strong>Explicación:</strong> ${exerciseState.explanation}
        </div>`;
        html += `<div class="exercise-actions">
            <button class="btn-primary" onclick="nextExercise()">
                <i class="fas fa-arrow-right"></i> Siguiente ejercicio
            </button>
        </div>`;
    }

    container.innerHTML = html;

    if (exerciseState.answered) {
        const options = container.querySelectorAll('.exercise-option');
        options.forEach((opt, i) => {
            if (i === exerciseState.correctIndex) opt.classList.add('correct');
            if (i === exerciseState.selectedIndex && !exerciseState.isCorrect) opt.classList.add('wrong');
        });
    }
}

function checkAnswer(index) {
    if (!exerciseState || exerciseState.answered) return;

    exerciseState.answered = true;
    exerciseState.selectedIndex = index;
    exerciseState.isCorrect = (index === exerciseState.correctIndex);

    if (exerciseState.isCorrect) {
        practiceStats.correct++;
        practiceStats.streak++;
        if (practiceStats.streak > practiceStats.best) practiceStats.best = practiceStats.streak;
    } else {
        practiceStats.wrong++;
        practiceStats.streak = 0;
    }

    if (!practiceStats.byExercise[exerciseState.type]) {
        practiceStats.byExercise[exerciseState.type] = { correct: 0, wrong: 0 };
    }
    if (exerciseState.isCorrect) {
        practiceStats.byExercise[exerciseState.type].correct++;
    } else {
        practiceStats.byExercise[exerciseState.type].wrong++;
    }

    savePracticeStats();
    renderPracticeStats();
    renderExercise();
}

function nextExercise() {
    generateExercise();
}

// =====================================================
// NAVEGADOR DE TONALIDADES
// =====================================================
function initKeyNavigator() {
    const selector = document.getElementById('key-nav-selector');
    if (!selector) return;
    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    selector.innerHTML = '';
    keys.forEach(key => { selector.innerHTML += `<option value="${key}">${key} mayor</option>`; });
    updateKeyNavigator();
}

function updateKeyNavigator() {
    const selector = document.getElementById('key-nav-selector');
    if (!selector) return;
    const currentKey = selector.value;
    drawMiniCircle(currentKey);
    renderKeyNavInfo(currentKey);
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
    if (selector) { selector.value = key; updateKeyNavigator(); }
}

function renderKeyNavInfo(currentKey) {
    const container = document.getElementById('key-nav-info');
    if (!container) return;

    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    const currentIndex = keys.indexOf(currentKey);
    const dominant = keys[(currentIndex + 1) % 12];
    const subdominant = keys[(currentIndex + 11) % 12];
    const relativeMinor = NOTES[(NOTES.indexOf(currentKey) + 9) % 12] + 'm';
    const twoFifths = keys[(currentIndex + 2) % 12];
    const twoFourths = keys[(currentIndex + 10) % 12];

    container.innerHTML = `
        <h3>Tonalidad: ${currentKey} mayor</h3>
        <h4>🎯 Tonalidades vecinas</h4>
        <ul>
            <li><strong>Dominante:</strong> ${dominant} mayor</li>
            <li><strong>Subdominante:</strong> ${subdominant} mayor</li>
            <li><strong>Relativa menor:</strong> ${relativeMinor}</li>
        </ul>
        <h4>🔀 Modulaciones típicas</h4>
        <ul>
            <li><strong>A dominante (${dominant}):</strong> muy común</li>
            <li><strong>A subdominante (${subdominant}):</strong> suaviza tensión</li>
            <li><strong>A relativa (${relativeMinor}):</strong> cambio de modo</li>
        </ul>
        <h4>🌐 Tonalidades lejanas</h4>
        <ul>
            <li>${twoFifths} mayor (2 pasos)</li>
            <li>${twoFourths} mayor (2 pasos)</li>
        </ul>
        <p style="margin-top:15px; font-size:0.9em; color:#888; border-left:3px solid #ff6b00; padding-left:12px;">
            Cuanto más cerca estén dos tonalidades en el círculo, más fácil es modular entre ellas.
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
    const container = document.getElementById('search-results');
    container.innerHTML = '';
    Object.keys(CHORD_DB).forEach(chord => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.textContent = chord;
        div.onclick = () => loadChordFromDB(chord);
        container.appendChild(div);
    });
}

function loadChordFromDB(chord) {
    if (CHORD_DB[chord]) {
        currentFretboard = [...CHORD_DB[chord]];
        document.querySelectorAll('.string-row select').forEach((select, i) => {
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
    if (origin === dest) { resultBox.innerHTML = '<p>Ya estás en esa tonalidad.</p>'; return; }

    const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
    let current = keys.indexOf(origin);
    const destIdx = keys.indexOf(dest);
    const path = [];
    while (current !== destIdx) { current = (current + 1) % 12; path.push(keys[current]); }

    resultBox.innerHTML = `
        <p><strong>Ruta:</strong> ${origin} → ${path.join(' → ')}</p>
        <p><strong>Paso 1:</strong> Tocar el V grado de ${origin} (${keys[(keys.indexOf(origin) + 7) % 12]})</p>
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

    let dominantsList, subtitle;
    if (isMinor) {
        subtitle = `Tonalidad menor: <strong>${root} menor</strong>`;
        dominantsList = [
            { grado: 'V7/III', target: NOTES[(rootIndex + 3) % 12], rootOfDominant: NOTES[(rootIndex + 10) % 12] },
            { grado: 'V7/iv', target: NOTES[(rootIndex + 5) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 0) % 12] },
            { grado: 'V7/v', target: NOTES[(rootIndex + 7) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 2) % 12] },
            { grado: 'V7/VI', target: NOTES[(rootIndex + 8) % 12], rootOfDominant: NOTES[(rootIndex + 3) % 12] },
        ];
    } else {
        subtitle = `Tonalidad mayor: <strong>${root} mayor</strong>`;
        dominantsList = [
            { grado: 'V7/ii', target: NOTES[(rootIndex + 2) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 9) % 12] },
            { grado: 'V7/iii', target: NOTES[(rootIndex + 4) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 11) % 12] },
            { grado: 'V7/IV', target: NOTES[(rootIndex + 5) % 12], rootOfDominant: NOTES[(rootIndex + 0) % 12] },
            { grado: 'V7/V', target: NOTES[(rootIndex + 7) % 12], rootOfDominant: NOTES[(rootIndex + 2) % 12] },
            { grado: 'V7/vi', target: NOTES[(rootIndex + 9) % 12] + 'm', rootOfDominant: NOTES[(rootIndex + 4) % 12] },
        ];
    }

    let html = `<div style="margin-bottom:15px;"><p>${subtitle}</p></div>`;
    html += `<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:8px; margin-bottom:20px;">`;
    dominantsList.forEach(d => {
        const domRootIndex = NOTES.indexOf(d.rootOfDominant);
        const tritoneRoot = NOTES[(domRootIndex + 6) % 12];
        html += `
            <div class="result-item" style="text-align:left; padding:12px;">
                <div style="color:#ff6b00; font-weight:bold;">${d.grado}</div>
                <div><strong>Acorde:</strong> ${d.rootOfDominant}7</div>
                <div><strong>Resuelve a:</strong> ${d.target}</div>
                <div style="color:#888; font-size:0.85em;"><strong>Sust. Tritono:</strong> ${tritoneRoot}7</div>
            </div>
        `;
    });
    html += `</div>`;

    const vRoot = NOTES[(rootIndex + 7) % 12];
    const vTritone = NOTES[(NOTES.indexOf(vRoot) + 6) % 12] + '7';
    html += `<h4 style="color:#ff6b00;">Dominante principal (V7):</h4>`;
    html += `<div class="result-item" style="text-align:left; padding:12px;">
        <div><strong>Acorde:</strong> ${vRoot}7</div>
        <div><strong>Resuelve a:</strong> ${root}${isMinor ? 'm' : ''}</div>
        <div style="color:#888; font-size:0.9em;"><strong>Sust. de tritono:</strong> ${vTritone}</div>
    </div>`;

    resultBox.innerHTML = html;
}

function resetFretboard() {
    currentFretboard = [null, null, null, null, null, null];
    document.querySelectorAll('.string-row select').forEach(select => select.value = 'null');
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
    document.getElementById('analysis-content').innerHTML = '<p class="empty-state">Toca un acorde para ver su análisis armónico.</p>';
    document.getElementById('what-to-play-content').innerHTML = '<p class="empty-state">Aún no hay un acorde detectado.</p>';
    clearCircleHighlight();
}

// =====================================================
// LEYENDA EJEMPLO (C MAYOR)
// =====================================================
function drawLegendExampleFretboard() {
    const container = document.getElementById('legend-example-fretboard');
    if (!container) return;

    const tonic = 'C';
    const scale = SCALES_DB['jónico'];
    const rootIndex = NOTES.indexOf(tonic);
    const scaleNotesSet = new Set(scale.intervals.map(i => (rootIndex + i) % 12));

    const width = 700, height = 200;
    const marginLeft = 55, marginTop = 30, marginRight = 15, marginBottom = 15;
    const drawWidth = width - marginLeft - marginRight;
    const drawHeight = height - marginTop - marginBottom;
    const stringSpacing = drawHeight / 5;
    const fretSpacing = drawWidth / 13;

    let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" style="background:#2a1f1a; border-radius:8px; width:100%; height:auto; display:block;">`;

    for (let i = 0; i <= 12; i++) {
        svg += `<line x1="${marginLeft + (i * fretSpacing)}" y1="${marginTop}" x2="${marginLeft + (i * fretSpacing)}" y2="${height - marginBottom}" stroke="#777" stroke-width="${i === 0 ? 5 : 2}" />`;
    }
    for (let i = 0; i < 6; i++) {
        const y = marginTop + (i * stringSpacing);
        svg += `<line x1="${marginLeft}" y1="${y}" x2="${width - marginRight}" y2="${y}" stroke="#ccc" stroke-width="${4 - (i * 0.5)}" />`;
        svg += `<text x="${marginLeft - 10}" y="${y}" fill="#ff6b00" font-size="12" font-weight="bold" text-anchor="end" dominant-baseline="middle">${STRINGS[i]}</text>`;
    }
    for (let i = 1; i <= 12; i++) {
        svg += `<text x="${marginLeft + ((i - 0.5) * fretSpacing)}" y="${marginTop - 10}" fill="#888" font-size="10" text-anchor="middle">${i}</text>`;
    }

    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
        const y = marginTop + (stringIndex * stringSpacing);
        const openIndex = NOTES.indexOf(OPEN_NOTES[stringIndex]);
        for (let fret = 0; fret <= 12; fret++) {
            const noteIndex = (openIndex + fret) % 12;
            if (scaleNotesSet.has(noteIndex)) {
                const x = (fret === 0) ? marginLeft - 15 : marginLeft + ((fret - 0.5) * fretSpacing);
                const intervalFromRoot = (noteIndex - rootIndex + 12) % 12;

                let fillColor = 'var(--tension-color)';
                if (intervalFromRoot === 0) fillColor = 'var(--root-color)';
                else if (intervalFromRoot === 3 || intervalFromRoot === 4) fillColor = 'var(--third-color)';
                else if (intervalFromRoot === 6 || intervalFromRoot === 7 || intervalFromRoot === 8) fillColor = 'var(--fifth-color)';
                else if (intervalFromRoot === 10 || intervalFromRoot === 11) fillColor = 'var(--seventh-color)';

                svg += `<circle cx="${x}" cy="${y}" r="11" fill="${fillColor}" stroke="#000" stroke-width="1.5" />`;
                svg += `<text x="${x}" y="${y}" fill="#000" font-size="10" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${NOTES[noteIndex]}</text>`;
            }
        }
    }
    svg += `</svg>`;
    container.innerHTML = svg;
}

// =====================================================
// ANALIZADOR
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

function showChordPicker() { document.getElementById('chord-picker').style.display = 'block'; }
function hideChordPicker() { document.getElementById('chord-picker').style.display = 'none'; }

function addChordToProgression(chord) {
    if (progressionChords.length >= 8) { alert('Máximo 8 acordes'); return; }
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
        container.innerHTML = '<span class="empty-state" style="font-size:0.85em;">Sin acordes aún.</span>';
        return;
    }

    progressionChords.forEach((chord, i) => {
        const chip = document.createElement('span');
        chip.className = 'progression-chip';
        chip.innerHTML = `${chord}<button class="chip-remove" onclick="removeChordFromProgression(${i})">×</button>`;
        container.appendChild(chip);
    });
}

function analyzeProgression() {
    const input = document.getElementById('progression-input').value.trim();
    let chords = [...progressionChords];
    if (input) {
        chords = input.split(/[\s,\-]+/).filter(c => c.length > 0).slice(0, 8);
    }
    if (chords.length === 0) { alert('Añade al menos un acorde'); return; }
    const result = analyzeProgressionData(chords);
    renderProgressionAnalysis(chords, result);
}

function analyzeProgressionData(chords) {
    const keyCandidates = {};
    NOTES.forEach((key, keyIdx) => {
        const majorScale = MODE_INTERVALS['jónico'].map(i => NOTES[(keyIdx + i) % 12]);
        const minorScale = MODE_INTERVALS['eólico'].map(i => NOTES[(keyIdx + i) % 12]);
        let scoreMajor = 0, scoreMinor = 0;
        chords.forEach(chord => {
            const root = extractRoot(chord);
            if (majorScale.includes(root)) scoreMajor++;
            if (minorScale.includes(root)) scoreMinor++;
        });
        keyCandidates[key + ' mayor'] = scoreMajor;
        keyCandidates[key + ' menor'] = scoreMinor;
    });

    let bestKey = 'C mayor', bestScore = 0;
    Object.entries(keyCandidates).forEach(([k, score]) => {
        if (score > bestScore) { bestScore = score; bestKey = k; }
    });

    const isMinor = bestKey.includes('menor');
    const keyRoot = bestKey.split(' ')[0];
    const keyIndex = NOTES.indexOf(keyRoot);

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
        let func = 'Color';
        if (degreeIndex === 0) func = 'Tónica';
        else if (degreeIndex === 3 || degreeIndex === 1) func = 'Subdominante';
        else if (degreeIndex === 4) func = 'Dominante';
        return { chord, degree, function: func, root };
    });

    const cadence = detectCadence(chordDegrees);
    const recommendedScale = isMinor ? 'eólico' : 'jónico';
    const scaleNotes = MODE_INTERVALS[recommendedScale].map(i => NOTES[(keyIndex + i) % 12]);

    const substitutions = chordDegrees.map(cd => {
        const idx = scale.indexOf(cd.root);
        if (idx === -1) return null;
        const tritoneRoot = NOTES[(NOTES.indexOf(cd.root) + 6) % 12];
        return { original: cd.chord, tritone: tritoneRoot + (cd.chord.includes('7') ? '7' : '') };
    }).filter(s => s);

    return { key: bestKey, keyRoot, isMinor, chordDegrees, cadence, scale: scaleNotes, substitutions };
}

// ⭐ ACTUALIZADO: ahora maneja también acordes con bajo tipo C/G
function extractRoot(chord) {
    if (!chord) return 'C';
    // Si tiene slash (ej: C/G, D/F#), nos quedamos solo con la parte de la izquierda
    const mainPart = chord.split('/')[0];
    if (mainPart.length >= 2 && (mainPart[1] === '#' || mainPart[1] === 'b')) {
        return mainPart.substring(0, 2);
    }
    return mainPart[0];
}

function detectCadence(chordDegrees) {
    if (chordDegrees.length < 2) return null;
    const degrees = chordDegrees.map(cd => cd.degree);
    const last = degrees.slice(-2);
    if (last[0] === 'V' && last[1] === 'I') return 'Cadencia Auténtica (V - I)';
    if (last[0] === 'IV' && last[1] === 'I') return 'Cadencia Plagal (IV - I)';
    if (last[0] === 'V' && last[1] === 'vi') return 'Cadencia Rota (V - vi)';
    return null;
}

function renderProgressionAnalysis(chords, result) {
    const container = document.getElementById('progression-result');
    if (!container) return;

    let html = `<div class="progression-analysis-block"><h4>🎼 Tonalidad detectada</h4><p><strong>${result.key}</strong></p></div>`;
    html += `<div class="progression-analysis-block"><h4>📊 Grados y funciones</h4><div class="degree-grid">`;
    result.chordDegrees.forEach(cd => {
        html += `<div class="degree-card"><span class="degree-roman">${cd.degree}</span><div class="degree-chord">${cd.chord}</div><div class="degree-function">${cd.function}</div></div>`;
    });
    html += `</div></div>`;

    if (result.cadence) html += `<div class="progression-analysis-block"><h4>🎯 Cadencia</h4><p><strong>${result.cadence}</strong></p></div>`;

    html += `<div class="progression-analysis-block"><h4>🎼 Escala recomendada</h4><p><strong>${result.keyRoot} ${result.isMinor ? 'menor' : 'mayor'}</strong></p><p><strong>Notas:</strong> ${result.scale.join(' - ')}</p></div>`;

    if (result.substitutions.length > 0) {
        html += `<div class="progression-analysis-block"><h4>✨ Sustituciones (tritono)</h4><ul>`;
        result.substitutions.forEach(s => { html += `<li><strong>${s.original}</strong> → <strong>${s.tritone}</strong></li>`; });
        html += `</ul></div>`;
    }

    container.innerHTML = html;
}