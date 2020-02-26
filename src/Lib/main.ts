export interface Init {
    Start: (prefix: string) => void;
    Stop: (prefix: string) => void;
}

export interface Iterable<T> {
    [index: string]: T;
}
