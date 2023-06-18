/**
 * Abstraction for server routers.
 */
interface Response<JSON extends {[key:string]: any}> {
    statusCode: "SUCCESS" | "SERVER_ERROR" | "BAD_REQUEST" | "UNKNOWN",
    json?: JSON,
    text?: string
}

interface Router<REQ extends {}, RES extends {}, JSON extends {[key:string]: any}> {
    router: string
    requestData: REQ,
    resReduer: (response: Response<JSON>) => RES,
    action: "POST" | "DELETE" | "UPDATE" | "GET"
}

export function useRouter<REQ, RES, JSON extends {[key:string]: any}>(router: Router<REQ, RES, JSON>): RES {
    return router.resReduer({
        statusCode: 'BAD_REQUEST',
        json: {} as any,
        text: ''
    })
}



