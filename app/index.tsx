import {useEffect, useState} from "react";
import * as splashScreen from 'expo-splash-screen'
import {getLocales} from 'expo-localization'
import {logError} from "../god/God";
import {rootResourceLoader as AppContextLoader} from '../component/AppContextBuilder'
import {AwardedError} from "../component/AwardedError";

splashScreen.preventAutoHideAsync();

export type Locale = "en" | "cn"
//TODO HOW to build the AppContext? Should treat it as a root resource loader?
export interface AppContext  {
    locale(): Locale,
    toJSON(): string
}

export interface ResourceLoader<T> {
    /**
     * load the resource
     * @param appContext context of the app.
     * @return if load succeeded return undefined else return the reason.
     */
    load(appContext: AppContext): Promise<string | undefined | T>
}

const resources: ResourceLoader<any>[] = []
const rootResourceLoader: ResourceLoader<AppContext> = AppContextLoader;

export default function App() {
    const [appReady, setAppReady] = useState(false);
    const [_, throwError] = useState<AwardedError>(undefined);

    useEffect(() => {
        async function loadAppContext(): Promise<AppContext> {
           const appContext = await rootResourceLoader.load(null);
           if (typeof appContext === "string") {
               logError("loadAppContext", "The rootResourceLoader is a string!!!", null)
               throwError(() => {
                   const error: AwardedError = "AppContextLoaderError";
                   throw new Error(error)
               })
           }

           return appContext as AppContext;
        }

        async function prepare() {
            try {
                const appContext: AppContext = await loadAppContext();
                for (const resource of resources) {
                    await resource.load(appContext)
                }

                setAppReady(true)
            } catch (ex) {
                logError("AppPrepare", "Unable to load resources.", ex);
                setAppReady(true)
                throwError(() => {
                    const error:AwardedError = "AppPrepareError"
                    throw new Error(error)
                })
            }
        }

        prepare();
    }, [])
}
