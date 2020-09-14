import {join} from 'path'
import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {LoggerModule} from 'nestjs-pino'
import {ClientProxyFactory, Transport, ClientGrpcProxy} from '@nestjs/microservices'

import {UtilsModule} from '../utils/utils.module'
import {UsersTypeResolver} from './users-type.resolver'
import {UsersQueryResolver} from './users-query.resolver'
import {UsersMutationResolver} from './users-mutation.resolver'
import {UsersSubscriptionResolver} from './users-subscription.resolver'
import {CommonsModule} from '../commons/commons.module'

@Module({
  imports: [ConfigModule, LoggerModule, CommonsModule, UtilsModule],
  providers: [
    UsersTypeResolver,
    UsersQueryResolver,
    UsersMutationResolver,
    UsersSubscriptionResolver,
    {
      provide: 'UsersServiceClient',
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('USERS_SVC_URL'),
            package: 'user',
            protoPath: join(__dirname, '../_proto/user.proto'),
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true
            }
          }
        })
      },
      inject: [ConfigService]
    }
  ],
  exports: ['UsersServiceClient']
})
export class UsersModule {}
