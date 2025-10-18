import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Prerequisito } from '@prisma/client';

@Injectable()
export class PrerequisitosService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createPrerequisitoDto: CreatePrerequisitoDto,
  ): Promise<Prerequisito> {
    const createdPrerequisito = await this.prismaService.prerequisito.create({
      data: createPrerequisitoDto,
    });
    if (!createdPrerequisito)
      throw new NotAcceptableException('Error al crear prerequisito');
    return createdPrerequisito;
  }

  async findAll(): Promise<Prerequisito[]> {
    const foundPrerequisitos = await this.prismaService.prerequisito.findMany({
      where: { isActive: true },
    });
    if (!foundPrerequisitos)
      throw new NotFoundException('No se encontraron prerequisitos');
    return foundPrerequisitos;
  }

  async findOne(id: string): Promise<Prerequisito> {
    const foundPrerequisito = await this.prismaService.prerequisito.findUnique({
      where: { id },
    });
    if (!foundPrerequisito)
      throw new NotFoundException(`No se encontró el prerequisito`);
    return foundPrerequisito;
  }

  async update(
    id: string,
    updatePrerequisitoDto: UpdatePrerequisitoDto,
  ): Promise<Prerequisito> {
    const updatedPrerequisito = await this.prismaService.prerequisito.update({
      where: { id, isActive: true },
      data: updatePrerequisitoDto,
    });
    if (!updatedPrerequisito)
      throw new NotFoundException(`No se encontró el prerequisito`);
    return updatedPrerequisito;
  }

  async remove(id: string): Promise<Prerequisito> {
    const deletedPrerequisito = await this.prismaService.prerequisito.update({
      where: { id, isActive: true },
      data: { isActive: false },
    });
    if (!deletedPrerequisito)
      throw new NotFoundException(`No se encontró el prerequisito`);
    return deletedPrerequisito;
  }
}
