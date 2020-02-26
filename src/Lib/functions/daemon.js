"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../constants/main");
var signals_1 = require("../constants/signals");
var path = require("path");
var fs = require("fs");
// eslint-disable-next-line max-len
exports.createDaemon = function (prefix, config, directory) { return require("../daemonize2/daemonize").setup({
    main: config.link,
    name: config.name,
    directory: directory,
    silent: false,
    pidfile: path.join(prefix, config.shortname + ".pid"),
    argv: [JSON.stringify(config)]
}); };
exports.checkForChildStop = function (folder) {
    fs.readdir(folder, function (err, files) {
        if (files && Array.isArray(files)) {
            files.forEach(function (file) {
                var pid = parseInt(fs.readFileSync(path.join(folder, file)), 10);
                if (!isNaN(pid)) {
                    try {
                        process.kill(pid, signals_1.SIGTERM);
                        fs.unlinkSync(folder + file);
                    }
                    catch (e) {
                        // console.log(e);
                    }
                }
            });
        }
    });
};
var tcpPortUsed = require("tcp-port-used");
exports.singleDaemonInit = function (prefix, config, directory) {
    var daemon = exports.createDaemon(prefix, config, directory);
    switch (process.argv[2]) {
        case "start":
            tcpPortUsed.check(config.settings.port, main_1.LOCALHOST).then(function (inUse) {
                if (inUse) {
                    console.log("port " + config.settings.port + " in use");
                }
                else {
                    daemon.start();
                }
            });
            break;
        case "stop":
            exports.checkForChildStop(path.join(prefix, "pid"));
            setTimeout(function () {
                daemon.stop();
            }, 100);
            break;
        default:
            console.log("Usage: [start|stop]");
    }
};
