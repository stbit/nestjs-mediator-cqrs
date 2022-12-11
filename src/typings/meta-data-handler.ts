import { HandlerType } from "../constants/handler-type"
import { BaseConstructor } from "./constructors"

export interface IMetaDataHandler {
  type: HandlerType
  sync: boolean
  eventClass?: BaseConstructor
}

export interface ICommandHandler {
  __IS_CQRS_METADATA__: IMetaDataHandler
}