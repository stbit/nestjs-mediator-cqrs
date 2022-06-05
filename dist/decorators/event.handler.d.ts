import { BaseEventHandler, EventHandlerOptions, BaseConstructor } from "../typings";
export declare function EventHandler<C extends BaseConstructor>(ctr: C, options?: EventHandlerOptions): <T extends BaseEventHandler<C>>(target: T) => void;
