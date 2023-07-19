import { randomUUID } from 'crypto';
import { CreatedUserDTO, CreateUserDTO } from '../../dtos';
import { IUserRepository } from '../user.repository';

export class UserInMemoryRepository implements IUserRepository {
  users: CreatedUserDTO[] = [];

  findByEmail(email: string): Promise<CreatedUserDTO | null> {
    throw new Error('Method not implemented.');
  }
  save(data: CreateUserDTO): Promise<CreatedUserDTO> {
    const user: CreatedUserDTO = {
      ...data,
      id: data.id ?? randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
  findById(id: string): Promise<CreatedUserDTO | null> {
    throw new Error('Method not implemented.');
  }
  updateAvatar(userId: string, path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
