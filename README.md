# COVID-19 Tracker Colombia

Aplicación web construida con React que consume la API pública de COVID-19
de Colombia y muestra estadísticas actualizadas de casos, fallecidos y recuperados.

## 🔗 Demo

**GitHub Pages:** https://cachaucanes.github.io/Softimus-covid-19/

## ✨ Features

- Estadísticas globales de COVID-19 en Colombia (casos, muertes, recuperados)
- Filtro por fecha: hoy y ayer para ver tendencias recientes
- Interfaz responsive con Material UI

## 🛠️ Tech Stack

| Tecnología | Versión |
|---|---|
| React | 18.x |
| MUI (Material UI) | 5.x |
| Axios | 1.x |
| react-spinners | 0.14.x |
| Create React App | 5.x |

## 🚀 Instalación local

```bash
git clone https://github.com/cachaucanes/Softimus-covid-19.git
cd Softimus-covid-19
npm install
npm start
```

Abre http://localhost:3000 en el navegador.

## 📦 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Corre la app en modo desarrollo |
| `npm run build` | Genera el build de producción |
| `npm test` | Ejecuta los tests |
| `npm run deploy` | Publica en GitHub Pages |

## ⚠️ Known issues

`npm audit` reporta vulnerabilidades provenientes de `webpack-dev-server`,
interno de `react-scripts`. No afectan el build de producción y no tienen
fix disponible sin romper la arquitectura del proyecto.

## 📄 Licencia

MIT