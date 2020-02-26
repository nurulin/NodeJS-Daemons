"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var bodyParser = __importStar(require("body-parser"));
var baseClass_1 = __importDefault(require("../functions/baseClass"));
var main_1 = require("../constants/main");
var base_1 = require("../functions/base");
var ExpressDaemon = /** @class */ (function (_super) {
    __extends(ExpressDaemon, _super);
    function ExpressDaemon(_dirname) {
        var _this = _super.call(this, _dirname) || this;
        _this._dirname = _dirname;
        return _this;
    }
    ExpressDaemon.prototype.initController = function (options) {
        var _this = this;
        var func = options.func, link = options.link, method = options.method;
        this.router[method](link, function (req, res) {
            _this.setHeaders(res);
            _this[func](req, res);
        });
    };
    ExpressDaemon.prototype.initCheck = function () {
        var _this = this;
        this.router.get(main_1.CHECK, function (req, res) {
            _this.setHeaders(res);
            res.end(base_1.answer(main_1.SERVERCODES.SUCCESS, [], null));
        });
    };
    ExpressDaemon.prototype.initServer = function () {
        this.setRouter();
        this.initExpress();
        this.express.use("/", this.router);
    };
    ExpressDaemon.prototype.setRouter = function () {
        this.router.use(cors_1.default());
        this.router.use(bodyParser.json());
    };
    // class-methods-use-this
    ExpressDaemon.prototype.setHeaders = function (res) {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    };
    return ExpressDaemon;
}(baseClass_1.default));
exports.ExpressDaemon = ExpressDaemon;
