import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserUseCase,
  ProfileUserUseCase,
  UploadAvatarUserUseCase,
} from './useCases';
import { AuthGuard } from '@/modules/auth/guards';
import { CreateUserSchemaDTO, CreateUserResponseDTO } from './schemas';
import { FileDTO } from './dtos';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUsecase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
  ) { }

  @Post()
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(data);

    return CreateUserResponseDTO.parse(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    const user = await this.profileUserUsecase.execute(req.user.sub);
    return user;
  }

  @Patch('/avatar')
  // @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
    const fileTest = await req.file();

    const result = await this.uploadAvatarUserUseCase.execute({
      file: fileTest,
      userId: req.user.sub,
    });

    return result;
  }
}
