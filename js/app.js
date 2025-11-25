/* Mockup-data (Javascript) */

const CITIES = [
  { name: "Stockholm", country: "SE", lat: 59.3293, lon: 18.0686 },
  { name: "Göteborg", country: "SE", lat: 57.7089, lon: 11.9746 },
  { name: "Malmö", country: "SE", lat: 55.6050, lon: 13.0038 },
  { name: "Uppsala", country: "SE", lat: 59.8586, lon: 17.6389 },
  { name: "Lund", country: "SE", lat: 55.7047, lon: 13.1910 },
];

const WEATHER = {
// nyckel: "lat,lon"
  "59.3293,18.0686": { temp: 7, description: "Mulet", icon: "clouds.png", updatedAt: "2025-11-02T09:00:00Z" },
  "57.7089,11.9746": { temp: 8, description: "Lätt regn", icon: "drizzle.png", updatedAt:"2025-11-02T09:00:00Z" },
  "55.605,13.0038": { temp: 9, description: "Klart", icon: "clear.png", updatedAt: "2025-11-02T09:00:00Z" },
  "59.8586,17.6389": { temp: 6, description: "Dis", icon: "rain.png", updatedAt: "2025-11-02T09:00:00Z" },
  "55.7047,13.191": { temp: 8, description: "Halvklart", icon: "mist.png", updatedAt:"2025-11-02T09:00:00Z" },
};


/* Hämta data */

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
function displayWeather(city, weather) {
  
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
function searchCity() {

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
});





/*   const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&models=dmi_seamless";
  async function checkWeather(){
    const response = await fetch(apiUrl);
    var data = await response.json();

    console.log(data)

   // document.querySelector(".city").innerHTML = data. + 
   document.querySelector(".temp").innerHTML = data.hourly_units.temperature_2m;
   document.querySelector(".wind").innerHTML = data.hourly_units.wind_speed_10m + "km/h";
   document.querySelector(".humidity").innerHTML = data.hourly_units.relative_humidity_2m + "%";

  }

  checkWeather(); */