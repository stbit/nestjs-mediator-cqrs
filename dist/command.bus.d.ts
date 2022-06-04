import { BaseHandler, InstancePublicPropertiesOnly, ResultCommandExecute } from "./typings";
export declare class CommandBus {
    execute<T extends BaseHandler, K extends InstancePublicPropertiesOnly<T>, R extends ResultCommandExecute<T>>(ctrlClass: T, options: K): Promise<R>;
}
