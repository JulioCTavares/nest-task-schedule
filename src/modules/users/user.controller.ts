import { CreateUserDTO } from './dtos';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase, ProfileUserUseCase } from './useCases';
import { CreateUserValidationPipe } from './pipe';
import { AuthGuard } from '@/modules/auth/guards';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUsecase: ProfileUserUseCase,
  ) { }

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return this.createUserUseCase.execute(data);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return this.profileUserUsecase.execute(req.user.sub);
  }
}
