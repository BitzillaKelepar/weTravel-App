// Import the js file to test
import {isFutureDate, getTripStart, getTripDuration} from "../client/js/dateChecker";

describe("Testing the dateChecker functions", () => {
    test("Testing the isFutureDate() function", () => {
        const dNow = new Date();
        expect(isFutureDate(dNow)).toBe(true);
    });
    
    test("Testing the getTripStart() function", () => {
        expect(getTripStart).toBeDefined();
    });

    test("Testing the getTripDuration() function", () => {
        expect(getTripDuration).toBeDefined();
    });
});