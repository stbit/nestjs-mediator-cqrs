"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerService = void 0;
const constants_1 = require("src/constants");
const events_service_1 = require("./events.service");
class ManagerService {
    constructor() {
        this.handlers = [];
    }
    initializeModule(moduleRef) {
        if (this.moduleRef)
            return;
        this.moduleRef = moduleRef;
        this.handlers.forEach((handler) => this.initializeHandler(handler));
        this.handlers = [];
    }
    addHandler(handler) {
        if (this.moduleRef)
            this.initializeHandler(handler);
        else
            this.handlers.push(handler);
    }
    initializeHandler(handler) {
        if ([constants_1.HandlerType.Command, constants_1.HandlerType.Query].includes(handler.__IS_CQRS_METADATA__.type)) {
            this.providerExecute(handler);
        }
        if (handler.__IS_CQRS_METADATA__.type === constants_1.HandlerType.Event) {
            this.providerEventHandler(handler);
        }
    }
    getInjectedProviders(Provider) {
        // check corrert injected
        this.moduleRef.get(Provider, { strict: false });
        const types = Reflect.getMetadata('design:paramtypes', Provider) || [];
        return types.map((type) => this.moduleRef.get(type, { strict: false }));
    }
    providerExecute(Provider) {
        const injectedProviders = this.getInjectedProviders(Provider);
        Provider.__COMMAND_EXECUTE__ = async (options = {}) => {
            const instanceProvider = new Provider(...injectedProviders);
            Object.assign(instanceProvider, options);
            return await instanceProvider.execute();
        };
    }
    providerEventHandler(Provider) {
        const eventHandler = this.moduleRef.get(Provider, { strict: false });
        const metadata = Provider.__IS_CQRS_METADATA__;
        events_service_1.eventsService.addHandler(metadata.eventClass, async (event) => {
            return await eventHandler.handle(event);
        }, metadata.sync);
    }
}
exports.managerService = new ManagerService;
//# sourceMappingURL=manager.service.js.map