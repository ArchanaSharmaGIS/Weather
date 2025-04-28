# 🌎 Weather Visualization Map

Welcome!  
This project shows live weather data and 5-day forecasts on a global map. You can click anywhere on the map to view weather updates like temperature, humidity, and wind speed.

---

## 📁 Project Files

- `index.html` — The main webpage structure.
- `Script.js` — All the interactive map and weather logic.
- `style.css` — Makes the map and sidebar look nice and responsive.
- `Worldmap.js` — Provides world boundaries to display on the map.

---

## 🚀 How It Works

- A global map (using **Leaflet** and **OpenStreetMap**) is displayed.
- When you click on the map:
  - It fetches real-time weather data from **OpenWeatherMap API**.
  - It places a colorful weather marker where you clicked.
  - It updates the sidebar with temperature, humidity, wind, and forecast.
- A slider lets you move through 5 days of weather forecasts.
- You can toggle on/off:
  - Administrative boundaries (countries, regions)
  - Weather markers

---

## 🔑 Important

- Make sure you have an API Key from [OpenWeatherMap](https://openweathermap.org/api).
- In `Script.js`, replace the existing key with your own if needed:

```javascript
const apiKey = 'YOUR_API_KEY_HERE';
