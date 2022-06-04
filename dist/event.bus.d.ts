import { EventsService } from "./services/events.service";
export declare class EventBus {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    publish<T extends Object>(event: T): Promise<void>;
}
