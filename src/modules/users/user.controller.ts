import { CreateUserDTO } from './dtos';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserUseCase } from './useCases';
import { CreateUserValidationPipe } from './pipe';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return this.createUserUseCase.execute(data);
  }
}
