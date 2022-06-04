import { BaseHandler, BaseEventHandler, EventHandlerOptions } from "../typings";
export declare function EventHandler<C extends BaseHandler>(ctr: C, options?: EventHandlerOptions): <T extends BaseEventHandler<C>>(target: T) => void;
