
export enum METHOD {
    GET= "get",
    POST = "post",
    DELETE = "delete",
    PUST = "put"
}

export interface DaemonExpressOptions<T> {
    func: string;
    link: T;
    method: METHOD;
}
