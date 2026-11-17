/* ============================================================
   TECNICATURA UNIVERSITARIA EN ACOMPAÑAMIENTO TERAPÉUTICO
   Fuente: https://psicologia.unc.edu.ar/estudiantes/asignaturas/tecnicatura-universitaria-en-at/
   ============================================================ */
(function () {
  var U = "https://psicologia.unc.edu.ar/wp-content/uploads/";
  function A(a, b) { return [{ n: "Cátedra A", u: U + a }, { n: "Cátedra B", u: U + b }]; }
  function S(x) { return x ? [{ n: "Programa", u: U + x }] : []; }
  window.PLANES = window.PLANES || {};
  window.PLANES["tec-at"] = {
    id: "tec-at", carrera: "Tecnicatura Universitaria en Acompañamiento Terapéutico", plan: "", aplica: "",
    leido: "2026-11-17",
    fuente: { nombre: "Facultad de Psicología UNC · Tecnicatura Universitaria en AT", url: "https://psicologia.unc.edu.ar/estudiantes/asignaturas/tecnicatura-universitaria-en-at/" },
    ciclos: [{ id: "ingreso", n: "Ingreso" }, { id: "a1", n: "1.º año" }, { id: "a2", n: "2.º año" }, { id: "a3", n: "3.º año" }, { id: "prac", n: "Práctica supervisada" }],
    nota: "Para finalizar la carrera hay que hacer una Práctica Supervisada: puede empezar con todas las materias de 1.º y 2.º año aprobadas, y para rendirla hay que tener aprobadas todas las materias de la carrera. El reglamento está en la página de la Facultad.",
    materias: [
      { id: "ieup", n: "Introducción a los Estudios Universitarios", ciclo: "ingreso", corr: [], catedras: [] },

      { id: "intro", n: "Introducción a la Psicología", ciclo: "a1", corr: ["ieup"], catedras: S("2024/09/AT-Introduccion-a-la-psicologia-23.pdf") },
      { id: "nin", n: "Psicología Evolutiva de la Niñez", ciclo: "a1", corr: ["ieup"], catedras: A("2023/02/Programa-2021-Psicologia-del-Desarrollo-Infantil-Cat.-A.pdf", "2023/02/RHCD_363_2019-Programa-Ninez-B.pdf") },
      { id: "esc", n: "Escuelas, Sistemas y Corrientes de la Psicología Contemporánea", ciclo: "a1", corr: ["ieup"], catedras: A("2024/09/AT-Escuelas-A-24.pdf", "2024/09/AT-Escuelas-B-22.pdf") },
      { id: "bio", n: "Biología Evolutiva Humana", ciclo: "a1", corr: ["ieup"], catedras: A("2023/02/RD_111_2020-Programa-Biologia-A.pdf", "2023/02/Programa-2021-Biologia-Evolutiva-Humana-Catedra-B.pdf") },
      { id: "introat", n: "Introducción al Acompañamiento Terapéutico", ciclo: "a1", corr: ["ieup"], catedras: [] },

      { id: "ado", n: "Psicología Evolutiva de la Adolescencia y Juventud", ciclo: "a2", corr: ["nin"], catedras: A("2024/09/AT-Adolescencias-y-juventudes-A-24.pdf", "2024/09/AT-Adolescencia-B-24.pdf") },
      { id: "psicoan", n: "Psicoanálisis", ciclo: "a2", corr: ["esc"], catedras: S("2024/09/AT-Psicoanalisis-24.pdf") },
      { id: "tyt", n: "Teoría y Técnica del Acompañamiento Terapéutico", ciclo: "a2", corr: ["introat"], catedras: S("2024/09/AT-Teoria-y-tecnica-del-at-20.pdf") },
      { id: "disp", n: "Principales Dispositivos y Ámbitos de Abordajes del Acompañamiento Terapéutico", ciclo: "a2", corr: ["introat"], catedras: S("2024/09/AT-Dispositivos-y-ambitos-del-AT-23.pdf") },

      { id: "sanit", n: "Psicología Sanitaria", ciclo: "a3", corr: ["ado"], catedras: S("2023/02/RHCD289-19-Programa-Sanitaria-2019.pdf") },
      { id: "psicopat", n: "Psicopatología", ciclo: "a3", corr: ["ado", "psicoan"], catedras: S("2024/09/psicopato-lic-prof-at-2022-1.pdf") },
      { id: "clinat", n: "Psicología Clínica del Acompañamiento Terapéutico", ciclo: "a3", corr: ["disp", "psicoan", "tyt"], catedras: S("2024/09/AT-Clinica-del-AT-24.pdf") },
      { id: "etica", n: "Ética, Deontología y Legislación Profesional del Acompañante Terapéutico", ciclo: "a3", corr: ["disp"], catedras: [] },

      { id: "practica", n: "Práctica Supervisada", ciclo: "prac", corr: ["intro", "nin", "esc", "bio", "introat", "ado", "psicoan", "tyt", "disp"],
        nota: "Puede comenzar con todas las materias de 1.º y 2.º año aprobadas. Para rendirla y acceder al título hay que tener aprobadas todas las materias de la carrera.", catedras: [] }
    ]
  };
})();
