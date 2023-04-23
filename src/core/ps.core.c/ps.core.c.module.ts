import { Module } from '@nestjs/common';
import { PsCoreCMainService } from './ps.core.c.main.service';
import { LoggerService } from './ps.core.c.logger.service';

@Module({
  imports: [],
  providers: [PsCoreCMainService, LoggerService],
  exports: [PsCoreCMainService, LoggerService],
})
export class PsCoreCModule {}
