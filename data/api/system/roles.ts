import {GeneralResponse} from "../index";

export type Roles = {
    "(Rest/get /systems/roles {} (Get system roles))": {
        req: {

        },
        res: {
            roles: string[]
        }
    },
    "(Local/get-in system-roles)": {
        req: {

        },
        res: {
            roles:string[]
        }
    },
    "(Local/set-in system-roles)": {
        req: {
            roles: string[]
        },
        res: {

        }
    }
}