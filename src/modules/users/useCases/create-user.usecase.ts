import { CreateUserDTO } from '@/src/modules/users/dtos';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IUserRepository } from '@/src/modules/users/repositories';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRespository: IUserRepository) { }

  async execute(data: CreateUserDTO) {
    const emailAlreadyExists = await this.userRespository.findByEmail(
      data.email,
    );

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const password = await hash(data.password, 10);
    const id = randomUUID();

    const user = await this.userRespository.save({
      ...data,
      id,
      password,
    });

    return user;
  }
}
