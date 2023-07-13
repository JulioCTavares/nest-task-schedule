import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase, ProfileUserUseCase } from './useCases';
import { PrismaService } from '@/infra/prisma';
import { IUserRepository } from './repositories';
import { UserPrismaRepository } from './repositories/prisma';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    ProfileUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule { }
