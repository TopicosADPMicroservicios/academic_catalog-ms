import { Module } from '@nestjs/common';
import { MaestrosDeOfertaService } from './maestros-de-oferta.service';
import { MaestrosDeOfertaController } from './maestros-de-oferta.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [MaestrosDeOfertaController],
  providers: [MaestrosDeOfertaService],
  imports: [PrismaModule],
})
export class MaestrosDeOfertaModule {}
