// api.js
/*export function createCordinatesURL(city) {
  return `http://linkoping.onvo.se/geo?city=malmö`;
}


///*export function createCordinatesURL(city) {
  return `https://kontoret.onvo.se:10380/api/v1/geo?city=Stockholm`;
}
*/

/*export function createTemperatureURL(lat, lon){
    return `http://linkoping.onvo.se/api/v1/weather?lat=${lat}&lon=${lon}`;
}*/


// api.js

export function createCoordinatesURL(city) {
    // Här använder vi "kontoret"-adressen och sätter in variablen ${city} dynamiskt
    return `https://kontoret.onvo.se:10380/api/v1/geo?city=${city}`;
}

export function createTemperatureURL(lat, lon) {
    // Här uppdaterar vi också till "kontoret"-adressen så det matchar funktionen ovan
    return `https://kontoret.onvo.se:10380/api/v1/weather?lat=${lat}&lon=${lon}`;
}