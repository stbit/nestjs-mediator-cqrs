export type BaseConstructor = { new(...args: any[]): ({}) }
export type BaseHandler = { new(...args: any[]): ({ execute: () => any }) }
export type BaseEventHandler<T extends { new(...args: any[]): ({}) }> = { new(...args: any[]): ({ handle: (event: InstanceType<T>) => any }) }
export type ResultCommandExecute<T extends BaseHandler> = ReturnType<InstanceType<T>['execute']>

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type InstancePublicPropertiesOnly<T extends BaseHandler> = NonFunctionProperties<InstanceType<T>>
