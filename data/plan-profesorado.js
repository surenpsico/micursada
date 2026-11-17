/* ============================================================
   PROFESORADO EN PSICOLOGÍA · Plan 2017 y Plan 1986
   Fuente: https://psicologia.unc.edu.ar/estudiantes/asignaturas/profesorado-en-psicologia/
   La página lista solo las materias propias del profesorado. Las materias de la Licenciatura
   que son correlativas (ext: true) se incluyen para poder marcarlas; no cuentan en el avance.
   ============================================================ */
(function () {
  var U = "https://psicologia.unc.edu.ar/wp-content/uploads/";
  var P = "https://psicologia.unc.edu.ar/estudiantes/asignaturas/profesorado-en-psicologia/";
  function S(x) { return x ? [{ n: "Programa", u: U + x }] : []; }
  var CICLOS = [{ id: "prof", n: "Materias del profesorado" }, { id: "lic", n: "De la Licenciatura (correlativas)" }];
  var EXT = function () {
    return [
      { id: "intro", n: "Introducción a la Psicología", ciclo: "lic", ext: true, corr: [], catedras: [] },
      { id: "ado", n: "Psicología Evolutiva de la Adolescencia", ciclo: "lic", ext: true, corr: [], catedras: [] },
      { id: "educ", n: "Psicología Educacional", ciclo: "lic", ext: true, corr: [], catedras: [] }
    ];
  };
  var NOTA = "Las demás materias del plan son las de la Licenciatura. Acá figuran las propias del profesorado y, aparte, las materias de la Licenciatura que son correlativas (no cuentan en el avance).";
  window.PLANES = window.PLANES || {};

  window.PLANES["prof-2017"] = {
    id: "prof-2017", carrera: "Profesorado en Psicología", plan: "Plan 2017", aplica: "Matriculados al profesorado desde 2021",
    leido: "2026-11-17", nota: NOTA, ciclos: CICLOS,
    fuente: { nombre: "Facultad de Psicología UNC · Profesorado en Psicología", url: P },
    materias: [
      { id: "ped", n: "Pedagogía", sub: "2.º año · 1.er cuatrimestre", ciclo: "prof", corr: ["intro"], catedras: S("2023/02/PROGRAMA-Pedagogia.pdf") },
      { id: "poleduc", n: "Política Educativa y Legislación Educacional", sub: "2.º año · 2.º cuatrimestre", ciclo: "prof", corr: ["ped"], catedras: S("2023/02/PROGRAMA-Pedagogia.pdf") },
      { id: "didg", n: "Didáctica General", sub: "3.º año · 1.er cuatrimestre", ciclo: "prof", corr: ["ped", "poleduc"], catedras: S("2024/09/Didactica-general-22.pdf") },
      { id: "dide", n: "Didáctica Especial", sub: "3.º año · 2.º cuatrimestre", ciclo: "prof", corr: ["didg"], catedras: S("2024/09/Didactica-especial-24.pdf") },
      { id: "prac", n: "Prácticas Finales de Profesorado", ciclo: "prof", corr: ["dide", "ado"], catedras: [] }
    ].concat(EXT())
  };

  window.PLANES["prof-1986"] = {
    id: "prof-1986", carrera: "Profesorado en Psicología", plan: "Plan 1986", aplica: "Matriculados al profesorado antes de 2021",
    leido: "2026-11-17", nota: NOTA, ciclos: CICLOS,
    fuente: { nombre: "Facultad de Psicología UNC · Profesorado en Psicología", url: P },
    materias: [
      { id: "ped", n: "Pedagogía", sub: "2.º año · 1.er cuatrimestre", ciclo: "prof", corr: ["intro"], catedras: S("2023/02/PROGRAMA-Pedagogia.pdf") },
      { id: "poleduc", n: "Política Educativa y Legislación Educacional", sub: "2.º año · 2.º cuatrimestre", ciclo: "prof", corr: ["ped"], catedras: S("2023/02/PROGRAMA-Pedagogia.pdf") },
      { id: "didg", n: "Didáctica General", sub: "3.º año · 1.er cuatrimestre", ciclo: "prof", corr: ["ped", "ado"], catedras: S("2024/09/Didactica-general-22.pdf") },
      { id: "dide", n: "Didáctica Especial", sub: "3.º año · 2.º cuatrimestre", ciclo: "prof", corr: ["didg", "educ", "poleduc"], catedras: S("2024/09/Didactica-especial-24.pdf") },
      { id: "prac", n: "Prácticas Finales de Profesorado", ciclo: "prof", corr: ["dide"], catedras: [] }
    ].concat(EXT())
  };
})();
