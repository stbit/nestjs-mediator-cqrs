
import { Injectable } from "@nestjs/common";
import { EventsService } from "./services/events.service";

@Injectable()
export class EventBus {
  constructor(
    private readonly eventsService: EventsService
  ) {}

  async publish<T extends Object>(event: T) {
    const handlersSync = this.eventsService.getSyncHandlers(event.constructor)
    const handlersAsync = this.eventsService.getAsyncHandlers(event.constructor)

    if (handlersSync) {
      for (const handler of handlersSync) {
        await handler(event)
      }
    }

    if (handlersAsync) {
      setImmediate(() => {
        handlersAsync.forEach((handler) => handler(event))
      })
    }
  }
}