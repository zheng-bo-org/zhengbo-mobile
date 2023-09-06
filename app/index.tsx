import {useEffect, useState} from "react";
import * as splashScreen from 'expo-splash-screen'
import {rootResourceLoader as AppContextLoader} from '../component/AppContextBuilder'
import {Text, View} from "react-native";
import {useRouter} from "expo-router";
import {buildError} from "../component/AwardedError";

export {ErrorBoundary} from '../component/AwardedError'
splashScreen.preventAutoHideAsync();
export type Locale = "en" | "cn"
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

function MeAndYou() {
   return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <Text>
           I am the splash screen....
       </Text>
   </View>
}


export default function App() {
    const [appReady, setAppReady] = useState(false);
    const [_, throwError] = useState<any>(undefined);

    const router = useRouter();

    useEffect(() => {
        async function loadAppContext(): Promise<AppContext> {
           const appContext = await rootResourceLoader.load(null);
           if (typeof appContext === "string") {
               throwError(() => {
                   throw buildError("AppContextLoaderError", "The rootResourceLoader returns a string")
               })
           }

           return appContext as AppContext;
        }

        async function prepare() {
            try {
                const appContext: AppContext = await loadAppContext();
                console.debug(`appContext? ${appContext.toJSON()}`)
                for (const resource of resources) {
                    await resource.load(appContext)
                }
                await new Promise(resolve => {
                    setTimeout(resolve, 3000)
                })
                setAppReady(true)
            } catch (ex) {
                console.error("Failed on load resources.")
                throwError(() => {
                    throw buildError("AppPrepareError", "Unable to load the resources.")
                })
            }
        }

        prepare();
    }, [])

    if (!appReady) {
        return <MeAndYou/>
    }else {
        splashScreen.hideAsync().then(() => {
            router.push("signIn")
        })
    }
}
