import { singleDaemonInit } from "./Lib/functions/daemon";
import { Config } from "./config";

const path = require("path");

const prefix = path.join(process.env.APPDATA || process.env.HOME, "Example", "Daemons");
Config.daemon.settings.path = prefix;

/* const child_process = require('child_process');
const worker_process = child_process.fork(path.join(process.argv[1], "index.js"), [JSON.stringify(Config.daemon)]); */

singleDaemonInit(prefix, Config.daemon, __dirname);
