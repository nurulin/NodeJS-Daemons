import { Config as IConfig } from "./Lib/functions/init";

export const Config: IConfig = {
    daemon: {
        settings: { port: 6767 },
        link: "daemon/index",
        name: "Example server",
        shortname: "backend"
    }
}
