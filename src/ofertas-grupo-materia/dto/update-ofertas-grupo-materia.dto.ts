import { CreateOfertasGrupoMateriaDto } from './create-ofertas-grupo-materia.dto';
export type UpdateOfertasGrupoMateriaDto =
  Partial<CreateOfertasGrupoMateriaDto> & {
    id: string;
  };
