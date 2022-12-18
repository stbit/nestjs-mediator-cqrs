import { BaseHandler, InstanceExecuteTypes, ResultCommandExecute } from "./typings";
export declare class QueryBus {
    execute<T extends BaseHandler, K extends InstanceExecuteTypes<T>, R extends ResultCommandExecute<T>>(ctrlClass: T, ...args: K): R;
}
