"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpmConfig_1 = require("../model/GpmConfig");
const CheetohError_1 = require("../exceptions/CheetohError");
const GpmProperty_1 = require("./GpmProperty");
class GpmParser {
    constructor() { }
    validate(manifest) {
        let prop = null;
        if (!manifest.name)
            prop = GpmProperty_1.GpmProperty.NAME;
        else if (!manifest.version)
            GpmProperty_1.GpmProperty.VERSION;
        else if (!manifest.target)
            GpmProperty_1.GpmProperty.TARGET;
        else if (!manifest.title)
            GpmProperty_1.GpmProperty.TITLE;
        else if (!manifest.description)
            GpmProperty_1.GpmProperty.DESCRIPTION;
        else if (!manifest.author)
            prop = GpmProperty_1.GpmProperty.AUTHOR;
        if (prop !== null) {
            throw new CheetohError_1.CheetohError(`Invalid GPM config: missing property '${prop}'`);
        }
    }
    build(manifest) {
        const config = new GpmConfig_1.GpmConfig();
        config.name = manifest.name;
        config.version = manifest.version;
        config.target = manifest.target;
        config.title = manifest.title;
        config.description = manifest.description;
        config.author = manifest.author;
        return config;
    }
    parse(manifest) {
        this.validate(manifest);
        const config = this.build(manifest);
        return config;
    }
}
exports.GpmParser = GpmParser;
