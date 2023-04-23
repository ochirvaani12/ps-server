import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PsSessionStatus } from 'src/core/ps.core.c/enum/ps.session.status';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { LoggerService } from 'src/core/ps.core.c/ps.core.c.logger.service';
import { PsSecSessionClient } from './client/ps.sec.session.client';
import { PsSecAppEntity } from './entity/ps.sec.app.entity';
import { PsSecSessionEntity } from './entity/ps.sec.session.entity';
import { PsSecRoleCustTypeEntity } from './entity/ps.sec.role.cust.type.entity';
import { PsSecRoleOperEntity } from './entity/ps.sec.role.oper.entity';
import { PsSecLoginReq } from './client/ps.sec.login.req';
import { PsSecCustLoginEntity } from './entity/ps.sec.cust.login.entity';
import { PsSecCustDeviceEntity } from './entity/ps.sec.cust.device.entity';

@Injectable()
export class PsSecBService {
  constructor(
    private readonly em: EntityManager,
    private readonly logger: LoggerService,
  ) {}

  async checkSession(
    headers: any,
    operCode: string,
  ): Promise<PsSecSessionClient> {
    try {
      const appId: number = headers['app-id'];
      if (appId == null || appId == undefined) {
        throw new Error('app-id олдсонгүй');
      }

      const appSecret: string = headers['app-secret'];
      if (appSecret == null || appSecret == undefined) {
        throw new Error('app-secret олдсонгүй');
      }

      const accessSession: string = headers['access-session'];
      if (accessSession == null || accessSession == undefined) {
        throw new Error('access-session олдсонгүй');
      }

      const app: PsSecAppEntity = await this.em.findOne(PsSecAppEntity, {
        where: { appId: appId },
      });

      if (app.appSecret != appSecret) {
        throw new Error('app-secret тохирсонгүй');
      }

      const session: PsSecSessionEntity = await this.em.findOne(
        PsSecSessionEntity,
        {
          where: { session: accessSession, status: PsSessionStatus.ACTIVE },
        },
      );

      if (new Date().getTime() > session.expireDatetime.getTime()) {
        session.status = PsSessionStatus.INACTIVE;
        await this.em.save(session);

        throw new Error('access-session хүчинтэй хугацаа дууссан');
      } else {
        session.expireDatetime.setMinutes(
          session.expireDatetime.getMinutes() + session.activeDuration,
        );
        await this.em.save(session);
      }

      const roleCustType: PsSecRoleCustTypeEntity = await this.em.findOne(
        PsSecRoleCustTypeEntity,
        {
          where: { custType: session.custType },
        },
      );

      const roleOper: PsSecRoleOperEntity = await this.em.findOne(
        PsSecRoleOperEntity,
        {
          where: { roleId: roleCustType.roleId, operCode: operCode },
        },
      );

      if (!roleOper) {
        throw new Error('Тус үйлдийг хийх эрхгүй байна');
      }

      return session.toClient();
    } catch (err) {
      this.logger.warn(`access denied err: ${err}`);
      throw err;
    }
  }

  async login(loginReq: PsSecLoginReq): Promise<string> {
    try {
      const app: PsSecAppEntity = await this.em.findOne(PsSecAppEntity, {
        where: { appId: loginReq.appId },
      });

      if (app.appSecret != loginReq.appSecret) {
        throw new Error('app-secret тохирсонгүй');
      }

      const custLogin: PsSecCustLoginEntity = await this.em.findOne(
        PsSecCustLoginEntity,
        {
          where: { custType: loginReq.custType, loginCode: loginReq.loginCode },
        },
      );

      if (custLogin == null) {
        throw new Error('Утасны дугаар эсвэл нууц үг буруу байна');
      }

      const checkPass: boolean = await bcrypt.compare(
        loginReq.password,
        custLogin.cred,
      );

      if (checkPass) {
        await this.em.query(
          `UPDATE ps_session SET status = '${PsSessionStatus.INACTIVE}' WHERE status = ${PsSessionStatus.ACTIVE} and cust_type = ${loginReq.custType} and login_code = ${loginReq.loginCode} ;`,
        );

        const session: PsSecSessionEntity = new PsSecSessionEntity();
        session.session = this.generateRandomString(10);
        session.loginCode = custLogin.loginCode;
        session.custType = custLogin.custCode;
        session.custCode = custLogin.custCode;
        session.status = PsSessionStatus.ACTIVE;
        session.appId = loginReq.appId;
        session.deviceId = loginReq.deviceId;
        session.ip = loginReq.ip;
        session.activeDuration = 15;
        session.expireDatetime = new Date();
        session.expireDatetime.setMinutes(
          session.expireDatetime.getMinutes() + session.activeDuration,
        );
        session.createdDatetime = new Date();

        const custDevice: PsSecCustDeviceEntity = await this.em.findOne(
          PsSecCustDeviceEntity,
          {
            where: {
              custCode: custLogin.custCode,
              custType: custLogin.custType,
              deviceId: loginReq.deviceId,
            },
          },
        );

        if (custDevice == null) {
          const newDevice: PsSecCustDeviceEntity = new PsSecCustDeviceEntity();
          newDevice.custCode = custLogin.custCode;
          newDevice.custType = custLogin.custType;
          newDevice.deviceId = loginReq.deviceId;
          newDevice.ip = loginReq.ip;
          newDevice.accessCount = 1;
          newDevice.lastAccessDatetime = new Date();
          await this.em.save(newDevice);
        } else {
          custDevice.accessCount++;
          custDevice.lastAccessDatetime = new Date();
          await this.em.save(custDevice);
        }

        await this.em.save(session);
        return session.session;
      } else {
        custLogin.triedCount++;
        await this.em.save(custLogin);
        throw new Error('Утасны дугаар эсвэл нууц үг буруу байна');
      }
    } catch (err) {
      this.logger.warn(`login error: ${err}`);
      throw err;
    }
  }

  private generateRandomString(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }
}
