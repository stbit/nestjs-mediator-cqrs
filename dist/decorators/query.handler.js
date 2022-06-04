"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandler = void 0;
const common_1 = require("@nestjs/common");
const handler_type_1 = require("../constants/handler-type");
function QueryHandler() {
    const inject = (0, common_1.Injectable)();
    return (target) => {
        const metadata = {
            type: handler_type_1.HandlerType.Query,
            sync: true
        };
        inject(target);
        target.__IS_CQRS_METADATA__ = metadata;
    };
}
exports.QueryHandler = QueryHandler;
//# sourceMappingURL=query.handler.js.map