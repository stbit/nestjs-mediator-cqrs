import { Injectable, Type } from "@nestjs/common";
import { ModuleRef, ModulesContainer } from "@nestjs/core";
import { HandlerType } from "../constants/handler-type";
import { IMetaDataHandler } from "../typings";
import { EventsService } from "./events.service";


@Injectable()
export class BootstrapService {
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly eventsService: EventsService,
    private readonly moduleRef: ModuleRef
  ) {}

  explore() {
    const modules = [...this.modulesContainer.values()]

    modules
      .flatMap((module) => [...module.providers.keys()])
      .forEach((provider: any) => {
        if ([HandlerType.Command, HandlerType.Query].includes((provider.__IS_CQRS_METADATA__ as IMetaDataHandler)?.type)) {
          this.providerExecute(provider)
        }

        if ((provider.__IS_CQRS_METADATA__ as IMetaDataHandler)?.type === HandlerType.Event) {
          this.providerEventHandler(provider)
        }
      })
  }

  private getInjectedProviders(Provider: any) {
    // check corrert injected
    this.moduleRef.get(Provider, { strict: false })

    const types = Reflect.getMetadata('design:paramtypes', Provider) || []

    return types.map((type: string | symbol | Function | Type<any>) => this.moduleRef.get(type, { strict: false }))
  }

  private providerExecute(Provider: any) {
    const injectedProviders = this.getInjectedProviders(Provider)

    Provider.__COMMAND_EXECUTE__ = async (options = {}) => {
      const instanceProvider = new Provider(...injectedProviders)

      Object.assign(instanceProvider, options)

      return await instanceProvider.execute()
    }
  }

  private providerEventHandler(Provider: any) {
    const eventHandler = this.moduleRef.get(Provider, { strict: false })
    const metadata = Provider.__IS_CQRS_METADATA__ as IMetaDataHandler

    this.eventsService.addHandler(metadata.eventClass, async (event: any) => {
      return await eventHandler.handle(event)
    }, metadata.sync)
  }
}