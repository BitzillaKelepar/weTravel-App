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

// Initialize empty Projectdata
let projectData = {};

// API Keys
const geoNameApi = process.env.GUSERNAME;
console.log(`Your GeoNames API is: ${process.env.GUSERNAME}`);
const weatherBitApi = process.env.WEATHERBIT_KEY;
console.log(`Your WeatherBit API is: ${process.env.WEATHERBIT_KEY}`);
const pixaBayApi = process.env.PIXABAY_KEY;
console.log(`Your PixaBay API is: ${process.env.PIXABAY_KEY}`);

// Base URLs
const geoNameBaseURL = "http://api.geonames.org/PlacenameSearchJSON?";

app.get('/', function (req, res) {
    res.sendFile("dist/index.html");
})

// GeoNames POST Route
app.post("/location", async function (req, res) {
    let projectData = req.body;
    console.log(`Your Data: ${projectData}`);
    const geoNameURL = `${geoNameBaseURL}placename=${req.body.location}}&maxRows=10&username=${geoNameApi}`;
    const response = await fetch(geoNameURL);
    try {
        const gData = await response.json();
        console.log(gData);
        res.send(gData);
    } catch (error) {
        console.log("error", error);
    }
});

// WeatherBit POST Route
app.post("/weather", async function (req, res) {});

// PixaBay POST Route
app.post("/picture", async function (req, res) {});

// GET Route
app.get('/all', function (req, res) {
    res.send(projectData);
})