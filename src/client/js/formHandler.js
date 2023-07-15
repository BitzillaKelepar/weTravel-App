import {getTripDuration, isFutureDate} from "./dateChecker";

/* Eventlistener for DOM manipulation */
// const removeTrip = document.getElementById("remove");
// removeTrip.addEventListener("click", function);

// Update displayed data on submit
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
        console.log(`::: The trip duration is: ${tripDuration} days :::`);

        getLocation("http://localhost:8081/location", {location: formLocation})
            .then(function (locationData) {
                // Debugging - OK
                console.log(locationData);
                getWeather("http://localhost:8081/weather", locationData.lat, locationData.lng)
                    .then(function(res){
                        // Debugging - OK
                        console.log(res);
                    });
            });

    } else if ((isFutureDate(formDate1) && isFutureDate(formDate2)) && (tripDuration < 1)) {
        alert("Please provide a valid trip duration. The submitted return date is before the departure.");
    } else {
        alert("Please provide a date in the future. The submitted date is in the past.");
    }
}

// Get location function
const getLocation = async (url = "", location = {}) => {
    // Debugging - OK
    console.log(location);
    try {
        const res = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(location)
        });
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
};

// Get weather function
const getWeather = async (url = "", latitude = {}, longitude = {}) => {
    // Debugging - OK
    console.log(latitude, longitude);
    try {
        const res = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({lat: latitude, lng: longitude})
        });
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
};

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

// Update UI function
const updateUI = async () => {
    const req = await fetch("http://localhost:8081/all");
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
