/* ============================================================
   Psicología UNC · Calendario y correlativas
   App estática sin dependencias. Los datos viven en /data.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  var ROOT = document.body.getAttribute("data-root") || "";   /* "" en la raíz, "../" en las subpáginas */
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MES3 = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };

  function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function diffDays(a, b) { return Math.round((b - a) / 864e5); }
  function sameDay(a, b) { return a.getTime() === b.getTime(); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }

  /* "Hoy": se puede probar otra fecha con ?hoy=2026-03-20 */
  var TODAY = (function () {
    var p = new URLSearchParams(location.search).get("hoy");
    if (p && /^\d{4}-\d{2}-\d{2}$/.test(p)) return parse(p);
    var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  })();

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17M12 13.5v4M10 15.5h4"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
    arrow: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 32 32 8M13 8h19v19"/></svg>'
  };
  function star(cls) {
    return '<svg class="' + (cls || "star") + '" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6V94M6 50H94M19 19 81 81M81 19 19 81" stroke="#FF6400" stroke-width="15" stroke-linecap="round" fill="none"/></svg>';
  }
  function sticker(cls, rot) {
    var p = "M50 9V91M9 50H91M21 21 79 79M79 21 21 79";
    return '<svg class="' + cls + '" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke-linecap="round"><path d="' + p + '" stroke="#FBF7F0" stroke-width="23"/><path d="' + p + '" stroke="#FF6400" stroke-width="14"/></g></svg>';
  }
  function splash(cls) {
    var R = [47, 28, 44, 24, 49, 30, 42, 26, 48, 29, 45, 23, 46, 31, 43, 27, 49, 25, 44, 30], pts = [];
    for (var i = 0; i < R.length; i++) { var a = (i / R.length) * Math.PI * 2 - Math.PI / 2; pts.push((50 + R[i] * Math.cos(a)).toFixed(1) + "," + (50 + R[i] * Math.sin(a)).toFixed(1)); }
    return '<svg class="' + cls + '" viewBox="0 0 100 100" aria-hidden="true"><polygon points="' + pts.join(" ") + '" fill="#14B4E6"/></svg>';
  }

  /* ---------- datos ---------- */
  var CATS = {
    clases:       { n: "Clases" },
    examenes:     { n: "Exámenes y coloquios" },
    inscripcion:  { n: "Inscripciones" },
    receso:       { n: "Recesos y asuetos" },
    tramites:     { n: "Trámites" },
    institucional:{ n: "Institucional" },
    gestion:      { n: "Gestión interna" }
  };
  var CAT_ORDER = ["examenes", "inscripcion", "clases", "tramites", "receso", "institucional", "gestion"];

  var CAL = window.CALENDARIOS || {};
  var YEARS = Object.keys(CAL).map(Number).sort();
  var PLANES = window.PLANES || {};
  var PLAN_IDS = ["lic-2021", "lic-1986r", "lic-1986", "prof-2017", "prof-1986", "tec-at"].filter(function (id) { return PLANES[id]; });
  var PLAN = PLANES[store.get("sp.plan", "lic-2021")] || PLANES[PLAN_IDS[0]];
  var LINKS = window.ENLACES;
  function carreraList() {
    var seen = [], out = [];
    PLAN_IDS.forEach(function (id) { var c = PLANES[id].carrera; if (seen.indexOf(c) < 0) { seen.push(c); out.push(c); } });
    return out;
  }
  function plansOf(carrera) { return PLAN_IDS.filter(function (id) { return PLANES[id].carrera === carrera; }); }
  function planTitle(p) { return p.carrera + (p.plan ? " · " + p.plan : ""); }

  function normEvents(cal) {
    return cal.eventos.map(function (e, i) {
      var tbd = !e.d;
      var start = tbd ? null : parse(e.d);
      var end = tbd ? null : (e.h ? parse(e.h) : start);
      var mes = tbd ? e.m : e.d.slice(0, 7);
      return { id: cal.anio + "-" + i, t: e.t, c: e.c, a: e.a || "", n: e.n || "", start: start, end: end, mes: mes, tbd: tbd, y: cal.anio };
    });
  }
  var EVENTS = {}; YEARS.forEach(function (y) { EVENTS[y] = normEvents(CAL[y]); });

  function defaultYear() {
    var y = TODAY.getFullYear();
    if (CAL[y]) return y;
    var prev = YEARS.filter(function (v) { return v <= y; });
    return prev.length ? prev[prev.length - 1] : YEARS[YEARS.length - 1];
  }

  /* ---------- estado de eventos ---------- */
  function evStatus(ev) {
    if (ev.tbd) return null;
    if (ev.end < TODAY) return { k: "past", t: "Finalizó" };
    if (ev.start <= TODAY) {
      if (sameDay(ev.start, ev.end)) return { k: "now", t: "Hoy" };
      if (sameDay(ev.end, TODAY)) return { k: "now", t: "Último día" };
      return { k: "now", t: "En curso" };
    }
    var d = diffDays(TODAY, ev.start);
    if (d === 1) return { k: "soon", t: "Mañana" };
    if (d <= 45) return { k: "soon", t: "En " + d + " días" };
    return { k: "future", t: "" };
  }

  function dateBlock(ev) {
    if (ev.tbd) return '<div class="ev__date"><span class="d" aria-hidden="true">—</span><span class="m">' + MES3[+ev.mes.slice(5) - 1] + '</span></div>';
    var s = ev.start, e = ev.end, range = "";
    if (!sameDay(s, e)) range = s.getMonth() === e.getMonth() ? "al " + e.getDate() : "al " + e.getDate() + " " + MES3[e.getMonth()];
    return '<div class="ev__date"><span class="d">' + s.getDate() + '</span><span class="m">' + MES3[s.getMonth()] + '</span>' + (range ? '<span class="range">' + range + "</span>" : "") + "</div>";
  }
  function longRange(ev) {
    if (ev.tbd) return "Fecha a definir · " + MESES[+ev.mes.slice(5) - 1];
    var s = ev.start, e = ev.end;
    if (sameDay(s, e)) return cap(DIAS[s.getDay()]) + " " + s.getDate() + " de " + MESES[s.getMonth()];
    if (s.getMonth() === e.getMonth()) return s.getDate() + " al " + e.getDate() + " de " + MESES[s.getMonth()];
    return s.getDate() + " de " + MESES[s.getMonth()] + " al " + e.getDate() + " de " + MESES[e.getMonth()];
  }

  function evRow(ev, opts) {
    opts = opts || {};
    var st = evStatus(ev), cls = "ev c-" + ev.c + (st && st.k === "now" ? " is-now" : "") + (st && st.k === "past" ? " is-past" : "");
    var tags = "";
    if (st && st.k === "now") tags += '<span class="tag tag--now">' + st.t + "</span>";
    else if (st && st.k === "soon") tags += '<span class="tag tag--soon">' + st.t + "</span>";
    else if (st && st.k === "past") tags += '<span class="tag">Finalizó</span>';
    if (ev.tbd) tags += '<span class="tag tag--tbd">Fecha a definir</span>';
    tags += '<span class="tag"><i class="dot c-' + ev.c + '"></i>' + CATS[ev.c].n + "</span>";
    var meta = tags;
    if (opts.fullDate && !ev.tbd) meta += "<span>" + longRange(ev) + "</span>";
    if (ev.a) meta += "<span>A cargo: " + esc(ev.a) + "</span>";
    if (ev.n) meta += "<span>" + esc(ev.n) + "</span>";
    var act = ev.tbd ? "" : '<div class="ev__act"><button type="button" class="btn btn--line btn--sm" data-ics="' + ev.id + '" aria-label="Agendar: ' + esc(ev.t) + '">' + ICON.cal + "Agendar</button></div>";
    return '<article class="' + cls + '" id="ev-' + ev.id + '">' + dateBlock(ev) +
      '<div class="ev__body"><h3>' + esc(ev.t) + '</h3><div class="ev__meta">' + meta + "</div></div>" + act + "</article>";
  }

  /* ---------- .ics ---------- */
  function icsEscape(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
  function icsFold(l) { var out = [], i = 0; while (l.length - i > 70) { out.push(l.substr(i, 70)); i += 70; } out.push(l.substr(i)); return out.join("\r\n "); }
  function ymd(d) { return iso(d).replace(/-/g, ""); }
  function buildIcs(list, name) {
    var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Psicologia UNC//Calendario//ES", "CALSCALE:GREGORIAN", "X-WR-CALNAME:" + icsEscape(name)];
    var stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    list.forEach(function (ev) {
      if (ev.tbd) return;
      L.push("BEGIN:VEVENT", "UID:" + ev.id + "@psicologia-unc-calendario", "DTSTAMP:" + stamp,
        "DTSTART;VALUE=DATE:" + ymd(ev.start), "DTEND;VALUE=DATE:" + ymd(addDays(ev.end, 1)),
        icsFold("SUMMARY:" + icsEscape(ev.t)),
        icsFold("DESCRIPTION:" + icsEscape((ev.a ? "A cargo: " + ev.a + "\n" : "") + "Fuente: Facultad de Psicología UNC – Calendario académico " + ev.y)),
        "END:VEVENT");
    });
    L.push("END:VCALENDAR");
    return L.join("\r\n");
  }
  function download(filename, text) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/calendar;charset=utf-8" }));
    a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ============================================================
     VISTA: INICIO
     ============================================================ */
  function viewHome() {
    var y = defaultYear(), evs = EVENTS[y] || [];
    var hoy = cap(DIAS[TODAY.getDay()]) + " " + TODAY.getDate() + " de " + MESES[TODAY.getMonth()];
    var vis = evs.filter(function (e) { return !e.tbd && e.c !== "gestion"; });
    var ahora = vis.filter(function (e) { return e.start <= TODAY && e.end >= TODAY; }).sort(function (a, b) { return a.end - b.end; }).slice(0, 6);
    var prox = vis.filter(function (e) { return e.start > TODAY; }).sort(function (a, b) { return a.start - b.start; }).slice(0, 5);
    var covers = CAL[y] && TODAY.getFullYear() === y;

    var h = '<section class="hero view-enter">' +
      '<div class="stickers">' + splash("st-splash") + sticker("st-ast1") + sticker("st-ast2") + "</div>" +
      '<span class="hero__kicker">Psicología UNC · ' + y + "</span>" +
      "<h1>Tu cursada,<span>sin vueltas.</span></h1>" +
      "<p>El calendario académico y las correlativas de la Facultad de Psicología UNC en un solo lugar. Marcá lo que ya rendiste y mirá qué podés cursar.</p>" +
      '<div class="hero__cta"><a class="btn btn--primary" href="' + ROOT + 'calendario/">Ver calendario</a><a class="btn btn--line" href="' + ROOT + 'carrera/">Mi carrera</a></div>' +
      '<div class="hero__today"><small>Hoy</small><b>' + hoy + "</b></div></section>";

    h += '<h2 class="section-title">' + star() + "Ahora en la Facultad</h2>";
    if (ahora.length) h += '<div class="ev-list">' + ahora.map(function (e) { return evRow(e, { fullDate: true }); }).join("") + "</div>";
    else h += '<div class="empty"><b>Sin actividades en curso</b>' + (covers ? "Mirá lo que viene abajo." : "Todavía no hay calendario " + TODAY.getFullYear() + " cargado. Cuando la Facultad lo publique, se suma acá.") + "</div>";

    h += '<h2 class="section-title">' + star() + "Lo que viene</h2>";
    if (prox.length) h += '<div class="ev-list">' + prox.map(function (e) { return evRow(e, { fullDate: true }); }).join("") + "</div>" +
      '<p style="margin-top:14px"><a class="btn btn--line" href="' + ROOT + 'calendario/">Calendario completo ' + y + "</a></p>";
    else h += '<div class="empty"><b>No hay más fechas cargadas</b>El calendario ' + y + " ya terminó o no tiene más actividades. Cuando la Facultad publique el siguiente, se agrega.</div>";

    h += '<h2 class="section-title">' + star() + "Atajos</h2>" +
      '<div class="big-links">' +
      '<a class="big-link big-link--o" href="' + LINKS.destacados[0].u + '" target="_blank" rel="noopener"><span class="display">Guaraní</span><p>' + LINKS.destacados[0].d + "</p>" + ICON.arrow + "</a>" +
      '<a class="big-link big-link--c" href="' + LINKS.destacados[1].u + '" target="_blank" rel="noopener"><span class="display">Aula Virtual</span><p>' + LINKS.destacados[1].d + "</p>" + ICON.arrow + "</a></div>";

    h += careerTeaser();
    h += igSection();
    return h;
  }

  /* Instagram de Sur en Psico, embebido (iframe oficial de perfil, carga diferida) */
  var IG_URL = "https://www.instagram.com/surenpsico/";
  function igSection() {
    return '<h2 class="section-title">' + star() + 'Sur en Psico en Instagram</h2>' +
      '<div class="ig"><div class="ig__text"><p class="display ig__h">Novedades, talleres y materiales para rendir</p>' +
      '<p class="muted">Seguí a <b>@surenpsico</b> para enterarte de talleres, charlas y herramientas de estudio para cursar y rendir finales.</p>' +
      '<p><a class="btn btn--primary" href="' + IG_URL + '" target="_blank" rel="noopener">Seguir en Instagram ' + ICON.ext + "</a></p></div>" +
      '<div class="ig__frame"><iframe src="' + IG_URL + 'embed/" title="Publicaciones de Sur en Psico (@surenpsico) en Instagram" loading="lazy" width="400" height="500" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div></div>';
  }

  function careerTeaser() {
    if (!PLAN) return "";
    var est = getEst(), c = computeAll(est), pct = Math.round(c.counts.apr / c.total * 100);
    var any = c.counts.apr + c.counts.reg > 0;
    return '<h2 class="section-title">' + star() + 'Mi carrera</h2><a class="card card--big card--link" href="' + ROOT + 'carrera/"><span class="arrow">→</span>' +
      '<span class="display">' + (any ? pct + "% de la carrera aprobada" : "Mirá qué podés cursar") + "</span>" +
      '<p class="muted" style="margin-top:6px">' + (any ? c.counts.apr + " aprobadas · " + c.counts.reg + " regulares · " + c.counts.can + " para cursar ahora." : "Marcá las materias que ya aprobaste o regularizaste y te mostramos cuáles se habilitan. " + planTitle(PLAN) + ".") + "</p></a>";
  }

  /* ============================================================
     VISTA: CALENDARIO
     ============================================================ */
  var cal = (function () {
    var saved = store.get("sp.cal", {});
    var cats = saved.cats && saved.cats.length ? saved.cats : CAT_ORDER.filter(function (c) { return c !== "gestion"; });
    return { year: defaultYear(), cats: cats, q: "", view: saved.view === "mes" ? "mes" : "agenda", hidePast: !!saved.hidePast,
             mY: TODAY.getFullYear(), mM: TODAY.getMonth(), sel: null };
  })();
  function saveCal() { store.set("sp.cal", { cats: cal.cats, view: cal.view, hidePast: cal.hidePast }); }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  function filtered() {
    var q = norm(cal.q.trim());
    return (EVENTS[cal.year] || []).filter(function (e) {
      if (cal.cats.indexOf(e.c) < 0) return false;
      if (cal.hidePast && e.end && e.end < TODAY) return false;
      if (q && norm(e.t + " " + e.a + " " + e.n + " " + CATS[e.c].n).indexOf(q) < 0) return false;
      return true;
    });
  }

  function viewCalendar() {
    if (!YEARS.length) return '<div class="empty"><b>Sin calendario</b>No hay datos cargados.</div>';
    if (!CAL[cal.year]) cal.year = defaultYear();
    var data = CAL[cal.year], counts = {};
    (EVENTS[cal.year] || []).forEach(function (e) { counts[e.c] = (counts[e.c] || 0) + 1; });

    var yearSel = YEARS.length > 1 ? '<label class="sr" for="yearSel">Año</label><select class="select" id="yearSel">' +
      YEARS.map(function (y) { return '<option value="' + y + '"' + (y === cal.year ? " selected" : "") + ">" + y + "</option>"; }).join("") + "</select>" : "";

    var chips = CAT_ORDER.filter(function (c) { return counts[c]; }).map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c + '" aria-pressed="' + (cal.cats.indexOf(c) >= 0) + '"><i class="dot c-' + c + '"></i>' + CATS[c].n + ' <span class="n">' + counts[c] + "</span></button>";
    }).join("");

    return '<div class="view-enter"><div class="page-head"><div><h1>Calendario <em>' + cal.year + "</em></h1><p>" + esc(data.titulo) +
      ". Inscripciones, clases, exámenes y trámites de la Facultad de Psicología UNC.</p></div>" + yearSel + "</div>" +
      '<div class="toolbar">' +
      '<div class="toolbar__row">' +
        '<div class="search"><label class="sr" for="q">Buscar en el calendario</label>' + ICON.search + '<input id="q" type="search" placeholder="Buscar: exámenes, inscripción, receso…" value="' + esc(cal.q) + '" autocomplete="off"></div>' +
        '<div class="seg" role="group" aria-label="Vista"><button type="button" data-view="agenda" aria-pressed="' + (cal.view === "agenda") + '">Agenda</button><button type="button" data-view="mes" aria-pressed="' + (cal.view === "mes") + '">Mes</button></div>' +
      "</div>" +
      '<div class="chips chips--scroll" role="group" aria-label="Filtrar por tipo de actividad">' + chips + "</div>" +
      '<div class="toolbar__row space"><div class="chips"><button type="button" class="chip" id="hidePast" aria-pressed="' + cal.hidePast + '">Ocultar lo que ya pasó</button></div>' +
        '<div class="chips"><button type="button" class="btn btn--line btn--sm" id="goToday">Ir a hoy</button><button type="button" class="btn btn--line btn--sm" id="icsAll">' + ICON.cal + 'Agendar lo filtrado</button></div></div>' +
      "</div>" +
      '<p class="muted" id="calCount" aria-live="polite" style="margin:8px 2px 0;font-size:.85rem"></p>' +
      '<div id="calBody"></div>' +
      '<p class="src-line" style="margin-top:26px">Fuente: <a href="' + data.fuente.url + '" target="_blank" rel="noopener">' + esc(data.fuente.nombre) + "</a> · " +
      '<a href="' + data.fuente.pdf + '" target="_blank" rel="noopener">' + esc(data.fuente.pdfNombre) + "</a></p></div>";
  }

  function paintCalendar() {
    var body = $("#calBody"); if (!body) return;
    var list = filtered(), n = list.length;
    $("#calCount").textContent = n + (n === 1 ? " actividad" : " actividades") + (cal.q ? " para “" + cal.q.trim() + "”" : "");
    body.innerHTML = cal.view === "mes" ? paintMonthGrid(list) : paintAgenda(list);
  }

  function paintAgenda(list) {
    if (!list.length) return '<div class="empty" style="margin-top:14px"><b>Nada por acá</b>Probá con otra búsqueda o activá más tipos de actividad.</div>';
    var months = {};
    list.forEach(function (e) { (months[e.mes] = months[e.mes] || []).push(e); });
    var html = "";
    Object.keys(months).sort().forEach(function (mk) {
      var arr = months[mk], dated = arr.filter(function (e) { return !e.tbd; }).sort(function (a, b) { return a.start - b.start || a.end - b.end; }), tbd = arr.filter(function (e) { return e.tbd; });
      var mi = +mk.slice(5) - 1, yr = mk.slice(0, 4), cur = (+yr === TODAY.getFullYear() && mi === TODAY.getMonth());
      html += '<section class="month" id="m-' + mk + '"><div class="month__h' + (cur ? " is-current" : "") + '"><h2>' + MESES[mi] + '</h2><small>' + yr + (cur ? " · mes actual" : "") + "</small></div>";
      if (dated.length) html += '<div class="ev-list">' + dated.map(function (e) { return evRow(e); }).join("") + "</div>";
      if (tbd.length) html += '<div class="tbd-box"><b>A definir este mes:</b> ' + tbd.map(function (e) { return esc(e.t) + (e.n ? " (" + esc(e.n.toLowerCase()) + ")" : ""); }).join(" · ") + "</div>";
      html += "</section>";
    });
    return html;
  }

  function paintMonthGrid(list) {
    var Y = cal.mY, M = cal.mM, first = new Date(Y, M, 1), lead = (first.getDay() + 6) % 7, dim = new Date(Y, M + 1, 0).getDate();
    var dated = list.filter(function (e) { return !e.tbd; });
    var h = '<div class="mg__nav"><h2>' + MESES[M] + " " + Y + '</h2>' +
      '<button type="button" class="iconbtn" data-mnav="-1" aria-label="Mes anterior">' + ICON.left + "</button>" +
      '<button type="button" class="btn btn--line btn--sm" data-mnav="0">Hoy</button>' +
      '<button type="button" class="iconbtn" data-mnav="1" aria-label="Mes siguiente">' + ICON.right + "</button></div>";
    h += '<div class="mg" role="grid">';
    ["L", "M", "M", "J", "V", "S", "D"].forEach(function (d, i) { h += '<div class="mg__dow" role="columnheader" aria-label="' + ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"][i] + '">' + d + "</div>"; });
    var total = Math.ceil((lead + dim) / 7) * 7;
    for (var i = 0; i < total; i++) {
      var d = new Date(Y, M, 1 - lead + i), out = d.getMonth() !== M, key = iso(d);
      var evs = dated.filter(function (e) { return e.start <= d && e.end >= d; });
      var cls = "mg__cell" + (out ? " out" : "") + (sameDay(d, TODAY) ? " today" : "") + (cal.sel === key ? " sel" : "");
      h += '<button type="button" class="' + cls + '" data-day="' + key + '" aria-label="' + d.getDate() + " de " + MESES[d.getMonth()] + (evs.length ? ", " + evs.length + (evs.length === 1 ? " actividad" : " actividades") : "") + '"><span class="num">' + d.getDate() + "</span>";
      evs.slice(0, 3).forEach(function (e) { h += '<span class="mg__pill c-' + e.c + '">' + esc(e.t) + "</span>"; });
      if (evs.length > 3) h += '<span class="mg__more">+' + (evs.length - 3) + " más</span>";
      if (evs.length) h += '<span class="mg__dots">' + evs.slice(0, 6).map(function (e) { return '<i class="c-' + e.c + '"></i>'; }).join("") + "</span>";
      h += "</button>";
    }
    h += "</div>";
    var selKey = cal.sel || (TODAY.getFullYear() === Y && TODAY.getMonth() === M ? iso(TODAY) : null);
    if (selKey) {
      var sd = parse(selKey), sevs = dated.filter(function (e) { return e.start <= sd && e.end >= sd; });
      h += '<div class="mg__day"><h3 class="section-title" style="margin-top:20px;font-size:1.3rem">' + cap(DIAS[sd.getDay()]) + " " + sd.getDate() + " de " + MESES[sd.getMonth()] + "</h3>" +
        (sevs.length ? '<div class="ev-list">' + sevs.map(function (e) { return evRow(e, { fullDate: true }); }).join("") + "</div>" : '<p class="muted">Sin actividades este día con los filtros actuales.</p>') + "</div>";
    } else h += '<p class="muted" style="margin-top:12px">Tocá un día para ver el detalle.</p>';
    return h;
  }

  function wireCalendar(root) {
    var q = $("#q", root), t;
    q.addEventListener("input", function () { clearTimeout(t); t = setTimeout(function () { cal.q = q.value; paintCalendar(); }, 120); });
    var ys = $("#yearSel", root); if (ys) ys.addEventListener("change", function () { cal.year = +ys.value; cal.mY = cal.year; cal.mM = 0; render(true); });
    root.addEventListener("click", function (ev) {
      var b = ev.target.closest("button"); if (!b) return;
      if (b.dataset.cat) {
        var i = cal.cats.indexOf(b.dataset.cat); if (i >= 0) cal.cats.splice(i, 1); else cal.cats.push(b.dataset.cat);
        b.setAttribute("aria-pressed", String(i < 0)); saveCal(); paintCalendar();
      } else if (b.dataset.view) {
        cal.view = b.dataset.view; saveCal(); $$("[data-view]", root).forEach(function (x) { x.setAttribute("aria-pressed", String(x.dataset.view === cal.view)); }); paintCalendar();
      } else if (b.id === "hidePast") {
        cal.hidePast = !cal.hidePast; b.setAttribute("aria-pressed", String(cal.hidePast)); saveCal(); paintCalendar();
      } else if (b.id === "goToday") {
        goToday();
      } else if (b.id === "icsAll") {
        var l = filtered().filter(function (e) { return !e.tbd; });
        if (l.length) download("calendario-psicologia-unc-" + cal.year + ".ics", buildIcs(l, "Psicología UNC " + cal.year));
      } else if (b.dataset.ics) {
        var e = (EVENTS[cal.year] || []).filter(function (x) { return x.id === b.dataset.ics; })[0];
        if (e) download("evento-" + e.id + ".ics", buildIcs([e], "Psicología UNC " + e.y));
      } else if (b.dataset.mnav !== undefined) {
        var n = +b.dataset.mnav; if (n === 0) { cal.mY = TODAY.getFullYear(); cal.mM = TODAY.getMonth(); cal.sel = null; } else { var d = new Date(cal.mY, cal.mM + n, 1); cal.mY = d.getFullYear(); cal.mM = d.getMonth(); cal.sel = null; }
        paintCalendar();
      }
    });
    /* días del mes (el grid se repinta, delegamos sobre el body) */
    $("#calBody", root).addEventListener("click", function (ev) {
      var c = ev.target.closest("[data-day]"); if (!c) return;
      cal.sel = c.dataset.day; var dd = parse(cal.sel);
      if (dd.getMonth() !== cal.mM) { cal.mY = dd.getFullYear(); cal.mM = dd.getMonth(); }
      paintCalendar();
      var el = $('[data-day="' + cal.sel + '"]'); if (el) el.focus({ preventScroll: true });
    });
    paintCalendar();
    if (cal.view === "agenda" && cal.year === TODAY.getFullYear()) setTimeout(function () { goToday(true); }, 60);
  }

  function goToday(quiet) {
    if (cal.view === "mes") { cal.mY = TODAY.getFullYear(); cal.mM = TODAY.getMonth(); cal.sel = iso(TODAY); paintCalendar(); return; }
    var mk = TODAY.getFullYear() + "-" + String(TODAY.getMonth() + 1).padStart(2, "0"), el = document.getElementById("m-" + mk);
    if (!el) { var all = $$(".month"); el = all.filter(function (m) { return m.id.slice(2) >= mk; })[0] || all[all.length - 1]; }
    if (el) el.scrollIntoView({ behavior: quiet ? "instant" : "smooth", block: "start" });
  }

  /* ============================================================
     VISTA: MI CARRERA
     ============================================================ */
  var career = { filtro: store.get("sp.car.filtro", "todas"), q: "" };
  function getEst() { var all = store.get("sp.avance", {}); return (all[PLAN.id]) || {}; }
  function setEst(est) { var all = store.get("sp.avance", {}); all[PLAN.id] = est; store.set("sp.avance", all); }
  function getCrit() { return store.get("sp.criterio", "apr") === "reg" ? "reg" : "apr"; }
  function getReqs() { var all = store.get("sp.req", {}); return all[PLAN.id] || {}; }
  function setReqs(r) { var all = store.get("sp.req", {}); all[PLAN.id] = r; store.set("sp.req", all); }

  function byId() { var o = {}; PLAN.materias.forEach(function (m) { o[m.id] = m; }); return o; }

  function computeAll(est) {
    var crit = getCrit(), ids = byId(), res = {}, counts = { apr: 0, reg: 0, can: 0, block: 0, el: 0 }, total = 0;
    function met(cid) { return est[cid] === "apr" || (crit === "reg" && est[cid] === "reg"); }
    PLAN.materias.forEach(function (m) {
      var missing = m.corr.filter(function (c) { return !met(c); }), state;
      if (est[m.id] === "apr") state = "apr"; else if (est[m.id] === "reg") state = "reg";
      else if (m.ext) state = "pend"; else state = missing.length ? "block" : "can";
      res[m.id] = { state: state, missing: m.ext ? [] : missing };
      if (m.ext) return;                                   /* materias de otro plan: no cuentan */
      if (m.opt) { if (state === "apr") counts.el++; return; } /* electivas: se cuentan aparte */
      counts[state]++; total++;
    });
    var enables = {};
    PLAN.materias.forEach(function (m) { m.corr.forEach(function (c) { (enables[c] = enables[c] || []).push(m.id); }); });
    return { res: res, counts: counts, total: total, ids: ids, crit: crit, enables: enables };
  }

  var BADGE = { apr: ["badge--apr", "Aprobada"], reg: ["badge--reg", "Regular"], can: ["badge--can", "Podés cursar"], block: ["badge--block", "Bloqueada"], pend: ["badge--block", "Pendiente"] };
  function names(ids, map, max) {
    var n = ids.map(function (i) { return map[i].n; });
    return n.length > max ? n.slice(0, max).join(", ") + " y " + (n.length - max) + " más" : n.join(", ").replace(/, ([^,]*)$/, " y $1");
  }
  function whyText(m, c) {
    var r = c.res[m.id];
    if (r.state === "apr") return "Aprobada.";
    if (r.state === "reg") return "Regularizada · falta aprobarla.";
    if (r.state === "can") return m.corr.length ? "Correlativas cumplidas." : "Sin correlativas.";
    if (r.state === "pend") return "Es de la Licenciatura: marcala si ya la cursaste.";
    return (c.crit === "reg" ? "Falta regularizar o aprobar: " : "Falta aprobar: ") + names(r.missing, c.ids, 2) + ".";
  }
  function toggleHtml(m, state) {
    return '<div class="toggle" role="group" aria-label="Estado de ' + esc(m.n) + '">' +
      '<button type="button" class="t-reg" data-set="reg" data-id="' + m.id + '" aria-pressed="' + (state === "reg") + '">Regular</button>' +
      '<button type="button" class="t-apr" data-set="apr" data-id="' + m.id + '" aria-pressed="' + (state === "apr") + '">Aprobada</button></div>';
  }
  function matCard(m, c) {
    var r = c.res[m.id], b = BADGE[r.state];
    return '<article class="mat st-' + r.state + '" data-card="' + m.id + '"><div class="mat__top"><button type="button" class="mat__name" data-open="' + m.id + '">' + esc(m.n) + "</button>" +
      '<span class="badge ' + b[0] + '">' + b[1] + "</span></div>" +
      (m.sub ? '<small class="muted" style="margin-top:-6px">' + esc(m.sub) + "</small>" : "") +
      '<p class="mat__why">' + esc(whyText(m, c)) + "</p>" +
      '<div class="mat__foot">' + toggleHtml(m, r.state) + '<button type="button" class="mat__more" data-open="' + m.id + '">Detalle</button></div></article>';
  }

  function viewCareer() {
    if (!PLAN) return '<div class="empty"><b>Sin plan</b>No hay plan cargado.</div>';
    var carr = carreraList(), plans = plansOf(PLAN.carrera);
    var pick = '<div class="plan-pick"><div><label for="carSel">Carrera</label><select class="select" id="carSel">' +
      carr.map(function (c) { return '<option value="' + esc(c) + '"' + (c === PLAN.carrera ? " selected" : "") + ">" + esc(c) + "</option>"; }).join("") + "</select></div>" +
      (plans.length > 1 ? '<div><label for="planSel">Plan</label><select class="select" id="planSel">' +
        plans.map(function (id) { return '<option value="' + id + '"' + (id === PLAN.id ? " selected" : "") + ">" + esc(PLANES[id].plan) + "</option>"; }).join("") + "</select></div>" : "") + "</div>";
    var h = '<div class="view-enter"><div class="page-head"><div><h1>Mi <em>carrera</em></h1><p>' + esc(planTitle(PLAN)) + (PLAN.aplica ? ". " + esc(PLAN.aplica) : "") + ". Tocá <b>Regular</b> o <b>Aprobada</b> en cada materia y mirá qué se habilita.</p></div>" + pick + "</div>";
    h += '<div id="carSummary"></div>';
    h += '<div class="toolbar" style="margin-top:18px"><div class="toolbar__row"><div class="search"><label class="sr" for="cq">Buscar materia</label>' + ICON.search + '<input id="cq" type="search" placeholder="Buscar materia…" value="' + esc(career.q) + '" autocomplete="off"></div></div>' +
      '<div class="chips" role="group" aria-label="Filtrar materias" id="carFilters"></div></div>';
    h += '<div id="carList"></div>';
    if (PLAN.requisitos && PLAN.requisitos.length) h += '<section class="ciclo"><div class="ciclo__h"><h2>Otros requisitos</h2><small>Figuran en el plan, sin correlativas publicadas</small></div><div class="reqs" id="carReqs"></div></section>';
    if (PLAN.reglas && PLAN.reglas.length) h += '<div class="note" style="margin-top:22px">' + ICON.info + "<div>" + PLAN.reglas.map(function (r) { return "<p>" + esc(r) + "</p>"; }).join("") + "</div></div>";
    if (PLAN.nota) h += '<div class="note" style="margin-top:12px">' + ICON.info + "<div>" + esc(PLAN.nota) + "</div></div>";
    h += '<div class="note" style="margin-top:12px">' + ICON.info + "<div>Las correlativas se toman de la página del plan en el sitio de la Facultad. Si una materia tiene cátedras A y B, comparten correlativas.</div></div>";
    h += '<p class="src-line" style="margin-top:14px">Fuente: <a href="' + PLAN.fuente.url + '" target="_blank" rel="noopener">' + esc(PLAN.fuente.nombre) + "</a>" +
      (PLAN.fuente.anexo ? ' · <a href="' + PLAN.fuente.anexo + '" target="_blank" rel="noopener">Anexo del plan de estudios (PDF)</a>' : "") + "</p></div>";
    return h;
  }

  function paintCareer() {
    var est = getEst(), c = computeAll(est), crit = c.crit;
    var pctA = c.counts.apr / c.total * 100, pctR = c.counts.reg / c.total * 100;
    $("#carSummary").innerHTML = '<div class="summary"><div class="summary__top"><div class="summary__big">' + c.counts.apr + '<small>de ' + c.total + " materias aprobadas</small></div>" +
      '<button type="button" class="btn btn--line btn--sm" id="carReset">Reiniciar avance</button></div>' +
      '<div class="bar" role="img" aria-label="' + c.counts.apr + " aprobadas y " + c.counts.reg + ' regulares de ' + c.total + '"><i class="b-apr" style="width:' + pctA + '%"></i><i class="b-reg" style="width:' + pctR + '%"></i></div>' +
      '<div class="stats"><div class="stat stat--apr"><b>' + c.counts.apr + "</b><span>Aprobadas</span></div>" +
      '<div class="stat stat--reg"><b>' + c.counts.reg + "</b><span>Regulares</span></div>" +
      '<div class="stat"><b>' + c.counts.can + "</b><span>Podés cursar</span></div>" +
      '<div class="stat"><b>' + c.counts.block + "</b><span>Bloqueadas</span></div></div>" +
      (PLAN.materias.some(function (m) { return m.opt; }) ? '<p class="src-line"><b>Electivas permanentes aprobadas:</b> ' + c.counts.el + ". No cuentan en el total de arriba.</p>" : "") +
      '<div class="crit"><span><b>Para cursar una materia, cuento sus correlativas como:</b></span><div class="seg" role="group" aria-label="Criterio de correlativas">' +
      '<button type="button" data-crit="apr" aria-pressed="' + (crit === "apr") + '">Aprobadas</button><button type="button" data-crit="reg" aria-pressed="' + (crit === "reg") + '">Regulares o aprobadas</button></div>' +
      "</div></div>";

    var nSt = { can: 0, reg: 0, apr: 0 }; PLAN.materias.forEach(function (m) { var s = c.res[m.id].state; if (nSt[s] !== undefined) nSt[s]++; });
    var F = [["todas", "Todas", PLAN.materias.length], ["can", "Podés cursar", nSt.can], ["reg", "Regulares", nSt.reg], ["sin", "Sin aprobar", PLAN.materias.length - nSt.apr], ["apr", "Aprobadas", nSt.apr]];
    $("#carFilters").innerHTML = F.map(function (f) { return '<button type="button" class="chip" data-f="' + f[0] + '" aria-pressed="' + (career.filtro === f[0]) + '">' + f[1] + ' <span class="n">' + f[2] + "</span></button>"; }).join("");

    var q = norm(career.q.trim()), html = "", shown = 0;
    PLAN.ciclos.forEach(function (ci) {
      var ms = PLAN.materias.filter(function (m) {
        if (m.ciclo !== ci.id) return false;
        var st = c.res[m.id].state;
        if (career.filtro === "can" && st !== "can") return false;
        if (career.filtro === "reg" && st !== "reg") return false;
        if (career.filtro === "apr" && st !== "apr") return false;
        if (career.filtro === "sin" && st === "apr") return false;
        if (q && norm(m.n).indexOf(q) < 0) return false;
        return true;
      });
      var all = PLAN.materias.filter(function (m) { return m.ciclo === ci.id; }), ap = all.filter(function (m) { return c.res[m.id].state === "apr"; }).length;
      if (!ms.length) return;
      shown += ms.length;
      html += '<section class="ciclo"><div class="ciclo__h"><h2>' + ci.n + "</h2><small>" + ap + "/" + all.length + " aprobadas</small></div><div class=\"mats\">" + ms.map(function (m) { return matCard(m, c); }).join("") + "</div></section>";
    });
    $("#carList").innerHTML = html || '<div class="empty" style="margin-top:18px"><b>Ninguna materia</b>Cambiá el filtro o la búsqueda.</div>';

    var rq = getReqs(), reqBox = $("#carReqs");
    if (reqBox) reqBox.innerHTML = PLAN.requisitos.map(function (r) {
      return '<label class="req"><input type="checkbox" data-req="' + r.id + '"' + (rq[r.id] ? " checked" : "") + '><span><b>' + esc(r.n) + "</b><small>" + esc(r.d) + "</small>" +
        (r.u ? ' <small><a href="' + r.u + '" target="_blank" rel="noopener">' + esc(r.ul || "Ver más") + " ↗</a></small>" : "") + "</span></label>";
    }).join("");
  }

  function setState(id, which) {
    var est = getEst(); est[id] = est[id] === which ? undefined : which; if (!est[id]) delete est[id];
    setEst(est);
  }
  function keepFocus(fn) {
    var a = document.activeElement, sel = a && a.dataset && a.dataset.set ? '[data-set="' + a.dataset.set + '"][data-id="' + a.dataset.id + '"]' : null;
    var y = window.scrollY; fn(); window.scrollTo(0, y);
    if (sel) { var el = $(sel, $("#sheet").open ? $("#sheet") : document); if (el) el.focus({ preventScroll: true }); }
  }

  function wireCareer(root) {
    paintCareer();
    var cq = $("#cq", root), t;
    cq.addEventListener("input", function () { clearTimeout(t); t = setTimeout(function () { career.q = cq.value; paintCareer(); }, 120); });
    function switchPlan(id, from) {
      PLAN = PLANES[id]; store.set("sp.plan", id); career.q = ""; render(false);
      var again = $(from === "plan" ? "#planSel" : "#carSel"); if (again) again.focus({ preventScroll: true });
    }
    $("#carSel", root).addEventListener("change", function (e) { switchPlan(plansOf(e.target.value)[0]); });
    var ps = $("#planSel", root); if (ps) ps.addEventListener("change", function (e) { switchPlan(e.target.value, "plan"); });
    root.addEventListener("click", function (ev) {
      var b = ev.target.closest("button"); if (!b) return;
      if (b.dataset.set) { keepFocus(function () { setState(b.dataset.id, b.dataset.set); paintCareer(); }); }
      else if (b.dataset.open) { openSheet(b.dataset.open); }
      else if (b.dataset.f) { career.filtro = b.dataset.f; store.set("sp.car.filtro", career.filtro); paintCareer(); }
      else if (b.dataset.crit) { store.set("sp.criterio", b.dataset.crit); paintCareer(); }
      else if (b.id === "carReset") { if (confirm("¿Borrar todo tu avance de carrera en este navegador?")) { setEst({}); setReqs({}); paintCareer(); } }
    });
    root.addEventListener("change", function (ev) {
      var i = ev.target.closest("[data-req]"); if (!i) return;
      var r = getReqs(); if (i.checked) r[i.dataset.req] = true; else delete r[i.dataset.req]; setReqs(r);
    });
  }

  /* ---------- hoja de detalle ---------- */
  var sheet = $("#sheet"), sheetBox = $("#sheetBox"), sheetCur = null;
  function openSheet(id) {
    sheetCur = id; paintSheet();
    if (!sheet.open) { sheet.showModal(); }
    sheetBox.scrollTop = 0;
  }
  function paintSheet() {
    var m = byId()[sheetCur]; if (!m) return;
    var est = getEst(), c = computeAll(est), r = c.res[m.id], b = BADGE[r.state], ci = PLAN.ciclos.filter(function (x) { return x.id === m.ciclo; })[0];
    function stIcon(cid) { var s = c.res[cid].state, ok = est[cid] === "apr" || (c.crit === "reg" && est[cid] === "reg"); return ok ? '<span class="ok" aria-label="cumplida">✓</span>' : '<span class="no" aria-label="pendiente">✗</span>'; }
    function stTxt(cid) { var s = est[cid]; return s === "apr" ? "Aprobada" : s === "reg" ? "Regular" : "Pendiente"; }
    var h = '<button type="button" class="iconbtn sheet__close" data-close aria-label="Cerrar">' + ICON.x + "</button>" +
      '<span class="badge ' + b[0] + '">' + b[1] + "</span> <small class=\"muted\">" + ci.n + "</small>" +
      '<h2 id="sheetTitle">' + esc(m.n) + "</h2>" + (m.sub ? '<small class="muted">' + esc(m.sub) + "</small>" : "") +
      "<p class=\"mat__why\" style=\"margin:4px 0 12px\">" + esc(whyText(m, c)) + "</p>" + toggleHtml(m, r.state) +
      (m.nota ? '<div class="note" style="margin-top:14px">' + ICON.info + "<div>" + esc(m.nota) + "</div></div>" : "");
    h += "<h3>Correlativas</h3>";
    h += m.corr.length ? '<ul class="lst">' + m.corr.map(function (cid) { return "<li>" + stIcon(cid) + '<button type="button" data-goto="' + cid + '">' + esc(c.ids[cid].n) + "</button><small class=\"muted\">" + stTxt(cid) + "</small></li>"; }).join("") + "</ul>" : '<p class="muted">Esta materia no tiene correlativas.</p>';
    var en = c.enables[m.id] || [];
    h += "<h3>Habilita</h3>" + (en.length ? '<ul class="lst">' + en.map(function (eid) { return '<li><button type="button" data-goto="' + eid + '">' + esc(c.ids[eid].n) + "</button></li>"; }).join("") + "</ul>" : '<p class="muted">No es correlativa de ninguna otra materia.</p>');
    h += "<h3>Programas</h3>" + (m.catedras.length ? '<ul class="lst">' + m.catedras.map(function (k) { return '<li><a href="' + k.u + '" target="_blank" rel="noopener">' + esc(m.catedras.length > 1 || k.n !== "Programa" ? "Programa · " + k.n : "Programa") + "</a>" + ICON.ext.replace("<svg", '<svg width="16" height="16"') + "</li>"; }).join("") + "</ul>" : '<p class="muted">La Facultad no publica el programa de esta materia en la página del plan.</p>');
    h += '<p class="src-line" style="margin-top:22px">Fuente: <a href="' + PLAN.fuente.url + '" target="_blank" rel="noopener">' + esc(PLAN.fuente.nombre) + "</a></p>";
    sheetBox.innerHTML = h;
  }
  sheet.addEventListener("click", function (ev) {
    if (ev.target === sheet) { sheet.close(); return; }
    var b = ev.target.closest("button"); if (!b) return;
    if (b.dataset.close !== undefined) sheet.close();
    else if (b.dataset.goto) { sheetCur = b.dataset.goto; paintSheet(); sheetBox.scrollTop = 0; }
    else if (b.dataset.set) { keepFocus(function () { setState(b.dataset.id, b.dataset.set); paintSheet(); if ($("#carList")) paintCareer(); }); }
  });
  sheet.addEventListener("close", function () { sheetCur = null; });

  /* ============================================================
     VISTA: ENLACES
     ============================================================ */
  function viewLinks() {
    var h = '<div class="view-enter"><div class="page-head"><div><h1>Enlaces <em>útiles</em></h1><p>Todo lo que necesitás, directo al sitio de la Facultad de Psicología UNC.</p></div></div>' +
      '<div class="big-links">' +
      '<a class="big-link big-link--o" href="' + LINKS.destacados[0].u + '" target="_blank" rel="noopener"><span class="display">Guaraní</span><p>' + LINKS.destacados[0].d + "</p>" + ICON.arrow + "</a>" +
      '<a class="big-link big-link--c" href="' + LINKS.destacados[1].u + '" target="_blank" rel="noopener"><span class="display">Aula Virtual</span><p>' + LINKS.destacados[1].d + "</p>" + ICON.arrow + "</a></div>" +
      '<div class="grid grid--2" style="margin-top:22px">';
    LINKS.grupos.forEach(function (g) {
      h += '<section class="card"><h3 class="display" style="font-size:1.4rem;margin-bottom:8px">' + esc(g.t) + '</h3><ul class="linklist">' +
        g.items.map(function (i) { return '<li><a href="' + i.u + '" target="_blank" rel="noopener">' + esc(i.t) + "<span>↗</span></a></li>"; }).join("") + "</ul></section>";
    });
    h += '</div><p class="src-line" style="margin-top:22px">Fuente: <a href="' + LINKS.sitio + '" target="_blank" rel="noopener">psicologia.unc.edu.ar/estudiantes</a></p></div>';
    return h;
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  function route() {
    /* Cada sección es una página real (/, /calendario/, /carrera/, /enlaces/): la define <body data-route> */
    var name = document.body.getAttribute("data-route");
    return { name: { calendario: 1, carrera: 1, enlaces: 1 }[name] ? name : "inicio" };
  }
  var TITLES = null; /* el <title> de cada página ya viene en el HTML (SEO); no se pisa desde JS */
  var first = true;

  function render(keepScroll) {
    var r = route(), app = $("#app"), y = window.scrollY;
    /* cada vista vive en un contenedor nuevo: así los listeners no se acumulan entre renders */
    var host = document.createElement("div");
    host.innerHTML = r.name === "calendario" ? viewCalendar() : r.name === "carrera" ? viewCareer() : r.name === "enlaces" ? viewLinks() : viewHome();
    app.innerHTML = ""; app.appendChild(host);
    $$(".nav a").forEach(function (a) { if (a.dataset.route === r.name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (r.name === "calendario") wireCalendar(host);
    if (r.name === "carrera") wireCareer(host);
    var cy = CAL[defaultYear()];
    $("#footLeido").textContent = cy && cy.leido ? "Datos leídos el " + parse(cy.leido).toLocaleDateString("es-AR") + "." : "";
    if (keepScroll) window.scrollTo(0, y);
    else { window.scrollTo(0, 0); if (!first) app.focus({ preventScroll: true }); }
    first = false;
  }

  /* ---------- tema ---------- */
  var themeBtn = $("#themeBtn");
  function applyThemeLabel() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", dark ? "#1D1914" : "#FBF7F0");
  }
  themeBtn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("sp.tema", next); } catch (e) {}
    applyThemeLabel();
  });
  applyThemeLabel();

  render(false);
})();
