import { Carrera } from '@prisma/client';

export type CreateCarreraDto = Omit<
  Carrera,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;
