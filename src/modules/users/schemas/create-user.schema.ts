import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) { }

export const CreateUserResponseDTO = CreateUserSchema.omit({ password: true });

export type CreateUserResponseDTO = z.infer<typeof CreateUserResponseDTO>;
