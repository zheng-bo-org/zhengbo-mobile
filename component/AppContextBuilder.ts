import {ResourceLoader} from "../app";

export type AppLanguage = "en" | "cn"

export interface Context {
    system: {
        lng: AppLanguage
    }
}

type ContextItemBuilder = (context: Context) => Context;


const systemLngBuilder: ContextItemBuilder = (context: Context): Context => {
    return {
        system: {
            lng: "en"
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
    load(appContext: Context): Promise<string | undefined | Context> {
        return Promise.resolve(buildAppContext());
    }
}