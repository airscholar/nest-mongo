import { Test, TestingModule } from '@nestjs/testing';
import { create } from 'domain';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.getUser(userStub().userId);
      });

      test('then it should call the user service', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().userId);
      });
      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });

    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await controller.getUsers();
      });

      test('then it should be called once', () => {
        expect(usersService.getUsers).toBeCalledTimes(1);
      });

      test('then it should return an array of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called once', () => {
      let createUserDto: CreateUserDto = {
        email: userStub().email,
        age: userStub().age,
      };
      let user: User;

      beforeEach(async () => {
        user = await usersService.createUser(createUserDto);
      });

      test('then it should be called', () => {
        expect(usersService.createUser).toBeCalledWith(createUserDto);
        expect(usersService.createUser).toHaveBeenCalledTimes(1);
      });

      test('then it should return a user object', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          age: 10,
          favoriteFoods: ['bread'],
        };
        user = await usersService.updateUser(userStub().userId, updateUserDto);
      });

      test('then it should call updateUser once', () => {
        expect(usersService.updateUser).toBeCalledTimes(1);
        expect(usersService.updateUser).toBeCalledWith(
          userStub().userId,
          updateUserDto,
        );
        expect(user).toEqual(userStub());
      });
    });
  });
});
