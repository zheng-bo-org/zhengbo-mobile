import {useEffect, useState} from "react";
import * as splashScreen from 'expo-splash-screen'
import {Context, rootResourceLoader as AppContextLoader} from '../component/AppContextBuilder'
import {View} from "react-native";
import {useRouter} from "expo-router";
import {buildError} from "../component/AwardedError";
import {useAppContext} from "../component/contexts/appContext";
import {Image} from "expo-image";

export {ErrorBoundary} from '../component/AwardedError'
splashScreen.preventAutoHideAsync();

export interface ResourceLoader<T> {
    /**
     * load the resource
     * @param appContext context of the app.
     * @return if load succeeded return undefined else return the reason.
     */
    load(appContext: Context | null): Promise<string | undefined | T>
}

const resources: ResourceLoader<any>[] = []
const rootResourceLoader: ResourceLoader<Context> = AppContextLoader;


function LoadingScreen() {
    const {state, dispatch} = useAppContext();


    return <View style={{
        flex: 1,
        backgroundColor: state.system.currentTheme.theme.color["40%"],
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Image
            source={require('../assets/youAndMe.png')}
            style={{
                flex: 1,
                width: '100%'
            }}
            contentFit={'cover'}
        />
    </View>
}


export default function App() {
    const [appReady, setAppReady] = useState(false);
    const [_, throwError] = useState<any>(undefined);

    const router = useRouter();

    useEffect(() => {
        async function loadAppContext(): Promise<Context> {
            const appContext = await rootResourceLoader.load(null);
            if (typeof appContext === "string") {
                throwError(() => {
                    throw buildError("AppContextLoaderError", "The rootResourceLoader returns a string")
                })
            }

            return appContext as Context;
        }

        async function prepare() {
            try {
                const appContext: Context = await loadAppContext();
                for (const resource of resources) {
                    await resource.load(appContext)
                }
                await new Promise(resolve => {
                    setTimeout(resolve, 5000)
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
        return <LoadingScreen/>
    } else {
        splashScreen.hideAsync().then(() => {
            router.push("signIn")
        })
    }
}
