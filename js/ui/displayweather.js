/*
export function displayWeather(data) {
    // 1. Hitta elementen i din HTML (justera ID-namnen så de matchar din index.html)
    const tempElement = document.getElementById("temp") || document.querySelector(".temp");
    const cityElement = document.getElementById("city") || document.querySelector(".city");
    const humidityElement = document.querySelector(".humidity-value"); // Exempel
    const windElement = document.querySelector(".wind-value");         // Exempel

    if (!data) return;

    // 2. Uppdatera texten med data från lärarens API
    // OBS: Kontrollera i konsolen (F12) exakt vad fälten heter i 'data'
    if (cityElement) cityElement.innerText = data.name || "Okänd stad";
    
    if (tempElement) {
        // Lärarens API returnerar ofta temperatur i 'data.main.temp' eller bara 'data.temp'
        const temp = data.temperature || (data.main && data.main.temp) || data.t;
        tempElement.innerText = `${Math.round(temp)}°C`;
    }

    // Uppdatera humidity/wind om de finns i API-svaret
    if (humidityElement) humidityElement.innerText = `${data.humidity || data.main?.humidity || 0}%`;
}*/

export function displayWeather(data) {
    // 1. Hitta elementen vi nyss skapade
    const tempElement = document.getElementById("temp");
    const cityElement = document.getElementById("city");
    const humidityElement = document.querySelector(".humidity-value");
    const windElement = document.querySelector(".wind-value");

   if (data && tempElement && cityElement) {
        // Uppdatera texten med datan vi fick
        cityElement.innerText = data.name;
        // Vi använder Math.round för att slippa decimaler
        tempElement.innerText = `${Math.round(data.temp || data.main.temp)}°C`;
    }

    // 3. Om du har humidity/wind i din mockup kan du lägga till dem här
    if (humidityElement) humidityElement.innerText = "65%"; // Exempelvärde
    if (windElement) windElement.innerText = "4 m/s";      // Exempelvärde
}