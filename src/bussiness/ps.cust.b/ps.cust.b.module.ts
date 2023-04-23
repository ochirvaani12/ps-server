import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsCustAttrEntity } from './entity/ps.cust.attr.entity';
import { PsCustAttrTypeEntity } from './entity/ps.cust.attr.type.entity';
import { PsCustEntity } from './entity/ps.cust.entity';
import { PsCustLoginEntity } from './entity/ps.cust.login.entity';
import { PsCustTypeLinkEntity } from './entity/ps.cust.type.link.entity';
import { PsCustBService } from './ps.cust.b.service';
import { PsCoreCModule } from 'src/core/ps.core.c/ps.core.c.module';
import { VwPsCustAttrEntity } from './entity/vw.ps.cust.attr.entity';
import { VwPsCustPsychologistEntity } from './entity/vw.ps.cust.psychologist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PsCustAttrEntity,
      PsCustAttrTypeEntity,
      PsCustEntity,
      PsCustLoginEntity,
      PsCustTypeLinkEntity,
      VwPsCustAttrEntity,
      VwPsCustPsychologistEntity,
    ]),
    PsCoreCModule,
  ],
  providers: [PsCustBService],
  exports: [PsCustBService],
})
export class PsCustBModule {}
