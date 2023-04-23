import { Module } from '@nestjs/common';
import { PsPsyApiController } from './ps.psy.api.controller';

@Module({
  imports: [],
  controllers: [PsPsyApiController],
  providers: [],
})
export class PsPsyApiModule {}
