"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandler = void 0;
const manager_service_1 = require("src/services/manager.service");
const handler_type_1 = require("../constants/handler-type");
function QueryHandler() {
    return (target) => {
        const ctrl = target;
        const metadata = {
            type: handler_type_1.HandlerType.Query,
            sync: true
        };
        ctrl.__IS_CQRS_METADATA__ = metadata;
        manager_service_1.managerService.addHandler(ctrl);
    };
}
exports.QueryHandler = QueryHandler;
//# sourceMappingURL=query.handler.js.map