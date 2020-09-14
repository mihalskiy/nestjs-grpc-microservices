import Aigle from 'aigle'

import {PinoLogger} from 'nestjs-pino'
import {Controller, Inject} from '@nestjs/common'
import {GrpcMethod} from '@nestjs/microservices'
import {isEmpty, isNil} from 'lodash'

import {ICount, IQuery} from '../commons/commons.interface'
import {IUsersService} from './users.interface'
import {IFindPayload} from '../commons/cursor-pagination.interface'

import {User} from './user.model'
import {UserDto} from './user.dto'

const {map} = Aigle

@Controller()
export class UsersController {
  constructor(@Inject('UsersService') private readonly service: IUsersService, private readonly logger: PinoLogger) {
    logger.setContext(UsersController.name)
  }

  @GrpcMethod('UsersService', 'findUser')
  async findUser(query: IQuery): Promise<IFindPayload<User>> {

    console.log('queryquery', query)
    this.logger.info('UsersController#findAll.call %o', query)

    const {results, cursors} = await this.service.findUser({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined
    })

    const result: IFindPayload<User> = {
      edges: await map(results, async (comment: User) => ({
        node: comment,
        cursor: Buffer.from(JSON.stringify([comment.id])).toString('base64')
      })),
      pageInfo: {
        startCursor: cursors.before || '',
        endCursor: cursors.after || '',
        hasNextPage: cursors.hasNext || false,
        hasPreviousPage: cursors.hasPrevious || false
      }
    }

    this.logger.info('UsersController#findAll.result %o', result)

    return result
  }

  @GrpcMethod('UsersService', 'findUserById')
  async findUserById({id}): Promise<User> {
    this.logger.info('UsersController#findById.call %o', id)

    const result: User = await this.service.findUserById(id)

    this.logger.info('UsersController#findById.result %o', result)

    if (isEmpty(result)) throw new Error('Record not found.')

    return result
  }

  @GrpcMethod('UsersService', 'findOneUser')
  async findOneUser(query: IQuery): Promise<User> {
    this.logger.info('UsersController#findOne.call %o', query)

    const result: User = await this.service.findOneUser({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined
    })

    this.logger.info('UsersController#findOne.result %o', result)

    if (isEmpty(result)) throw new Error('Record not found.')

    return result
  }

  @GrpcMethod('UsersService', 'countUser')
  async countUser(query: IQuery): Promise<ICount> {
    this.logger.info('UsersController#count.call %o', query)

    const count: number = await this.service.countUser({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined
    })

    this.logger.info('UsersController#count.result %o', count)

    return {count}
  }

  @GrpcMethod('UsersService', 'createUser')
  async createUser(data: UserDto): Promise<User> {
    this.logger.info('UsersController#createUsercreateUsercreateUser.call %o', data)

    const result: User = await this.service.createUser(data)

    this.logger.info('UsersController#createUsercreateUsercreateUser.result %o', result)

    return result
  }

  @GrpcMethod('UsersService', 'updateUser')
  async updateUser({id, data}): Promise<User> {
    this.logger.info('UsersController#updateUser.call %o %o', id, data)

    const result: User = await this.service.updateUser(id, data)

    this.logger.info('UsersController#updateUser.result %o', result)

    return result
  }

  @GrpcMethod('UsersService', 'destroyUser')
  async destroyUser(query: IQuery): Promise<ICount> {
    this.logger.info('UsersController#destroy.call %o', query)

    const count: number = await this.service.destroyUser({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined
    })

    this.logger.info('UsersController#destroy.result %o', count)

    return {count}
  }
}
