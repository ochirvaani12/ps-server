import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { LoggerService } from 'src/core/ps.core.c/ps.core.c.logger.service';
import { EntityManager } from 'typeorm';
import { PsServiceCustServiceClient } from './client/ps.service.cust.service.client';
import { PsServiceCustServiceEntity } from './entity/ps.service.cust.service.entity';
import { PsServiceServiceTypeEntity } from './entity/ps.service.service.entity';
import { PsServiceCustServiceReqClient } from './client/ps.service.cust.service.req.client';
import { PsServiceCustServiceReqEntity } from './entity/ps.service.cust.service.req.entity';
import { PsCustType } from 'src/core/ps.core.c/enum/ps.cust.type';
import { PsServiceConfirmServiceRes } from './client/ps.service.confirm.service.res';
import { PsServiceConfirmServiceReq } from './client/ps.service.confirm.service.req';

@Injectable()
export class PsServiceBService {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
    private readonly logger: LoggerService,
  ) {}

  async selectCustService(
    custCode: string,
    custType: string,
  ): Promise<PsServiceCustServiceClient[]> {
    const ret: PsServiceCustServiceClient[] = [];
    try {
      const list: PsServiceCustServiceEntity[] = await this.em.find(
        PsServiceCustServiceEntity,
        { where: { custCode: custCode, custType: custType } },
      );

      for (const i of list) {
        const data = i.toClient();
        const service: PsServiceServiceTypeEntity = await this.em.findOne(
          PsServiceServiceTypeEntity,
          { where: { serviceType: data.serviceType } },
        );
        data.name = service.name;
        data.name2 = service.name2;
        ret.push(data);
      }
    } catch (err) {
      this.logger.warn(`select cust service error: ${err}`);
      throw new Error('Үйлчилгээний мэдээлэл татах явцад алдаа гарлаа');
    }
    return ret;
  }

  async selectCustServiceReq(
    custCode: string,
    custType: string,
    serviceType: string,
  ): Promise<PsServiceCustServiceReqClient[]> {
    const ret: PsServiceCustServiceReqClient[] = [];
    try {
      let list: PsServiceCustServiceReqEntity[] = [];
      if (custType == PsCustType.CUSTOMER) {
        list = await this.em.find(PsServiceCustServiceReqEntity, {
          where: {
            custCode: custCode,
            custType: custType,
            serviceType: serviceType,
          },
        });
      }

      if (custType == PsCustType.PSYCHOLOGIST) {
        list = await this.em.find(PsServiceCustServiceReqEntity, {
          where: {
            spCustCode: custCode,
            spCustType: custType,
            serviceType: serviceType,
          },
        });
      }

      for (const i of list) {
        ret.push(i.toClient());
      }
    } catch (err) {
      this.logger.warn(`select cust service req error: ${err}`);
      throw new Error('Үйлчилгээний мэдээлэл татах явцад алдаа гарлаа');
    }
    return ret;
  }

  async confirmServiceReq(
    psServiceConfirmServiceReq: PsServiceConfirmServiceReq,
  ): Promise<PsServiceConfirmServiceRes> {
    const ret: PsServiceConfirmServiceRes = new PsServiceConfirmServiceRes();
    try {
    } catch (err) {
      this.logger.warn(`select cust service req error: ${err}`);
      throw new Error('Үйлчилгээний мэдээлэл татах явцад алдаа гарлаа');
    }
    return ret;
  }
}
