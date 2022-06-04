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
exports.MediatorModule = void 0;
const common_1 = require("@nestjs/common");
const command_bus_1 = require("./command.bus");
const event_bus_1 = require("./event.bus");
const query_bus_1 = require("./query.bus");
const bootstrap_sevice_1 = require("./services/bootstrap.sevice");
const events_service_1 = require("./services/events.service");
let MediatorModule = class MediatorModule {
    constructor(bootstrapService) {
        this.bootstrapService = bootstrapService;
    }
    onApplicationBootstrap() {
        this.bootstrapService.explore();
    }
};
MediatorModule = __decorate([
    (0, common_1.Module)({
        providers: [command_bus_1.CommandBus, query_bus_1.QueryBus, event_bus_1.EventBus, bootstrap_sevice_1.BootstrapService, events_service_1.EventsService],
        exports: [command_bus_1.CommandBus, query_bus_1.QueryBus, event_bus_1.EventBus]
    }),
    __metadata("design:paramtypes", [bootstrap_sevice_1.BootstrapService])
], MediatorModule);
exports.MediatorModule = MediatorModule;
//# sourceMappingURL=mediator.module.js.map