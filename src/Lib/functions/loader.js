"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = function (app, port) {
    app.express.listen(port, function (err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        return console.log("server is listening on " + port);
    });
};
