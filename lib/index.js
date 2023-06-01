"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var providers_1 = require("./providers");
var calcHash_1 = require("./utils/calcHash");
var IpfsFree = /** @class */ (function () {
    // private clients = ['filebase', 'pinata', 'fleek', 'web3', 'lighthouse'];
    function IpfsFree(config, options) {
        this.config = config;
        this.options = options || {};
    }
    IpfsFree.prototype.getUploadClinet = function () {
        var _a = this.options, _b = _a.default, type = _b === void 0 ? 'filebase' : _b, random = _a.random;
        var currentConfigs = Object.keys(this.config);
        var firstType = this.config[type] ? type : currentConfigs[0];
        var clientType = firstType;
        if (random) {
            var index = Math.floor(Math.random() * currentConfigs.length);
            clientType = currentConfigs[index];
        }
        var Client = (0, providers_1.getProvider)(clientType);
        var config = this.getProviderConfig(clientType);
        var client = new Client(config);
        return client;
    };
    IpfsFree.prototype.getProviderConfig = function (type) {
        var config = this.config[type];
        var _config = config === null || config === void 0 ? void 0 : config[0];
        var configLen = config === null || config === void 0 ? void 0 : config.length;
        if (configLen && configLen > 1) {
            var index = Math.floor(Math.random() * configLen);
            _config = config[index];
        }
        return _config;
    };
    IpfsFree.prototype.getDeleteClinet = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var types, type, Client, config, client;
            return __generator(this, function (_a) {
                types = [
                    'filebase',
                    'pinata',
                    'fleek',
                    'web3',
                    'lighthouse',
                    'everland',
                ];
                type = types.find(function (item) { return url.indexOf(item) > -1; }) || 'web3';
                Client = (0, providers_1.getProvider)(type);
                config = this.getProviderConfig(type);
                client = new Client(config);
                return [2 /*return*/, client];
            });
        });
    };
    IpfsFree.prototype.upload = function (_a) {
        var buffer = _a.buffer;
        return __awaiter(this, void 0, void 0, function () {
            var client, hash, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        client = this.getUploadClinet();
                        return [4 /*yield*/, (0, calcHash_1.calcCidV0)(buffer)];
                    case 1:
                        hash = _b.sent();
                        return [4 /*yield*/, client.upload({ hash: hash, buffer: buffer })];
                    case 2:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    IpfsFree.prototype.delete = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.url) {
                            throw new Error('url is required');
                        }
                        return [4 /*yield*/, this.getDeleteClinet(options.url)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.delete(options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    return IpfsFree;
}());
exports.default = IpfsFree;
