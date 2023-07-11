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
