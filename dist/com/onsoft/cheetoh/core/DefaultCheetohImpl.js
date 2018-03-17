"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ManifestManager_1 = require("./ManifestManager");
const CheetohLoggerProxy_1 = require("../logging/CheetohLoggerProxy");
const jec_commons_1 = require("jec-commons");
const GpmManager_1 = require("../core/GpmManager");
const path = require("path");
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
    sendError(err) {
        CheetohLoggerProxy_1.CheetohLoggerProxy.getInstance()
            .log(`GPM install error:\n${err.message}\n${err.stack}`, jec_commons_1.LogLevel.ERROR);
    }
    installGpmFromUri(uri, destinationPath, callback) {
        const manager = new ManifestManager_1.ManifestManager();
        let error = null;
        let loader = null;
        this.sendMessage("GPM install start");
        this.sendMessage("Destination path is: " + destinationPath);
        manager.setGlassCatPath(destinationPath);
        manager.loadManifest((err) => {
            if (err) {
                this.sendError(err);
                callback(err);
            }
            else {
                this.sendMessage("GPM download start");
                this.sendMessage("GPM URI is: " + uri);
                loader = new GpmManager_1.GpmManager();
                loader.installFromUri(uri, destinationPath, (gpm, err) => {
                    if (err) {
                        this.sendError(err);
                    }
                    else {
                        this.sendMessage("GPM extraction complete");
                        this.sendMessage("Installation path is: " +
                            path.join(destinationPath, gpm.target));
                        manager.addGpm(gpm);
                        this.sendMessage("GPM manifest update");
                        manager.updateManifest((err) => {
                            if (err) {
                                this.sendError(err);
                                callback(err);
                            }
                            else {
                                this.sendMessage("GPM install complete");
                                callback(null);
                            }
                        });
                    }
                });
            }
        });
    }
}
exports.DefaultCheetohImpl = DefaultCheetohImpl;
;
