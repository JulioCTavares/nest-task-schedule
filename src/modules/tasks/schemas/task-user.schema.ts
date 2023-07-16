import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTaskUserSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  status: z.enum(['PENDING', 'ONGOING', 'DONE']),
  startAt: z.string().transform(item => new Date(item)),
  endAt: z.string().transform(item => new Date(item)),
});

export class CreateTaskUserSchemaDTO extends createZodDto(
  CreateTaskUserSchema,
) { }
