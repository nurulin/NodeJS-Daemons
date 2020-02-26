import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import Base from "../functions/baseClass";
import { DaemonExpressOptions } from "./types";
import { CHECK, SERVERCODES } from "../constants/main";
import { answer } from "../functions/base";

export abstract class ExpressDaemon<T> extends Base {
    [index: string]: any;
    protected abstract initExpress(): void;
    constructor(protected _dirname: string) {
        super(_dirname);
    }

    protected initController(options: DaemonExpressOptions<T>) {
        const { func, link, method } = options;
        (this.router as any)[method](link, (req: express.Request, res: express.Response) => {
            this.setHeaders(res);
            this[func](req, res);
        });
    }

    protected initCheck() {
        this.router.get(CHECK, (req: express.Request, res: express.Response) => {
            this.setHeaders(res);
            res.end(answer(SERVERCODES.SUCCESS, [], null))
        });
    }

    protected initServer() {
        this.setRouter();
        this.initExpress();
        this.express.use("/", this.router);
    }

    protected setRouter() {
        this.router.use(cors());
        this.router.use(bodyParser.json());
    }

    // class-methods-use-this
    protected setHeaders(res: express.Response) {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    }
}
