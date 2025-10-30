import { Module } from '@nestjs/common';
import { OfertasGrupoMateriaService } from './ofertas-grupo-materia.service';
import { OfertasGrupoMateriaController } from './ofertas-grupo-materia.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ACADEMIC_MANAGEMENT_SERVICE } from '@/config/constants';

// Depuración de variables de entorno
console.log('DEBUG academic_catalog-ms:');
console.log(
  'ACADEMIC_MANAGEMENT_MICROSERVICE_HOST:',
  process.env.ACADEMIC_MANAGEMENT_MICROSERVICE_HOST,
);
console.log(
  'ACADEMIC_MANAGEMENT_MICROSERVICE_PORT:',
  process.env.ACADEMIC_MANAGEMENT_MICROSERVICE_PORT,
);

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
          port: parseInt(
            process.env.ACADEMIC_MANAGEMENT_MICROSERVICE_PORT || '3002',
          ),
        },
      },
    ]),
  ],
})
export class OfertasGrupoMateriaModule {}
