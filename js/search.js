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