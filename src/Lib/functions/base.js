"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatePart = function (date, func) {
    var num = date[func]();
    return (num < 10) ? "0" + num : num;
};
exports.createTimeString = function () {
    var d = new Date();
    return [
        [
            d.getUTCFullYear(),
            exports.createDatePart(d, "getUTCMonth"),
            exports.createDatePart(d, "getUTCDate")
        ].join("."),
        exports.createDatePart(d, "getUTCHours"),
        exports.createDatePart(d, "getUTCMinutes"),
        exports.createDatePart(d, "getUTCSeconds")
    ].join("-");
};
exports.answer = function (code, data, error) {
    return JSON.stringify({
        code: code,
        error: error || null,
        data: data
    });
};
