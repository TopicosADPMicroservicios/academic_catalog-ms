import { Module } from '@nestjs/common';
import { PrerequisitosService } from './prerequisitos.service';
import { PrerequisitosController } from './prerequisitos.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [PrerequisitosController],
  providers: [PrerequisitosService],
  imports: [PrismaModule],
})
export class PrerequisitosModule {}
