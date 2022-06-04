import { Injectable } from "@nestjs/common"
import { HandlerType } from "../constants/handler-type"
import { BaseHandler, IMetaDataHandler } from "../typings"

export function CommandHandler() {
  const inject = Injectable()

  return (target: BaseHandler) => {
    const metadata: IMetaDataHandler = {
      type: HandlerType.Command,
      sync: true
    }

    inject(target);

    (target as any).__IS_CQRS_METADATA__ = metadata
  }
}
