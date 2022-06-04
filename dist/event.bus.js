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
exports.EventBus = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./services/events.service");
let EventBus = class EventBus {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async publish(event) {
        const handlersSync = this.eventsService.getSyncHandlers(event.constructor);
        const handlersAsync = this.eventsService.getAsyncHandlers(event.constructor);
        if (handlersSync) {
            for (const handler of handlersSync) {
                await handler(event);
            }
        }
        if (handlersAsync) {
            setImmediate(() => {
                handlersAsync.forEach((handler) => handler(event));
            });
        }
    }
};
EventBus = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventBus);
exports.EventBus = EventBus;
//# sourceMappingURL=event.bus.js.map