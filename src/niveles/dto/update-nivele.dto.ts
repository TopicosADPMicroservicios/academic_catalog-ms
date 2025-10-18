import { CreateNiveleDto } from './create-nivele.dto';

export type UpdateNiveleDto = Partial<CreateNiveleDto> & { id: string };
