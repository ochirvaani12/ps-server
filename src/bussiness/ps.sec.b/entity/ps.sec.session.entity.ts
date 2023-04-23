import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PsSecSessionClient } from '../client/ps.sec.session.client';

@Entity({ name: 'PS_SESSION' })
export class PsSecSessionEntity {
  @PrimaryColumn({ name: 'SESSION' })
  session: string;

  @Column({ name: 'CUST_CODE' })
  custCode: string;

  @Column({ name: 'CUST_TYPE' })
  custType: string;

  @Column({ name: 'LOGIN_CODE' })
  loginCode: string;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'DEVICE_ID' })
  deviceId: string;

  @Column({ name: 'IP' })
  ip: string;

  @Column({ name: 'APP_ID' })
  appId: number;

  @Column({ name: 'ACTIVE_DURATION' })
  activeDuration: number;

  @Column({ name: 'EXPIRE_DATETIME' })
  expireDatetime: Date;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;

  toClient() {
    const c: PsSecSessionClient = new PsSecSessionClient();
    c.session = this.session;
    c.custCode = this.custCode;
    c.custType = this.custType;
    c.loginCode = this.loginCode;
    c.status = this.status;
    c.deviceId = this.deviceId;
    c.ip = this.ip;
    c.appId = this.appId;
    c.activeDuration = this.activeDuration;
    c.expireDatetime = this.expireDatetime;
    c.createdDatetime = this.createdDatetime;
    return c;
  }
}
