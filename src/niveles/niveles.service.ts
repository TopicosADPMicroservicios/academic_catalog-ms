import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNiveleDto } from './dto/create-nivele.dto';
import { UpdateNiveleDto } from './dto/update-nivele.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Nivel } from '@prisma/client';

@Injectable()
export class NivelesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createNiveleDto: CreateNiveleDto): Promise<Nivel> {
    try {
      const createdNivel = await this.prismaService.nivel.create({
        data: createNiveleDto,
      });
      return createdNivel;
    } catch (error) {
      throw new NotAcceptableException('Error creating nivel: ' + error);
    }
  }

  async findAll(): Promise<Nivel[]> {
    const foundNiveles = await this.prismaService.nivel.findMany({
      where: { isActive: true },
    });
    if (!foundNiveles) throw new NotFoundException('No se encontraron niveles');
    return foundNiveles;
  }

  async findOne(id: string): Promise<Nivel> {
    const foundNivel = await this.prismaService.nivel.findUnique({
      where: { id, isActive: true },
    });
    if (!foundNivel) throw new NotFoundException('Nivel no encontrado');
    return foundNivel;
  }

  async update(id: string, updateNiveleDto: UpdateNiveleDto): Promise<Nivel> {
    const updatedNivel = await this.prismaService.nivel.update({
      where: { id },
      data: updateNiveleDto,
    });
    if (!updatedNivel)
      throw new NotFoundException('No se pudo actualizar el nivel');
    return updatedNivel;
  }

  async remove(id: string): Promise<Nivel> {
    const deletedNivel = await this.prismaService.nivel.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
    if (!deletedNivel)
      throw new NotFoundException('No se pudo eliminar el nivel');
    return deletedNivel;
  }
}
