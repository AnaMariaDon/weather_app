// js/main.js





import { createCoordinatesURL, createTemperatureURL } from "../services/api.js";
async function fetchWithTimeout(url, ms = 4000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

console.log("✅ main.js laddad");

// ===== DOM =====
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("city");
const countryEl = document.getElementById("country");
const descEl = document.getElementById("description");
const updatedEl = document.getElementById("updated");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");

// Om du har <img id="weather-icon" ...> i HTML, annars blir iconEl null och det är ok.
const iconEl = document.getElementById("weather-icon");

// ===== EVENTS =====
searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

// ===== HELPERS =====
function renderWeather({ city, country, temp, humidity, windSpeed, description, icon }) {
  if (temp != null) tempEl.textContent = `${Math.round(temp)}°C`;
  if (city != null) cityEl.textContent = city;
  if (countryEl) countryEl.textContent = country ?? "";
  if (descEl) descEl.textContent = description ?? "";
  if (updatedEl) updatedEl.textContent = `Senast uppdaterad: ${new Date().toLocaleString("sv-SE")}`;
  if (humidityEl) humidityEl.textContent = humidity != null ? `${humidity}%` : "";
  if (windEl) windEl.textContent = windSpeed != null ? `${windSpeed} km/h` : "";

  if (iconEl && icon) {
    iconEl.src = `./images/${icon}.png`;
  }
}

function renderMock(cityFromInput) {
  const mock = {
    city: cityFromInput,
    country: "SE",
    temp: 12.4,
    humidity: 65,
    windSpeed: 5.1,
    description: "Rain",
    icon: "rain",
  };
  renderWeather(mock);
}

// ===== MAIN SEARCH =====
async function handleSearch() {
  const city = searchInput.value.trim();
  if (!city) return;

  // lås knappen under fetch så du inte spam-klickar
  searchButton.disabled = true;

  try {
    console.log("Söker stad:", city);

    // 1) Geo
    const geoUrl = createCoordinatesURL(city);
    console.log("Geo URL:", geoUrl);

 const geoRes = await fetchWithTimeout(geoUrl, 1000);

    if (!geoRes.ok) throw new Error(`Geo failed: ${geoRes.status}`);

    const geoData = await geoRes.json();
    console.log("Geo data:", geoData);

    // Kontoret-API verkar returnera: { city, lat, lon }
    const lat = geoData.lat ?? geoData.latitude ?? geoData?.[0]?.lat ?? geoData?.[0]?.latitude;
    const lon =
      geoData.lon ??
      geoData.lng ??
      geoData.longitude ??
      geoData?.[0]?.lon ??
      geoData?.[0]?.longitude;

    if (lat == null || lon == null) {
      throw new Error("lat/lon saknas i geo-svaret");
    }

    // 2) Weather
    const weatherUrl = createTemperatureURL(lat, lon);
    console.log("Weather URL:", weatherUrl);

    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error(`Weather failed: ${weatherRes.status}`);

    const weatherData = await weatherRes.json();
    console.log("Weather data:", weatherData);

    // Kontoret-API verkar returnera: { temp, humidity, windSpeed, description }
    renderWeather({
      city: geoData.city ?? city,
      country: geoData.country ?? "",
      temp: weatherData.temp,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      description: weatherData.description,
      icon: weatherData.icon ?? "rain",
    });
  } catch (err) {
    console.error("API fail, kör mock istället:", err);
    renderMock(city);
  } finally {
    searchButton.disabled = false;
  }
}
