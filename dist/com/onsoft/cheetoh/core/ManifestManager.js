"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheetohLoggerProxy_1 = require("../logging/CheetohLoggerProxy");
const jec_commons_1 = require("jec-commons");
const CheetohError_1 = require("../exceptions/CheetohError");
const path = require("path");
class ManifestManager {
    constructor() {
        this._gpmConfig = null;
        this.initObj();
    }
    initObj() {
        CheetohLoggerProxy_1.CheetohLoggerProxy.getInstance();
    }
    sendMessage(message, logLevel) {
        CheetohLoggerProxy_1.CheetohLoggerProxy.getInstance().log(message, logLevel);
    }
    loadManifest(glasscatPath, callback) {
        let loader = new jec_commons_1.JsonLoader();
        let error = null;
        loader.load(path.join(glasscatPath, "manifest.json"), (data) => {
            console.log(data);
            callback(null);
        }, (err) => {
            error = new CheetohError_1.CheetohError(err.message);
            error.stack = err.stack;
            callback(error);
        });
    }
}
exports.ManifestManager = ManifestManager;
;
