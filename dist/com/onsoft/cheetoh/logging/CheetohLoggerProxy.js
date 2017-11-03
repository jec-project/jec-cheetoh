"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class CheetohLoggerProxy extends jec_commons_1.AbstractLoggerProxy {
    constructor() {
        super("[CHEETOH]");
        if (CheetohLoggerProxy._locked || CheetohLoggerProxy.INSTANCE) {
            this.throwSingletonError("CheetohLoggerProxy");
        }
        this.initObj();
        CheetohLoggerProxy._locked = true;
    }
    initObj() {
        this.setLogger(new jec_commons_1.ConsoleLogger());
    }
    static getInstance() {
        if (CheetohLoggerProxy.INSTANCE === null) {
            CheetohLoggerProxy._locked = false;
            CheetohLoggerProxy.INSTANCE = new CheetohLoggerProxy();
        }
        return CheetohLoggerProxy.INSTANCE;
    }
}
CheetohLoggerProxy.INSTANCE = null;
CheetohLoggerProxy._locked = true;
exports.CheetohLoggerProxy = CheetohLoggerProxy;
;
