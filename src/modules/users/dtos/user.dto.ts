export type CreateUserDTO = {
  id?: string;
  username: string;
  email: string;
  password: string;
};

export type CreatedUserDTO = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} & CreateUserDTO;

export type FileDTO = {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type AvatarDTO = {
  userId: string;
  file: FileDTO;
};
