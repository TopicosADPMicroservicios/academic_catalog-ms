import { Module } from '@nestjs/common';
import { NivelesService } from './niveles.service';
import { NivelesController } from './niveles.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [NivelesController],
  providers: [NivelesService],
  imports: [PrismaModule],
})
export class NivelesModule {}
