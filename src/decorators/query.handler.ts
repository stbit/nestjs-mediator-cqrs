import { managerService } from "../services/manager.service"
import { HandlerType } from "../constants/handler-type"
import { BaseHandler, IMetaDataHandler } from "../typings"

export function QueryHandler() {
  return <T extends BaseHandler>(target: T) => {
    const ctrl = target as any
    const metadata: IMetaDataHandler = {
      type: HandlerType.Query,
      sync: true
    }

    ctrl.__IS_CQRS_METADATA__ = metadata
    managerService.addHandler(ctrl)
  }
}
