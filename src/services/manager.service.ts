import { Type } from "@nestjs/common"
import { ModuleRef } from "@nestjs/core"
import { HandlerType } from "../constants"
import { ICommandHandler, IMetaDataHandler } from "../typings"
import { eventsService } from "./events.service"

class ManagerService {
  private moduleRef?: ModuleRef

  private handlers: ICommandHandler[] = []

  initializeModule(moduleRef: ModuleRef) {
    if (this.moduleRef) return

    this.moduleRef = moduleRef

    this.handlers.forEach((handler) => this.initializeHandler(handler))
    this.handlers = []
  }

  addHandler(handler: ICommandHandler) {
    if (this.moduleRef) this.initializeHandler(handler)
    else this.handlers.push(handler)
  }

  private initializeHandler(handler: ICommandHandler) {
    if ([HandlerType.Command, HandlerType.Query].includes(handler.__IS_CQRS_METADATA__.type)) {
      this.providerExecute(handler)
    }

    if (handler.__IS_CQRS_METADATA__.type === HandlerType.Event) {
      this.providerEventHandler(handler)
    }
  }

  private getInjectedProviders(Provider: any) {
    // check corrert injected
    this.moduleRef!.get(Provider, { strict: false })

    const types = Reflect.getMetadata('design:paramtypes', Provider) || []

    return types.map((type: string | symbol | Function | Type<any>) => this.moduleRef!.get(type, { strict: false }))
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
    const eventHandler = this.moduleRef!.get(Provider, { strict: false })
    const metadata = Provider.__IS_CQRS_METADATA__ as IMetaDataHandler

    eventsService.addHandler(metadata.eventClass, async (event: any) => {
      return await eventHandler.handle(event)
    }, metadata.sync)
  }
}

export const managerService = new ManagerService