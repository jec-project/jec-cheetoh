"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheetohLoggerProxy_1 = require("../logging/CheetohLoggerProxy");
class ManifestManager {
    constructor() {
        this.initObj();
    }
    initObj() {
        CheetohLoggerProxy_1.CheetohLoggerProxy.getInstance();
    }
    sendMessage(message, logLevel) {
        CheetohLoggerProxy_1.CheetohLoggerProxy.getInstance().log(message, logLevel);
    }
}
exports.ManifestManager = ManifestManager;
;
