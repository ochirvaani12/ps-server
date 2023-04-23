import { PsCustServiceReqData } from '../data/ps.cust.service.req.data';
import { PsCustMainRes } from './ps.cust.main.res';

export class PsCustServiceReqRes extends PsCustMainRes {
  resData: PsCustServiceReqData[];
}
