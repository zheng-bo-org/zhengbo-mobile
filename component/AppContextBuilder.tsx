import {AppContext, ResourceLoader, Locale} from '../app/index'
import {getLocales} from "expo-localization";
import {logError} from "../god/God";

interface AppContextDepsResolver<T> {
    resolve(dps:Record<ContextDps, any>): Promise<[ContextDps, T]>
}

type LocaleResolver = (currency: string) => Locale | undefined;
const localeResolvers: LocaleResolver[] = [
    (currency: string): Locale | undefined => {
        return currency === "CNY" ? "cn" : undefined
    },
    (currency: string): Locale | undefined => {
        return "en"
    }
];

const localeDpsResolver: AppContextDepsResolver<Locale> = {
    resolve(dps:Record<ContextDps, any>): Promise<[ContextDps, Locale]> {
        const locales = getLocales();
        if (locales === undefined || locales.length == 0) {
            logError("Locale/resolveTheLocale", `Unable to resolve the locale of the user. ${JSON.stringify(dps)}`, undefined);
            return ["locale", "cn"] as [ContextDps, Locale] as any;
        }
        const currencyOfTheLocale = locales[0].currencyCode;
        for (const resolver of localeResolvers) {
            const locale = resolver(currencyOfTheLocale)
            if(locale !== undefined) {
                return ["locale", locale] as [ContextDps, Locale] as any;
            }
        }
    }
}

const appContextDepsResolvers: AppContextDepsResolver<any>[] = []
type ContextDps = "locale"
class SimpleAppContext implements AppContext {
    constructor(dps: Record<ContextDps, any>) {

    }

    locale(): Locale {
        return undefined;
    }

    toJSON(): string {
        return "";
    }
}

async function buildAppContext(): Promise<AppContext> {
    const [dependencies] = await Promise.all([appContextDepsResolvers.reduce(async (rs: Record<string, any>, resolver: AppContextDepsResolver<any>): Promise<Record<string, any>> => {
        await rs;
        const [dependencyName, dependencyVal] = await resolver.resolve(rs);
        rs[dependencyName] = dependencyVal;
        return rs;
    }, {} as Record<string, any>)])
    return new SimpleAppContext(dependencies);
}

export const rootResourceLoader: ResourceLoader<AppContext> = {
    load(appContext: AppContext): Promise<string | undefined | AppContext> {
        return buildAppContext();
    }
}