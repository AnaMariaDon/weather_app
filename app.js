/* Mockup-data (Javascript) */

const CITIES = [
  { name: "Stockholm", country: "SE", lat: 59.3293, lon: 18.0686 },
  { name: "Göteborg", country: "SE", lat: 57.7089, lon: 11.9746 },
  { name: "Malmö", country: "SE", lat: 55.6050, lon: 13.0038 },
  { name: "Uppsala", country: "SE", lat: 59.8586, lon: 17.6389 },
  { name: "Lund", country: "SE", lat: 55.7047, lon: 13.1910 },
];

// Use consistent key format with 4 decimals
const WEATHER = {
  "59.3293,18.0686": { temp: 7, description: "Mulet", icon: "clouds.png", updatedAt: "2025-11-02T09:00:00Z" },
  "57.7089,11.9746": { temp: 8, description: "Lätt regn", icon: "drizzle.png", updatedAt: "2025-11-02T09:00:00Z" },
  "55.6050,13.0038": { temp: 9, description: "Klart", icon: "clear.png", updatedAt: "2025-11-02T09:00:00Z" },
  "59.8586,17.6389": { temp: 6, description: "Dis", icon: "rain.png", updatedAt: "2025-11-02T09:00:00Z" },
  "55.7047,13.1910": { temp: 8, description: "Halvklart", icon: "mist.png", updatedAt: "2025-11-02T09:00:00Z" },
};

function findCityByName(cityName) {
  for (let i = 0; i < CITIES.length; i++) {
    if (CITIES[i].name.toLowerCase() === cityName.toLowerCase()) {
      return CITIES[i];
    }
  }
  return null;
}

function getWeatherForCity(city) {
  if (!city) return null;
  const key = `${city.lat.toFixed(4)},${city.lon.toFixed(4)}`;
  return WEATHER[key] || null;
}

function displayWeather(city, weather) {
  if (!city || !weather) {
    alert("Stad hittades inte!");
    return;
  }

  document.querySelector('#cityNName').textContent = city.name;
  document.querySelector('#temperature').textContent = weather.temp + '°C';
  document.querySelector('#description').textContent = weather.description;
  // Sätt bild i #icon (index.html använder en span)
  const iconContainer = document.querySelector('#icon');
  iconContainer.innerHTML = `<img id="weather-icon" src="images/${weather.icon}" alt="${weather.description}">`;

  const time = new Date(weather.updatedAt).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  document.querySelector('#updatedTime').textContent = time;

  // visa resultat-området (om du har en .hidden-klass)
  const result = document.querySelector('#weatherResult');
  if (result) result.classList.remove('hidden');
}

// Koppla till HTML (index.html använder dessa IDs)
const searchInput = document.querySelector('#cityInput');
const searchButton = document.querySelector('#searchBtn');

function searchCity() {
  const cityName = (searchInput && searchInput.value || '').trim();
  if (cityName === '') {
    alert('Skriv in ett stadsnamn!');
    return;
  }

  const city = findCityByName(cityName);
  const weather = getWeatherForCity(city);
  displayWeather(city, weather);
}

if (searchButton) searchButton.addEventListener('click', searchCity);
if (searchInput) searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') searchCity();
});

/* End of app.js */