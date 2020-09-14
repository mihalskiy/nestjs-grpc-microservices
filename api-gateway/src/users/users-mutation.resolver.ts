import {Inject, OnModuleInit} from '@nestjs/common'
import {ClientGrpcProxy} from '@nestjs/microservices'
import {Resolver, Args, Mutation} from '@nestjs/graphql'
import {PubSub} from 'graphql-subscriptions'

import {PinoLogger} from 'nestjs-pino'

import {IUsersService} from './users.interface'
import {User, UserPayload, UserInput, DeleteAccountPayload} from '../graphql/typings'

@Resolver()
export class UsersMutationResolver implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,
    @Inject('PubSubService')
    private readonly pubSubService: PubSub,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(UsersMutationResolver.name)
  }

  private usersService: IUsersService

  onModuleInit(): void {
    this.usersService = this.usersServiceClient.getService<IUsersService>('UsersService')
  }

  @Mutation()
  async createNewUser(@Args('data') data: UserInput): Promise<UserPayload> {
    const user: User = await this.usersService.createUser(data).toPromise()
    this.pubSubService.publish('userCreated', user)

    return {user}
  }

  @Mutation()
  async updateUser(user: any, @Args('id') id: string, @Args('data') data: UserInput): Promise<UserPayload> {

    console.log('user', user)
    const updatedUser: User = await this.usersService
      .updateUser({
        id,
        data: {
          ...data
        }
      })
      .toPromise()

    return {user: updatedUser}
  }

  @Mutation()
  async destroyUser(@Args('id') id: string): Promise<DeleteAccountPayload> {
    return this.usersService
      .destroyUser({
        where: JSON.stringify({
          id
        })
      })
      .toPromise()
  }
}
