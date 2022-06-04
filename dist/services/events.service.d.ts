export declare class EventsService {
    private readonly handlersSync;
    private readonly handlersAsync;
    addHandler(ctr: any, callback: (data: any) => any, sync: boolean): void;
    getSyncHandlers(ctr: any): ((data: any) => any)[] | undefined;
    getAsyncHandlers(ctr: any): ((data: any) => any)[] | undefined;
}
