export type CreateTaskUserRequestDTO = {
  userId: string;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'ONGOING' | 'DONE';
};

export type CreateTaskUserResponseDTO = {
  id: string;
};
