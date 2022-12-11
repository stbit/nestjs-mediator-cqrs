import { OnApplicationBootstrap } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
export declare class MediatorModule implements OnApplicationBootstrap {
    private readonly moduleRef;
    constructor(moduleRef: ModuleRef);
    onApplicationBootstrap(): void;
}
