/* ============================================================
   LICENCIATURA EN PSICOLOGÍA · PLAN 2021
   Aplica a quienes ingresaron en 2021 o años posteriores.
   Fuente: https://psicologia.unc.edu.ar/secretarias/secretaria-academica/licenciatura-en-psicologia/plan-2021/

   Cada materia:
     id         → identificador único (sin espacios)
     n          → nombre
     ciclo      → ingreso | basico | superior
     corr       → ids de las correlativas que publica la Facultad
     catedras   → programas por cátedra: [{ n: "Cátedra A", u: "ruta dentro de /wp-content/uploads/" }]
   ============================================================ */
(function () {
  var U = "https://psicologia.unc.edu.ar/wp-content/uploads/";
  window.PLANES = window.PLANES || {};
  window.PLANES["lic-2021"] = {
    id: "lic-2021",
    carrera: "Licenciatura en Psicología",
    plan: "Plan 2021",
    aplica: "Ingresantes 2021 en adelante",
    leido: "2026-11-17",
    fuente: {
      nombre: "Facultad de Psicología UNC · Plan 2021",
      url: "https://psicologia.unc.edu.ar/secretarias/secretaria-academica/licenciatura-en-psicologia/plan-2021/",
      anexo: U + "2025/06/Anexo-60532.pdf",
      resolucion: U + "2023/02/SACA-RHCS_1901_2019-Texto-Ministerio-Plan-de-estudios-Licenciatura.pdf"
    },
    ciclos: [
      { id: "ingreso",  n: "Ingreso" },
      { id: "basico",   n: "Ciclo Básico" },
      { id: "superior", n: "Ciclo Superior" }
    ],
    materias: [
      { id: "ieup", n: "Introducción a los Estudios Universitarios en Psicología", ciclo: "ingreso", corr: [], catedras: [] },

      // ----- Ciclo Básico -----
      { id: "bio", n: "Biología Evolutiva Humana", ciclo: "basico", corr: ["ieup"], catedras: [
        { n: "Cátedra A", u: U + "2023/02/RD_111_2020-Programa-Biologia-A.pdf" },
        { n: "Cátedra B", u: U + "2023/02/Programa-2021-Biologia-Evolutiva-Humana-Catedra-B.pdf" } ] },
      { id: "intro", n: "Introducción a la Psicología", ciclo: "basico", corr: ["ieup"], catedras: [
        { n: "Programa", u: U + "2024/09/Introduccion-a-la-psicologia-23.pdf" } ] },
      { id: "epist", n: "Problemas Epistemológicos de la Psicología", ciclo: "basico", corr: ["ieup"], catedras: [
        { n: "Cátedra A", u: U + "2026/06/Programa-Problemas-Epistemologicos-de-la-Psicologia-Cat-A-Plan-2021.pdf" },
        { n: "Cátedra B", u: U + "2024/09/Episte-b-24-p21.pdf" } ] },
      { id: "psicoest", n: "Psicoestadística", ciclo: "basico", corr: ["ieup"], catedras: [
        { n: "Cátedra A", u: U + "2023/03/RHCD-006-2023-Programa-2022-Psicoestadistica-A.pdf" },
        { n: "Cátedra B", u: U + "2023/02/RHCD_356_2019-Programa-2019-Psicoestadistica-Cat-B.pdf" } ] },
      { id: "sistemas", n: "Sistemas de la Psicología Contemporánea", ciclo: "basico", corr: ["ieup"], catedras: [
        { n: "Cátedra A", u: U + "2024/09/Sistemas-A-24.pdf" },
        { n: "Cátedra B", u: U + "2024/09/Sistemas-B-22.pdf" } ] },
      { id: "neuro", n: "Neurofisiología y Psicofisiología", ciclo: "basico", corr: ["bio"], catedras: [
        { n: "Cátedra A", u: U + "2024/09/Neurofisiologia-A-23.pdf" },
        { n: "Cátedra B", u: U + "2024/09/Neurofisiologia-B-23.pdf" } ] },
      { id: "dinf", n: "Psicología del Desarrollo Infantil", ciclo: "basico", corr: ["ieup", "intro", "sistemas"], catedras: [
        { n: "Cátedra A", u: U + "2023/02/Programa-2021-Psicologia-del-Desarrollo-Infantil-Cat.-A.pdf" },
        { n: "Cátedra B", u: U + "2024/09/D.-Infantil-B-22.pdf" } ] },
      { id: "tecpsico", n: "Técnicas Psicométricas", ciclo: "basico", corr: ["psicoest"], catedras: [
        { n: "Cátedra A", u: U + "2023/02/Programa-TECNICAS-PSICOMETRICAS-catedra-A-ANEXO.pdf" },
        { n: "Cátedra B", u: U + "2023/02/RHCD_362_2019-Programa-Psicometricas-B-2019.pdf" } ] },
      { id: "antro", n: "Antropología Cultural, Contemporánea y Latinoamericana", ciclo: "basico", corr: ["ieup", "epist"], catedras: [
        { n: "Programa", u: U + "2024/09/Antropologia-22.pdf" } ] },
      { id: "psicoan", n: "Psicoanálisis", ciclo: "basico", corr: ["ieup", "sistemas", "epist"], catedras: [
        { n: "Programa", u: U + "2024/09/Psicoanalisis-24-p21.pdf" } ] },

      // ----- Ciclo Superior -----
      { id: "adol", n: "Psicología de las Adolescencias y Juventudes", ciclo: "superior", corr: ["dinf", "psicoan"], catedras: [
        { n: "Cátedra A", u: U + "2024/09/Adolescencias-y-juventudes-A-24.pdf" },
        { n: "Cátedra B", u: U + "2024/09/Adolescencias-y-juventudes-B-24.pdf" } ] },
      { id: "sanit", n: "Psicología Sanitaria en Salud Pública", ciclo: "superior", corr: ["antro"], catedras: [] },
      { id: "social", n: "Psicología Social", ciclo: "superior", corr: ["epist", "sistemas", "antro"], catedras: [
        { n: "Programa", u: U + "2024/09/Social-24-p21.pdf" } ] },
      { id: "educ", n: "Perspectivas Psicológicas en Educación", ciclo: "superior", corr: ["psicoan", "dinf"], catedras: [
        { n: "Programa", u: U + "2024/09/Perspectivas-psi-en-educacion-23.pdf" } ] },
      { id: "psicopat", n: "Psicopatología", ciclo: "superior", corr: ["psicoan"], catedras: [] },
      { id: "metodos", n: "Métodos de Investigación en Psicología", ciclo: "superior", corr: ["tecpsico"], catedras: [
        { n: "Programa", u: U + "2024/09/Metodos-de-investigacion-23.pdf" } ] },
      { id: "psicobio", n: "Psicobiología Experimental", ciclo: "superior", corr: ["neuro", "psicoest", "metodos"], catedras: [
        { n: "Programa", u: U + "2024/09/Experimental-24-p21.pdf" } ] },
      { id: "trabajo", n: "Psicología del Trabajo", ciclo: "superior", corr: ["social"], catedras: [
        { n: "Programa", u: U + "2024/09/Ps-del-trabajo-24-p21.pdf" } ] },
      { id: "proyect", n: "Técnicas Proyectivas", ciclo: "superior", corr: ["psicopat"], catedras: [] },
      { id: "entrevista", n: "Entrevista Psicológica", ciclo: "superior", corr: ["psicopat"], catedras: [
        { n: "Programa", u: U + "2024/09/Entrevista-24-p86.pdf" } ] },
      { id: "clinica", n: "Psicología Clínica", ciclo: "superior", corr: ["sanit", "psicopat"], catedras: [
        { n: "Programa", u: U + "2024/09/Clinica-24-p21.pdf" } ] },
      { id: "crimi", n: "Psicología Criminológica", ciclo: "superior", corr: ["social", "psicopat"], catedras: [
        { n: "Programa", u: U + "2024/09/Crimi-23.pdf" } ] },
      { id: "deonto", n: "Deontología, Ética y Legislación Profesional", ciclo: "superior", corr: ["educ", "clinica", "crimi", "social", "sanit", "trabajo"], catedras: [
        { n: "Programa", u: U + "2024/09/Deonto-24.pdf" } ] },
      { id: "orient", n: "Orientación Vocacional", ciclo: "superior", corr: ["educ", "entrevista"], catedras: [
        { n: "Programa", u: U + "2024/09/Orientacion-vocacional-23.pdf" } ] }
    ],
    /* Otros requisitos que figuran en la página del plan (sin correlativas publicadas) */
    requisitos: [
      { id: "idiomas",   n: "Módulo de idiomas",                         d: "Dictado por el DIFA" },
      { id: "informatica", n: "Prueba de suficiencia en Informática",    d: "Departamento Universitario de Informática – Secretaría de Asuntos Académicos UNC" },
      { id: "tpa-basico",  n: "Talleres de Problemáticas Actuales (Ciclo Básico)", d: "Ver oferta y correlativas en la página del plan" },
      { id: "intensivos",  n: "Espacios de aprendizaje intensivos y tutorados", d: "Ver oferta del cuatrimestre en la página del plan" },
      { id: "tpa-superior", n: "Talleres de Problemáticas Actuales (Ciclo Superior)", d: "Ver oferta y correlativas en la página del plan" },
      { id: "practicas",   n: "Horas de prácticas de egreso",             d: "Ver opciones en la página del plan" }
    ]
  };
})();
