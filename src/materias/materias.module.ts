import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [MateriasController],
  providers: [MateriasService],
  imports: [PrismaModule],
})
export class MateriasModule {}
