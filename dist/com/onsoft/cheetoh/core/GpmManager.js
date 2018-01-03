"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_commons_node_1 = require("jec-commons-node");
const CheetohError_1 = require("../exceptions/CheetohError");
const GpmParser_1 = require("../utils/GpmParser");
const TarballUtil_1 = require("../utils/TarballUtil");
const fs = require("fs-extra");
const path = require("path");
class GpmManager {
    constructor() { }
    buildGpmConfig(extractPath, callback) {
        let error = null;
        let gpm = null;
        let parser = null;
        let loader = new jec_commons_node_1.DefaultJsonLoader();
        loader.load(path.join(extractPath, "gpm/gpm.json"), (data) => {
            parser = new GpmParser_1.GpmParser();
            gpm = parser.parse(data.project);
            callback(gpm, error);
        }, (err) => {
            error = new CheetohError_1.CheetohError("GPM manifest config error:\n" + err);
            error.stack = err.stack;
            callback(gpm, error);
        });
    }
    extractGpmConfig(source, dest, callback) {
        let error = null;
        fs.move(source, dest).then(() => {
            callback(error);
        }).catch((reason) => {
            error = new CheetohError_1.CheetohError("GPM extraction error:\n" + reason);
            error.stack = reason.stack;
            callback(error);
        });
    }
    deleteTmpFolder(tmpFolder, callback) {
        let error = null;
        fs.remove(tmpFolder).then(() => {
            callback(error);
        }).catch((reason) => {
            error = new CheetohError_1.CheetohError("GPM extraction error:\n" + reason);
            error.stack = reason.stack;
            callback(error);
        });
    }
    installFromUri(uri, destinationPath, callback) {
        let error = null;
        let gpm = null;
        let tarballUtil = new TarballUtil_1.TarballUtil();
        let folder = uri.substring(uri.lastIndexOf(jec_commons_1.UrlStringsEnum.SLASH) + 1, uri.lastIndexOf("-"));
        let extractPath = path.join(destinationPath, folder);
        tarballUtil.download(uri, destinationPath, (err) => {
            if (err) {
                error = new CheetohError_1.CheetohError("GPM download error:\n" + err);
                error.stack = err;
                callback(gpm, error);
            }
            else {
                this.buildGpmConfig(extractPath, (gpm, err) => {
                    if (err) {
                        callback(gpm, err);
                    }
                    else {
                        this.extractGpmConfig(path.join(destinationPath, folder, "gpm"), path.join(destinationPath, gpm.target), (err) => {
                            this.deleteTmpFolder(extractPath, (err) => {
                                callback(gpm, err);
                            });
                        });
                    }
                });
            }
        });
    }
}
exports.GpmManager = GpmManager;
;
