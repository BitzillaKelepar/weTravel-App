// dotenv
const dotenv = require("dotenv");
dotenv.config();

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Require node-fetch v2
const fetch = require("node-fetch");

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const path = require("path");

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server
const port = 8081;
app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`server is running on localhost: ${port}`);
}

// API Keys
const geoNameApi = process.env.GUSERNAME;
console.log(`Your GeoNames API is: ${process.env.GUSERNAME}`);
const weatherBitApi = process.env.WEATHERBIT_KEY;
console.log(`Your WeatherBit API is: ${process.env.WEATHERBIT_KEY}`);
const pixaBayApi = process.env.PIXABAY_KEY;
console.log(`Your PixaBay API is: ${process.env.PIXABAY_KEY}`);

// Base URLs
const geoNameBaseURL = "http://api.geonames.org/searchJSON?q=";
const weatherBitBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const pixaBayBaseURL = "https://pixabay.com/api/?";

app.get('/', function (req, res) {
    res.sendFile("dist/index.html");
})

// Post Rout GeoNames
app.post("/location", async function (req, res) {
    try {
        let location = req.body.location;
        const geoApiCall = `${geoNameBaseURL}${location}&maxRows=10&username=${geoNameApi}`;
        const response = await fetch(geoApiCall);
        const geoData = await response.json();
        res.send(geoData.geonames[0]);
        
    } catch (error) {
        console.log("error while retrieving GeoNames data", error);
    }
});

// POST Route WeatherBit
app.post("/weather", async function (req, res) {
    try {
        let lat = req.body.lat;
        let lng = req.body.lng;
        const weatherBitApiCall = `${weatherBitBaseURL}lat=${lat}&lon=${lng}&key=${weatherBitApi}`;
        const response = await fetch(weatherBitApiCall);
        const weatherBitData = await response.json();
        res.send(weatherBitData);
        
    } catch (error) {
        console.log("error while retrieving WeatherBit data", error);
    }
});

// PixaBay POST Route
app.post("/picture", async function (req, res) {
    try {
        let location = req.body.city;
        const pixaBayApiCall = `${pixaBayBaseURL}key=${pixaBayApi}&q=${location}`;
        const response = await fetch(pixaBayApiCall);
        const pixaData = await response.json();
        res.send(pixaData.hits[0]);
    } catch (error) {
        console.log("error while retrieving PixaBay data", error);
    }
});