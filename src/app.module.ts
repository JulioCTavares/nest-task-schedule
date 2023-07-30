import { Module } from '@nestjs/common';
import { UserModule } from '@/src/modules/users';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/src/modules/auth';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from '@/src/modules/tasks';
import { NotificationModule } from '@/src/modules/notifications';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TaskUserModule,
    NotificationModule,
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
