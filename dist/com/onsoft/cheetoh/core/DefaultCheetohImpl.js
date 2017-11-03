"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ManifestManager_1 = require("./ManifestManager");
const CheetohLoggerProxy_1 = require("../logging/CheetohLoggerProxy");
class DefaultCheetohImpl {
    constructor() {
        this.initObj();
    }
    initObj() {
        CheetohLoggerProxy_1.CheetohLoggerProxy.getInstance();
    }
    sendMessage(message, logLevel) {
        CheetohLoggerProxy_1.CheetohLoggerProxy.getInstance().log(message, logLevel);
    }
    installGpm(sourceUri, destinationPath, callback) {
        let message = "GPM install start";
        let manager = new ManifestManager_1.ManifestManager();
        let error = null;
        this.sendMessage(message);
        this.sendMessage("GPM install complete");
    }
}
exports.DefaultCheetohImpl = DefaultCheetohImpl;
;
