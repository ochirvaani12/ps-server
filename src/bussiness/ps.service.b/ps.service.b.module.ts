import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsCoreCModule } from 'src/core/ps.core.c/ps.core.c.module';
import { PsServiceBService } from './ps.service.b.service';
import { PsServiceCustServiceEntity } from './entity/ps.service.cust.service.entity';
import { PsServiceCustServiceReqEntity } from './entity/ps.service.cust.service.req.entity';
import { PsServiceServiceTypeEntity } from './entity/ps.service.service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PsServiceCustServiceEntity,
      PsServiceCustServiceReqEntity,
      PsServiceServiceTypeEntity,
    ]),
    PsCoreCModule,
  ],
  providers: [PsServiceBService],
  exports: [PsServiceBService],
})
export class PsServiceBModule {}
