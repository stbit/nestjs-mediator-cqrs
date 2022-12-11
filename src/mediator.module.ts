import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { CommandBus } from "./command.bus";
import { EventBus } from "./event.bus";
import { QueryBus } from "./query.bus";
import { managerService } from "./services/manager.service";

@Module({
  providers: [CommandBus, QueryBus, EventBus],
  exports: [CommandBus, QueryBus, EventBus]
})
export class MediatorModule implements OnApplicationBootstrap {
  constructor(
    private readonly moduleRef: ModuleRef
  ) {}

  onApplicationBootstrap() {
    managerService.initializeModule(this.moduleRef)
  }
}
