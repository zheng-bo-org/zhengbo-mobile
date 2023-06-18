import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en.json'
import cn from './cn.json'

let defaultLng: string | undefined = undefined;
const lngs: {[key: string]: {
    data: {[key: string]: string},
    code: string
}} = {
    "中文": {
        data: cn,
        code: "cn"
    },
    "English": {
        data: cn,
        code: "en"
    }
}

const deviceLanguage: string = getLocales()[0].languageCode;
const i18n = new I18n(Object.keys(lngs).reduce((rs, key) => {
    const lng = lngs[key];
    rs[lng.code] = lng.data
    return rs
}, {}))
i18n.locale = deviceLanguage;


export function translateWithKey(key: string): string {
    if(defaultLng) {
        return en[key]
    }
    
    return i18n.t(key);
}

export function resetDefaultLng(lngName: string): void {
    const lngCode = lngs[lngName].code;
    defaultLng = lngCode;
}

export function getSupportedLngNames(): string[] {
    return Object.keys(lngs)
}
