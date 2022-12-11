"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsService = void 0;
class EventsService {
    constructor() {
        this.handlersSync = new WeakMap();
        this.handlersAsync = new WeakMap();
    }
    addHandler(ctr, callback, sync) {
        const handlers = sync ? this.handlersSync : this.handlersAsync;
        if (handlers.has(ctr))
            handlers.get(ctr).push(callback);
        else
            handlers.set(ctr, [callback]);
    }
    getSyncHandlers(ctr) {
        return this.handlersSync.get(ctr);
    }
    getAsyncHandlers(ctr) {
        return this.handlersAsync.get(ctr);
    }
}
exports.eventsService = new EventsService;
//# sourceMappingURL=events.service.js.map