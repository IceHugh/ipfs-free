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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Infura = void 0;
var stream_1 = require("stream");
var axios_1 = __importDefault(require("axios"));
var Infura = /** @class */ (function () {
    function Infura(config) {
        this.config = config;
    }
    Infura.prototype.upload = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _file, s, form_data, res, cid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _file = file;
                        if (_file.buffer) {
                            _file.stream = function () { return stream_1.Readable.from(file.buffer); };
                        }
                        else if (_file.stream) {
                            s = _file.stream;
                            _file.name = "".concat(_file.hash).concat(_file.ext);
                            _file.stream = s;
                        }
                        form_data = new URLSearchParams();
                        form_data.append('file', _file.stream());
                        return [4 /*yield*/, axios_1.default.post('https://ipfs.infura.io:5001/api/v0/add', form_data, {
                                headers: {
                                    Authorization: "Basic ".concat(btoa(this.config.key + ':' + this.config.secret)),
                                },
                            })];
                    case 1:
                        res = _a.sent();
                        cid = res.data.Hash;
                        return [2 /*return*/, {
                                url: "https://".concat(cid, ".ipfs.w3s.link?from=web3"),
                                cid: cid,
                            }];
                }
            });
        });
    };
    Infura.prototype.delete = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    return Infura;
}());
exports.Infura = Infura;
