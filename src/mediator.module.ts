import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { CommandBus } from "./command.bus";
import { EventBus } from "./event.bus";
import { QueryBus } from "./query.bus";
import { BootstrapService } from "./services/bootstrap.sevice";
import { EventsService } from "./services/events.service";

@Module({
  providers: [CommandBus, QueryBus, EventBus, BootstrapService, EventsService],
  exports: [CommandBus, QueryBus, EventBus]
})
export class MediatorModule implements OnApplicationBootstrap {
  constructor(
    private readonly bootstrapService: BootstrapService
  ) {}

  onApplicationBootstrap() {
    this.bootstrapService.explore()
  }
}
