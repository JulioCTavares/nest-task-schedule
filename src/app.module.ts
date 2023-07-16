import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/users';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/auth';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from '@/modules/tasks';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TaskUserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule { }
