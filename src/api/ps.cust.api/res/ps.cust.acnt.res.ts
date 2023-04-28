import { PsCustMainRes } from './ps.cust.main.res';

export class PsCustAcntRes extends PsCustMainRes {
  acntType: string;
  custType: string;
  custCode: string;
  bankCode: string;
  acntCode: string;
  acntName: string;
  status: string;
  createdDatetime: Date;
}
