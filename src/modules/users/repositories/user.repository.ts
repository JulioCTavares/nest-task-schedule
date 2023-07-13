import { CreateUserDTO, CreatedUserDTO } from '../dtos';

export abstract class IUserRepository {
  abstract findByEmail(email: string): Promise<CreatedUserDTO | null>;
  abstract save(data: CreateUserDTO): Promise<CreatedUserDTO>;
  abstract findById(id: string): Promise<CreatedUserDTO | null>;
}
