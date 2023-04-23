import { Module } from '@nestjs/common';
import { PsSecBService } from './ps.sec.b.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsSecAppEntity } from './entity/ps.sec.app.entity';
import { PsSecCustDeviceEntity } from './entity/ps.sec.cust.device.entity';
import { PsSecCustLoginEntity } from './entity/ps.sec.cust.login.entity';
import { PsSecRoleCustTypeEntity } from './entity/ps.sec.role.cust.type.entity';
import { PsSecRoleOperEntity } from './entity/ps.sec.role.oper.entity';
import { PsSecSessionEntity } from './entity/ps.sec.session.entity';
import { PsCoreCModule } from 'src/core/ps.core.c/ps.core.c.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PsSecAppEntity,
      PsSecCustDeviceEntity,
      PsSecCustLoginEntity,
      PsSecRoleCustTypeEntity,
      PsSecRoleOperEntity,
      PsSecSessionEntity,
    ]),
    PsCoreCModule,
  ],
  providers: [PsSecBService],
  exports: [PsSecBService],
})
export class PsSecBModule {}
