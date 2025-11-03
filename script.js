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