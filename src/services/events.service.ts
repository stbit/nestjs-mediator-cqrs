import { Injectable } from "@nestjs/common";

@Injectable()
export class EventsService {
  private readonly handlersSync: WeakMap<any, ((data: any) => any)[]> = new WeakMap()
  private readonly handlersAsync: WeakMap<any, ((data: any) => any)[]> = new WeakMap()

  addHandler(ctr: any, callback: (data: any) => any, sync: boolean) {
    const handlers = sync ? this.handlersSync : this.handlersAsync

    if (handlers.has(ctr)) handlers.get(ctr)!.push(callback)
    else handlers.set(ctr, [callback])
  }

  getSyncHandlers(ctr: any) {
    return this.handlersSync.get(ctr)
  }

  getAsyncHandlers(ctr: any) {
    return this.handlersAsync.get(ctr)
  }
}