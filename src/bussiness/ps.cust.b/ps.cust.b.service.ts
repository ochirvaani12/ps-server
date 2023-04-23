import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PsRegisterReq } from './client/ps.register.req';
import { InjectEntityManager } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { PsCustLoginEntity } from './entity/ps.cust.login.entity';
import { PsLoginStatus } from 'src/core/ps.core.c/enum/ps.login.status';
import { PsCoreCMainService } from 'src/core/ps.core.c/ps.core.c.main.service';
import { PsCustEntity } from './entity/ps.cust.entity';
import { PsCustStatus } from 'src/core/ps.core.c/enum/ps.cust.status';
import { LoggerService } from 'src/core/ps.core.c/ps.core.c.logger.service';
import { PsCustClient } from './client/ps.cust.client';
import { VwPsCustAttrClient } from './client/vw.ps.cust.attr.client';
import { VwPsCustAttrEntity } from './entity/vw.ps.cust.attr.entity';
import { PsCustAttrEntity } from './entity/ps.cust.attr.entity';
import { PsCustAttrVerfStatus } from 'src/core/ps.core.c/enum/ps.cust.attr.verf.status';
import { VwPsCustPsychologistEntity } from './entity/vw.ps.cust.psychologist.entity';
import { VwPsCustPsychologistClient } from './client/vw.ps.cust.psychologist.client';

@Injectable()
export class PsCustBService {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
    private readonly logger: LoggerService,
    private readonly coreCService: PsCoreCMainService,
  ) {}
  async register(psRegisterReq: PsRegisterReq) {
    try {
      const custCode: string = await this.coreCService.generateCustCode(
        psRegisterReq.custType,
      );

      const cust: PsCustEntity = new PsCustEntity();
      cust.custCode = custCode;
      cust.firstname = psRegisterReq.firstname;
      cust.lastname = psRegisterReq.lastname;
      cust.mobileNo = psRegisterReq.mobileNo;
      cust.registerCode = psRegisterReq.registerCode;
      cust.status = PsCustStatus.NEW;
      await this.em.save(cust);

      const login: PsCustLoginEntity = new PsCustLoginEntity();
      login.custCode = custCode;
      login.custType = psRegisterReq.custType;
      login.loginCode = psRegisterReq.mobileNo;
      login.status = PsLoginStatus.ACTIVE;
      login.triedCount = 0;
      login.cred = await bcrypt.hash(
        psRegisterReq.password,
        parseInt(process.env.PASS_HASH),
      );
      login.createdDatetime = new Date();
      await this.em.save(login);
    } catch (err) {
      this.logger.error(`Error creating user: ${err}`);
      throw Error('Харилцагч үүсгэхэд алдаа гарлаа');
    }
  }

  async detailCust(custCode: string): Promise<PsCustClient> {
    const cust: PsCustEntity = await this.em.findOne(PsCustEntity, {
      where: { custCode: custCode },
    });
    if (cust == null) {
      throw new Error('Харилцагч олдсонгүй');
    }
    return cust.toClient();
  }

  async selectCustAttr(
    custCode: string,
    custType: string,
  ): Promise<VwPsCustAttrClient[]> {
    const attrs: VwPsCustAttrClient[] = [];

    try {
      const list: VwPsCustAttrEntity[] = await this.em.find(
        VwPsCustAttrEntity,
        { where: { custType: custType, custCode: custCode } },
      );
      for (const i of list) {
        attrs.push(i.toClient());
      }
    } catch (err) {
      this.logger.warn(`select cust attr error: ${err}`);
      throw new Error('Харилцагчийн нэмэлт мэдээлэл авхад алдаа гарлаа');
    }

    return attrs;
  }

  async updateCustAttr(attrs: VwPsCustAttrClient[]) {
    try {
      for (const i of attrs) {
        const attr: PsCustAttrEntity = await this.em.findOne(PsCustAttrEntity, {
          where: {
            custCode: i.custCode,
            custType: i.custType,
            attrType: i.attrType,
          },
        });
        if (attr == null) {
          const newAttr: PsCustAttrEntity = new PsCustAttrEntity();
          newAttr.custCode = i.custCode;
          newAttr.custType = i.custType;
          newAttr.attrType = i.attrType;
          newAttr.value = i.value;
          newAttr.verfStatus = PsCustAttrVerfStatus.VERIFIED;
          newAttr.verfDatetime = new Date();
          newAttr.createdDatetime = new Date();
          await this.em.save(newAttr);
        } else {
          attr.value = i.value;
          attr.verfStatus = PsCustAttrVerfStatus.VERIFIED;
          attr.verfDatetime = new Date();
          await this.em.save(attr);
        }
      }
    } catch (err) {
      this.logger.warn(`update cust attr error: ${err}`);
      throw new Error('Харилцагчийн нэмэлт мэдээлэл шинэчлэхэд алдаа гарлаа');
    }
  }

  async selectPsychologist(): Promise<VwPsCustPsychologistClient[]> {
    const ret: VwPsCustPsychologistClient[] = [];
    try {
      const list: VwPsCustPsychologistEntity[] = await this.em.find(
        VwPsCustPsychologistEntity,
      );
      for (const i of list) {
        ret.push(i.toClient());
      }
    } catch (err) {
      this.logger.warn(`select psychologist error: ${err}`);
      throw new Error('Сэтгэл зүйчийн мэдээлэл татхад алдаа гарлаа');
    }
    return ret;
  }

  async detailPsychologist(
    custCode: string,
    custType: string,
  ): Promise<VwPsCustPsychologistClient> {
    try {
      const cust: VwPsCustPsychologistEntity = await this.em.findOne(
        VwPsCustPsychologistEntity,
        { where: { custCode: custCode, custType: custType } },
      );

      if (cust != null) {
        return cust.toClient();
      } else {
        throw new Error('Сэтгэл зүйчийн мэдээлэл олдсонгүй');
      }
    } catch (err) {
      this.logger.warn(`detail psychologist error: ${err}`);
      throw new Error('Сэтгэл зүйчийн мэдээлэл татхад алдаа гарлаа');
    }
  }
}
