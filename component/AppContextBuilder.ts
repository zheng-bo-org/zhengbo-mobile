import {ResourceLoader} from "../app";
import {loadThemeDefs, whiteThemeDef, ThemeDef} from "./theme/theme";
import {defaultLngPack, getLanguagePacks, LanguagePack} from "../international/lang/international";
export type AppLanguage = "en" | "cn"

export interface Context {
    system: {
        currentTheme: ThemeDef,
        themeOptions: ThemeDef[]
        currentLngPack: LanguagePack,
        lngPackOptions: LanguagePack[]
    }
}

type ContextItemBuilder = (context: Context) => Context;


const systemLngBuilder: ContextItemBuilder = (): Context => {
    return {
        system: {
            currentTheme: whiteThemeDef,
            themeOptions: loadThemeDefs(),
            currentLngPack: defaultLngPack,
            lngPackOptions: getLanguagePacks()
        }
    }
}

const itemBuilders: ContextItemBuilder[] = [systemLngBuilder];
export function buildAppContext(): Context {
    return itemBuilders.reduce((context: Context, itemBuilder: ContextItemBuilder): Context => {
        const newContext = itemBuilder(context);
        return {
            ...context,
            ...newContext
        };
    }, {} as Context)
}

export const rootResourceLoader: ResourceLoader<Context> = {
    load(): Promise<string | undefined | Context> {
        return Promise.resolve(buildAppContext());
    }
}