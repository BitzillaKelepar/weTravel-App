function isFutureDate(value) {
    let dNow = new Date();
    let dInput = new Date(value);
    return dNow.getTime() <= dInput.getTime();
}

function getTripDuration() {
    const dDeparture = document.getElementById("depart").value;
    const dReturn = document.getElementById("return").value;
    const oDeparture  = new Date(dDeparture);
    const oReturn  = new Date(dReturn);
    return ((oReturn - oDeparture) / (1000 * 60 * 60 * 24)) + 1
}

function getTripStart() {
    const dDeparture = document.getElementById("depart").value;
    const oDeparture  = new Date(dDeparture);
    const oNow = new Date();
    const daysDiff = ((oDeparture - oNow) / (1000 * 60 * 60 * 24));
    return Math.round(daysDiff);
}

export {getTripStart}
export {isFutureDate}
export {getTripDuration}