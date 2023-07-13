import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/users';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/auth';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
