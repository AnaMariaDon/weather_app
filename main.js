// main.js
import { createCordinatesURL, createTemperatureURL } from "./services/api.js";

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("city");
const countryEl = document.getElementById("country");
const descEl = document.getElementById("description");
const updatedEl = document.getElementById("updated");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const iconEl = document.getElementById("weather-icon");

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

async function handleSearch() {
  const city = searchInput.value.trim();
  if (!city) return;


  try {
  const fakeWeather = {
    temperature: 12,
    city: city,
    countryCode: "SE",
    description: "Testväder",
    updatedAt: new Date().toISOString(),
    humidity: 66,
    windSpeed: 5,
    icon: "rain"
  };

  try {
    console.log("Söker stad:", city); 

    // 1. Hämta koordinater
    const coordURL = createCordinatesURL(city);
    console.log("Geo-URL:", coordURL);

    const coordRes = await fetch(coordURL);
    console.log("Geo status:", coordRes.status, coordRes.statusText);

    if (!coordRes.ok) {
      const text = await coordRes.text();
      console.error("Geo-svar (fel):", text);
      throw new Error("Fel vid hämtning av koordinater");
    }

    const coordData = await coordRes.json();
    console.log("Geo-data:", coordData);

    // FÖRSÖK läsa lat/lon på flera sätt, beroende på hur svaret ser ut
    let lat, lon;
    if (Array.isArray(coordData)) {
      lat = coordData[0]?.lat ?? coordData[0]?.latitude;
      lon = coordData[0]?.lon ?? coordData[0]?.lng ?? coordData[0]?.longitude;
    } else {
      lat = coordData.lat ?? coordData.latitude;
      lon = coordData.lon ?? coordData.lng ?? coordData.longitude;
    }

    console.log("Lat/Lon som används:", lat, lon);

    if (lat == null || lon == null) {
      throw new Error("Kunde inte läsa koordinater (lat/lon saknas)");
    }

    // 2. Hämta väder
    const weatherURL = createTemperatureURL(lat, lon);
    console.log("Weather-URL:", weatherURL);

    const weatherRes = await fetch(weatherURL);
    console.log("Weather status:", weatherRes.status, weatherRes.statusText);

    if (!weatherRes.ok) {
      const text = await weatherRes.text();
      console.error("Weather-svar (fel):", text);
      throw new Error("Fel vid hämtning av väder");
    }

    const weather = await weatherRes.json();
    console.log("Weather-data:", weather);

    // Här måste du anpassa efter hur weather ser ut!
    tempEl.textContent = `${Math.round(
      weather.temperature ?? weather.temp ?? 0
    )}°C`;

    /*cityEl.textContent = weather.city || city;
    countryEl.textContent = weather.countryCode || weather.country || "";
    descEl.textContent = weather.description || weather.weatherDesc || "";
    updatedEl.textContent = `Senast uppdaterad: ${
      weather.updatedAt || weather.time || ""
    }`;
    humidityEl.textContent = `${weather.humidity ?? weather.hum ?? 0}%`;
    windEl.textContent = `${weather.windSpeed ?? weather.wind ?? 0} km/h`;  */



  tempEl.textContent = `${fakeWeather.temperature}°C`;
  cityEl.textContent = fakeWeather.city;
  countryEl.textContent = fakeWeather.countryCode;
  descEl.textContent = fakeWeather.description;
  updatedEl.textContent = `Senast uppdaterad: ${fakeWeather.updatedAt}`;
  humidityEl.textContent = `${fakeWeather.humidity}%`;
  windEl.textContent = `${fakeWeather.windSpeed} km/h`;


    const iconKey =
      weather.icon ||
      weather.iconCode ||
      weather.condition ||
      "clouds"; // fallback-nyckel

    //iconEl.src = `./images/${iconKey}.png`;
     iconEl.src = "./images/rain.png";
  } catch (err) {
    console.error("Fel i handleSearch:", err);
    alert("Kunde inte hämta väderdata.");
  }  } catch (err) {
    console.error("Ov väntat fel i handleSearch:", err);
    alert("Ett oväntat fel inträffade.");
  }

}