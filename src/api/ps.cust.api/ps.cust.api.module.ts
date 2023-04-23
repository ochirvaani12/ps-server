import { Module } from '@nestjs/common';
import { PsCustApiController } from './ps.cust.api.controller';
import { PsSecBModule } from 'src/bussiness/ps.sec.b/ps.sec.b.module';
import { PsCustBModule } from 'src/bussiness/ps.cust.b/ps.cust.b.module';
import { PsServiceBModule } from 'src/bussiness/ps.service.b/ps.service.b.module';

@Module({
  imports: [PsSecBModule, PsCustBModule, PsServiceBModule],
  controllers: [PsCustApiController],
  providers: [],
})
export class PsCustApiModule {}
