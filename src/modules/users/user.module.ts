import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {
  CreateUserUseCase,
  ProfileUserUseCase,
  UploadAvatarUserUseCase,
} from './useCases';
import { PrismaService } from '@/infra/prisma';
import { IUserRepository } from './repositories';
import { UserPrismaRepository } from './repositories/prisma';
import { IStorage, SupabaseStorage } from '@/infra/providers/storage';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    ProfileUserUseCase,
    UploadAvatarUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
})
export class UserModule { }
