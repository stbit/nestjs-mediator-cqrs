"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const common_1 = require("@nestjs/common");
const handler_type_1 = require("../constants/handler-type");
function EventHandler(ctr, options = { sync: true }) {
    const inject = (0, common_1.Injectable)();
    return (target) => {
        const metadata = {
            type: handler_type_1.HandlerType.Event,
            sync: options.sync,
            eventClass: ctr
        };
        inject(target);
        target.__IS_CQRS_METADATA__ = metadata;
    };
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=event.handler.js.map