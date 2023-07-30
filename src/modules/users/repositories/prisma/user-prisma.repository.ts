import { PrismaService } from '@/src/infra/prisma';
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

  async findById(id: string): Promise<CreatedUserDTO> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateAvatar(userId: string, path: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatarUrl: path,
      },
    });
  }
}
