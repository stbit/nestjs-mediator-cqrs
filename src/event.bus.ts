
import { Injectable } from "@nestjs/common";
import { eventsService } from "./services/events.service";

@Injectable()
export class EventBus {
  constructor() {}

  async publish<T extends Object>(event: T) {
    const handlersSync = eventsService.getSyncHandlers(event.constructor)
    const handlersAsync = eventsService.getAsyncHandlers(event.constructor)

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