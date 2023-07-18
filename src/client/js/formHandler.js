import {getTripDuration, getTripStart, isFutureDate} from "./dateChecker";
import {getLocation, getWeather, getPicture} from "./postRoutes";

// Helpers for DOM manipulation
let counter = 0;
let result = document.getElementById("result");
result.addEventListener("click", function (e) {
    e.preventDefault();
    const isButton = e.target.nodeName === "BUTTON";
    const buttonID = e.target.id;
    if (!isButton) {
    } else {
        const button = document.getElementById(buttonID);
        const parent0 = button.parentNode;
        const parent1 = parent0.parentNode;
        parent1.remove();
    }
});

// Update displayed data on submit
function handleSubmit(event) {
    event.preventDefault();
    let formLocation = document.getElementById("location").value.trim();
    const isEmpty = formLocation === "";
    const formDate1 = document.getElementById("depart").value;
    const formDate2 = document.getElementById("return").value;
    const tripDuration = getTripDuration();

    // check if date is not in past
    if ((isFutureDate(formDate1) && isFutureDate(formDate2)) && (tripDuration >= 1) && (formLocation !== isEmpty)) {
        getLocation("http://localhost:8081/location", {location: formLocation})
            .then(function (resGeo) {
                try {
                    getWeather("http://localhost:8081/weather", resGeo.lat, resGeo.lng)
                        .then(function (resWB) {
                            getPicture("http://localhost:8081/picture", {city: formLocation})
                                .then(function (resPix) {
                                    addTrip(resGeo, resWB, resPix);
                                })
                        });
                } catch (error) {
                    alert(`The location ${formLocation} could not be found.`);
                    console.log(error);
                }
            });
    } else if ((isFutureDate(formDate1) && isFutureDate(formDate2)) && (tripDuration < 1)) {
        alert("Please provide a valid trip duration. The submitted return date is before the departure.");
    } else if ((isFutureDate(formDate1) && isFutureDate(formDate2)) && (tripDuration >= 1) && (formLocation === isEmpty)) {
        alert("Please provide a location.");
    } else {
        alert("Please provide a date in the future. The submitted date is in the past.");
    }
}

// Update UI function
function addTrip(resGeo, resWB, resPix) {
    try {
        const duration = getTripDuration();
        const tripStart = getTripStart();
        const depart = document.getElementById("depart").value;
        const leave = document.getElementById("return").value;

        // update DOM
        const empty = document.getElementById("empty");
        empty.style.visibility = "hidden";
        const resultDiv = document.getElementById("result");
        resultDiv.style.marginTop = "-15rem";

        // add heading
        const destinationTDiv = document.createElement("div");
        destinationTDiv.classList.add("trip-text1");
        destinationTDiv.innerHTML = "My trip to:";

        // add city & country
        const destinationDiv = document.createElement("div");
        destinationDiv.classList.add("trip-title");
        destinationDiv.innerHTML = `${resGeo.name}, ${resGeo.countryName}`;

        // add trip date
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("trip-text1");
        dateDiv.innerHTML = `From ${depart} until ${leave}`;

        // add trip duration
        const durationDiv = document.createElement("div");
        durationDiv.classList.add("trip-text2");
        durationDiv.innerHTML = `You will stay a total of ${duration} day(s)`;

        // add days to trip start
        const daysDiv = document.createElement("div");
        daysDiv.classList.add("trip-text3");
        daysDiv.innerHTML = `The trip starts in ${tripStart} day(s)`;

        // add text and temp
        const tempTDiv = document.createElement("div");
        const tempDiv = document.createElement("div");
        tempTDiv.classList.add("trip-text3");
        tempDiv.classList.add("trip-text-temp");
        tempTDiv.innerHTML = `Today's current weather:`;
        tempDiv.innerHTML = `${resWB.data[0].temp} C°`;

        // add remove trip button
        let button = document.createElement("button");
        button.id = `remove-trip${counter}`;
        button.innerHTML = "remove trip";

        // add picture & trip content
        const tripInfo = document.createElement("div");
        const picture = document.createElement("div");
        const tripContent = document.createElement("div");
        picture.innerHTML = `<img class="picture" src="${resPix.webformatURL}" alt="location picture">`;
        tripContent.classList.add("trip-content");
        tripInfo.classList.add("trip-info");
        tripInfo.id = `${resGeo.name}${counter}`;
        tripContent.appendChild(destinationTDiv);
        tripContent.appendChild(destinationDiv);
        tripContent.appendChild(dateDiv);
        tripContent.appendChild(durationDiv);
        tripContent.appendChild(daysDiv);
        tripContent.appendChild(tempTDiv);
        tripContent.appendChild(tempDiv);
        tripContent.appendChild(button);
        tripInfo.appendChild(picture);
        tripInfo.appendChild(tripContent);

        // add divs to DOM
        resultDiv.appendChild(tripInfo);
        counter++;
    } catch (error) {
        console.log("error", error);
    }
}

export {handleSubmit}
