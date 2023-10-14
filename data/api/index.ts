import {SystemAPI} from "./system";
import {setup, evalApi, RestRequestSender, LocalStorageManager} from 'lsp-api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {logError} from "../../god/God";
import apiMetadata from './apiMetadata.json'

export type GeneralResponse<T> = {
    msg: string,
    data: T
}

//Api definition in Lisp syntax
//An API is an abstraction to completely remove the complexity to the users of the API.
//The users of the APIS should only care about three things.
//1.I need to use an api to do something.
//2.what data is needed for the operation that I need to do.
//3.what data it will return.

//An API is not only a symbol of the API, It should be the code itself to explain how to send the request.
//Furthermore, the api types or definition should be a library dependency provided by backend developer in lisp syntax.
//Second, The API should be able to eval to http request format in any http request library,
//Like axios or fetch, a simple example in lisp syntax: (to-axios-request apiDef data) (to-fetch-request apiDef data)

//Add more APIS here with the syntax: APIs<SystemAPI & xxxAPISet & AnotherAPISet>
export type Apis = (SystemAPI)
export type FlattedApis = {
    [K in keyof Apis]: {
        apiDef: K,
        reqDef: Apis[K]
    }
}
type RequestTypeOfTheApiGeneric<T extends keyof FlattedApis> = FlattedApis[T]['reqDef']['req']
type ResponseTypeOfTheApiGeneric<T extends keyof FlattedApis> = FlattedApis[T]['reqDef']['res']

const requestSender: RestRequestSender = async (url, method, requestBody) => {
    const finalUrl = `http://192.168.0.109:3000/api${url}`;
    console.log(`finalUrl? ${finalUrl}`)
    return await fetch(finalUrl, {
        method: method.toUpperCase(),
        body: JSON.stringify(requestBody)
    }).then(rs => {
        return rs.json()
    })
}
const localStorageManager: LocalStorageManager = {
    retrieve(key: string): object {
        return AsyncStorage.getItem(key).then(rs => {
            if (rs == null) {
                return {}
            }

           return JSON.parse(rs)
        })
    },
    async store(key: string, data: object): Promise<void> {
        try {
            const old = localStorageManager.retrieve(key)
            Object.assign(old, data);
            await AsyncStorage.setItem(key, JSON.stringify(old))
        } catch (ex) {
            console.error(ex)
            logError("AsyncLocalStorage", `error occurred while store the key ${key} with the data: ${JSON.stringify(data)}`, ex as any)
        }
    }
}

setup(requestSender, localStorageManager, apiMetadata)
export async function api<T extends keyof FlattedApis>(api: T, req: RequestTypeOfTheApiGeneric<T>):
    Promise<ResponseTypeOfTheApiGeneric<T>> {
    return evalApi(api, req);
}