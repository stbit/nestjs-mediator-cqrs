"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerService = void 0;
const constants_1 = require("../constants");
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
    getTypeName(type) {
        if (typeof type === 'string' || typeof type === 'symbol' || typeof type === 'function')
            return type;
        else
            return type.name;
    }
    getInjectedProviders(Provider) {
        // check corrert injected
        // this.moduleRef!.get(Provider, { strict: false })
        const types = Reflect.getMetadata('design:paramtypes', Provider) || [];
        // check correct injected
        types.forEach((type) => {
            try {
                this.moduleRef.get(type, { strict: false });
            }
            catch (error) {
                throw new Error(`Can't resolve ${this.getTypeName(type)} for ${Provider.name}: ` + error.message);
            }
        });
        return types.map((type) => this.moduleRef.get(type, { strict: false }));
    }
    providerExecute(Provider) {
        const injectedProviders = this.getInjectedProviders(Provider);
        const instanceProvider = new Provider(...injectedProviders);
        Provider.__COMMAND_EXECUTE__ = instanceProvider.execute.bind(instanceProvider);
    }
    providerEventHandler(Provider) {
        const injectedProviders = this.getInjectedProviders(Provider);
        const eventHandler = new Provider(...injectedProviders);
        const metadata = Provider.__IS_CQRS_METADATA__;
        events_service_1.eventsService.addHandler(metadata.eventClass, async (event) => {
            return await eventHandler.handle(event);
        }, metadata.sync);
    }
}
exports.managerService = new ManagerService;
//# sourceMappingURL=manager.service.js.map