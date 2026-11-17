/* ============================================================
   LICENCIATURA EN PSICOLOGÍA · PLAN 1986 y PLAN 1986 R
   Plan 1986:   ingresaron hasta 2013 inclusive.
   Plan 1986 R: ingresaron entre 2014 y 2020 inclusive.
   Fuente: https://psicologia.unc.edu.ar/secretarias/secretaria-academica/licenciatura-en-psicologia/plan-1986-y-1986-r/

   Una sola lista de materias para los dos planes. Campos extra:
     only    → "86" o "86r": la materia existe solo en ese plan
     corr86 / corr86r → correlativas distintas para cada plan (si no están, vale "corr")
     opt     → electiva (no cuenta en el total de materias obligatorias)
     nota    → aclaración que se muestra en el detalle
   ============================================================ */
(function () {
  var U = "https://psicologia.unc.edu.ar/wp-content/uploads/";
  var P = "https://psicologia.unc.edu.ar/secretarias/secretaria-academica/licenciatura-en-psicologia/plan-1986-y-1986-r/";
  function A(a, b) { return [{ n: "Cátedra A", u: U + a }, { n: "Cátedra B", u: U + b }]; }
  function S(x) { return [{ n: "Programa", u: U + x }]; }

  var BASE = [
    { id: "ieup", n: "Introducción a los Estudios Universitarios en Psicología", ciclo: "ingreso", corr: [], catedras: [] },

    // ----- 1.º año -----
    { id: "bio", n: "Biología Evolutiva Humana", ciclo: "a1", corr: ["ieup"], catedras: A("2023/02/RD_111_2020-Programa-Biologia-A.pdf", "2023/02/Programa-2021-Biologia-Evolutiva-Humana-Catedra-B.pdf") },
    { id: "esc", n: "Escuelas, Sistemas y Corrientes de la Psicología Contemporánea", ciclo: "a1", corr: ["ieup"], catedras: A("2024/09/Escuelas-A-24.pdf", "2023/02/RHCD160-19-Programa-Escuelas-B-2019.pdf") },
    { id: "intro", n: "Introducción a la Psicología", ciclo: "a1", corr: ["ieup"], catedras: S("2023/02/Programa-2021-Introduccion-a-la-Psicologia.pdf") },
    { id: "epist", n: "Problemas Epistemológicos de la Psicología", ciclo: "a1", corr: ["ieup"], catedras: A("2026/06/Programa-Problemas-Epistemologicos-de-la-Psicologia-Cat-A.pdf", "2024/09/Episte-b-24-p86.pdf") },
    { id: "psicoest", n: "Psicoestadística (descriptiva e inferencial)", ciclo: "a1", corr: ["ieup"], catedras: A("2024/09/Psicoestadistica-A-22.pdf", "2023/02/RHCD_356_2019-Programa-2019-Psicoestadistica-Cat-B.pdf") },
    { id: "nin", n: "Psicología Evolutiva de la Niñez", ciclo: "a1", corr: ["ieup"], catedras: A("2023/02/Programa-2021-Psicologia-del-Desarrollo-Infantil-Cat.-A.pdf", "2023/02/RHCD_363_2019-Programa-Ninez-B.pdf") },

    // ----- 2.º año -----
    { id: "antro", n: "Antropología Cultural, Contemporánea y Latinoamericana", ciclo: "a2", corr: ["ieup"], catedras: S("2024/09/Antropologia-22.pdf") },
    { id: "neuro", n: "Neurofisiología y Psicofisiología", ciclo: "a2", corr: ["bio"], catedras: A("2023/02/Programa-2021-Neurofisiologia-A.pdf", "2023/02/Programa-2021-Neurofisiologia-B.pdf") },
    { id: "psicoan", n: "Psicoanálisis", ciclo: "a2", corr: ["epist", "intro", "esc"], catedras: S("2024/09/Psicoanalisis-24-86.pdf") },
    { id: "ado", n: "Psicología Evolutiva de la Adolescencia y Juventud", ciclo: "a2", corr: ["nin"], catedras: A("2024/09/Adolescencia-A-24.pdf", "2024/09/Adolescencia-B-24.pdf") },
    { id: "tecpsico", n: "Técnicas Psicométricas", ciclo: "a2", corr: ["esc", "psicoest"],
      corr86: ["epist", "intro", "esc", "psicoest"], corr86r: ["esc", "psicoest"],
      catedras: A("2024/09/Tecnicas-psicometricas-A-22-.pdf", "2024/09/Tecnicas-psicometricas-B-22.pdf") },

    // ----- 3.º año -----
    { id: "meto", n: "Metodología de la Investigación Psicológica", ciclo: "a3", corr: ["tecpsico"], catedras: S("2023/10/Anexo-Virtualizacion-Epistemologia-y-Metodologia-2021-1.pdf") },
    { id: "psicobio", n: "Psicobiología Experimental", ciclo: "a3", corr: ["neuro", "tecpsico"], catedras: S("2024/09/Experimental-24-p86.pdf") },
    { id: "psicopat", n: "Psicopatología", ciclo: "a3", corr: ["ado", "psicoan", "neuro"], catedras: S("2024/09/psicopato-lic-prof-at-2022.pdf") },
    { id: "educ", n: "Psicología Educacional", ciclo: "a3", corr: ["ado", "epist"], catedras: S("2024/09/Educacional-22.pdf") },
    { id: "sanit", n: "Psicología Sanitaria", ciclo: "a3", corr: ["ado", "antro", "neuro", "tecpsico"], catedras: S("2025/02/Programa-Psicologia-Sanitaria.pdf") },
    { id: "social", n: "Psicología Social", ciclo: "a3", corr: ["antro", "tecpsico"], catedras: S("2024/09/Social-24-p86.pdf") },

    // ----- 4.º año -----
    { id: "entrevista", n: "Entrevista Psicológica", ciclo: "a4", corr: ["psicopat"], only: "86r", nota: "Solo para Plan 1986 R (ingreso 2014 a 2020).", catedras: S("2024/09/Entrevista-24-p86.pdf") },
    { id: "clinica", n: "Psicología Clínica", ciclo: "a4", corr: ["psicopat", "sanit"], catedras: [
      { n: "Programa 2024", u: U + "2024/09/Clinica-24-p86.pdf" }, { n: "Programa 2019", u: U + "2023/02/RHCD326-19-Programa-Clinica-2019.pdf" }] },
    { id: "crimi", n: "Psicología Criminológica", ciclo: "a4", corr: ["social", "psicopat"], catedras: S("2024/09/Crimi-23-1.pdf") },
    { id: "lab", n: "Psicología Laboral", ciclo: "a4", corr: ["social"], catedras: S("2024/09/Ps-laboral-24-p86.pdf") },
    { id: "proyect", n: "Técnicas Proyectivas", ciclo: "a4", corr: ["psicopat", "antro"], catedras: S("2024/09/Proyectivas-22.pdf") },

    // ----- 5.º año -----
    { id: "deonto", n: "Deontología y Legislación Profesional", ciclo: "a5", corr: ["clinica", "lab", "educ", "crimi"], catedras: S("2024/09/Deontologia-22.pdf") },
    { id: "orient", n: "Orientación Vocacional y Ocupacional", ciclo: "a5", corr: ["educ", "tecpsico", "psicopat", "entrevista"], only: "86r", nota: "Solo para Plan 1986 R (ingreso 2014 a 2020).", catedras: S("2023/02/RHCD097-19-Programa-Orientacion-2019.pdf") },

    // ----- Electivas permanentes -----
    { id: "e-clinpsico", n: "Clínica Psicológica y Psicoterapias", ciclo: "el", opt: true, corr: ["clinica"], catedras: S("2024/09/Clinica-psi-y-psicoterapias-22.pdf") },
    { id: "e-crimcli", n: "Criminología Clínica", ciclo: "el", opt: true, corr: ["crimi", "clinica"], catedras: S("2024/09/Criminologia-clinica-23-1.pdf") },
    { id: "e-interv", n: "Estrategias de Intervención Comunitaria", ciclo: "el", opt: true, corr: ["sanit", "psicoan", "social"], catedras: S("2024/09/Int.-Comunitaria-22.pdf") },
    { id: "e-neuropsi", n: "Neuropsicología", ciclo: "el", opt: true, corr: ["educ", "psicobio"], catedras: S("2024/09/Neuropsicologia-22.pdf") },
    { id: "e-orient", n: "Orientación Vocacional y Ocupacional (electiva)", ciclo: "el", opt: true, only: "86", corr: ["lab", "entrevista", "educ"],
      nota: "La Facultad lista como correlativas Psicología Laboral, Entrevista Psicológica y Psicología Educacional. Entrevista Psicológica figura solo en el Plan 1986 R, por eso acá no aparece como requisito.",
      catedras: S("2023/02/2-RHCD097-19-Programa-Orientacion-2019.pdf") },
    { id: "e-aprend", n: "Problemas de Aprendizaje", ciclo: "el", opt: true, corr: ["educ", "clinica"], catedras: S("2023/02/8-RHCD121-19-Programa-2019-Problemas-de-Aprendizaje.pdf") },
    { id: "e-masas", n: "Psicología de las Masas y Medios de Comunicación", ciclo: "el", opt: true, corr: ["social", "sanit", "educ"], catedras: S("2024/09/Masas-24-p86.pdf") },
    { id: "e-adulto", n: "Psicología Evolutiva del Adulto y de la Senectud", ciclo: "el", opt: true, corr: ["psicopat"], catedras: S("2024/09/Adulto-22.pdf") },
    { id: "e-organ", n: "Psicología Organizacional", ciclo: "el", opt: true, corr: ["lab"], catedras: S("2024/09/Ps-organizacional-22.pdf") },
    { id: "e-ddhh", n: "Psicología y Derechos Humanos", ciclo: "el", opt: true, corr: ["social", "psicoan"], catedras: S("2024/09/Derechos-22.pdf") },
    { id: "e-penol", n: "Psicología y Penología", ciclo: "el", opt: true, corr: ["crimi"], catedras: S("2024/09/Penologia-23.pdf") },
    { id: "e-psicopat2", n: "Psicopatología II", ciclo: "el", opt: true, corr: ["psicopat", "social"], catedras: S("2024/09/Psicopatologia-II-22.pdf") },
    { id: "e-psicoter", n: "Psicoterapia", ciclo: "el", opt: true, corr: ["clinica"], catedras: S("2026/05/IF-2024-00212894-UNC-SHCD_FP-programa-psicoterapia.pdf") },
    { id: "e-grupo", n: "Teoría y Técnicas de Grupo", ciclo: "el", opt: true, corr: ["social"], catedras: S("2023/10/FP-Anexo-Teoria-y-Tecnica-de-Grupo.pdf") }
  ];

  var CICLOS = [
    { id: "ingreso", n: "Ingreso" }, { id: "a1", n: "1.º año" }, { id: "a2", n: "2.º año" }, { id: "a3", n: "3.º año" },
    { id: "a4", n: "4.º año" }, { id: "a5", n: "5.º año" }, { id: "el", n: "Electivas permanentes" }
  ];

  function build(key, def) {
    var ms = BASE.filter(function (m) { return !m.only || m.only === key; });
    var ids = {}; ms.forEach(function (m) { ids[m.id] = true; });
    def.materias = ms.map(function (m) {
      var c = (m["corr" + key] || m.corr).filter(function (x) { return ids[x]; });
      var o = { id: m.id, n: m.n, ciclo: m.ciclo, corr: c, catedras: m.catedras };
      if (m.opt) o.opt = true; if (m.nota) o.nota = m.nota;
      return o;
    });
    def.ciclos = CICLOS;
    def.fuente = { nombre: "Facultad de Psicología UNC · Planes 1986 y 1986 R", url: P };
    def.leido = "2026-11-17";
    window.PLANES = window.PLANES || {};
    window.PLANES[def.id] = def;
  }

  var REQ_IDIOMA = { id: "idioma", n: "Prueba de suficiencia de idioma", d: "Correlativa: 3.º año aprobado", u: U + "2023/02/PROGRAMA-Modulos-de-idioma.pdf", ul: "Ver programa" };

  build("86", {
    id: "lic-1986", carrera: "Licenciatura en Psicología", plan: "Plan 1986", aplica: "Ingresaron hasta 2013 inclusive",
    reglas: [
      "Electivas: quienes ingresaron en 2001 o antes deben acreditar 8 asignaturas electivas, sean anuales o semestrales.",
      "Quienes ingresaron entre 2002 y 2013 deben acreditar 8 electivas como mínimo y 72 créditos como mínimo (las anuales acreditan 12 créditos y las semestrales 6)."
    ],
    nota: "Acá figuran las electivas permanentes. Las electivas no permanentes, las de otras carreras y las prácticas de investigación y extensión cambian cada cuatrimestre: están en la página del plan.",
    requisitos: [REQ_IDIOMA]
  });
  build("86r", {
    id: "lic-1986r", carrera: "Licenciatura en Psicología", plan: "Plan 1986 R", aplica: "Ingresaron entre 2014 y 2020",
    reglas: [
      "Electivas: quienes ingresaron entre 2014 y 2020 deben acreditar 6 asignaturas electivas (3 semestrales y 3 anuales)."
    ],
    nota: "Acá figuran las electivas permanentes. Las electivas no permanentes, las de otras carreras y las prácticas de investigación y extensión cambian cada cuatrimestre: están en la página del plan.",
    requisitos: [REQ_IDIOMA]
  });
})();
