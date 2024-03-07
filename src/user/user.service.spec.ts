import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    usersRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('mockHashedPassword');
      const reqData = {
        firstName: 'mock',
        lastName: 'mock',
        password: 'mock',
        confirmPassword: 'mock',
        email: 'mock@gmail.com',
        role: 'admin',
      };
      await userService.createUser(reqData);
      expect(usersRepository.create).toHaveBeenCalledWith({
        ...reqData,
        password: 'mockHashedPassword',
      });
      expect(usersRepository.save).toHaveBeenCalled();
    });
  });
});
