import { CreateTaskUserRequestDTO, CreateTaskUserResponseDTO } from '../dtos';

export abstract class ITaskUserRepository {
  abstract save(
    data: CreateTaskUserRequestDTO,
  ): Promise<CreateTaskUserResponseDTO>;
}
