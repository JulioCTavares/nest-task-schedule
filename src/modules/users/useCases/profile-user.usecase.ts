import { Injectable } from '@nestjs/common';
import { CreatedUserDTO } from '../dtos';
import { IUserRepository } from '../repositories';

@Injectable()
export class ProfileUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(id: string): Promise<CreatedUserDTO | null> {
    return this.userRepository.findById(id);
  }
}
