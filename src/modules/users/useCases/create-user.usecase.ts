import { PrismaService } from '@/infra/prisma/prisma.service';
import { CreateUserDTO } from '@/modules/users/dtos';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(private prisma: PrismaService) { }

  async execute(data: CreateUserDTO) {
    const emailAlreadyExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        ...data,
      },
    });

    return user;
  }
}
