import { Inject } from '@nestjs/common'
import { Resolver, Subscription } from '@nestjs/graphql'

import { PinoLogger } from 'nestjs-pino'
import { PubSub } from 'graphql-subscriptions'

import { User } from '../graphql/typings'

@Resolver()
export class UsersSubscriptionResolver {
  constructor(
    @Inject('PubSubService')
    private readonly pubSubService: PubSub,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(UsersSubscriptionResolver.name)
  }

  @Subscription('userCreated', {
    resolve: (value: User) => value,
    filter: (payload: User, variables: Record<string, any>) => payload.id === variables.id
  })
  userCreated(): AsyncIterator<unknown, any, undefined> {
    return this.pubSubService.asyncIterator('userCreated')
  }
}
