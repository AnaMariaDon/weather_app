
export const MOCK_WEATHER = {

"Stockholm": { tempC: 7, description: "Mulet", icon: "☁️", updated: "09:00" },

"Göteborg": { tempC: 8, description: "Lätt regn", icon: "🌧️", updated: "09:00" },

"Malmö": { tempC: 10, description: "Klart", icon: "☀️", updated: "09:00" },

"Uppsala": { tempC: 6, description: "Disigt", icon: "🌫️", updated: "09:00" },

"Lund": { tempC: 9, description: "Halvklart", icon: "⛅", updated: "09:00" }

};






export const mockWeather = {
  city: "Stockholm",
  country: "SE",
  temp: 12.4,
  humidity: 65,
  windSpeed: 5.1,
  description: "Rain",
  icon: "rain",
  updatedAt: "2026-01-09 12:00",
};






/* Hämta data */
/*
function findCityByName(cityName) {
  // Loopa igenom alla städer i CITIES-arrayen
  for (let i = 0; i < CITIES.length; i++) {
    // Jämför stadens namn med det användaren skrev (case-insensitive)
    if (CITIES[i].name.toLowerCase() === cityName.toLowerCase()) {
      return CITIES[i]; // Om det är en match, returnera stadens objekt
    }
  }
  return null; // Om ingen stad hittas, returnera null
}

function getWeatherForCity(city) {
  if (!city) return null; // Om inget stad-objekt skickas in, returnera null direkt

  // Skapa en nyckel av lat och lon, t.ex. "59.3293,18.0686"
  const key = `${city.lat},${city.lon}`;              
  // Slå upp väderdata med nyckeln i WEATHER-objektet
  return WEATHER[key] || null; // Returnera väderdata eller null om inget hittas
}


// TEST - Ta bort sen
/* console.log("Testing findCityByName...");
const testCity = findCityByName("Stockholm");
console.log(testCity);

console.log("Testing getWeatherForCity...");
const testWeather = getWeatherForCity(testCity);
console.log(testWeather); */


// Hitta staden i mockdatan FUNKTIONER

// funktion displayWeather(stad, väder)
/*function displayWeather(city, weather) {
  
  // om (inte stad ELLER inte väder)
  if (!city || !weather) {
    alert("Stad hittades inte!"); // visa popup-meddelande
    return; // avsluta funktionen här
  }
  
  // hitta HTML-elementet med ID #city och ändra texten till stadens namn
  document.querySelector('#city').textContent = city.name;
  document.querySelector('#country').textContent = city.country;
  document.querySelector('#description').textContent = weather.description;
  document.querySelector('#temp').textContent = weather.temp + '°C';
  document.querySelector('#weather-icon').src = "images/" + weather.icon;

    // Bara tid (hh:mm)
  const time = new Date(weather.updatedAt).toLocaleTimeString('sv-SE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  document.querySelector('#updated').textContent = time; 
  
  
}


// Hämta/hitta sökfält och knapp från HTML
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');


 // Hämta texten användaren skrev in
 /*  const cityName = searchInput.value;

  // Kolla om användaren skrev något
  if (cityName.trim() === "") {
    alert("Skriv in ett stadsnamn!");
    return;
  } */
// Funktion som körs när användaren söker
/*function searchCity() {

  // Hämta texten och ta bort mellanslag direkt
const cityName = searchInput.value.trim();

// Kolla om tom
if (cityName === "") {
  alert("Skriv in ett stadsnamn!");
  return;
}
 
  
  // Hitta staden i CITIES
  const city = findCityByName(cityName);
  
  // Hämta väderdata för staden
  const weather = getWeatherForCity(city);
  
  // Visa vädret på skärmen
  displayWeather(city, weather);
}

// När användaren klickar på sökknappen
searchButton.addEventListener('click', searchCity);

// När användaren trycker Enter i sökfältet
searchInput.addEventListener('keypress', function(event) {
  // Om tangenten är Enter
  if (event.key === 'Enter') {
    searchCity(); // Kör sökningen
  }
});*/