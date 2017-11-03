"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpmConfig_1 = require("../model/GpmConfig");
const CheetohError_1 = require("../exceptions/CheetohError");
class GpmParser {
    constructor() { }
    validate(manifest) {
        let prop = null;
        if (!manifest.name)
            prop = "name";
        else if (!manifest.version)
            prop = "version";
        else if (!manifest.target)
            prop = "target";
        else if (!manifest.title)
            prop = "title";
        else if (!manifest.description)
            prop = "description";
        else if (!manifest.author)
            prop = "author";
        if (prop !== null) {
            throw new CheetohError_1.CheetohError("Invalid GPM config, missing property: " + prop);
        }
    }
    build(manifest) {
        let config = new GpmConfig_1.GpmConfig();
        config.name = manifest.name;
        config.version = manifest.version;
        config.target = manifest.target;
        config.title = manifest.title;
        config.description = manifest.description;
        config.author = manifest.author;
        return config;
    }
    parse(manifest) {
        let config = null;
        this.validate(manifest);
        config = this.build(manifest);
        return config;
    }
}
exports.GpmParser = GpmParser;
