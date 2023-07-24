import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import {
  CreateUserUseCase,
  ProfileUserUseCase,
  UploadAvatarUserUseCase,
} from '../useCases';
import { CreateUserSchemaDTO } from '../schemas';
import { faker } from '@faker-js/faker';
import { JwtModule } from '@nestjs/jwt';
import { IUserRepository } from '../repositories';
import { IStorage } from '@/infra/providers/storage';
import { ConfigModule } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

describe('User Controller Tests', () => {
  let userController: UserController;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        ProfileUserUseCase,
        UploadAvatarUserUseCase,
        {
          provide: IStorage,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('should be able to create a new user', async () => {
    const body: CreateUserSchemaDTO = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(userRepository, 'save').mockResolvedValue({
      ...body,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await userController.create(body);

    expect(result).toHaveProperty('username');
  });
});
