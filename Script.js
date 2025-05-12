// set up map
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// api and layers
//rghghiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
const apiKey = 'e6d933809c9500136ac8ce9c709250ba';
const weatherLayer = L.layerGroup().addTo(map);
const boundaryLayer = L.layerGroup().addTo(map);
let forecastData = null;
let lastLatLng = null;

// add boundaries
L.geoJSON(boundary, { 
    style: { color: '#d35400', weight: 1, fillOpacity: 0 } 
}).addTo(boundaryLayer);

// click to get weather
map.on('click', async (e) => {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    lastLatLng = e.latlng;

    // get weather data
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const weather = await weatherRes.json();
    const city = weather.name || 'Unknown';
    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const windSpeed = weather.wind.speed;
    const windDeg = weather.wind.deg;

    // show weather marker
    weatherLayer.clearLayers();
    const tempColor = temp > 30 ? '#e74c3c' : temp > 20 ? '#f39c12' : '#2980b9';
    const icon = L.divIcon({
        html: `<div style="background:${tempColor};color:white;padding:8px;border-radius:5px;text-align:center;">
                🌡️ ${temp}°C<br>💧 ${humidity}%<br>💨 ${windSpeed} m/s
            </div>`,
        iconSize: [90, 50]
    });
    L.marker([lat, lon], { icon }).addTo(weatherLayer);

    // update weather table
    document.getElementById('weatherDetails').innerHTML = `
        <thead><tr><th colspan="2">Weather - ${city}</th></tr></thead>
        <tbody>
            <tr><td>📍 Lat</td><td>${lat.toFixed(2)}</td></tr>
            <tr><td>📍 Lon</td><td>${lon.toFixed(2)}</td></tr>
            <tr><td>🌡️ Temp</td><td>${temp} °C</td></tr>
            <tr><td>💧 Humidity</td><td>${humidity}%</td></tr>
            <tr><td>💨 Wind</td><td>${windSpeed} m/s</td></tr>
            <tr><td>↻ Dir</td><td>${windDeg}°</td></tr>
        </tbody>
    `;

    // get forecast data
    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    forecastData = (await forecastRes.json()).list;
    updateForecast(0);
});

// show forecast
function updateForecast(index) {
    if (!forecastData || !lastLatLng) return;

    const data = forecastData[index];
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const windDeg = data.wind.deg;
    const dateTime = data.dt_txt;

    // update forecast marker
    weatherLayer.clearLayers();
    const tempColor = temp > 30 ? '#e74c3c' : temp > 20 ? '#f39c12' : '#2980b9';
    const icon = L.divIcon({
        html: `<div style="background:${tempColor};color:white;padding:8px;border-radius:5px;text-align:center;">
                🌡️ ${temp}°C<br>💧 ${humidity}%<br>💨 ${windSpeed} m/s
            </div>`,
        iconSize: [90, 50]
    });
    L.marker(lastLatLng, { icon }).addTo(weatherLayer);

    // update forecast table
    document.getElementById('forecastDetails').innerHTML = `
        <thead><tr><th colspan="2">Forecast - ${dateTime}</th></tr></thead>
        <tbody>
            <tr><td>🌡️ Temp</td><td>${temp} °C</td></tr>
            <tr><td>💧 Humidity</td><td>${humidity}%</td></tr>
            <tr><td>💨 Wind</td><td>${windSpeed} m/s</td></tr>
            <tr><td>↻ Dir</td><td>${windDeg}°</td></tr>
        </tbody>
    `;
}

// slider for forecast
document.getElementById('timeSlider').addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    updateForecast(value);
    e.target.style.setProperty('--slider-percentage', (value / 39) * 100 + '%');
});

// toggle boundaries
document.getElementById('boundaryToggle').addEventListener('change', (e) => {
    e.target.checked ? map.addLayer(boundaryLayer) : map.removeLayer(boundaryLayer);
});

// toggle weather
document.getElementById('weatherToggle').addEventListener('change', (e) => {
    if (e.target.checked) {
        map.addLayer(weatherLayer);
        if (lastLatLng) updateForecast(document.getElementById('timeSlider').value);
    } else {
        map.removeLayer(weatherLayer);
        document.getElementById('weatherDetails').innerHTML = `
            <thead><tr><th colspan="2">Weather</th></tr></thead>
            <tbody><tr><td colspan="2">Weather off</td></tr></tbody>
        `;
        document.getElementById('forecastDetails').innerHTML = `
            <thead><tr><th colspan="2">Forecast</th></tr></thead>
            <tbody><tr><td colspan="2">Weather off</td></tr></tbody>
        `;
    }
});