import { BaseHandler, InstancePublicPropertiesOnly, ResultCommandExecute } from "./typings";
export declare class QueryBus {
    execute<T extends BaseHandler, K extends InstancePublicPropertiesOnly<T>, R extends ResultCommandExecute<T>>(ctrlClass: T, options: K): Promise<R>;
}
