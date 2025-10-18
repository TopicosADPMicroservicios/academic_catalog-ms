import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { NivelesModule } from './niveles/niveles.module';
import { CarrerasModule } from './carreras/carreras.module';
import { PlanDeEstudiosModule } from './plan-de-estudios/plan-de-estudios.module';
import { MateriasModule } from './materias/materias.module';
import { PrerequisitosModule } from './prerequisitos/prerequisitos.module';

@Module({
  imports: [PrismaModule, NivelesModule, CarrerasModule, PlanDeEstudiosModule, MateriasModule, PrerequisitosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
