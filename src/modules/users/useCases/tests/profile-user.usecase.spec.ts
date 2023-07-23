import { Test } from '@nestjs/testing';
import { ProfileUserUseCase } from '../profile-user.usecase';
import { IUserRepository } from '../../repositories';
import { UserInMemoryRepository } from '../../repositories/in-memory';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

describe('ProfileUserUseCase', () => {
  let profileUserUseCase: ProfileUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProfileUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    profileUserUseCase = moduleRef.get<ProfileUserUseCase>(ProfileUserUseCase);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('deve retornar os detalhes do usuário corretos ao fornecer um ID válido', async () => {
    const userId = randomUUID();
    const userDTO = {
      id: userId,
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Configura o mock para retornar a promessa resolvida com o usuárioDTO
    const findByIdSpy = jest
      .spyOn(userRepository, 'findById')
      .mockResolvedValue(userDTO);

    // Executa o caso de uso para buscar o perfil do usuário
    const result = await profileUserUseCase.execute(userId);

    // Verifica se o UserRepository.findById foi chamado com o ID correto
    expect(findByIdSpy).toHaveBeenCalledWith(userId);

    // Verifica se o resultado retornado pelo caso de uso é o esperado
    expect(result).toEqual(userDTO);
  });

  it('deve retornar null ao fornecer um ID inexistente', async () => {
    const nonExistentUserId = 'non_existent_user_id';

    // Configura o mock para retornar null, indicando que o usuário não foi encontrado
    const findByIdSpy = jest
      .spyOn(userRepository, 'findById')
      .mockResolvedValue(null);

    // Executa o caso de uso para buscar o perfil do usuário com um ID inexistente
    const result = await profileUserUseCase.execute(nonExistentUserId);

    // Verifica se o UserRepository.findById foi chamado com o ID correto
    expect(findByIdSpy).toHaveBeenCalledWith(nonExistentUserId);

    // Verifica se o resultado retornado pelo caso de uso é null, indicando que o usuário não foi encontrado
    expect(result).toBeNull();
  });
});
