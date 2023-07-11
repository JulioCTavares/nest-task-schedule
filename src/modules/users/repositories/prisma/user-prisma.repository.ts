import { PrismaService } from '@/infra/prisma';
import { CreateUserDTO, CreatedUserDTO } from '../../dtos';
import { IUserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string): Promise<CreatedUserDTO> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
  async save(data: CreateUserDTO): Promise<CreatedUserDTO> {
    const user = await this.prisma.user.create({ data });
    return user;
  }
}
