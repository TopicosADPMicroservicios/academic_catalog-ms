import { Module } from '@nestjs/common';
import { PlanDeEstudiosService } from './plan-de-estudios.service';
import { PlanDeEstudiosController } from './plan-de-estudios.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [PlanDeEstudiosController],
  providers: [PlanDeEstudiosService],
  imports: [PrismaModule],
})
export class PlanDeEstudiosModule {}
