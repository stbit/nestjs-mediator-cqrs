"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const common_1 = require("@nestjs/common");
const handler_type_1 = require("../constants/handler-type");
function CommandHandler() {
    const inject = (0, common_1.Injectable)();
    return (target) => {
        const metadata = {
            type: handler_type_1.HandlerType.Command,
            sync: true
        };
        inject(target);
        target.__IS_CQRS_METADATA__ = metadata;
    };
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command.handler.js.map