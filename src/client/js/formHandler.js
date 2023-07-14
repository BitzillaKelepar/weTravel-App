import {getTripDuration, isFutureDate} from "./dateChecker";

/* Eventlistener for DOM manipulation */
// const removeTrip = document.getElementById("remove");
// removeTrip.addEventListener("click", function);

// Create a new date instance dynamically with JS
let d = new Date();

// Post data function
const postData = async (url = "", data = {}) => {
    // Debugging
    console.log(data);
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const locationData = await res.json();
        // Debugging
        console.log(`>>> Returned Data from GeoNames: ${locationData} <<<`);
        return locationData;
    } catch (error) {
        console.log("error", error);
    }
};

// Update displayed weather data

function handleSubmit(event) {
    event.preventDefault();
    // check if location is valid
    // const isValidLocation = Client.isValidLocation(formLocation);
    let formLocation = document.getElementById("location").value.trim();
    const formDate1 = document.getElementById("depart").value;
    const formDate2 = document.getElementById("return").value;
    const tripDuration = getTripDuration();
    // Debugging
    console.log(`::: Form submitted for: ${formLocation} :::`);
    console.log(`::: Form submitted for: ${formDate1} until ${formDate2}:::`);

    // check if date is not in past
    if ((isFutureDate(formDate1) && isFutureDate(formDate2)) && (tripDuration >= 1)) {
        // Debugging
        console.log(`::: Form submitted with valid dates :::`);
        console.log(`::: The trip duration is: ${tripDuration} days :::`);
        
        /*postData("/location", formLocation)
            .then(function (res) {
                updateUI(res)
            })*/
        
    } else if ((isFutureDate(formDate1) && isFutureDate(formDate2)) && (tripDuration < 1)){
        alert("Please provide a valid trip duration. The submitted return date is before the departure.");
    } else {
        alert("Please provide a date in the future. The submitted date is in the past.");
    }
}
/*function updateInfo(e) {
    e.preventDefault();
    let formLocation = document.getElementById("location").value.trim();
    const isValidLocation = Client.isValidLocation(formLocation);
    console.log(formLocation);

    getWeather(baseURL, newZip, apiKey)
        .then(function (data) {
            // add data to POST request
            postData("http://localhost:8008/add", {
                name: data.name,
                date: newDate,
                temp: data.main.temp,
                content
            }).then(function () {
                //updateUI() 
            });
        })
}*/

// Get the weather information
/*const getWeather = async (baseURL, newZip, apiKey) => {
    try {
        const res = await fetch(baseURL + newZip + apiKey);
        const data = await res.json();

        if (data.cod !== 200) {
            document.getElementById("error").innerHTML = "City not found. Enter a valid zip code.";
            document.getElementById("entryHolder").style.display = "none";

        } else {
            document.getElementById("error").innerHTML = "";
            document.getElementById("entryHolder").style.display = "block";
            return data;
        }
    } catch (error) {
        console.log("error", error);
    }
};*/

// Post data function
/*const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};*/

// Update UI function
const updateUI = async () => {
    const req = await fetch("http://localhost:8081/location");
    try {
        const allData = await req.json();
        console.log(allData)
        // update DOM
        /*document.getElementById("name").innerHTML = allData.name;
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById("temp").innerHTML = allData.temp + " °F";
        document.getElementById("content").innerHTML = allData.content;*/
    } catch (error) {
        console.log("error", error);
    }
};

export {handleSubmit}
