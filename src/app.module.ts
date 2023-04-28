import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsCustApiModule } from './api/ps.cust.api/ps.cust.api.module';
import { PsPsyApiModule } from './api/ps.psy.api/ps.psy.api.module';
import { PsCustBModule } from './bussiness/ps.cust.b/ps.cust.b.module';
import { PsServiceBModule } from './bussiness/ps.service.b/ps.service.b.module';
import { PsSecBModule } from './bussiness/ps.sec.b/ps.sec.b.module';
import { PsCoreCModule } from './core/ps.core.c/ps.core.c.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PsCustApiModule,
    PsPsyApiModule,
    PsCustBModule,
    PsServiceBModule,
    PsSecBModule,
    PsCoreCModule,
  ],
})
export class AppModule {}
