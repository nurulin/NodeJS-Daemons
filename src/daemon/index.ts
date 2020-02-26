import express from "express";
import { ExpressDaemon } from "../Lib/base/daemon";
import { Settings } from "../Lib/functions/daemon";
import { Loader } from "../Lib/functions/loader";
import { APPLICATIONS, CONTROLLERS, DaemonInterface } from "./constants";
import { SERVERCODES } from "../Lib/constants/main";
import { answer } from "../Lib/functions/base";

/**
 * BackEnd демон для общения с FrontEnd  частью системы.
 * Выдает информацию об установленных приложениях.
 */
const LOGS_PREFIX = "daemon";

export class App extends ExpressDaemon<CONTROLLERS> implements DaemonInterface {
    constructor(private config: Settings) {
        super(config.path || "");
    }
    protected async init(): Promise<string> {
        return LOGS_PREFIX;
    }

    protected initExpress() {
        this.initCheck();
        APPLICATIONS.forEach((item) => this.initController(item));
    }

    applications() {
        res.end(answer(SERVERCODES.SUCCESS, {}, null));
    }

    application(req: express.Request, res: express.Response) {
	    res.end(answer(SERVERCODES.SUCCESS, {}, null));
    }

    async status(req: express.Request, res: express.Response) {
        res.end(answer(SERVERCODES.SUCCESS, {}, null));
    }

    async monitoring(req: express.Request, res: express.Response) {
        res.end(answer(SERVERCODES.SUCCESS, {}, null));
    }

    command(req: express.Request, res: express.Response) {
	res.end(answer(SERVERCODES.SUCCESS, {}, null));
    }
}
const cfg = JSON.parse(process.argv[2]);
Loader(new App(cfg.settings), cfg.settings.port);
