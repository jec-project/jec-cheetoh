"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheetohError_1 = require("../exceptions/CheetohError");
const fs = require("fs-extra");
class ManifestConfigUpdater {
    constructor() { }
    update(file, manifest, callback) {
        let error = null;
        fs.writeJSON(file, manifest)
            .then(() => {
            callback(null);
        })
            .catch((reason) => {
            error = new CheetohError_1.CheetohError("GPM manifest update error.");
            error.stack = reason;
            callback(error);
        });
    }
}
exports.ManifestConfigUpdater = ManifestConfigUpdater;
