import { CreateMaestrosDeOfertaDto } from './create-maestros-de-oferta.dto';

export type UpdateMaestrosDeOfertaDto = Partial<CreateMaestrosDeOfertaDto> & {
  id: string;
};
