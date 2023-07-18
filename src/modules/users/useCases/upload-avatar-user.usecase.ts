import { IStorage } from '@/infra/providers/storage';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories';
import { AvatarDTO } from '../dtos';
import { extname } from 'path';

@Injectable()
export class UploadAvatarUserUseCase {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) { }

  async execute(data: AvatarDTO) {
    const extFile = extname(data.file.filename);

    const transformName = `${data.userId}${extFile}`;

    // transform fileName
    data.file.filename = transformName;
    const file = await this.storage.upload(
      {
        ...data,
        filename: data.file.filename,
        buffer: await data.file.toBuffer(),
      },
      'avatars',
    );

    const pathAvatarUser = `avatars/${data.file.filename}`;

    await this.userRepository.updateAvatar(data.userId, pathAvatarUser);

    return file;
  }
}
