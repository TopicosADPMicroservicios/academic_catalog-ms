import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Controller()
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @MessagePattern({ cmd: 'create_carrera' })
  create(@Payload() createCarreraDto: CreateCarreraDto) {
    return this.carrerasService.create(createCarreraDto);
  }

  @MessagePattern({ cmd: 'find_all_carreras' })
  findAll() {
    return this.carrerasService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_carrera' })
  findOne(@Payload() id: string) {
    return this.carrerasService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_carrera' })
  update(@Payload() updateCarreraDto: UpdateCarreraDto) {
    return this.carrerasService.update(updateCarreraDto.id, updateCarreraDto);
  }

  @MessagePattern({ cmd: 'delete_carrera' })
  remove(@Payload() id: string) {
    return this.carrerasService.remove(id);
  }
}
