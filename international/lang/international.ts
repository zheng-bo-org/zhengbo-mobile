import en from './en.json'
import cn from './cn.json'

type KeysPerScreen = {
    "/": "name",
    "/signIn/index": "test"
}


type Language = {
    [K in keyof KeysPerScreen]: {
        [P in KeysPerScreen[K]]: string;
    };
}

export type Nation = "中国" | "ALL"
export type LanguagePack = {
    applyForTheNations: Nation[]
    lng: Language
}

function jsonToLngPack(json: object, applyFor: Nation[]): LanguagePack {
    return {
        applyForTheNations: applyFor,
        lng: json as Language
    }
}


export const defaultLngPack: LanguagePack = jsonToLngPack(en, ["ALL"]);
const cnLngPack: LanguagePack = jsonToLngPack(cn, ["中国"])

export function getLanguagePacks(): LanguagePack[]{
    return [defaultLngPack, cnLngPack]
}