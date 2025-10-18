import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Carrera } from '@prisma/client';

@Injectable()
export class CarrerasService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCarreraDto: CreateCarreraDto): Promise<Carrera> {
    const createdCarrera = await this.prismaService.carrera.create({
      data: createCarreraDto,
    });
    if (!createdCarrera)
      throw new NotAcceptableException('Error al crear carrera');
    return createdCarrera;
  }

  async findAll(): Promise<Carrera[]> {
    const carreras = await this.prismaService.carrera.findMany();
    if (!carreras) throw new NotFoundException('No se encontraron carreras');
    return carreras;
  }

  async findOne(id: string): Promise<Carrera> {
    const carrera = await this.prismaService.carrera.findUnique({
      where: { id, isActive: true },
    });
    if (!carrera) throw new NotFoundException('No se encontró la carrera');
    return carrera;
  }

  async update(
    id: string,
    updateCarreraDto: UpdateCarreraDto,
  ): Promise<Carrera> {
    const updatedCarrera = await this.prismaService.carrera.update({
      where: { id },
      data: updateCarreraDto,
    });
    if (!updatedCarrera)
      throw new NotAcceptableException('Error al actualizar carrera');
    return updatedCarrera;
  }

  async remove(id: string): Promise<Carrera> {
    Logger.log(`Eliminando carrera con id: ${id}`);
    const deletedCarrera = await this.prismaService.carrera.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
    if (!deletedCarrera)
      throw new NotAcceptableException('Error al eliminar carrera');
    return deletedCarrera;
  }
}
