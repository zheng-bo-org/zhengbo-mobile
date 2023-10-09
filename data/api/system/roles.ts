export type Roles = {
    "(Rest/get /system/roles {} (Get system roles))": {
        req: {

        },
        res: {

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