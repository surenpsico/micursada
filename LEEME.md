# Psicología UNC · Calendario y correlativas

Sitio estático (HTML + CSS + JS, sin instalar nada). Abrí `index.html` o subí esta carpeta a cualquier hosting estático (GitHub Pages, Netlify, Vercel, Drive web, etc.).

## Estructura

```
index.html              página única (rutas por hash: #/, #/calendario, #/carrera, #/enlaces)
css/styles.css          identidad visual (colores, tipografías, claro/oscuro)
js/app.js               lógica
data/calendario-2026.js calendario académico 2026
data/plan-2021.js       Licenciatura en Psicología · Plan 2021 (materias y correlativas)
data/enlaces.js         enlaces útiles
assets/                 logo (versión sobre claro y sobre oscuro) y favicon
```

## Cómo pasar al calendario 2027

1. Copiá `data/calendario-2026.js` como `data/calendario-2027.js`.
2. En el archivo nuevo cambiá `CALENDARIOS[2026]` por `CALENDARIOS[2027]`, `anio`, `titulo`, `fuente.pdf`, `leido` y cargá los eventos del PDF nuevo (las instrucciones de cada campo están al principio del archivo).
3. En `index.html` agregá debajo de la línea del 2026:
   `<script src="data/calendario-2027.js"></script>`
4. Listo: el sitio elige solo el año que corresponde a la fecha de hoy y aparece un selector de año en la página del calendario.

## Cómo actualizar correlativas

Cada plan es un archivo en `data/`:

- `plan-2021.js` · Licenciatura, Plan 2021
- `plan-1986.js` · Licenciatura, Planes 1986 y 1986 R (una sola lista; `only`, `corr86` y `corr86r` marcan las diferencias)
- `plan-profesorado.js` · Profesorado, Planes 2017 y 1986
- `plan-tecnicatura-at.js` · Tecnicatura Universitaria en Acompañamiento Terapéutico

Cada materia tiene `corr` (ids de sus correlativas) y `catedras` (links a programas). Opcionales: `opt` (electiva, no cuenta en el total), `ext` (materia de otro plan, no cuenta), `nota`, `sub`.
Para sumar otro plan: archivo nuevo con la misma estructura, registrado en `window.PLANES`, un `<script>` en `index.html` y su id en la lista `PLAN_IDS` de `js/app.js`.

## Probar otra fecha

Agregá `?hoy=2026-03-20` a la URL para ver el sitio como si fuera ese día.

## Fuente de los datos

Facultad de Psicología UNC: https://psicologia.unc.edu.ar/estudiantes/
