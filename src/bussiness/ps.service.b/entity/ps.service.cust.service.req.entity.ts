import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PsServiceCustServiceReqClient } from '../client/ps.service.cust.service.req.client';

@Entity({ name: 'PS_CUST_SERVICE_REQ' })
export class PsServiceCustServiceReqEntity {
  @PrimaryGeneratedColumn({ name: 'REC_ID' })
  recId: number;

  @Column({ name: 'CUST_CODE' })
  custCode: string;

  @Column({ name: 'CUST_TYPE' })
  custType: string;

  @Column({ name: 'SP_CUST_CODE' })
  spCustCode: string;

  @Column({ name: 'SP_CUST_TYPE' })
  spCustType: string;

  @Column({ name: 'SERVICE_TYPE' })
  serviceType: string;

  @Column({ name: 'SERVICE_DATE' })
  serviceDate: Date;

  @Column({ name: 'START_TIME' })
  startTime: string;

  @Column({ name: 'END_TIME' })
  endTime: string;

  @Column({ name: 'DURATION' })
  duration: number;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'PRICE' })
  price: number;

  @Column({ name: 'TOTAL_PRICE' })
  totalPrice: number;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;

  toClient() {
    const c: PsServiceCustServiceReqClient =
      new PsServiceCustServiceReqClient();
    c.recId = this.recId;
    c.custCode = this.custCode;
    c.custType = this.custType;
    c.spCustCode = this.spCustCode;
    c.spCustType = this.spCustType;
    c.serviceType = this.serviceType;
    c.serviceDate = this.serviceDate;
    c.startTime = this.startTime;
    c.endTime = this.endTime;
    c.duration = this.duration;
    c.status = this.status;
    c.price = this.price;
    c.totalPrice = this.totalPrice;
    c.createdDatetime = this.createdDatetime;
    return c;
  }
}
