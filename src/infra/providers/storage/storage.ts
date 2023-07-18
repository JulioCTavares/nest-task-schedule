import { FileDTO } from '@/modules/users/dtos';

export abstract class IStorage {
  abstract upload(file: FileDTO, folder: string): Promise<any>;
}
