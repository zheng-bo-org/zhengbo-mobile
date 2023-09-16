jest.mock("expo-localization", () => {
    return {
       "getLocales": () => {
           return "I gotcha ya!!!!"
       }
    }
})