import { MaestroDeOferta } from '@prisma/client';
export type CreateMaestrosDeOfertaDto = Omit<
  MaestroDeOferta,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;
