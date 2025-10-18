import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [CarrerasController],
  providers: [CarrerasService],
  imports: [PrismaModule],
})
export class CarrerasModule {}
