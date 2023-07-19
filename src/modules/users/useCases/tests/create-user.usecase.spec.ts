import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateUserDTO } from '@/modules/users/dtos';
import { CreateUserUseCase } from '../create-user.usecase';
import { IUserRepository } from '@/modules/users/repositories';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('deve criar um usuário com sucesso', async () => {
    const data: CreateUserDTO = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Simular findByEmail retornando null, indicando que o email não existe
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    // Simular o save retornando o usuário salvo
    const savedUser = {
      ...data,
      id: randomUUID(),
      password: 'hashedPassword',
    };
    jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

    const user = await createUserUseCase.execute(data);

    expect(user).toEqual(savedUser);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(data.email);
    expect(userRepository.save).toHaveBeenCalledWith({
      ...data,
      id: expect.any(String),
      password: expect.any(String),
    });
  });

  it('deve lançar uma exceção BadRequest ao tentar criar um usuário com email existente', async () => {
    const data: CreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Simular findByEmail retornando um usuário, indicando que o email já existe
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: '123',
      email: data.email,
    });

    await expect(createUserUseCase.execute(data)).rejects.toThrow(
      BadRequestException,
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(data.email);
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
