import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Materia } from '@prisma/client';

@Injectable()
export class MateriasService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    const createdMateria = await this.prismaService.materia.create({
      data: createMateriaDto,
    });
    if (!createdMateria)
      throw new NotAcceptableException('Error al crear materia');
    return createdMateria;
  }

  async findOne(id: string): Promise<Materia> {
    const materia = await this.prismaService.materia.findUnique({
      where: { id, isActive: true },
    });
    if (!materia) throw new NotFoundException('No se encontró la materia');
    return materia;
  }

  async update(
    id: string,
    updateMateriaDto: UpdateMateriaDto,
  ): Promise<Materia> {
    const updatedMateria = await this.prismaService.materia.update({
      where: { id, isActive: true },
      data: updateMateriaDto,
    });
    if (!updatedMateria)
      throw new NotFoundException('No se encontró la materia');
    return updatedMateria;
  }

  async remove(id: string): Promise<Materia> {
    const deletedMateria = await this.prismaService.materia.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
    if (!deletedMateria)
      throw new NotFoundException('No se encontró la materia');
    return deletedMateria;
  }

  //PARA EL SERVICIO DE INSCRIPCIONES
  async findAll(grupoMateriaId: string[]): Promise<Materia[]> {
    const foundMaterias = await this.prismaService.materia.findMany({
      where: { isActive: true, id: { in: grupoMateriaId } },
      include: {
        nivel: {
          select: {
            semestre: true,
          },
        },
      },
    });
    if (!foundMaterias)
      throw new NotFoundException('No se encontraron materias');
    return foundMaterias;
  }
}
