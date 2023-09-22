import {SystemAPI} from "./system";

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
export type API<T extends {
    [K in string]: {
        req: {
            [key:string]:any
        },
        res: {
            [key: string]: any
        }
    }
}> = {
    [K in keyof T]: {
        req: { [key: string]: any },
        res: { [key: string]: any }
    }
}

//Add more APIS here with the syntax: API<SystemAPI & xxxAPISet & AnotherAPISet>
export type Apis = API<SystemAPI>
export type FlattedApis  = {
    [K in keyof Apis]: {
        apiDef: K,
        reqDef: Apis[K]
    }
}
type RequestTypeOfTheApiGeneric<T extends keyof FlattedApis> = FlattedApis[T]['reqDef']['req']
type ResponseTypeOfTheApiGeneric<T extends keyof FlattedApis> = FlattedApis[T]['reqDef']['res']
export async  function api<T extends keyof FlattedApis>(api: T, req: RequestTypeOfTheApiGeneric<T>):
    Promise<ResponseTypeOfTheApiGeneric<T>> {
    return {} as any;
}
