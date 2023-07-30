import { Module } from '@nestjs/common';
import { TaskUserController } from './task-user.controller';
import { CreateTaskUserUseCase } from './useCases';
import { PrismaService } from '@/src/infra/prisma';
import { ITaskUserRepository } from './repositories';
import { TaskUserPrismaRepository } from './repositories/prisma';

@Module({
  controllers: [TaskUserController],
  providers: [
    CreateTaskUserUseCase,
    PrismaService,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
})
export class TaskUserModule { }
