import { Module } from '@nestjs/common';
import { OfertasGrupoMateriaService } from './ofertas-grupo-materia.service';
import { OfertasGrupoMateriaController } from './ofertas-grupo-materia.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [OfertasGrupoMateriaController],
  providers: [OfertasGrupoMateriaService],
  imports: [PrismaModule],
})
export class OfertasGrupoMateriaModule {}
