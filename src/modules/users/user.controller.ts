import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase, ProfileUserUseCase } from './useCases';
import { AuthGuard } from '@/modules/auth/guards';
import { CreateUserSchemaDTO, CreateUserResponseDTO } from './schemas';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUsecase: ProfileUserUseCase,
  ) { }

  @Post()
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(data);

    return CreateUserResponseDTO.parse(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return this.profileUserUsecase.execute(req.user.sub);
  }
}
