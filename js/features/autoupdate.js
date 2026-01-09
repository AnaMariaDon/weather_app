
// Enkel simulation av tim-uppdatering
export function startWeatherTimer(city) {
    setInterval(() => {
        console.log("Uppdaterar väder automatiskt...");
        // Här kan du anropa din sökfunktion igen
    }, 3600000); // 3600000 ms = 1 timme
}