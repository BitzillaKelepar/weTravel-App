import {getTripDuration, getTripStart, isFutureDate} from "./dateChecker";

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
    // Debugging - OK
    // console.log(`::: Form submitted for: ${formLocation} :::`);
    // console.log(`::: Form submitted for: ${formDate1} until ${formDate2}:::`);

    // check if date is not in past
    if ((isFutureDate(formDate1) && isFutureDate(formDate2)) && (tripDuration >= 1)) {
        // Debugging - OK
        // console.log(`::: The trip duration is: ${tripDuration} days :::`);

        getLocation("http://localhost:8081/location", {location: formLocation})
            .then(function (locationData) {
                // Debugging - OK
                console.log(locationData);
                getWeather("http://localhost:8081/weather", locationData.lat, locationData.lng)
                    .then(function(res){
                        // Debugging - OK
                        // console.log(res);
                        addTrip(locationData, res);
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

// Update UI function
function addTrip(resGeo, resWB) {
    // Debugging
    console.log(resGeo);
    console.log(resWB);
    
    try {
        const duration = getTripDuration();
        const tripStart = getTripStart();
        const depart = document.getElementById("depart").value;
        const leave = document.getElementById("return").value;
        console.log(`My Trip to ${resGeo.name}, ${resGeo.countryName}`);
        console.log(`is in ${tripStart} day(s) from ${depart} to ${leave} and lasts ${duration} day(s).`);
        console.log(`It's currently ${resWB.data[0].temp} C° today.`);
        
        // update DOM
        // add city & country
        // document.getElementById("destination").innerHTML = `${resGeo.name}, ${resGeo.countryName}`;
        // add trip date
        // document.getElementById("date").innerHTML = `From ${depart} until ${leave}`;
        // add trip duration
        // document.getElementById("duration").innerHTML = `You will stay a total of ${duration} day(s)`;
        // Add Temp
        // document.getElementById("temp").innerHTML = `Today's current weather:`;
        // document.getElementById("temp").innerHTML = `${resWB.data[0].temp} C°`;
        
    } catch (error) {
        console.log("error", error);
    }
}

export {handleSubmit}
