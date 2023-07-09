import { CreateUserDTO } from './dtos';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './useCases';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.createUserUseCase.execute(data);
  }
}
