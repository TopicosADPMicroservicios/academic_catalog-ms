import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NivelesService } from './niveles.service';
import { CreateNiveleDto } from './dto/create-nivele.dto';
import { UpdateNiveleDto } from './dto/update-nivele.dto';

@Controller()
export class NivelesController {
  constructor(private readonly nivelesService: NivelesService) {}

  @MessagePattern({ cmd: 'create_nivel' })
  create(@Payload() createNiveleDto: CreateNiveleDto) {
    return this.nivelesService.create(createNiveleDto);
  }

  @MessagePattern({ cmd: 'find_all_niveles' })
  findAll() {
    return this.nivelesService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_nivel' })
  findOne(@Payload() id: string) {
    return this.nivelesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_nivel' })
  update(@Payload() updateNiveleDto: UpdateNiveleDto) {
    return this.nivelesService.update(updateNiveleDto.id, updateNiveleDto);
  }

  @MessagePattern({ cmd: 'delete_nivel' })
  remove(@Payload() id: string) {
    return this.nivelesService.remove(id);
  }
}
