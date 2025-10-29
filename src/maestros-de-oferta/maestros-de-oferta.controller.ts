import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MaestrosDeOfertaService } from './maestros-de-oferta.service';
import { CreateMaestrosDeOfertaDto } from './dto/create-maestros-de-oferta.dto';
import { UpdateMaestrosDeOfertaDto } from './dto/update-maestros-de-oferta.dto';

@Controller()
export class MaestrosDeOfertaController {
  constructor(
    private readonly maestrosDeOfertaService: MaestrosDeOfertaService,
  ) {}

  @MessagePattern({ cmd: 'create_maestro_de_oferta' })
  create(@Payload() createMaestrosDeOfertaDto: CreateMaestrosDeOfertaDto) {
    return this.maestrosDeOfertaService.create(createMaestrosDeOfertaDto);
  }

  @MessagePattern({ cmd: 'find_all_maestros_de_oferta' })
  findAll() {
    return this.maestrosDeOfertaService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_maestro_de_oferta' })
  findOne(@Payload() id: string) {
    return this.maestrosDeOfertaService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_maestro_de_oferta' })
  update(@Payload() updateMaestrosDeOfertaDto: UpdateMaestrosDeOfertaDto) {
    return this.maestrosDeOfertaService.update(
      updateMaestrosDeOfertaDto.id,
      updateMaestrosDeOfertaDto,
    );
  }

  @MessagePattern({ cmd: 'delete_maestro_de_oferta' })
  remove(@Payload() id: string) {
    return this.maestrosDeOfertaService.remove(id);
  }

  //PARA EL LOGIN
  @MessagePattern({ cmd: 'find_by_student_id' })
  async getMaestroDeOfertaByStudentId(@Payload() studentId: string) {
    return this.maestrosDeOfertaService.findByEstudianteId(studentId);
  }

  @MessagePattern({ cmd: 'generar_oferta_estudiante_id' })
  async getMaestroGenerarOferta(@Payload() studentId: string) {
    return this.maestrosDeOfertaService.findByEstudianteGenerarOferta(
      studentId,
    );
  }
}
