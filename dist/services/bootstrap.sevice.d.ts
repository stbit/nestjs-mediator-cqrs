import { ModuleRef, ModulesContainer } from "@nestjs/core";
import { EventsService } from "./events.service";
export declare class BootstrapService {
    private readonly modulesContainer;
    private readonly eventsService;
    private readonly moduleRef;
    constructor(modulesContainer: ModulesContainer, eventsService: EventsService, moduleRef: ModuleRef);
    explore(): void;
    private getInjectedProviders;
    private providerExecute;
    private providerEventHandler;
}
