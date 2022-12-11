export declare class EventBus {
    constructor();
    publish<T extends Object>(event: T): Promise<void>;
}
