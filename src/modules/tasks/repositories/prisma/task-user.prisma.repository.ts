import { PrismaService } from '@/infra/prisma';
import {
  CreateTaskUserRequestDTO,
  CreateTaskUserResponseDTO,
} from '../../dtos';
import { ITaskUserRepository } from '../task-user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository {
  constructor(private prisma: PrismaService) { }

  async save(
    data: CreateTaskUserRequestDTO,
  ): Promise<CreateTaskUserResponseDTO> {
    return this.prisma.taskUsers.create({
      data: {
        task: {
          create: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            endAt: data.endAt,
            startAt: data.startAt,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
        createdAt: new Date(),
      },
    });
  }
}
