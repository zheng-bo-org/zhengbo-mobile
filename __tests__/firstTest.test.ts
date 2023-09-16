import {getLocales} from "expo-localization";

describe("First test", () => {
    it("should be equals two", () => {
        const calculator = () => {
            return 1 + 1;
        }
        expect(calculator()).toBe(2)
    })
})

describe("Mock should be works", () => {
    it('should be works', () => {
        expect(getLocales()).toBe("I gotcha ya!!!!")
    });
})