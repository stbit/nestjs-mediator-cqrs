"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const manager_service_1 = require("../services/manager.service");
const handler_type_1 = require("../constants/handler-type");
function EventHandler(ctr, options = { sync: true }) {
    return (target) => {
        const ctrl = target;
        const metadata = {
            type: handler_type_1.HandlerType.Event,
            sync: options.sync,
            eventClass: ctr
        };
        ctrl.__IS_CQRS_METADATA__ = metadata;
        manager_service_1.managerService.addHandler(ctrl);
    };
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=event.handler.js.map