"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_bus_1 = require("../src/query.bus");
const queryBus = new query_bus_1.QueryBus();
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
    const result = queryBus.execute(Test, { userId: 'string' });
    const result2 = queryBus.execute(Test1);
}
//# sourceMappingURL=queries.js.map