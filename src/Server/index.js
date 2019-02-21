"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var body_parser_1 = require("body-parser");
var Controllers_1 = require("../Controllers");
var Server = /** @class */ (function () {
    function Server(logger) {
        this.logger = logger;
    }
    // HTTP Request Methods...
    Server.prototype.get = function (url, requestHandler) {
        this.addRoute('get', url, requestHandler);
    };
    Server.prototype.post = function (url, requestHandler) {
        this.addRoute('post', url, requestHandler);
    };
    Server.prototype.put = function (url, requestHandler) {
        this.addRoute('put', url, requestHandler);
    };
    Server.prototype["delete"] = function (url, requestHandler) {
        this.addRoute('delete', url, requestHandler);
    };
    // Injecting routes in application
    Server.prototype.addRoute = function (method, url, requestHandler) {
        var _this = this;
        this.app[method](url, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, requestHandler(req, res, next)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(500).send({
                            success: false,
                            message: 'Sever side error please look error obj for details.',
                            error: e_1.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.logger.log({ level: 'debug', message: "Configured Routes: " + method.toUpperCase().substr(0, 3) + " : " + url });
    };
    // Start server
    Server.prototype.start = function (static_path) {
        var _this = this;
        this.app = express();
        // Setting up static directory for serving files.
        this.app.use(express.static(static_path));
        // Using middleware for parsing request body
        this.app.use(body_parser_1.json());
        this.app.use(body_parser_1.urlencoded({ extended: true }));
        // Initializing Controllers
        Controllers_1.CONTROLLERS.forEach(function (controller) { return controller.initialize(_this); });
        return this.app;
    };
    return Server;
}());
exports.Server = Server;
