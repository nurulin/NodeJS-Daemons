"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
exports.GetDirFiles = function (link) {
    var result = [];
    if (fs.existsSync(link)) {
        fs.readdirSync(link).forEach(function (entry) {
            var ipath = path.join(link, entry);
            if (!fs.lstatSync(ipath).isDirectory()) {
                result.push(ipath);
            }
        });
    }
    return result;
};
exports.RemoveDirReq = function (link) {
    if (fs.existsSync(link)) {
        fs.readdirSync(link).forEach(function (entry) {
            var ipath = path.join(link, entry);
            if (fs.lstatSync(ipath).isDirectory()) {
                exports.RemoveDirReq(ipath);
            }
            else {
                fs.unlinkSync(ipath);
            }
        });
        fs.rmdirSync(link);
    }
};
