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

  // rendera veckoprognos baserat på vald stad
  const weekly = getWeeklyMockForCity(city);
  renderWeeklyForecast(weekly);
}

if (searchButton) searchButton.addEventListener('click', searchCity);
if (searchInput) {
   searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') searchCity();
});
}

const searchForm = document.querySelector('#searchForm');
if (searchForm) searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  searchCity();
});

// --- Weekly forecast (mock) --- //
function generateWeeklyFromCurrent() {
  const result = {};
  const now = Math.floor(Date.now() / 1000);
  CITIES.forEach(city => {
    const key = `${city.lat.toFixed(4)},${city.lon.toFixed(4)}`;
    const base = WEATHER[key] || {};
    const baseTemp = typeof base.temp === 'number' ? base.temp : 8;
    const baseDesc = base.description || 'Varierande';
    const baseIcon = base.icon || 'clouds.png';
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dt = now + i * 86400;
      const variance = (i % 5) - 2; // -2..+2 deterministic
      const max = baseTemp + variance + 1;
      const min = baseTemp + variance - 3;
      days.push({
        dt,
        temp: { max, min },
        weather: [{ description: baseDesc, icon: baseIcon }]
      });
    }
    result[key] = days;
  });
  return result;
}
const WEEKLY = generateWeeklyFromCurrent();

function getWeeklyMockForCity(city) {
  if (!city) return [];
  const key = `${city.lat.toFixed(4)},${city.lon.toFixed(4)}`;
  return WEEKLY[key] || [];
}

function formatDay(dtUnix) {
  const day = new Date(dtUnix * 1000)
    .toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'short' });

return day.charAt(0).toUpperCase() + day.slice(1);
}


function renderWeeklyForecast(daily) {
  const grid = document.getElementById('weeklyGrid');
  const container = document.getElementById('weekly');
  if (!grid || !container) return;
  if (!daily || daily.length === 0) {
    container.classList.add('hidden');
    grid.innerHTML = '';
    return;
  }
  grid.innerHTML = daily.map((d, i) => {
    const icon = d.weather[0].icon;
    const desc = d.weather[0].description;
    const label = `Prognos ${formatDay(d.dt)}: ${Math.round(d.temp.max)}° / ${Math.round(d.temp.min)}°, ${desc}`;
    return `
      <button class="day" type="button" data-index="${i}" aria-label="${label}">
        <div class="day-name">${formatDay(d.dt)}</div>
        <img src="images/${icon}" alt="${desc}">
        <div class="temp">${Math.round(d.temp.max)}° / ${Math.round(d.temp.min)}°</div>
        <small>${desc}</small>
      </button>`;
  }).join('');
  container.classList.remove('hidden');

  // Click handler (replace previous handlers to avoid duplicates)
  grid.onclick = function(e) {
    const btn = e.target.closest('.day');
    if (!btn) return;
    document.querySelectorAll('.day').forEach(d=>d.classList.remove('active'));
    btn.classList.add('active');
    // Optionally: focus stays on the button, or you could show detail info
  };

  // Arrow-key navigation for weekly buttons
  grid.onkeydown = function(e) {
    const keys = ['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'];
    if (!keys.includes(e.key)) return;
    const buttons = Array.from(grid.querySelectorAll('.day'));
    if (buttons.length === 0) return;
    const current = document.activeElement;
    let idx = buttons.indexOf(current);
    if (idx === -1) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = buttons[(idx + 1) % buttons.length];
      next.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = buttons[(idx - 1 + buttons.length) % buttons.length];
      prev.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttons[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttons[buttons.length - 1].focus();
    }
  };
}
// --- End weekly --- //
