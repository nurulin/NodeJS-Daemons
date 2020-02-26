import { LOCALHOST } from "../constants/main";
import { SIGTERM } from "../constants/signals";

export interface Settings {
    path?: string;
    port: number;
}
export interface ConfigObject {
    settings: Settings;
    link: string;
    name: string;
    shortname: string;
}
const path = require("path");
const fs = require("fs");


// eslint-disable-next-line max-len
export const createDaemon = (prefix: string, config: ConfigObject, directory: string) => require("../daemonize2/daemonize").setup({
    main: config.link,
    name: config.name,
    directory,
    silent: false,
    pidfile: path.join(prefix, `${config.shortname}.pid`),
    argv: [JSON.stringify(config)]
})

export const checkForChildStop = (folder: string) => {
    fs.readdir(folder, (err: any, files: string[]) => {
        if (files && Array.isArray(files)) {
            files.forEach((file) => {
                const pid = parseInt(fs.readFileSync(path.join(folder, file)), 10);
                if (!isNaN(pid)) {
                    try {
                        process.kill(pid, SIGTERM);
                        fs.unlinkSync(folder + file);
                    } catch (e) {
                        // console.log(e);
                    }
                }
            })
        }
    });
}

const tcpPortUsed = require("tcp-port-used");

export const singleDaemonInit = (prefix: string, config: ConfigObject, directory: string) => {
    const daemon = createDaemon(prefix, config, directory);
    switch (process.argv[2]) {
        case "start":
            tcpPortUsed.check(config.settings.port, LOCALHOST).then((inUse: boolean) => {
                if (inUse) {
                    console.log(`port ${config.settings.port} in use`);
                } else {
                    daemon.start();
                }
            });
            break;
        case "stop":
            checkForChildStop(path.join(prefix, "pid"));
            setTimeout(() => {
                daemon.stop();
            }, 100);
            break;
        default:
            console.log("Usage: [start|stop]");
    }
}
