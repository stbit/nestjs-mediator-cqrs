import { Injectable } from "@nestjs/common"
import { HandlerType } from "../constants/handler-type"
import { BaseHandler, BaseEventHandler, EventHandlerOptions, IMetaDataHandler } from "../typings"

export function EventHandler<C extends BaseHandler>(ctr: C, options: EventHandlerOptions = { sync: true }) {
  const inject = Injectable()

  return <T extends BaseEventHandler<C>>(target: T) => {
    const metadata: IMetaDataHandler = {
      type: HandlerType.Event,
      sync: options.sync,
      eventClass: ctr
    }

    inject(target);

    (target as any).__IS_CQRS_METADATA__ = metadata
  }
}
