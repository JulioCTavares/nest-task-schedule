import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/users';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
