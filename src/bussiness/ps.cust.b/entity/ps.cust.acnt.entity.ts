import { Entity, Column, PrimaryColumn } from 'typeorm';
import { PsCustAcntClient } from '../client/ps.cust.acnt.client';

@Entity({ name: 'PS_ACNT' })
export class PsCustAcntEntity {
  @PrimaryColumn({ name: 'ACNT_TYPE' })
  acntType: string;

  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @PrimaryColumn({ name: 'CUST_CODE' })
  custCode: string;

  @Column({ name: 'BANK_CODE' })
  bankCode: string;

  @Column({ name: 'ACNT_CODE' })
  acntCode: string;

  @Column({ name: 'ACNT_NAME' })
  acntName: string;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;

  toClient() {
    const c: PsCustAcntClient = new PsCustAcntClient();
    c.acntType = this.acntType;
    c.custCode = this.custCode;
    c.custType = this.custType;
    c.bankCode = this.bankCode;
    c.acntCode = this.acntCode;
    c.acntName = this.acntName;
    c.status = this.status;
    c.createdDatetime = this.createdDatetime;
    return c;
  }
}
