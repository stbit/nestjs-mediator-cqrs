
import { Injectable } from "@nestjs/common";
import { HandlerType } from "./constants/handler-type";
import { BaseHandler, IMetaDataHandler, InstancePublicPropertiesOnly, ResultCommandExecute } from "./typings";

@Injectable()
export class QueryBus {
  async execute<T extends BaseHandler, K extends InstancePublicPropertiesOnly<T>, R extends ResultCommandExecute<T>>(ctrlClass: T, options: K) {
    const ctr = ctrlClass as any
    const metadata: IMetaDataHandler | undefined = ctr.__IS_CQRS_METADATA__

    if (metadata?.type !== HandlerType.Query) throw new Error(`QueryBus: ${ctrlClass.name} not defined decorator QueryHandler`)

    return ctr.__COMMAND_EXECUTE__(options) as R
  }
}