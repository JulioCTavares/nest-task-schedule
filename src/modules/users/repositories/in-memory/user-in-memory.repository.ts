import { randomUUID } from 'crypto';
import { CreatedUserDTO, CreateUserDTO } from '../../dtos';
import { IUserRepository } from '../user.repository';

export class UserInMemoryRepository implements IUserRepository {
  users: CreatedUserDTO[] = [];

  async findByEmail(email: string): Promise<CreatedUserDTO | null> {
    const user = this.users.find(user => user.email === email);

    return user ?? null;
  }
  async save(data: CreateUserDTO): Promise<CreatedUserDTO> {
    const user: CreatedUserDTO = {
      ...data,
      id: data.id ?? randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
  async findById(id: string): Promise<CreatedUserDTO | null> {
    const user = this.users.find(user => user.id === id);

    return user ?? null;
  }
  updateAvatar(userId: string, path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
