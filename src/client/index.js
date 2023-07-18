import { handleSubmit } from "./js/formHandler"
import { isFutureDate, getTripDuration, getTripStart } from "./js/dateChecker"
import { getLocation, getPicture, getWeather } from "./js/postRoutes";

import "./styles/style.scss"

export {
    getLocation,
    getWeather,
    getPicture,
    getTripStart,
    handleSubmit,
    getTripDuration,
    isFutureDate
}
