import * as paginate from 'sequelize-cursor-pagination'
import {Column, Model, Table, DataType, Index} from 'sequelize-typescript'
import {Entity} from "typeorm";

@Table({
  modelName: 'user',
  tableName: 'users'
})
@Entity('users')
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    comment: 'The identifier for the user record.'
  })
  id: string

  @Index('user_name')
  @Column({
    type: DataType.TEXT,
    comment: "The user's name."
  })
  name: string

  @Index('user_email')
  @Column({
    type: DataType.TEXT,
    comment: "The user's email."
  })
  email: string

  @Column({
    type: DataType.INTEGER,
    comment: "The user's age."
  })
  age: number
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id'
})(User)
