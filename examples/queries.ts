import { QueryBus } from '../src/query.bus'

const queryBus = new QueryBus()

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
  const result = queryBus.execute(Test, { userId: 'string' })
  const result2 = queryBus.execute(Test1)
}