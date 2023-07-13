import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignInUseCase } from './useCases';
import { PrismaService } from '@/infra/prisma';
import { JwtModule } from '@nestjs/jwt';
import { IUserRepository } from '../users/repositories';
import { UserPrismaRepository } from '../users/repositories/prisma';
import { jwtConstants } from './config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class AuthModule { }
