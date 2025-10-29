import {
  Inject,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfertasGrupoMateriaDto } from './dto/create-ofertas-grupo-materia.dto';
import { UpdateOfertasGrupoMateriaDto } from './dto/update-ofertas-grupo-materia.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { OfertaGrupoMateria } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { first, firstValueFrom } from 'rxjs';

@Injectable()
export class OfertasGrupoMateriaService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('ACADEMIC_MANAGEMENT_SERVICE')
    private readonly academicManagementClient: ClientProxy,
  ) {}
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

  async findByMaestroId(maestroDeOfertaId: string) {
    Logger.log(
      `Buscando ofertas grupo materia para el maestroDeOfertaId: ${maestroDeOfertaId}`,
    );
    const foundOfertasGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.findMany({
        where: {
          isActive: true,
          maestroDeOfertaId: maestroDeOfertaId,
          estaInscrita: false,
        },
        select: {
          id: true,
          grupoMateriaId: true,
        },
      });

    Logger.log(
      `Buscando detalles de grupo materia para las ofertas: ${foundOfertasGrupoMateria.map(
        (oferta) => oferta.id,
      )}`,
    );
    const getDetalleGrupoMateria = await firstValueFrom(
      this.academicManagementClient.send(
        { cmd: 'get_detalle' },
        foundOfertasGrupoMateria.map((oferta) => oferta.grupoMateriaId),
      ),
    );

    foundOfertasGrupoMateria.forEach((oferta) => {
      const detalle = getDetalleGrupoMateria.find(
        (detalle: any) => detalle.id === oferta.grupoMateriaId,
      );
      (oferta as any)['detalleGrupoMateria'] = detalle;
    });

    if (!foundOfertasGrupoMateria)
      throw new NotFoundException(
        'No se encontraron ofertas grupo materia para la boleta proporcionada',
      );
    return foundOfertasGrupoMateria;
  }

  async marcarInscritas(ofertaId: string[]) {
    //OBTENEMOS PRIMEROS LOS GRUPO MATERIA IDS DE LAS OFERTAS
    const getGrupoMateriaIdxOferta =
      await this.prismaService.ofertaGrupoMateria.findMany({
        where: { id: { in: ofertaId }, isActive: true },
        select: { grupoMateriaId: true, maestroDeOfertaId: true },
      });

    //LUEGO VAMOS A BUSCAR LOS ID DE LAS MATERIAS DE ESOS GRUPOS MATERIA Y NOS RETORNA LOS IDS DE LOS OTROS GRUPOS MATERIA QUE COMPARTEN ESA MATERIA
    const getGruposMateriaIds = await firstValueFrom(
      this.academicManagementClient.send(
        { cmd: 'get_materia_ids' },
        getGrupoMateriaIdxOferta.map((ogm) => ogm.grupoMateriaId),
      ),
    );

    //ACTUALIZAMOS LAS OFERTAS GRUPO MATERIA QUE COMPARTEN ESAS MATERIAS Y MAESTRO DE OFERTA
    const updatedOfertaGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.updateMany({
        where: {
          grupoMateriaId: { in: getGruposMateriaIds.map((gm: any) => gm.id) },
          isActive: true,
          maestroDeOfertaId: getGrupoMateriaIdxOferta[0].maestroDeOfertaId,
        },
        data: { estaInscrita: true },
      });
    if (updatedOfertaGrupoMateria.count === 0)
      throw new NotFoundException(
        'No se pudieron marcar las ofertas grupo materia como inscritas',
      );

    return updatedOfertaGrupoMateria;
  }

  //BULK CREATE PARA OFERTA GRUPO MATERIA
  async bulkCreate(payload: {
    grupoMateriaId: string[];
    maestroDeOfertaId: string;
  }) {
    Logger.log(payload);
    Logger.log(payload.maestroDeOfertaId);
    const grupoMateriaIds = Array.from(new Set(payload.grupoMateriaId || []));
    Logger.log(grupoMateriaIds);

    if (grupoMateriaIds.length === 0)
      throw new NotAcceptableException('No se proporcionaron grupoMateriaId');

    const createData = grupoMateriaIds.map((gm) => ({
      grupoMateriaId: gm,
      maestroDeOfertaId: payload.maestroDeOfertaId,
    }));

    // Use createMany with skipDuplicates to avoid unique constraint errors
    await this.prismaService.ofertaGrupoMateria.createMany({
      data: createData,
      skipDuplicates: true,
    });

    const foundOfertaGrupoMateria =
      await this.prismaService.ofertaGrupoMateria.findMany({
        where: {
          grupoMateriaId: { in: grupoMateriaIds },
          maestroDeOfertaId: payload.maestroDeOfertaId,
        },
      });

    Logger.log(foundOfertaGrupoMateria);

    return foundOfertaGrupoMateria;
  }
}
