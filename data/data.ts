import {AppContext, Locale} from "../app";
import signInIndexDataLoader from './screenDataLoader/signIn/index'

//The actual screen path inside app folder.
//If there are more than one screens and should be loaded conditionally based on the user action.
//Then should define multiple Screens for the one component. for example: signIn/index-screenName1 signIn/index-screenName2
export type Screen =  "signIn/index"

//App is just an abstraction for the screen, not the real API.
//Screen developer should not care about API details.
export type API = "selectableSystemRoles";

export type ScreenDataLoader = (data: Object, context: AppContext) => Promise<Record<Screen, Object>>
export type ApiDataLoader = (data: Object, context: AppContext) => Promise<Object>

const signInScreenDataLoaders: Record<Screen, ScreenDataLoader> = {"signIn/index": signInIndexDataLoader}
const apis: Record<API, ApiDataLoader> = {
    "selectableSystemRoles": async (data, context): Promise<Object> => {
       return {}
    }
}

const screenDataLoaders: Record<Screen, ScreenDataLoader> = {...signInScreenDataLoaders}
type ScreenDataLoaderReq = {
    reqData: Object
};
const mockedContext:AppContext = {
    locale(): Locale {
        return "en"
    },
    toJSON(): string {
        return ""
    }
}
export async function loadInitDataForThePage(screen: Screen, req: ScreenDataLoaderReq): Promise<Record<Screen, Object>> {
    const dataLoader = screenDataLoaders[screen];
    if (screenDataLoaders == undefined) {
        return undefined;
    }

    return dataLoader(req, mockedContext)
}

export async function sendRequest(api:API, data: Object): Promise<Object>{
    const dataLoader = apis[api];
    if (api == null) {
        return undefined;
    }
    return dataLoader(data, mockedContext)
}
