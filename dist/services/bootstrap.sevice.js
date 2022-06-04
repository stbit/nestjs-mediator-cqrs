"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const handler_type_1 = require("../constants/handler-type");
const events_service_1 = require("./events.service");
let BootstrapService = class BootstrapService {
    constructor(modulesContainer, eventsService, moduleRef) {
        this.modulesContainer = modulesContainer;
        this.eventsService = eventsService;
        this.moduleRef = moduleRef;
    }
    explore() {
        const modules = [...this.modulesContainer.values()];
        modules
            .flatMap((module) => [...module.providers.keys()])
            .forEach((provider) => {
            var _a, _b;
            if ([handler_type_1.HandlerType.Command, handler_type_1.HandlerType.Query].includes((_a = provider.__IS_CQRS_METADATA__) === null || _a === void 0 ? void 0 : _a.type)) {
                this.providerExecute(provider);
            }
            if (((_b = provider.__IS_CQRS_METADATA__) === null || _b === void 0 ? void 0 : _b.type) === handler_type_1.HandlerType.Event) {
                this.providerEventHandler(provider);
            }
        });
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
        this.eventsService.addHandler(metadata.eventClass, async (event) => {
            return await eventHandler.handle(event);
        }, metadata.sync);
    }
};
BootstrapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModulesContainer,
        events_service_1.EventsService,
        core_1.ModuleRef])
], BootstrapService);
exports.BootstrapService = BootstrapService;
//# sourceMappingURL=bootstrap.sevice.js.map