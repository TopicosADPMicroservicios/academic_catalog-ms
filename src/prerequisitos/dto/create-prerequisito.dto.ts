import { Prerequisito } from '@prisma/client';
export type CreatePrerequisitoDto = Omit<
  Prerequisito,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;
