import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OfertasGrupoMateriaService } from './ofertas-grupo-materia.service';
import { CreateOfertasGrupoMateriaDto } from './dto/create-ofertas-grupo-materia.dto';
import { UpdateOfertasGrupoMateriaDto } from './dto/update-ofertas-grupo-materia.dto';
import { BulkCreateOfgmDto } from './dto/bulk-create-ofgm.dto';

@Controller()
export class OfertasGrupoMateriaController {
  constructor(
    private readonly ofertasGrupoMateriaService: OfertasGrupoMateriaService,
  ) {}

  @MessagePattern({ cmd: 'create_oferta_grupo_materia' })
  create(
    @Payload() createOfertasGrupoMateriaDto: CreateOfertasGrupoMateriaDto,
  ) {
    return this.ofertasGrupoMateriaService.create(createOfertasGrupoMateriaDto);
  }

  @MessagePattern({ cmd: 'find_one_oferta_grupo_materia' })
  findOne(@Payload() id: string) {
    return this.ofertasGrupoMateriaService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_oferta_grupo_materia' })
  update(
    @Payload() updateOfertasGrupoMateriaDto: UpdateOfertasGrupoMateriaDto,
  ) {
    return this.ofertasGrupoMateriaService.update(
      updateOfertasGrupoMateriaDto.id,
      updateOfertasGrupoMateriaDto,
    );
  }

  @MessagePattern({ cmd: 'delete_oferta_grupo_materia' })
  remove(@Payload() id: string) {
    return this.ofertasGrupoMateriaService.remove(id);
  }

  //INSCRIPCIONES
  @MessagePattern({ cmd: 'find_all_ofertas_grupo_materia' })
  findAll(@Payload() ofertaId: string[]) {
    return this.ofertasGrupoMateriaService.findAll(ofertaId);
  }

  @MessagePattern({ cmd: 'find_all_by_maestro_id' })
  findByMaestroId(@Payload() maestroDeOfertaId: string) {
    return this.ofertasGrupoMateriaService.findByMaestroId(maestroDeOfertaId);
  }

  @MessagePattern({ cmd: 'marcar_inscritas' })
  marcarInscritas(@Payload() ofertaId: string[]) {
    return this.ofertasGrupoMateriaService.marcarInscritas(ofertaId);
  }

  //GENERAR BULK OFERTA GRUPO MATERIA
  @MessagePattern({ cmd: 'bulk-create-ofgm' })
  bulkCreate(@Payload() bulkCreateOfgmDto: BulkCreateOfgmDto) {
    return this.ofertasGrupoMateriaService.bulkCreate(bulkCreateOfgmDto);
  }
}
