import React, {useEffect, useState} from "react";
import * as splashScreen from 'expo-splash-screen'
import {getLocales} from 'expo-localization'
import {logError} from "../god/God";

splashScreen.preventAutoHideAsync();

type Locale = "en" | "cn"
export interface AppContext  {
    locale(): Locale,
    toJSON(): string
}

interface ResourceLoader {
    /**
     * load the resource
     * @param appContext context of the app.
     * @return if load succeeded return undefined else return the reason.
     */
    load(appContext: AppContext): Promise<string | undefined>
}

const resources: ResourceLoader[] = []
type LocaleResolver = (currency: string) => Locale | undefined;
const localeResolvers: LocaleResolver[] = [
    (currency: string): Locale | undefined => {
        return currency === "CNY" ? "cn" : undefined
    },
    (currency: string): Locale | undefined => {
        return "en"
    }
];

async function resolveTheLocale(appContext: AppContext): Promise<Locale> {
    const locales = getLocales();
    if (locales === undefined || locales.length == 0) {
        logError("Locale/resolveTheLocale", `Unable to resolve the locale of the user. ${appContext.toJSON()}`, undefined);
        return "cn";
    }
    const currencyOfTheLocale = locales[0].currencyCode;
    for (const resolver of localeResolvers) {
        const locale = resolver(currencyOfTheLocale)
        if(locale !== undefined) {
            return locale;
        }
    }
}


export default function App() {
    const [appReady, setAppReady] = useState(false);
    useEffect(() => {
        async function prepare() {
            try {
                for (const resource of resources) {
                    resource.load()
                }
            } catch (ex) {

            }
        }

        prepare();
    }, [])
}
