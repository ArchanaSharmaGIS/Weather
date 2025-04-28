# Weather Visualization Map

## Overview
The Weather Visualization Map is an interactive web application that displays real-time weather data and 5-day forecasts on a global map. Users can click on any location to view current weather details and use a slider to explore forecast data. The application includes toggleable administrative and weather layers for enhanced usability.

## Features
- **Interactive Map**: Built with Leaflet.js, allowing users to click anywhere on the map to retrieve weather data.
- **Real-Time Weather Data**: Displays current temperature, humidity, wind speed, and wind direction using the OpenWeatherMap API.
- **5-Day Forecast**: A slider enables users to view forecast data for the selected location over the next 5 days.
- **Layer Controls**: Toggle administrative boundaries and weather markers on or off.
- **Responsive Design**: Adapts to various screen sizes, ensuring usability on both desktop and mobile devices.
- **Weather Insights Sidebar**: Presents detailed weather and forecast information in tabular format.


1. **Project Structure**:
       following files are in the project directory:
   - `index.html`: Main HTML file.
   - `style.css`: CSS for styling the application.
   - `Script.js`: JavaScript for map functionality and API integration.
   - `Worldmap.js`: GeoJSON data for administrative boundaries.

2. **Obtain an OpenWeatherMap API Key**:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/) and generate an API key.
   - Replace the `apiKey` variable in `Script.js` with the API key:
     ```javascript
     const apiKey = '-api-key-here';
     
## Usage
1. **View the Map**: The map loads with OpenStreetMap tiles and administrative boundaries.
2. **Get Weather Data**: Click on any location to display current weather details in the sidebar and a marker with temperature, humidity, and wind speed.
3. **Explore Forecast**: Use the slider in the sidebar to view forecast data for the selected location, updating the marker and forecast table.
4. **Toggle Layers**:
   - Use the layer control (top-right) to show/hide administrative boundaries or weather markers.
   - Disabling the weather layer clears markers and resets tables.
5. **Responsive Experience**: Resize the browser or access via mobile to see the layout adapt (map and sidebar stack vertically on smaller screens).

## Technologies Used
- **HTML5**: Structure of the web application.
- **CSS3**: Styling with responsive design and custom slider/layer controls.
- **JavaScript**: Core logic for map interactions and API calls.
- **Leaflet.js**: Interactive map rendering.
- **OpenWeatherMap API**: Provides real-time weather and forecast data.
- **GeoJSON**: Administrative boundary data for the map.
- **Roboto Font**: Clean typography via Google Fonts.

## Notes
- The OpenWeatherMap API key is required for weather data. Ensure it is valid and correctly configured in `Script.js`.
- The application relies on external CDNs for Leaflet.js and Google Fonts. Ensure internet connectivity for these resources.
- For production, consider hosting the application on a secure server and implementing error handling for API failures.
