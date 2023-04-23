import { Entity, Column, PrimaryColumn } from 'typeorm';
import { PsCustClient } from '../client/ps.cust.client';

@Entity({ name: 'PS_CUST' })
export class PsCustEntity {
  @PrimaryColumn({ name: 'CUST_CODE' })
  custCode: string;

  @Column({ name: 'FIRSTNAME' })
  firstname: string;

  @Column({ name: 'LASTNAME' })
  lastname: string;

  @Column({ name: 'REGISTER_CODE' })
  registerCode: string;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'MOBILE_NO' })
  mobileNo: string;

  toClient() {
    const c: PsCustClient = new PsCustClient();
    c.custCode = this.custCode;
    c.firstname = this.firstname;
    c.lastname = this.lastname;
    c.registerCode = this.registerCode;
    c.status = this.status;
    c.mobileNo = this.mobileNo;
    return c;
  }
}
