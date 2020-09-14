import { Observable } from 'rxjs'
import { Metadata } from 'grpc'

import { IId, IQuery, ICount } from '../commons/commons.interface'
import { User, UsersConnection } from '../graphql/typings'
import { UserDto } from './user.dto'

interface UpdateUserInput {
  id: string
  data: UserDto
}

export interface IUsersService {
  findUser(query: IQuery, metadata?: Metadata): Observable<UsersConnection>
  findUserById(id: IId, metadata?: Metadata): Observable<User>
  findOne(query: IQuery, metadata?: Metadata): Observable<User>
  countUser(query: IQuery, metadata?: Metadata): Observable<ICount>
  createUser(input: UserDto, metadata?: Metadata): Observable<User>
  updateUser(input: UpdateUserInput): Observable<User>
  destroyUser(query: IQuery, metadata?: Metadata): Observable<ICount>
}
