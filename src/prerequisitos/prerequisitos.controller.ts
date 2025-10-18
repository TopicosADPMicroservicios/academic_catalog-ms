import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrerequisitosService } from './prerequisitos.service';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';

@Controller()
export class PrerequisitosController {
  constructor(private readonly prerequisitosService: PrerequisitosService) {}

  @MessagePattern({ cmd: 'create_prerequisito' })
  create(@Payload() createPrerequisitoDto: CreatePrerequisitoDto) {
    return this.prerequisitosService.create(createPrerequisitoDto);
  }

  @MessagePattern({ cmd: 'find_all_prerequisitos' })
  findAll() {
    return this.prerequisitosService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_prerequisito' })
  findOne(@Payload() id: string) {
    return this.prerequisitosService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_prerequisito' })
  update(@Payload() updatePrerequisitoDto: UpdatePrerequisitoDto) {
    return this.prerequisitosService.update(
      updatePrerequisitoDto.id,
      updatePrerequisitoDto,
    );
  }

  @MessagePattern({ cmd: 'delete_prerequisito' })
  remove(@Payload() id: string) {
    return this.prerequisitosService.remove(id);
  }
}
