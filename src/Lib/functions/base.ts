import { SERVERCODES } from "../constants/main";


export const createDatePart = (date: Date, func: string) => {
    const num = (date as any)[func]();
    return (num < 10) ? `0${num}` : num;
}
export const createTimeString = (): string =>{
    const d = new Date();
    return [
        [
            d.getUTCFullYear(),
            createDatePart(d, "getUTCMonth"),
            createDatePart(d, "getUTCDate")
        ].join("."),
        createDatePart(d, "getUTCHours"),
        createDatePart(d, "getUTCMinutes"),
        createDatePart(d, "getUTCSeconds")
    ].join("-");
}

export const answer = (code: SERVERCODES, data: any, error: string|null) => {
    return JSON.stringify({
        code,
        error: error || null,
        data
    })
}
