export declare type BaseConstructor = {
    new (...args: any[]): ({});
};
export declare type BaseHandler = {
    new (...args: any[]): ({
        execute: () => any;
    });
};
export declare type BaseEventHandler<T extends {
    new (...args: any[]): ({});
}> = {
    new (...args: any[]): ({
        handle: (event: InstanceType<T>) => any;
    });
};
export declare type ResultCommandExecute<T extends BaseHandler> = ReturnType<InstanceType<T>['execute']>;
declare type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
declare type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export declare type InstancePublicPropertiesOnly<T extends BaseHandler> = NonFunctionProperties<InstanceType<T>>;
export {};
