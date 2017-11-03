"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultCheetohImpl_1 = require("../core/DefaultCheetohImpl");
class CheetohBuilder {
    constructor() { }
    build() {
        let cheetoh = new DefaultCheetohImpl_1.DefaultCheetohImpl();
        return cheetoh;
    }
}
exports.CheetohBuilder = CheetohBuilder;
;
