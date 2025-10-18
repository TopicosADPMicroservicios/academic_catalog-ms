import { CreatePlanDeEstudioDto } from './create-plan-de-estudio.dto';
export type UpdatePlanDeEstudioDto = Partial<CreatePlanDeEstudioDto> & {
  id: string;
};
