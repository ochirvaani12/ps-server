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
import { PsServiceInvoiceEntity } from './entity/ps.service.invoice.entity';
import { PsServiceInvoiceClient } from './client/ps.service.invoice.client';

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
      const custService: PsServiceCustServiceEntity = await this.em.findOne(
        PsServiceCustServiceEntity,
        {
          where: {
            custCode: psServiceConfirmServiceReq.spCustCode,
            custType: psServiceConfirmServiceReq.spCustType,
            serviceType: psServiceConfirmServiceReq.serviceType,
          },
        },
      );

      ret.payAmt = custService.price * psServiceConfirmServiceReq.duration;
    } catch (err) {
      this.logger.warn(`select cust service req error: ${err}`);
      throw new Error('Үйлчилгээний мэдээлэл татах явцад алдаа гарлаа');
    }
    return ret;
  }

  async createServiceReq(
    psServiceConfirmServiceReq: PsServiceConfirmServiceReq,
  ) {
    try {
      const custService: PsServiceCustServiceEntity = await this.em.findOne(
        PsServiceCustServiceEntity,
        {
          where: {
            custCode: psServiceConfirmServiceReq.spCustCode,
            custType: psServiceConfirmServiceReq.spCustType,
            serviceType: psServiceConfirmServiceReq.serviceType,
          },
        },
      );

      const serviceReq: PsServiceCustServiceReqEntity =
        new PsServiceCustServiceReqEntity();
      serviceReq.custCode = psServiceConfirmServiceReq.custCode;
      serviceReq.custType = psServiceConfirmServiceReq.custType;
      serviceReq.spCustCode = psServiceConfirmServiceReq.spCustCode;
      serviceReq.spCustType = psServiceConfirmServiceReq.spCustType;
      serviceReq.serviceType = psServiceConfirmServiceReq.serviceType;
      serviceReq.duration = psServiceConfirmServiceReq.duration;
      serviceReq.startDatetime = psServiceConfirmServiceReq.startDatetime;
      serviceReq.endDatetime = new Date();
      serviceReq.endDatetime.setHours(
        serviceReq.startDatetime.getHours(),
        serviceReq.duration,
      );
      serviceReq.serviceDate = serviceReq.startDatetime;
      serviceReq.price =
        custService.price * psServiceConfirmServiceReq.duration;
      serviceReq.createdDatetime = new Date();
      await this.em.save(serviceReq);
    } catch (err) {
      this.logger.warn(`select cust service req error: ${err}`);
      throw new Error('Үйлчилгээний мэдээлэл татах явцад алдаа гарлаа');
    }
  }

  async startServiceReq(recId: number) {
    try {
      console.log(recId + ' started');
    } catch (err) {
      this.logger.warn(`start cust service req error: ${err}`);
      throw new Error('Үйлчилгээний явцад алдаа гарлаа');
    }
  }

  async finishServiceReq(recId: number) {
    try {
      console.log(recId + ' finished');
    } catch (err) {
      this.logger.warn(`finish cust service req error: ${err}`);
      throw new Error('Үйлчилгээний явцад алдаа гарлаа');
    }
  }

  async selectInvoice(
    custCode: string,
    custType: string,
  ): Promise<PsServiceInvoiceClient[]> {
    const ret: PsServiceInvoiceClient[] = [];
    try {
      let invoices: PsServiceInvoiceEntity[] = [];
      if (custType == PsCustType.CUSTOMER) {
        invoices = await this.em.find(PsServiceInvoiceEntity, {
          where: { payCustCode: custCode, payCustType: custType },
        });
      } else if (custType == PsCustType.PSYCHOLOGIST) {
        invoices = await this.em.find(PsServiceInvoiceEntity, {
          where: { receiveCustCode: custCode, receiveCustType: custType },
        });
      }
      for (const i of invoices) {
        ret.push(i.toClient());
      }
    } catch (err) {
      this.logger.warn(`select invoice error: ${err}`);
      throw new Error('Нэхэмжлэл татах явцад алдаа гарлаа');
    }
    return ret;
  }
}
