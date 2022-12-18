"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const manager_service_1 = require("../services/manager.service");
const handler_type_1 = require("../constants/handler-type");
function CommandHandler() {
    return (target) => {
        const ctrl = target;
        const metadata = {
            type: handler_type_1.HandlerType.Command,
            sync: true
        };
        ctrl.__IS_CQRS_METADATA__ = metadata;
        manager_service_1.managerService.addHandler(ctrl);
    };
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command.handler.js.map