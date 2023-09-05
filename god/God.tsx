type ProblemType = "ERROR" | "INFO"

type Problem = {
    type: ProblemType,
    tag: string,
    msg: string,
    err?: Error
}

export interface God {
    help(problem: Problem): Promise<void>
}

//TODO Is there anyway to make god sober? Nope, I guess you have to do the works for her.
const god: God =  {
    async help(problem: Problem) {
        console.log("Hold on kid! Im working on it, be patient... Just let me finish my drink first")
    }
}

/**
 * Log unexpected cases.
 * @param tag a string to mark this log.
 * @param msg details about the unexpected case.
 * @param exception the exception if there is one
 */
export async function logError(tag: string, msg: string, exception: Error | undefined) {
    return god.help({
        type: "ERROR",
        tag: tag,
        msg: msg,
        err: exception
    });
}

/**
 * Log anything you need, God dont care about that.
 * @param tag a string to mark this log.
 * @param msg details about the things behind this log.
 */
export async function logInfo(tag: string, msg: string) {
    return god.help({
        type: "INFO",
        tag: tag,
        msg: msg
    })
}