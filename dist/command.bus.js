"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBus = void 0;
const common_1 = require("@nestjs/common");
const handler_type_1 = require("./constants/handler-type");
let CommandBus = class CommandBus {
    async execute(ctrlClass, options) {
        const ctr = ctrlClass;
        const metadata = ctr.__IS_CQRS_METADATA__;
        if ((metadata === null || metadata === void 0 ? void 0 : metadata.type) !== handler_type_1.HandlerType.Command)
            throw new Error(`CommandBus: ${ctrlClass.name} not defined decorator CommandHandler`);
        return await ctr.__COMMAND_EXECUTE__(options);
    }
};
CommandBus = __decorate([
    (0, common_1.Injectable)()
], CommandBus);
exports.CommandBus = CommandBus;
//# sourceMappingURL=command.bus.js.map