"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ManifestManager_1 = require("./ManifestManager");
const CheetohLoggerProxy_1 = require("../logging/CheetohLoggerProxy");
const jec_commons_1 = require("jec-commons");
const GpmManager_1 = require("../core/GpmManager");
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
        let loader = null;
        this.sendMessage("GPM install start");
        this.sendMessage("Destination path is: " + destinationPath);
        manager.setGlassCatPath(destinationPath);
        manager.loadManifest((err) => {
            if (err) {
                this.sendMessage("GPM install error:\n" + err, jec_commons_1.LogLevel.ERROR);
                callback(err);
            }
            else {
                loader = new GpmManager_1.GpmManager();
                loader.installFromUri(uri, destinationPath, (gpm, err) => {
                    this.sendMessage("GPM install complete");
                    callback(null);
                });
            }
        });
    }
}
exports.DefaultCheetohImpl = DefaultCheetohImpl;
;
