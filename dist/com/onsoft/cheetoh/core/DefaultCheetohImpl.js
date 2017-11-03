"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ManifestManager_1 = require("./ManifestManager");
const CheetohLoggerProxy_1 = require("../logging/CheetohLoggerProxy");
const jec_commons_1 = require("jec-commons");
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
    installGpmFromUri(uri, destinationPath, callback) {
        let manager = new ManifestManager_1.ManifestManager();
        let error = null;
        this.sendMessage("GPM install start");
        this.sendMessage("Destination path is: " + destinationPath);
        manager.loadManifest(destinationPath, (err) => {
            if (err) {
                this.sendMessage("GPM install error:\n" + err, jec_commons_1.LogLevel.ERROR);
            }
            else {
                this.sendMessage("GPM install complete");
            }
            callback(err);
        });
    }
}
exports.DefaultCheetohImpl = DefaultCheetohImpl;
;
