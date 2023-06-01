"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = void 0;
var web3_1 = require("./web3");
var everland_1 = require("./everland");
var pinata_1 = require("./pinata");
var lighthouse_1 = require("./lighthouse");
var filebase_1 = require("./filebase");
var infura_1 = require("./infura");
var getProvider = function (type) {
    var instances = {
        everland: everland_1.Everland,
        web3: web3_1.Web3,
        pinata: pinata_1.Pinata,
        lighthouse: lighthouse_1.Lighthouse,
        filebase: filebase_1.Filebase,
        infura: infura_1.Infura,
    };
    return instances[type];
};
exports.getProvider = getProvider;
