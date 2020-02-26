import express from "express";
import path from "path";
import { createTimeString } from "./base";

export default abstract class Base {
    public express = express();
    protected async abstract init(): Promise<string>;
    protected abstract initServer(): void;
    protected fs = require("fs");
    protected filename: string;
    protected router = express.Router();

    constructor(protected _dirname: string) {
        this.filename = "";
        this.main();
    }

    public log(info: string) {
        try {
            this.fs.appendFileSync(this.filename, `${createTimeString()} ${info}\n`);
        } catch (e) {
            console.log(e);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected async myInit() {

    }

    protected async main() {
        await this.initDirs(await this.init());
        await this.myInit();
        this.initServer();
        this.log("Start Daemon main thread");
    }

    protected async initDirs(logPrefix: string) {
        await this.checkAndCreateDir(this._dirname);
        const logsDir = path.join(this._dirname, logPrefix);
        await this.checkAndCreateDir(logsDir);
        this.filename = `${path.join(logsDir, createTimeString())}.log`;
        this.fs.closeSync(this.fs.openSync(this.filename, "w"));
    }

    protected async checkAndCreateDir(dir: string) {
        if (!this.fs.existsSync(dir)) {
            try {
                this.fs.mkdirSync(dir);
            } catch (e) {
                throw new Error(e);
            }
        }
    }
}
