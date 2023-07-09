import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './useCases';
import { PrismaService } from '@/infra/prisma';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase, PrismaService],
})
export class UserModule { }
