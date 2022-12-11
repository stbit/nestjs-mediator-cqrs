import { ModuleRef } from "@nestjs/core";
import { ICommandHandler } from "../typings";
declare class ManagerService {
    private moduleRef?;
    private handlers;
    initializeModule(moduleRef: ModuleRef): void;
    addHandler(handler: ICommandHandler): void;
    private initializeHandler;
    private getInjectedProviders;
    private providerExecute;
    private providerEventHandler;
}
export declare const managerService: ManagerService;
export {};
