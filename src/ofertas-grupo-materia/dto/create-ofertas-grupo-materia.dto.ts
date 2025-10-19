import { OfertaGrupoMateria } from '@prisma/client';
export type CreateOfertasGrupoMateriaDto = Omit<
  OfertaGrupoMateria,
  'id' | 'isActive' | 'createdAt' | 'updatedAt'
>;
