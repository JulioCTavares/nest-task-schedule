import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTaskUserUseCase } from './useCases';
import { AuthGuard } from '@/modules/auth/guards';
import { CreateTaskUserSchemaDTO } from './schemas';

@Controller('/tasks')
export class TaskUserController {
  constructor(private createTaskUserUseCase: CreateTaskUserUseCase) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateTaskUserSchemaDTO, @Request() req) {
    return await this.createTaskUserUseCase.execute({
      ...data,
      userId: req.user.sub,
    });
  }
}
