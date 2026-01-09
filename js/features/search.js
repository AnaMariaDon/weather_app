/*
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/geo", async (req, res) => {
    const city = req.query.city;
    const url = `https://kontoret.onvo.se:10380/api/v1/geo?city=${encodeURIComponent(city)}`;
    const r = await fetch(url);
    const data = await r.json();
    res.send(data);
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
*/

//import { weatherService } from "../../services/weatherService.js"; // eller liknande

import { displayWeather } from "../ui/displayweather.js";

export function initSearch() {
    const searchButton = document.querySelector(".search button");
    const searchInput = document.querySelector(".search input");

    if (searchButton) {
        searchButton.addEventListener("click", async () => {
            const city = searchInput.value.trim();
            if (city) {
                // 1. Hämta datan (antingen mock eller API)
                const data = await getWeatherData(city);
                // 2. SKICKA DATAN TILL SKÄRMEN
                if (data) {
                    displayWeather(data);
                } else {
                    alert("Staden hittades inte!");
                }
            }
        });
    }
}