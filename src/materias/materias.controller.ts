import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller()
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @MessagePattern({ cmd: 'create_materia' })
  create(@Payload() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @MessagePattern({ cmd: 'find_one_materia' })
  findOne(@Payload() id: string) {
    return this.materiasService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_materia' })
  update(@Payload() updateMateriaDto: UpdateMateriaDto) {
    return this.materiasService.update(updateMateriaDto.id, updateMateriaDto);
  }

  @MessagePattern({ cmd: 'delete_materia' })
  remove(@Payload() id: string) {
    return this.materiasService.remove(id);
  }

  //SERVCICIO PARA INSCRIPCIONES
  @MessagePattern({ cmd: 'find_all_materias' })
  findAll(@Payload() grupoMateriaId: string[]) {
    return this.materiasService.findAll(grupoMateriaId);
  }
}
