/* ============================================================
   CALENDARIO ACADÉMICO 2026 · Facultad de Psicología UNC
   Fuente: https://psicologia.unc.edu.ar/secretarias/secretaria-academica/calendario-academico/
   PDF:    RHCD – Calendario de actividades 2026 (rectificada)

   Cómo se completa cada evento:
     d  → fecha de inicio  "AAAA-MM-DD"
     h  → fecha de fin     "AAAA-MM-DD"  (opcional: solo si dura varios días)
     m  → mes "AAAA-MM"    (SOLO para eventos "a definir", en lugar de d)
     t  → texto del evento (tal como figura en el calendario de la Facultad)
     c  → categoría: clases | examenes | inscripcion | receso | tramites | institucional | gestion
     a  → "A cargo" (opcional)
     n  → nota breve (opcional)
   ============================================================ */
window.CALENDARIOS = window.CALENDARIOS || {};
window.CALENDARIOS[2026] = {
  anio: 2026,
  titulo: "Calendario de actividades 2026",
  fuente: {
    nombre: "Facultad de Psicología UNC · Secretaría Académica · Calendario Académico",
    url: "https://psicologia.unc.edu.ar/secretarias/secretaria-academica/calendario-academico/",
    pdf: "https://psicologia.unc.edu.ar/wp-content/uploads/2026/04/RHCD-Calendario-academico-2026-rectificada.pdf",
    pdfNombre: "Calendario académico 2026 (PDF, RHCD rectificada)"
  },
  leido: "2026-11-17",
  eventos: [
    // ---------- ENERO ----------
    { d: "2026-01-02", h: "2026-01-30", t: "Receso académico", c: "receso" },

    // ---------- FEBRERO ----------
    { d: "2026-02-02", t: "Inicio de clases Introducción a los estudios universitarios", c: "clases" },
    { d: "2026-02-02", t: "Inicio inscripción para exámenes turno Febrero - Marzo (regulares y libres) y para coloquios anuales y del 2° cuatrimestre 2025", c: "inscripcion", a: "Despacho de Estudiantes" },
    { d: "2026-02-02", h: "2026-02-06", t: "Presentación de cronogramas de cátedras 2026", c: "gestion", a: "Sec. Académica" },
    { d: "2026-02-09", h: "2026-02-27", t: "Presentación de informes individuales y de cátedra 2025", c: "gestion", a: "Docentes" },
    { d: "2026-02-09", h: "2026-02-20", t: "1er. Turno de exámenes. Regulares y libres", c: "examenes", a: "Sec. Académica" },
    { d: "2026-02-09", h: "2026-02-20", t: "Coloquios anuales y 2do cuatrimestre 2025", c: "examenes", a: "Sec. Académica" },
    { m: "2026-02", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },
    { d: "2026-02-16", h: "2026-02-27", t: "Recepción de solicitudes de equipos de investigación para incorporar estudiantes practicantes con reconocimiento de créditos (Primer llamado anual)", c: "tramites", a: "Mesa de entradas – Secretaría Académica" },
    { d: "2026-02-23", h: "2026-03-06", t: "2° Turno de exámenes. Regulares y libres – 2da fecha", c: "examenes", a: "Sec. Académica" },
    { d: "2026-02-25", h: "2026-03-03", t: "Inscripción de ayudantes estudiantes y adscriptas/os (Llamado anual)", c: "inscripcion", a: "Mesa de Entradas" },

    // ---------- MARZO ----------
    { d: "2026-03-04", h: "2026-03-13", t: "Inscripción estudiantes vocacionales", c: "inscripcion", a: "SAE" },
    { d: "2026-03-11", h: "2026-03-12", t: "Inscripción prioritaria Estudiantes trabajadores", c: "inscripcion" },
    { d: "2026-03-16", h: "2026-03-20", t: "Inscripción cursadas materias de 2° año en adelante, por año de cursada. Seminarios electivos y Talleres de Problemáticas Actuales (Ciclo Superior)", c: "inscripcion", a: "Despacho de Estudiantes" },
    { d: "2026-03-11", t: "Publicación de actas de inscriptos/as de ayudantes estudiantes y adscriptas/os - Solicitud de rectificación (Llamado anual)", c: "tramites", a: "Mesa de Entradas – Sec. Académica" },
    { m: "2026-03", t: "Reuniones inter-cátedras", c: "gestion", a: "Sec. Académica", n: "A definir con equipos de cátedra" },
    { d: "2026-03-27", t: "Finalización de Introducción a los Estudios Universitarios en Psicología", c: "clases" },
    { m: "2026-03", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },
    { d: "2026-03-23", t: "Inicio de clases Cursos Superiores", c: "clases" },
    { d: "2026-03-19", h: "2026-03-31", t: "Entrevistas de selección de ayudantes estudiantes y adscriptas/os (Llamado anual)", c: "tramites", a: "Sec. Académica" },

    // ---------- ABRIL ----------
    { d: "2026-03-31", h: "2026-04-01", t: "Inscripción para 1° año", c: "inscripcion", a: "Despacho de Estudiantes" },
    { d: "2026-04-06", t: "Inicio de clases de 1° año / Talleres de Problemáticas Actuales Ciclo Básico", c: "clases" },
    { d: "2026-04-06", t: "Inicio de clases Introducción a los Estudios Universitarios en Psicología – Modalidad Extendida", c: "clases" },
    { m: "2026-04", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },

    // ---------- MAYO ----------
    { d: "2026-05-04", t: "Inicio inscripción a exámenes especiales (regulares y libres) y coloquios materias y seminarios anuales y 2° cuatrimestre 2025 (última fecha)", c: "inscripcion", a: "Despacho de Estudiantes" },
    { d: "2026-05-11", h: "2026-05-15", t: "Turno de exámenes especiales y coloquios materias y seminarios anuales y 2° cuatrimestre 2025 (última fecha)", c: "examenes", a: "Sec. Académica" },
    { d: "2026-05-11", h: "2026-05-15", t: "Recepción de solicitudes de equivalencias 2026", c: "tramites", a: "SAE" },
    { d: "2026-05-29", t: "1° Ceremonia de colación", c: "institucional" },
    { m: "2026-05", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },

    // ---------- JUNIO ----------
    { m: "2026-06", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },

    // ---------- JULIO ----------
    { d: "2026-07-07", t: "Inicio inscripción para exámenes turno Julio (regulares y libres) y para coloquios del 1° cuatrimestre 2026", c: "inscripcion" },
    { d: "2026-07-03", t: "Finalización de clases correspondiente al primer cuatrimestre", c: "clases", a: "Despacho de Estudiantes" },
    { d: "2026-07-07", h: "2026-07-17", t: "Receso académico", c: "receso" },
    { d: "2026-07-20", h: "2026-07-31", t: "Coloquios promoción materias, seminarios y talleres del 1° cuatrimestre 2026. Turno de exámenes (regulares y libres)", c: "examenes", a: "Despacho de Estudiantes" },
    { m: "2026-07", t: "Reuniones inter-cátedras", c: "gestion", a: "Sec. Académica", n: "A definir con equipos de cátedra" },
    { m: "2026-07", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },

    // ---------- AGOSTO ----------
    { d: "2026-08-03", h: "2026-08-07", t: "Inscripción estudiantes para materias de primer año (Biología – Introducción a la Psicología – Introducción a los Estudios Universitarios en Psicología a distancia), seminarios, talleres y asignaturas del 2° cuatrimestre: asignaturas electivas – Profesorado – Acompañante Terapéutico – Deontología y Legislación Profesional – Según planificación.", c: "inscripcion", a: "Despacho de Estudiantes" },
    { d: "2026-08-03", t: "Reanudación de asignaturas anuales", c: "clases" },
    { d: "2026-08-10", t: "Inicio de clases asignaturas cuatrimestrales de Licenciatura, Profesorado y Acompañante Terapéutico", c: "clases" },
    { d: "2026-08-17", h: "2026-08-21", t: "Inicio de clases de las Asignaturas electivas y Talleres de Problemáticas Actuales - 2° cuatrimestre", c: "clases", n: "Semana del 17" },
    { m: "2026-08", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },

    // ---------- SEPTIEMBRE ----------
    { d: "2026-08-31", t: "Inicio inscripción de exámenes (regulares y libres – TURNO ESPECIAL) y coloquios promoción materias, seminarios y talleres 1° cuatrimestre 2026 (2° fecha)", c: "inscripcion", a: "Despacho de Estudiantes" },
    { d: "2026-09-14", h: "2026-09-18", t: "Turno especial de exámenes y coloquios materias y seminarios 1° cuatrimestre 2026", c: "examenes", a: "Despacho de Estudiantes" },
    { d: "2026-09-17", t: "2° Ceremonia de colación", c: "institucional" },
    { d: "2026-09-21", t: "Asueto – Día del/de la estudiante – RHCS 364/2016", c: "receso" },
    { m: "2026-09", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },

    // ---------- OCTUBRE ----------
    { m: "2026-10", t: "Reuniones inter-cátedras", c: "gestion", a: "Sec. Académica", n: "A definir con equipos de cátedra" },
    { m: "2026-10", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },
    { d: "2026-10-19", h: "2026-10-30", t: "Recepción solicitudes pases y equivalencias", c: "tramites", a: "SAE" },
    { d: "2026-10-22", h: "2026-10-24", t: "VI Congreso Internacional de Psicología y IX Congreso Nacional de Psicología: CIENCIA Y PROFESIÓN \"Ciencia con conciencia: desafíos y horizontes en un mundo en transformación\"", c: "institucional", a: "SECyT" },
    { d: "2026-10-30", t: "Inicio inscripción turno exámenes (regulares y libres) y coloquios 1° cuatrimestre. Materias anuales y seminarios 2° cuatrimestre 2025", c: "inscripcion", a: "Despacho de Estudiantes" },

    // ---------- NOVIEMBRE ----------
    { d: "2026-11-06", t: "Finalización de clases", c: "clases" },
    { d: "2026-11-09", h: "2026-11-20", t: "Recepción de solicitudes de cátedras para incorporar ayudantes estudiantes y adscriptos según vacantes (Llamado anual)", c: "tramites", a: "Mesa de Entradas – Secretaría Académica" },
    { d: "2026-11-09", h: "2026-11-20", t: "Coloquios finales materias promocionales, 2º cuatrimestre y anuales 2026", c: "examenes", a: "Despacho de Estudiantes" },
    { d: "2026-11-09", h: "2026-11-20", t: "Primer turno de exámenes (regulares y libres)", c: "examenes", a: "Despacho de Estudiantes" },
    { m: "2026-11", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" },

    // ---------- DICIEMBRE ----------
    { d: "2026-11-23", h: "2026-12-11", t: "Presentación temprana de cronogramas de cátedras 2026", c: "gestion", a: "Sec. Académica" },
    { d: "2026-11-30", h: "2026-12-07", t: "Inscripción Ingreso 2026", c: "inscripcion", a: "Despacho de Estudiantes" },
    { d: "2026-11-30", h: "2026-12-11", t: "Coloquios finales materias promocionales, 2 cuatrimestre y anuales 2026", c: "examenes", a: "Despacho de Estudiantes" },
    { d: "2026-11-30", h: "2026-12-11", t: "2° Turno de exámenes (regulares y libres)", c: "examenes", a: "Despacho de Estudiantes" },
    { d: "2026-12-11", t: "Último día de atención – Despacho de Estudiantes", c: "institucional", a: "Despacho de Estudiantes" },
    { d: "2026-12-18", t: "3° Ceremonia de colación", c: "institucional" },
    { m: "2026-12", t: "Reunión comisión curricular - Art. 10° RHCD 142/13", c: "gestion", a: "Sec. Académica", n: "A definir con miembros de la comisión" }
  ]
};
