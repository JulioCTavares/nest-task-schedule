import { Injectable } from '@nestjs/common';
import { CreateTaskUserRequestDTO } from '../dtos';
import { ITaskUserRepository } from '../repositories';

@Injectable()
export class CreateTaskUserUseCase {
  constructor(private taskuserRepository: ITaskUserRepository) { }

  async execute(data: CreateTaskUserRequestDTO) {
    return this.taskuserRepository.save(data);
  }
}
