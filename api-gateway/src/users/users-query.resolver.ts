import { Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { Query, Resolver, Args } from '@nestjs/graphql'
import { PinoLogger } from 'nestjs-pino'

import { isEmpty, merge } from 'lodash'

import { QueryUtils } from '../utils/query.utils'
import { IUsersService } from './users.interface'
import { User, UsersConnection } from '../graphql/typings'

@Resolver('User')
export class UsersQueryResolver implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,
    private readonly queryUtils: QueryUtils,
    private readonly logger: PinoLogger
  ) {
    logger.setContext(UsersQueryResolver.name)
  }

  private usersService: IUsersService

  onModuleInit(): void {
    this.usersService = this.usersServiceClient.getService<IUsersService>('UsersService')
  }

  @Query('users')
  async getUsers(
    @Args('q') q: string,
    @Args('first') first: number,
    @Args('last') last: number,
    @Args('before') before: string,
    @Args('after') after: string,
    @Args('filterBy') filterBy: any,
    @Args('orderBy') orderBy: string
  ): Promise<UsersConnection> {
    const query = { where: {} }

    if (!isEmpty(q)) merge(query, { where: { name: { _iLike: q } } })

    merge(query, await this.queryUtils.buildQuery(filterBy, orderBy, first, last, before, after))

    return this.usersService
      .findUser({
        ...query,
        where: JSON.stringify(query.where)
      })
      .toPromise()
  }

  @Query('user')
  async getUser(@Args('id') id: string): Promise<User> {
    return this.usersService.findUserById({ id }).toPromise()
  }


  @Query('userCount')
  async getUserCount(@Args('q') q: string, @Args('filterBy') filterBy: any): Promise<number> {
    const query = { where: {} }

    if (!isEmpty(q)) merge(query, { where: { name: { _iLike: q } } })

    merge(query, await this.queryUtils.getFilters(filterBy))

    const { count } = await this.usersService
      .countUser({
        ...query,
        where: JSON.stringify(query.where)
      })
      .toPromise()

    return count
  }
}
