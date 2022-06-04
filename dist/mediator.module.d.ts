import { OnApplicationBootstrap } from "@nestjs/common";
import { BootstrapService } from "./services/bootstrap.sevice";
export declare class MediatorModule implements OnApplicationBootstrap {
    private readonly bootstrapService;
    constructor(bootstrapService: BootstrapService);
    onApplicationBootstrap(): void;
}
