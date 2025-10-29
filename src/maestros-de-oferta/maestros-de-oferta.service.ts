import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaestrosDeOfertaDto } from './dto/create-maestros-de-oferta.dto';
import { UpdateMaestrosDeOfertaDto } from './dto/update-maestros-de-oferta.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { MaestroDeOferta } from '@prisma/client';

@Injectable()
export class MaestrosDeOfertaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createMaestrosDeOfertaDto: CreateMaestrosDeOfertaDto,
  ): Promise<MaestroDeOferta> {
    const createdMaestroDeOferta =
      await this.prismaService.maestroDeOferta.create({
        data: createMaestrosDeOfertaDto,
      });
    if (!createdMaestroDeOferta)
      throw new NotAcceptableException('No se pudo crear el maestro de oferta');
    return createdMaestroDeOferta;
  }

  async findAll(): Promise<MaestroDeOferta[]> {
    const foundMaestrosDeOferta =
      await this.prismaService.maestroDeOferta.findMany({
        where: { isActive: true },
      });
    if (!foundMaestrosDeOferta)
      throw new NotFoundException('No se encontraron maestros de oferta');
    return foundMaestrosDeOferta;
  }

  async findOne(id: string): Promise<MaestroDeOferta> {
    const foundMaestroDeOferta =
      await this.prismaService.maestroDeOferta.findUnique({
        where: { id, isActive: true },
      });
    if (!foundMaestroDeOferta)
      throw new NotFoundException('No se encontró el maestro de oferta');
    return foundMaestroDeOferta;
  }

  async update(
    id: string,
    updateMaestrosDeOfertaDto: UpdateMaestrosDeOfertaDto,
  ): Promise<MaestroDeOferta> {
    const updatedMaestroDeOferta =
      await this.prismaService.maestroDeOferta.update({
        where: { id, isActive: true },
        data: updateMaestrosDeOfertaDto,
      });
    if (!updatedMaestroDeOferta)
      throw new NotFoundException('No se pudo actualizar el maestro de oferta');
    return updatedMaestroDeOferta;
  }

  async remove(id: string): Promise<MaestroDeOferta> {
    const deletedMaestroDeOferta =
      await this.prismaService.maestroDeOferta.update({
        where: { id, isActive: true },
        data: { isActive: false },
      });
    if (!deletedMaestroDeOferta)
      throw new NotFoundException('No se pudo eliminar el maestro de oferta');
    return deletedMaestroDeOferta;
  }

  //PARA EL LOGIN
  async findByEstudianteId(estudianteId: string): Promise<MaestroDeOferta[]> {
    Logger.log(
      `Buscando maestro de oferta para el estudiante con ID: ${estudianteId}`,
    );
    const foundMaestroDeOferta =
      await this.prismaService.maestroDeOferta.findMany({
        where: { estudianteId: estudianteId, isActive: true },
      });
    if (!foundMaestroDeOferta)
      throw new NotFoundException(
        'No se encontró el maestro de oferta para el estudiante',
      );
    return foundMaestroDeOferta;
  }

  //PARA GENERAR OFERTA
  async findByEstudianteGenerarOferta(
    estudianteId: string,
  ): Promise<MaestroDeOferta> {
    Logger.log(
      `Buscando maestro de oferta para el estudiante con ID: ${estudianteId}`,
    );
    const foundMaestroDeOferta =
      await this.prismaService.maestroDeOferta.findFirst({
        where: { estudianteId: estudianteId, isActive: true },
      });
    if (!foundMaestroDeOferta)
      throw new NotFoundException(
        'No se encontró el maestro de oferta para el estudiante',
      );
    return foundMaestroDeOferta;
  }
}
