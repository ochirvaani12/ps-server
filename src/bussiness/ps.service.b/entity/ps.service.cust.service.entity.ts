import { Entity, Column, PrimaryColumn } from 'typeorm';
import { PsServiceCustServiceClient } from '../client/ps.service.cust.service.client';

@Entity({ name: 'PS_CUST_SERVICE' })
export class PsServiceCustServiceEntity {
  @PrimaryColumn({ name: 'CUST_CODE' })
  custCode: string;

  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @PrimaryColumn({ name: 'SERVICE_TYPE' })
  serviceType: string;

  @Column({ name: 'DESCRIPTION' })
  description: string;

  @Column({ name: 'DESCRIPTION2' })
  description2: string;

  @Column({ name: 'PRICE' })
  price: number;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;

  toClient() {
    const c: PsServiceCustServiceClient = new PsServiceCustServiceClient();
    c.custType = this.custType;
    c.custCode = this.custCode;
    c.serviceType = this.serviceType;
    c.description = this.description;
    c.description2 = this.description2;
    c.price = this.price;
    c.status = this.status;
    c.createdDatetime = this.createdDatetime;
    return c;
  }
}
