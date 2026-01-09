/*
import { createCoordinatesURL, createTemperatureURL } from "./api.js";

export async function getWeatherData(city) {
  try {
    // 1. Hämta koordinater för staden
    const coordUrl = createCoordinatesURL(city);
    const coordResponse = await fetch(coordUrl);
    
    if (!coordResponse.ok) {
      throw new Error(`Kunde inte hitta staden: ${city}`);
    }

    const coordData = await coordResponse.json();
    console.log("Koordinat-data:", coordData); // Bra för felsökning

    // Kontrollera om vi fick några data (beroende på hur lärarens API ser ut)
    // Ibland returnerar API:et en lista, ibland ett objekt. 
    // Vi antar här att coordData innehåller lat och lon direkt eller i första elementet.
    
    // Justera detta om API:et returnerar en array (t.ex. coordData[0].lat)
    const lat = coordData.latitude || coordData.lat || (coordData[0] && coordData[0].lat);
    const lon = coordData.longitude || coordData.lon || (coordData[0] && coordData[0].lon);

    if (!lat || !lon) {
      throw new Error("Inga koordinater hittades för denna stad.");
    }

    // 2. Hämta vädret med hjälp av koordinaterna
    const weatherUrl = createTemperatureURL(lat, lon);
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    
    console.log("Väder-data:", weatherData); // Bra för felsökning

    return weatherData;

  } catch (error) {
    console.error("Något gick fel vid hämtning av väder:", error);
    return null;
  }
}*/

///yea:

// js/services/weatherService.js 
/*import { createCoordinatesURL, createTemperatureURL } from "./api.js";
//import { mockWeather } from "../js/data/mock_weather.js";

//import { CITIES, MOCK_WEATHER } from "../data/mock_weather.js";

const useMockData = true; // ÄNDRA TILL 'false' NÄR DU VILL KÖRA LÄRARENS API

export async function getWeatherData(cityName) {
    if (useMockData) {
        console.log("Använder Mockup-data...");
        const city = CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
        if (!city) return null;
        const weather = WEATHER_MOCK[`${city.lat},${city.lon}`];
        return { name: city.name, main: { temp: weather.temp }, weather: [{ description: weather.description }] };
    } else {
        console.log("Anropar Lärarens API...");
        const coordRes = await fetch(createCoordinatesURL(cityName));
        const coordData = await coordRes.json();
        
        // Lärarens API returnerar ofta koordinaterna direkt
        const lat = coordData.lat || coordData[0]?.lat;
        const lon = coordData.lon || coordData[0]?.lon;

        const weatherRes = await fetch(createTemperatureURL(lat, lon));
        return await weatherRes.json();
    }
}*/
