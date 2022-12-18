import { CommandBus } from '../src/command.bus'

const commandBus = new CommandBus()

class Test {
  execute(data: { userId: string }) {
    return data
  }
}

class Test1 {
  execute() {
    return 2
  }
}

async function bootstrap() {
  const result = commandBus.execute(Test, { userId: 'string' })
  const result2 = commandBus.execute(Test1)
}