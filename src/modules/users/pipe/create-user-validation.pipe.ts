import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(value: CreateUserDTO, metadata: ArgumentMetadata) {
    if (!value.username || !value.password || !value.email) {
      throw new UnprocessableEntityException(
        'Invalid username or password or email was provided',
      );
    }

    return value;
  }
}
