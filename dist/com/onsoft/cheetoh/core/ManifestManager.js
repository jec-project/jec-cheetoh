"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_node_1 = require("jec-commons-node");
const CheetohError_1 = require("../exceptions/CheetohError");
const ManifestConfig_1 = require("../model/ManifestConfig");
const path = require("path");
const GpmParser_1 = require("../utils/GpmParser");
const ManifestConfigUpdater_1 = require("../utils/ManifestConfigUpdater");
class ManifestManager {
    constructor() {
        this._manifestConfig = null;
        this._manifestPath = null;
        this._glasscatPath = null;
    }
    validate(data, callback) {
        let error = null;
        if (data.models === undefined) {
            error = new CheetohError_1.CheetohError("Invalid GPM config: missing property 'models'");
        }
        else if (data.models !== null && !Array.isArray(data.models)) {
            error = new CheetohError_1.CheetohError("Invalid GPM config: 'models' must be an array");
        }
        callback(error);
    }
    parse(data, callback) {
        const gpmModels = new Array();
        const parser = new GpmParser_1.GpmParser();
        const models = data.models;
        this._manifestConfig = new ManifestConfig_1.ManifestConfig();
        let len = models.length;
        let gpm = null;
        try {
            while (len--) {
                gpm = parser.parse(models[len]);
                gpmModels.push(gpm);
            }
            this._manifestConfig.models = gpmModels;
            callback(null);
        }
        catch (e) {
            callback(e);
        }
    }
    getGlassCatPath() {
        return this._glasscatPath;
    }
    setGlassCatPath(glasscatPath) {
        this._glasscatPath = glasscatPath;
        if (glasscatPath) {
            this._manifestPath = path.join(glasscatPath, "manifest.json");
        }
    }
    loadManifest(callback) {
        let error = null;
        let loader = null;
        if (!this._manifestPath) {
            error = new CheetohError_1.CheetohError("Invalid GPM config: server path must be specified");
            callback(error);
        }
        else {
            loader = new jec_commons_node_1.DefaultJsonLoader();
            loader.load(this._manifestPath, (data) => {
                this.validate(data, (err) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        this.parse(data, (err) => {
                            callback(err);
                        });
                    }
                });
            }, (err) => {
                error = new CheetohError_1.CheetohError(err.message);
                error.stack = err.stack;
                callback(error);
            });
        }
    }
    updateManifest(callback) {
        let error = null;
        let updater = null;
        if (!this._manifestPath) {
            error = new CheetohError_1.CheetohError("Invalid GPM config: server path must be specified");
            callback(error);
        }
        else {
            updater = new ManifestConfigUpdater_1.ManifestConfigUpdater();
            updater.update(this._manifestPath, this._manifestConfig, (err) => {
                callback(err);
            });
        }
    }
    addGpm(gpmConfig) {
        this._manifestConfig.models.push(gpmConfig);
    }
}
exports.ManifestManager = ManifestManager;
;
