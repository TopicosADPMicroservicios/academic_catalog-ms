import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlanDeEstudioDto } from './dto/create-plan-de-estudio.dto';
import { UpdatePlanDeEstudioDto } from './dto/update-plan-de-estudio.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PlanDeEstudio } from '@prisma/client';

@Injectable()
export class PlanDeEstudiosService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createPlanDeEstudioDto: CreatePlanDeEstudioDto,
  ): Promise<PlanDeEstudio> {
    const createdPlanDeEstudio = await this.prismaService.planDeEstudio.create({
      data: createPlanDeEstudioDto,
    });
    if (!createdPlanDeEstudio)
      throw new NotAcceptableException('Error al crear plan de estudio');
    return createdPlanDeEstudio;
  }

  async findAll(): Promise<PlanDeEstudio[]> {
    const foundPlanDeEstudios = await this.prismaService.planDeEstudio.findMany(
      {
        where: { isActive: true },
      },
    );
    if (!foundPlanDeEstudios)
      throw new NotFoundException('No se encontraron planes de estudio');
    return foundPlanDeEstudios;
  }

  async findOne(id: string): Promise<PlanDeEstudio> {
    const foundPlanDeEstudio =
      await this.prismaService.planDeEstudio.findUnique({
        where: { id, isActive: true },
      });
    if (!foundPlanDeEstudio)
      throw new NotFoundException('No se encontró el plan de estudio');
    return foundPlanDeEstudio;
  }

  async update(
    id: string,
    updatePlanDeEstudioDto: UpdatePlanDeEstudioDto,
  ): Promise<PlanDeEstudio> {
    const updatedPlanDeEstudio = await this.prismaService.planDeEstudio.update({
      where: { id, isActive: true },
      data: updatePlanDeEstudioDto,
    });
    if (!updatedPlanDeEstudio)
      throw new NotAcceptableException(
        'Error al actualizar el plan de estudio',
      );
    return updatedPlanDeEstudio;
  }

  async remove(id: string): Promise<PlanDeEstudio> {
    const deletedPlanDeEstudio = await this.prismaService.planDeEstudio.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
    if (!deletedPlanDeEstudio)
      throw new NotAcceptableException('Error al eliminar el plan de estudio');
    return deletedPlanDeEstudio;
  }
}
