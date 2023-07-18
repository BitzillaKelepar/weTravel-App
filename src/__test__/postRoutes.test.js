// Import the js file to test
import {getLocation, getWeather, getPicture} from "../client/js/postRoutes";

describe("Testing the post functions", () => {
    test("Test getLocation function", async () => {
        expect(typeof getLocation).toBe("function");
    });

    test("Test getWeather function", async () => {
        expect(typeof getWeather).toBe("function");
    });

    test("Test getPicture function", async () => {
        expect(typeof getPicture).toBe("function");
    });
});