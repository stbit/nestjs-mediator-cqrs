import { managerService } from "../services/manager.service"
import { HandlerType } from "../constants/handler-type"
import { BaseEventHandler, EventHandlerOptions, IMetaDataHandler, BaseConstructor } from "../typings"

export function EventHandler<C extends BaseConstructor>(ctr: C, options: EventHandlerOptions = { sync: true }) {
  return <T extends BaseEventHandler<C>>(target: T) => {
    const ctrl = target as any
    const metadata: IMetaDataHandler = {
      type: HandlerType.Event,
      sync: options.sync,
      eventClass: ctr
    }

    ctrl.__IS_CQRS_METADATA__ = metadata
    managerService.addHandler(ctrl)
  }
}
