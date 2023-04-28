import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PsServiceInvoiceClient } from '../client/ps.service.invoice.client';

@Entity({ name: 'PS_FIN_INVOICE' })
export class PsServiceInvoiceEntity {
  @PrimaryGeneratedColumn({ name: 'INVOICE_ID' })
  invoiceId: number;

  @Column({ name: 'PAY_AMT' })
  payAmt: number;

  @Column({ name: 'PAID_AMT' })
  paidAmt: number;

  @Column({ name: 'FEE_AMT' })
  feeAmt: number;

  @Column({ name: 'PAID_FEE_AMT' })
  paidFeeAmt: number;

  @Column({ name: 'SERVICE_TYPE' })
  serviceType: string;

  @Column({ name: 'PAY_CUST_CODE' })
  payCustCode: string;

  @Column({ name: 'PAY_CUST_TYPE' })
  payCustType: string;

  @Column({ name: 'RECEIVE_CUST_CODE' })
  receiveCustCode: string;

  @Column({ name: 'RECEIVE_CUST_TYPE' })
  receiveCustType: string;

  @Column({ name: 'SRC_BANK_CODE' })
  srcBankCode: string;

  @Column({ name: 'SRC_ACNT_CODE' })
  srcAcntCode: string;

  @Column({ name: 'DST_BANK_CODE' })
  dstBankCode: string;

  @Column({ name: 'DST_ACNT_CODE' })
  dstAcntCode: string;

  @Column({ name: 'REPAY_DATE' })
  repayDate: Date;

  @Column({ name: 'CLOSED_DATETIME' })
  closedDatetime: Date;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;

  toClient() {
    const c: PsServiceInvoiceClient = new PsServiceInvoiceClient();
    c.invoiceId = this.invoiceId;
    c.payAmt = this.payAmt;
    c.paidAmt = this.paidAmt;
    c.feeAmt = this.feeAmt;
    c.paidFeeAmt = this.paidFeeAmt;
    c.serviceType = this.serviceType;
    c.payCustCode = this.payCustCode;
    c.payCustType = this.payCustType;
    c.receiveCustCode = this.receiveCustCode;
    c.receiveCustType = this.receiveCustType;
    c.srcBankCode = this.srcBankCode;
    c.srcAcntCode = this.srcAcntCode;
    c.dstBankCode = this.dstBankCode;
    c.dstAcntCode = this.dstAcntCode;
    c.repayDate = this.repayDate;
    c.closedDatetime = this.closedDatetime;
    c.createdDatetime = this.createdDatetime;
    return c;
  }
}
