import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PlanDeEstudiosService } from './plan-de-estudios.service';
import { CreatePlanDeEstudioDto } from './dto/create-plan-de-estudio.dto';
import { UpdatePlanDeEstudioDto } from './dto/update-plan-de-estudio.dto';

@Controller()
export class PlanDeEstudiosController {
  constructor(private readonly planDeEstudiosService: PlanDeEstudiosService) {}

  @MessagePattern({ cmd: 'create_plan_de_estudio' })
  create(@Payload() createPlanDeEstudioDto: CreatePlanDeEstudioDto) {
    return this.planDeEstudiosService.create(createPlanDeEstudioDto);
  }

  @MessagePattern({ cmd: 'find_all_plan_de_estudios' })
  findAll() {
    return this.planDeEstudiosService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_plan_de_estudio' })
  findOne(@Payload() id: string) {
    return this.planDeEstudiosService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_plan_de_estudio' })
  update(@Payload() updatePlanDeEstudioDto: UpdatePlanDeEstudioDto) {
    return this.planDeEstudiosService.update(
      updatePlanDeEstudioDto.id,
      updatePlanDeEstudioDto,
    );
  }

  @MessagePattern({ cmd: 'delete_plan_de_estudio' })
  remove(@Payload() id: string) {
    return this.planDeEstudiosService.remove(id);
  }
}
