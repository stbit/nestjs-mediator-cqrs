import { HandlerType } from "../constants/handler-type"
import { BaseConstructor } from "./constructors"

export interface IMetaDataHandler {
  type: HandlerType
  sync: boolean
  eventClass?: BaseConstructor
}