"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_bus_1 = require("../src/command.bus");
const commandBus = new command_bus_1.CommandBus();
class Test {
    execute(data) {
        return data;
    }
}
class Test1 {
    execute() {
        return 2;
    }
}
async function bootstrap() {
    const result = commandBus.execute(Test, { userId: 'string' });
    const result2 = commandBus.execute(Test1);
}
//# sourceMappingURL=commands.js.map