import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInUseCase } from './useCases';
import { SignInDTO } from './dtos';

@Controller('/auth')
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) { }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() data: SignInDTO) {
    const signIn = await this.signInUseCase.execute(data);

    return signIn;
  }
}
