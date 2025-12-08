
import { cityInput, searchButton, weatherOutput } from "./domElements.js";
import { weatherService } from "../main.js";

export function setupEvents() {
  searchButton.addEventListener("click", async () => {
    const city = cityInput.value;
    const data = await weatherService.getWeatherForCity(city);
    weatherOutput.textContent = `${city}: ${data.temperature}°C, ${data.description}`;
  });
}
