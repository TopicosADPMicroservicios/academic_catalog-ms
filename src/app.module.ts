import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { NivelesModule } from './niveles/niveles.module';
import { CarrerasModule } from './carreras/carreras.module';
import { PlanDeEstudiosModule } from './plan-de-estudios/plan-de-estudios.module';
import { MateriasModule } from './materias/materias.module';
import { PrerequisitosModule } from './prerequisitos/prerequisitos.module';
import { MaestrosDeOfertaModule } from './maestros-de-oferta/maestros-de-oferta.module';
import { OfertasGrupoMateriaModule } from './ofertas-grupo-materia/ofertas-grupo-materia.module';

@Module({
  imports: [PrismaModule, NivelesModule, CarrerasModule, PlanDeEstudiosModule, MateriasModule, PrerequisitosModule, MaestrosDeOfertaModule, OfertasGrupoMateriaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
