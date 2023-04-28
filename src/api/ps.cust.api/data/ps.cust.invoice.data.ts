export class PsCustInvoiceData {
  invoiceId: number;
  payAmt: number;
  paidAmt: number;
  feeAmt: number;
  paidFeeAmt: number;
  serviceType: string;
  payCustCode: string;
  payCustType: string;
  receiveCustCode: string;
  receiveCustType: string;
  srcBankCode: string;
  srcAcntCode: string;
  dstBankCode: string;
  dstAcntCode: string;
  repayDate: Date;
  closedDatetime: Date;
  createdDatetime: Date;
}
