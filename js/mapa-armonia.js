// =====================================================
// TAVO ACORDES - MAPA DE ARMONÍA
// Tonalidad central + campos armónicos de las tonalidades vecinas.
// Autocontenido: no depende de script.js.
// =====================================================
(function () {
    const L = "CDEFGAB", NAT = [0, 2, 4, 5, 7, 9, 11];
    const SH = "C C# D D# E F F# G G# A A# B".split(" ");
    const FL = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
    // [índice de letra, semitonos] de cada tonalidad mayor
    const KEYS = { C: [0, 0], G: [4, 7], D: [1, 2], A: [5, 9], E: [2, 4], B: [6, 11], "F#": [3, 6], Db: [1, 1], Ab: [5, 8], Eb: [2, 3], Bb: [6, 10], F: [3, 5] };
    const ENH = { "C#": "Db", "G#": "Ab", "D#": "Eb", "A#": "Bb", Gb: "F#" };
    const FIX = { Cb: "B", Fb: "E", "E#": "F", "B#": "C" };
    const IVS = [[0, 2, 4, 5, 7, 9, 11], [0, 2, 3, 5, 7, 8, 10]];          // mayor / menor natural
    const QU = [[0, 1, 1, 0, 0, 1, 2], [1, 2, 0, 1, 1, 0, 0]];             // 0 mayor, 1 menor, 2 disminuido
    const QS = ["", "m", "°"];
    const RO = [["I", "ii", "iii", "IV", "V", "vi", "vii°"], ["i", "ii°", "III", "iv", "v", "VI", "VII"]];
    const CL = ["#ff4d7e", "#4fb3ff", "#b06cff"];
    const ACCENT = "#ff6b00";
    // Columnas: [grado, desplazamiento de letra, semitonos, modo]
    const DEF = [["bVI", 5, 8, 0], ["IV", 3, 5, 0], ["iv", 3, 5, 1], ["bii", 1, 1, 1], ["VI", 5, 9, 0], ["III", 2, 4, 0], ["iii", 2, 4, 1], ["vi", 5, 9, 1]];

    const md = (x, n) => ((x % n) + n) % n;

    function spell(l, s) {
        l = md(l, 7); s = md(s, 12);
        const a = md(s - NAT[l] + 6, 12) - 6;
        let n;
        if (a === 0) n = L[l]; else if (a === 1) n = L[l] + "#"; else if (a === -1) n = L[l] + "b";
        else n = a > 0 ? SH[s] : FL[s];
        return FIX[n] || n;
    }

    const field = (l, s, m) => IVS[m].map((v, i) => ({
        n: spell(l + i, s + v) + QS[QU[m][i]], pc: md(s + v, 12), q: QU[m][i]
    }));
    const key = h => h.pc * 3 + h.q;

    let cur = "C", prev = null, selK = null;

    function render() {
        const [l, s] = KEYS[cur], M = field(l, s, 0);
        document.querySelectorAll("#ma-keys button").forEach(b => b.classList.toggle("on", b.dataset.k === cur));
        const C = DEF.map(([t, dl, ds, m]) => ({ t, m, r: spell(l + dl, s + ds), sc: field(l + dl, s + ds, m) }));

        const X = c => 28 + 49 * c;
        const Y = i => i ? 366 + 56 * (i - 1) : 300;
        const TC = [70, 48], TE = [70, 150], TA = [190, 150];
        const dim = selK != null, lo = dim ? 0.15 : 0.6;

        let g = `<defs><marker id="ma-ar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse"><path d="M0,0L6,3L0,6z" fill="#e6e8f2"/></marker></defs>`;
        const ln = (a, b, ra, rb, both) => {
            const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n;
            return `<line x1="${a[0] + ux * ra}" y1="${a[1] + uy * ra}" x2="${b[0] - ux * rb}" y2="${b[1] - uy * rb}" stroke="#e6e8f2" stroke-width="1.3" opacity="${lo}" marker-end="url(#ma-ar)" ${both ? 'marker-start="url(#ma-ar)"' : ""}/>`;
        };
        g += ln(TC, TE, 26, 25) + ln(TC, TA, 26, 25);
        for (let c = 0; c < 8; c++) {
            const H = [X(c), Y(0)];
            g += ln(TE, H, 24, 24, 1) + ln(TA, H, 24, 24, 1);
        }
        g += `<line x1="4" x2="396" y1="333" y2="333" stroke="#9aa0b4" stroke-width="1.4" stroke-dasharray="1.5 7" opacity=".7"/>`;
        C.forEach((c, j) => {
            for (let i = 0; i < 6; i++)
                g += `<line x1="${X(j)}" x2="${X(j)}" y1="${Y(i) + 20}" y2="${Y(i + 1) - 20}" stroke="#6b7aa8" stroke-width="2" opacity="${dim ? .4 : 1}"/>`;
        });

        const node = (x, y, h, r) => {
            const col = CL[h.q], m = selK === key(h);
            return `<g class="nd" data-k="${key(h)}" opacity="${!dim || m ? 1 : .28}"><circle cx="${x}" cy="${y}" r="${r}" fill="${m ? ACCENT + "33" : "#0a0a0a"}" stroke="${m ? ACCENT : col}" stroke-width="${m ? 3.4 : 2.2}"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="${r > 21 ? 15 : 12}" font-weight="700" fill="${m ? ACCENT : col}">${h.n}</text></g>`;
        };
        g += node(TC[0], TC[1], M[0], 25) + node(TE[0], TE[1], M[2], 23) + node(TA[0], TA[1], M[5], 23);
        C.forEach((c, j) => c.sc.forEach((h, i) => g += node(X(j), Y(i), h, 20)));

        const badge = prev ? `${prev} > ${cur}` : `${cur} mayor`;
        g += `<rect x="236" y="22" width="150" height="46" rx="13" fill="#000" stroke="#333"/><text x="311" y="54" text-anchor="middle" font-size="${prev ? 26 : 20}" font-weight="800" fill="#fff" letter-spacing="2">${badge}</text>`;

        const svg = document.getElementById("ma-svg");
        svg.innerHTML = g;
        svg.querySelectorAll(".nd").forEach(e => e.onclick = () => {
            const k = +e.dataset.k;
            selK = selK === k ? null : k;
            render();
        });

        // Texto de ayuda / acorde seleccionado
        const cap = document.getElementById("ma-cap");
        if (selK == null) {
            cap.innerHTML = `Toca un acorde para ver en qué otras tonalidades aparece: ese es tu <b>puente</b> para pasar de una a otra.`;
            return;
        }
        const hits = [];
        let nm = null;
        C.forEach(c => c.sc.forEach((h, i) => {
            if (key(h) === selK) { hits.push(`${c.r}${c.m ? "m" : ""} · ${RO[c.m][i]}`); nm = h; }
        }));
        if (!nm) M.forEach(h => { if (key(h) === selK) nm = h; });
        const kn = ENH[nm.n] || nm.n;
        cap.innerHTML = `<b>${nm.n}</b> aparece en ${hits.length} columna${hits.length !== 1 ? "s" : ""}:` +
            `<div class="ma-chips">${hits.map(t => `<span class="ma-chip">${t}</span>`).join("")}</div>` +
            (nm.q === 0 && KEYS[kn] && kn !== cur ? `<button id="ma-mod">Modular a ${kn}</button>` : "");
        const mb = document.getElementById("ma-mod");
        if (mb) mb.onclick = () => { prev = cur; cur = kn; selK = null; render(); };
    }

    function init() {
        const box = document.getElementById("ma-keys");
        Object.keys(KEYS).forEach(k => {
            const b = document.createElement("button");
            b.textContent = k;
            b.dataset.k = k;
            b.onclick = () => { prev = null; cur = k; selK = null; render(); };
            box.appendChild(b);
        });
        render();
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
