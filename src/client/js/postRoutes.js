// Get location function
const getLocation = async (url = "", location = {}) => {
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
        alert(`The Location could not be found`);
    }
};

// Get picture function
const getPicture = async (url = "", city = {}) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(city)
        });
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
};

export {getLocation, getWeather, getPicture}