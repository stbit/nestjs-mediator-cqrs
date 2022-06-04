import { Injectable } from "@nestjs/common"
import { HandlerType } from "../constants/handler-type"
import { BaseHandler, IMetaDataHandler } from "../typings"

export function QueryHandler() {
  const inject = Injectable()

  return <T extends BaseHandler>(target: T) => {
    const metadata: IMetaDataHandler = {
      type: HandlerType.Query,
      sync: true
    }

    inject(target);

    (target as any).__IS_CQRS_METADATA__ = metadata
  }
}
