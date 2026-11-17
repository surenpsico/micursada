/* Enlaces útiles · todos apuntan al sitio de la Facultad de Psicología UNC */
(function () {
  var B = "https://psicologia.unc.edu.ar";
  window.ENLACES = {
    destacados: [
      { t: "Guaraní",      d: "Autogestión: inscripciones, materias y exámenes", u: "https://autogestion.guarani.unc.edu.ar/", k: "guarani" },
      { t: "Aula Virtual", d: "Campus virtual de la Facultad",                   u: "https://psicologia.aulavirtual.unc.edu.ar/", k: "aula" }
    ],
    grupos: [
      { t: "Académico", items: [
        { t: "Calendario académico",    u: B + "/secretarias/secretaria-academica/calendario-academico/" },
        { t: "Turnos de exámenes",      u: B + "/estudiantes/informacion-academica/turnos-de-examenes/" },
        { t: "Inscripción a cursadas",  u: B + "/estudiantes/informacion-academica/inscripcion-a-cursadas/" },
        { t: "Rematriculación anual",   u: B + "/estudiantes/informacion-academica/rematriculacion-anual/" },
        { t: "Distribución de aulas",   u: B + "/estudiantes/asignaturas/distribucion-de-aulas/" },
        { t: "Ayudantes y colaboradores", u: B + "/estudiantes/informacion-academica/ayudantes-y-colaboradores/" },
        { t: "Estudiantes vocacionales", u: B + "/estudiantes/informacion-academica/estudiantes-vocacionales/" }
      ]},
      { t: "Planes y asignaturas", items: [
        { t: "Licenciatura · Plan 2021",              u: B + "/secretarias/secretaria-academica/licenciatura-en-psicologia/plan-2021/" },
        { t: "Licenciatura · Planes 1986 y 1986 R",   u: B + "/secretarias/secretaria-academica/licenciatura-en-psicologia/plan-1986-y-1986-r/" },
        { t: "Profesorado en Psicología",             u: B + "/estudiantes/asignaturas/profesorado-en-psicologia/" },
        { t: "Tecnicatura Universitaria en AT",       u: B + "/estudiantes/asignaturas/tecnicatura-universitaria-en-at/" }
      ]},
      { t: "Trámites y becas", items: [
        { t: "Trámites frecuentes",         u: B + "/estudiantes/tramites-frecuentes/" },
        { t: "Formularios y reglamentaciones", u: B + "/estudiantes/formularios-y-reglamentaciones/" },
        { t: "Becas",                        u: B + "/estudiantes/becas/" },
        { t: "Colaciones de grado",          u: B + "/estudiantes/informacion-academica/colaciones-de-grado/" }
      ]},
      { t: "Vida universitaria", items: [
        { t: "PROFIPE",                        u: B + "/estudiantes/profipe/" },
        { t: "Cultura y deportes",             u: B + "/estudiantes/cultura-y-deportes/" },
        { t: "Inclusión y participación",      u: B + "/estudiantes/inclusion-y-participacion/" },
        { t: "Ingreso",                        u: B + "/ingreso/" }
      ]}
    ],
    sitio: B + "/estudiantes/"
  };
})();
