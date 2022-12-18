
import { Injectable } from "@nestjs/common";
import { HandlerType } from "./constants/handler-type";
import { BaseHandler, IMetaDataHandler, InstanceExecuteTypes, ResultCommandExecute } from "./typings";

@Injectable()
export class CommandBus {
  execute<T extends BaseHandler, K extends InstanceExecuteTypes<T>, R extends ResultCommandExecute<T>>(ctrlClass: T, ...args: K): R {
    const ctr = ctrlClass as any
    const metadata: IMetaDataHandler | undefined = ctr.__IS_CQRS_METADATA__

    if (metadata?.type !== HandlerType.Command) throw new Error(`CommandBus: ${ctrlClass.name} not defined decorator CommandHandler`)
    if (!ctr.__COMMAND_EXECUTE__) throw new Error(`__COMMAND_EXECUTE__ is not define class: ${ctr.name}. Add ${ctr.name} to module providers`)

    return ctr.__COMMAND_EXECUTE__(...args) as R
  }
}