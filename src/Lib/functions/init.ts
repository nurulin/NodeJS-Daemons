import { DAEMONS, CONFIG, LOCALHOST } from "../constants/main";
import { Iterable } from "../main";
import { Settings, ConfigObject, createDaemon, checkForChildStop } from "./daemon";

export type Config = Iterable<ConfigObject>

export default class Init {
    protected path = require("path");
    protected tcpPortUsed = require("tcp-port-used");
    //protected directory = module.parent!.filename;
    constructor(protected directory:string) {}

    public async Start(prefix: string, configUrl: string = CONFIG) {
        if (await this.checkPort(prefix, configUrl)) {
            this.createDaemons(prefix, configUrl).forEach((daemon) => {
                daemon.start();
            });
        }
    }
    public Stop(prefix: string, configUrl: string = CONFIG) {
        const daemons = this.createDaemons(prefix, configUrl);
        checkForChildStop(this.path.join(prefix, "pid"));
        setTimeout(() => {
            daemons.forEach((daemon) => {
                daemon.stop();
            });
        }, 100);
    }

    private createDaemons(prefix: string, configUrl: string) {
        const res: any[] = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/camelcase,no-undef
        const req: any = typeof (__non_webpack_require__) !== "undefined" ? __non_webpack_require__ : require;
        const init: Config = req(this.path.join(prefix, configUrl));
        for (const i in init) {
            if (init.hasOwnProperty(i) && init[i].settings) {
                // eslint-disable-next-line no-param-reassign
                init[i].settings.path = this.path.join(prefix, DAEMONS);
                res.push(createDaemon(prefix, init[i], this.directory));
            }
        }
        return res;
    }

    private async checkPort(prefix: string, configUrl: string = CONFIG) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/camelcase,no-undef
        const req = typeof (__non_webpack_require__) !== "undefined" ? __non_webpack_require__ : require;
        const config: Config = req(this.path.join(prefix, configUrl));
        const settings: Settings[] = [];
        let answer = true;
        for (const i in config) {
            if (config.hasOwnProperty(i) && config[i].settings) {
                settings.push({ port: config[i].settings.port });
            }
        }

        await Promise.all(
            settings.map((setting) => this.tcpPortUsed.check(setting.port, LOCALHOST))
        ).catch(() => {
            console.log("One of ports is used")
            answer = false
        });
        return answer;
    }
}
