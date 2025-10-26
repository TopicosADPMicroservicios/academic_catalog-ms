import { Module } from '@nestjs/common';
import { OfertasGrupoMateriaService } from './ofertas-grupo-materia.service';
import { OfertasGrupoMateriaController } from './ofertas-grupo-materia.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ACADEMIC_MANAGEMENT_SERVICE } from '@/config/constants';

@Module({
  controllers: [OfertasGrupoMateriaController],
  providers: [OfertasGrupoMateriaService],
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: ACADEMIC_MANAGEMENT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.ACADEMIC_MANAGEMENT_MICROSERVICE_HOST,
          port: (process.env.ACADEMIC_MANAGEMENT_MICROSERVICE_PORT ||
            3002) as number,
        },
      },
    ]),
  ],
})
export class OfertasGrupoMateriaModule {}
