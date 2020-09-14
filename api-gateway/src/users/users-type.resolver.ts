import { Resolver } from '@nestjs/graphql'
import { PinoLogger } from 'nestjs-pino'

import { User } from '../graphql/typings'


@Resolver('User')
export class UsersTypeResolver {
  constructor(
    private readonly logger: PinoLogger
  ) {
    logger.setContext(UsersTypeResolver.name)
  }
}
