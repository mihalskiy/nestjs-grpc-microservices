import {FindOptions} from 'sequelize/types'

import {User} from './user.model'
import {UserDto} from './user.dto'
import {IFindAndPaginateOptions, IFindAndPaginateResult} from '../commons/find-and-paginate.interface'

export interface IUsersService {
  findUser(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<User>>
  findUserById(id: string): Promise<User>
  findOneUser(query?: FindOptions): Promise<User>
  countUser(query?: FindOptions): Promise<number>
  createUser(comment: UserDto): Promise<User>
  updateUser(id: string, comment: UserDto): Promise<User>
  destroyUser(query?: FindOptions): Promise<number>
}
