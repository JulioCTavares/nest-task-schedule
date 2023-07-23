import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateUserDTO } from '@/modules/users/dtos';
import { CreateUserUseCase } from '../create-user.usecase';
import { IUserRepository } from '@/modules/users/repositories';
import { faker } from '@faker-js/faker';
import { UserInMemoryRepository } from '../../repositories/in-memory';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
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
    const savedUser = await userRepository.save(data);
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
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Simular findByEmail retornando um usuário, indicando que o email já existe
    const savedUser = await userRepository.save(data);
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(savedUser);

    userRepository.save = jest.fn();

    await expect(createUserUseCase.execute(data)).rejects.toThrow(
      BadRequestException,
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(data.email);
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
