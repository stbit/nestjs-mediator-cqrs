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

  private getTypeName(type: string | symbol | Function | Type<any>) {
    if (typeof type === 'string' || typeof type === 'symbol' || typeof type === 'function') return type
    else return (type as any).name
  }

  private getInjectedProviders(Provider: any) {
    // check corrert injected
    // this.moduleRef!.get(Provider, { strict: false })

    const types = Reflect.getMetadata('design:paramtypes', Provider) || []

    // check correct injected
    types.forEach((type: string | symbol | Function | Type<any>) => {
      try {
        this.moduleRef!.get(type, { strict: false })
      } catch(error: any) {
        throw new Error(`Can't resolve ${this.getTypeName(type)} for ${Provider.name}: ` + error.message)
      }
    })

    return types.map((type: string | symbol | Function | Type<any>) => this.moduleRef!.get(type, { strict: false }))
  }

  private providerExecute(Provider: any) {
    const injectedProviders = this.getInjectedProviders(Provider)
    const instanceProvider = new Provider(...injectedProviders)

    Provider.__COMMAND_EXECUTE__ = instanceProvider.execute.bind(instanceProvider)
  }

  private providerEventHandler(Provider: any) {
    const injectedProviders = this.getInjectedProviders(Provider)
    const eventHandler = new Provider(...injectedProviders)
    const metadata = Provider.__IS_CQRS_METADATA__ as IMetaDataHandler

    eventsService.addHandler(metadata.eventClass, async (event: any) => {
      return await eventHandler.handle(event)
    }, metadata.sync)
  }
}

export const managerService = new ManagerService