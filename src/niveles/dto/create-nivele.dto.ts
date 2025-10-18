import { Nivel } from '@prisma/client';
export type CreateNiveleDto = Omit<
  Nivel,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;
