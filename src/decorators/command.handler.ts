import { Injectable } from "@nestjs/common"
import { managerService } from "../services/manager.service"
import { HandlerType } from "../constants/handler-type"
import { BaseHandler, IMetaDataHandler } from "../typings"

export function CommandHandler() {
  return (target: BaseHandler) => {
    const ctrl = target as any
    const metadata: IMetaDataHandler = {
      type: HandlerType.Command,
      sync: true
    }

    ctrl.__IS_CQRS_METADATA__ = metadata

    managerService.addHandler(ctrl)
  }
}
