"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBus = void 0;
const common_1 = require("@nestjs/common");
const handler_type_1 = require("./constants/handler-type");
let QueryBus = class QueryBus {
    execute(ctrlClass, ...args) {
        const ctr = ctrlClass;
        const metadata = ctr.__IS_CQRS_METADATA__;
        if ((metadata === null || metadata === void 0 ? void 0 : metadata.type) !== handler_type_1.HandlerType.Query)
            throw new Error(`QueryBus: ${ctrlClass.name} not defined decorator QueryHandler`);
        if (!ctr.__COMMAND_EXECUTE__)
            throw new Error(`__COMMAND_EXECUTE__ is not define class: ${ctr.name}. Add ${ctr.name} to module providers`);
        return ctr.__COMMAND_EXECUTE__(...args);
    }
};
QueryBus = __decorate([
    (0, common_1.Injectable)()
], QueryBus);
exports.QueryBus = QueryBus;
//# sourceMappingURL=query.bus.js.map