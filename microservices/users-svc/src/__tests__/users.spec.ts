/**
 * * Nest Modules
 */
import { Test } from '@nestjs/testing'
import { getConnection } from 'typeorm'

/**
 * * Modules
 */



/**
 * * Entities
 */
import { User } from '../users/user.model'

/**
 * * Services
 */
import { UsersService } from '../users/users.service'

/**
 * * DTOs
 */
import { UserDto } from '../users/user.dto'

/**
 * * Dependencies
 */
import * as faker from 'faker'
import {SequelizeModule} from "@nestjs/sequelize";
import {LoggerModule} from "nestjs-pino";
import {UsersController} from "../users/users.controller";
import {AppModule} from "../app.module";

/**
 * Test User Data
 */
const testUsername = faker.internet.userName()
const testEmail = faker.internet.email()
const testAge = faker.random.number()


/**
 * Test user object
 */
const user: Partial<UserDto> = {
  name: testUsername,
  email: testEmail,
  age: testAge,
}

export interface IQuery {
  select?: string[]
  where?: string
  orderBy?: string[]
  limit?: number
  before?: string
  after?: string
}

/**
 * Posts integration tests
 */
describe('Post Integration Tests', () => {
  let userService: UsersService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule, AppModule, SequelizeModule.forFeature([User])],
      providers: [{provide: 'UsersService', useClass: UsersService}],
      controllers: [UsersController],
    }).compile()

    userService = module.get<UsersService>(UsersService)
  })

  describe('Add', () => {
    it('should create new user', async () => {
      User.destroy({
        where: {},
        truncate: true
      })
      const newUser = await userService.createUser(user)

      expect(newUser).not.toEqual(user)
      expect(newUser).toMatchObject(user)
      debugger
    })
  })

  describe('Edit', () => {
    it('should edit user', async () => {
      User.destroy({
        where: {},
        truncate: true
      })
      const createUser = await userService.createUser(user)
      const newUser = {
        name: 'new User',
        email: 'new@new.com',
        age: 1
      }
      const updatedUser = await userService.updateUser(createUser.id, newUser)

      expect(createUser).not.toMatchObject(newUser)
      expect(updatedUser).toMatchObject(newUser)
    })
  })

  describe('Delete', () => {
    it('should be able to delete a comment on a post', async () => {
      User.destroy({
        where: {},
        truncate: true
      })
      const createdUser = await userService.createUser(user)
      const query: any = {
        where: {
          id: createdUser.id
        }
      }
      const deletedUser = await userService.destroyUser(query)

      expect(deletedUser).toBe(1)
    })
  })

  describe('Find', () => {
    it('should be able to find all comments related to a post', async () => {
      User.destroy({
        where: {},
        truncate: true
      })
      await userService.createUser(user)
      await userService.createUser(user)

      const allUsers = await userService.findUser()

      debugger
      expect(allUsers.results.length).toBe(2)
    })
  })

  describe('Find One', () => {
    it('should be able to find a specific comment', async () => {
      User.destroy({
        where: {},
        truncate: true
      })
      const createdUser = await userService.createUser(user);
      const query: any = {
        where: {
          id: createdUser.id
        }
      }
      const newUser = await userService.findOneUser(query)

      expect(newUser.id).toBe(createdUser.id)
    })
  })

  /**
   * after each __tests__, delete everything from users, comments and posts table
   */

  /**
   * after all tests are done, delete everything from users, comments and posts table
   */
  afterAll(async () => {
    const connection = getConnection()

    await connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .execute()

    await connection.close()
  })
})
