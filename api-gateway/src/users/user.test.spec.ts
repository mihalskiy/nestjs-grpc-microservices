import { Test, TestingModule } from '@nestjs/testing';
import { UsersMutationResolver } from './users-mutation.resolver';
import { UsersQueryResolver } from './users-query.resolver';
import { UsersSubscriptionResolver } from './users-subscription.resolver';
import {UserInput} from "../graphql/typings";

jest.mock('@nestjs/common/services/logger.service');

const mockUser = () => ({
  createNewUser: jest.fn(),
  updateUser: jest.fn(),
  destroyUser: jest.fn(),
  getUser: jest.fn(),
});

describe('AuthService', () => {
  let usersQueryResolver: UsersQueryResolver;
  let usersMutationResolver: UsersMutationResolver;
  let usersSubscriptionResolver: UsersSubscriptionResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UsersQueryResolver, useFactory: mockUser },
        { provide: UsersMutationResolver, useFactory: mockUser },
        { provide: UsersSubscriptionResolver, useFactory: mockUser },
      ],
    }).compile();

    usersQueryResolver = await module.get<UsersQueryResolver>(UsersQueryResolver);
    usersMutationResolver = await module.get<UsersMutationResolver>(UsersMutationResolver);
    usersSubscriptionResolver = await module.get<UsersSubscriptionResolver>(UsersSubscriptionResolver);
  });

  it('should be defined', () => {
    expect(usersQueryResolver).toBeDefined();
    expect(usersMutationResolver).toBeDefined();
    expect(usersSubscriptionResolver).toBeDefined();
  });
  describe('CRUD', () => {
    it('should create New User', async () => {
      const data: UserInput  = {
        name: 'string',
        email: 'emailAddress@wedf.ewf',
        age: 12
      }
      await (usersMutationResolver.createNewUser as jest.Mock).mockReturnValue(data);
      expect(usersMutationResolver.createNewUser).not.toHaveBeenCalled();
      const result = await usersMutationResolver.createNewUser(data);
      expect(usersMutationResolver.createNewUser).toHaveBeenCalled();
      expect(result).toEqual(data);
    });

    it('should update User', async () => {
      const id = '123';
      const data: UserInput  = {
        name: 'update User',
        email: 'update@wedf.ewf',
        age: 12
      }
      const user = {
        name: 'string',
        email: 'emailAddress@wedf.ewf',
        age: 12
      }
      await (usersMutationResolver.updateUser as jest.Mock).mockReturnValue(data);
      expect(usersMutationResolver.updateUser).not.toHaveBeenCalled();

      const result = await usersMutationResolver.updateUser(user, id, data);
      expect(usersMutationResolver.updateUser).toHaveBeenCalled();
      expect(result).toEqual(data);
    });

    it('should delete User', async () => {
      const id = '123';
      await (usersMutationResolver.destroyUser as jest.Mock).mockReturnValue(undefined);
      expect(usersMutationResolver.destroyUser).not.toHaveBeenCalled();
      const result = await usersMutationResolver.destroyUser(id);
      expect(usersMutationResolver.destroyUser).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should get User', async () => {
      const id = '123';
      const user = {
        name: 'string',
        email: 'emailAddress@wedf.ewf',
        age: 12
      };
      await (usersQueryResolver.getUser as jest.Mock).mockReturnValue(user);
      expect(usersQueryResolver.getUser).not.toHaveBeenCalled();
      const result = await usersQueryResolver.getUser(id);
      expect(usersQueryResolver.getUser).toHaveBeenCalled();
      expect(result).toEqual(user);
    });
  });
});
