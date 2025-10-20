import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfertasGrupoMateriaDto } from './dto/create-ofertas-grupo-materia.dto';
import { UpdateOfertasGrupoMateriaDto } from './dto/update-ofertas-grupo-materia.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { OfertaGrupoMateria } from '@prisma/client';

@Injectable()
export class OfertasGrupoMateriaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createOfertasGrupoMateriaDto: CreateOfertasGrupoMateriaDto,
  ): Promise<OfertaGrupoMateria> {
    const createdOfertaGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.create({
        data: createOfertasGrupoMateriaDto,
      });

    if (!createdOfertaGrupoMateria)
      throw new NotAcceptableException(
        'No se pudo crear la oferta grupo materia',
      );
    return createdOfertaGrupoMateria;
  }

  async findOne(id: string): Promise<OfertaGrupoMateria> {
    const foundOfertaGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.findUnique({
        where: { id, isActive: true },
      });
    if (!foundOfertaGrupoMateria)
      throw new NotFoundException(`No se encontró la oferta grupo materia`);
    return foundOfertaGrupoMateria;
  }

  async update(
    id: string,
    updateOfertasGrupoMateriaDto: UpdateOfertasGrupoMateriaDto,
  ): Promise<OfertaGrupoMateria> {
    const updatedOfertaGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.update({
        where: { id, isActive: true },
        data: updateOfertasGrupoMateriaDto,
      });
    if (!updatedOfertaGrupoMateria)
      throw new NotFoundException(
        `No se pudo actualizar la oferta grupo materia`,
      );
    return updatedOfertaGrupoMateria;
  }

  async remove(id: string): Promise<OfertaGrupoMateria> {
    const deletedOfertaGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.update({
        where: { id, isActive: true },
        data: { isActive: false },
      });
    if (!deletedOfertaGrupoMateria)
      throw new NotFoundException(
        `No se pudo eliminar la oferta grupo materia`,
      );
    return deletedOfertaGrupoMateria;
  }

  //PARA EL SERVICIO COMPLETO DE INSCRIPCIONES
  async findAll(ofertaId: string[]): Promise<OfertaGrupoMateria[]> {
    const foundOfertasGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.findMany({
        where: { isActive: true, id: { in: ofertaId } },
      });
    if (!foundOfertasGrupoMateria)
      throw new NotFoundException('No se encontraron ofertas grupo materia');
    return foundOfertasGrupoMateria;
  }

  async findByMaestroId(
    maestroDeOfertaId: string,
  ): Promise<OfertaGrupoMateria[]> {
    const foundOfertasGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.findMany({
        where: {
          isActive: true,
          maestroDeOfertaId: maestroDeOfertaId,
        },
      });
    if (!foundOfertasGrupoMateria)
      throw new NotFoundException(
        'No se encontraron ofertas grupo materia para la boleta proporcionada',
      );
    return foundOfertasGrupoMateria;
  }

  async marcarInscritas(ofertaId: string[]): Promise<OfertaGrupoMateria[]> {
    const updatedOfertaGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.updateMany({
        where: { id: { in: ofertaId }, isActive: true },
        data: { estaInscrita: true },
      });
    if (updatedOfertaGrupoMateria.count === 0)
      throw new NotFoundException(
        'No se pudieron marcar las ofertas grupo materia como inscritas',
      );

    const ofertasMarcadas =
      await this.prismaService.ofertaGrupoMateria.findMany({
        where: { id: { in: ofertaId }, isActive: true },
      });

    return ofertasMarcadas;
  }
}
