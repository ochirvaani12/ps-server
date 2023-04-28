import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PsCustRegisterReq } from './req/ps.cust.register.req';
import { PsSecBService } from 'src/bussiness/ps.sec.b/ps.sec.b.service';
import { PsSecLoginReq } from 'src/bussiness/ps.sec.b/client/ps.sec.login.req';
import { PsCustLoginReq } from './req/ps.cust.login.req';
import { PsSecSessionClient } from 'src/bussiness/ps.sec.b/client/ps.sec.session.client';
import { PsCustBService } from 'src/bussiness/ps.cust.b/ps.cust.b.service';
import { PsRegisterReq } from 'src/bussiness/ps.cust.b/client/ps.register.req';
import { PsCustMainRes } from './res/ps.cust.main.res';
import { PsCustLoginRes } from './res/ps.cust.login.res';
import { PsCustRes } from './res/ps.cust.res';
import { PsCustClient } from 'src/bussiness/ps.cust.b/client/ps.cust.client';
import { PsCustAttrRes } from './res/ps.cust.attr.res';
import { VwPsCustAttrClient } from 'src/bussiness/ps.cust.b/client/vw.ps.cust.attr.client';
import { PsCustAttrData } from './data/ps.cust.attr.data';
import { PsCustAttrReq } from './req/ps.cust.attr.req';
import { PsCustPsychologistRes } from './res/ps.cust.psychologist.res';
import { PsCustPsychologistData } from './data/ps.cust.psychologist.data';
import { VwPsCustPsychologistClient } from 'src/bussiness/ps.cust.b/client/vw.ps.cust.psychologist.client';
import { PsCustPsychologistDetailRes } from './res/ps.cust.psychologist.detail.res';
import { PsCustCustReq } from './req/ps.cust.cust.req';
import { PsServiceBService } from 'src/bussiness/ps.service.b/ps.service.b.service';
import { PsCustServiceReqReq } from './req/ps.cust.service.req.req';
import { PsServiceCustServiceReqClient } from 'src/bussiness/ps.service.b/client/ps.service.cust.service.req.client';
import { PsCustServiceReqRes } from './res/ps.cust.service.req.res';
import { PsCustServiceReqData } from './data/ps.cust.service.req.data';
import { PsCustServiceRes } from './res/ps.cust.service.res';
import { PsServiceCustServiceClient } from 'src/bussiness/ps.service.b/client/ps.service.cust.service.client';
import { PsCustServiceData } from './data/ps.cust.service.data';
import { PsCustConfirmServiceReqReq } from './req/ps.cust.confirm.service.req.req';
import { PsCustConfirmServiceReqRes } from './res/ps.cust.confirm.service.req.res';
import { PsServiceConfirmServiceRes } from 'src/bussiness/ps.service.b/client/ps.service.confirm.service.res';
import { PsServiceConfirmServiceReq } from 'src/bussiness/ps.service.b/client/ps.service.confirm.service.req';
import { PsCustServiceReq } from './req/ps.cust.service.req';
import { PsCustAcntRes } from './res/ps.cust.acnt.res';
import { PsCustAcntClient } from 'src/bussiness/ps.cust.b/client/ps.cust.acnt.client';
import { PsCustInvoieRes } from './res/ps.cust.invoice.res';
import { PsServiceInvoiceClient } from 'src/bussiness/ps.service.b/client/ps.service.invoice.client';
import { PsCustInvoiceData } from './data/ps.cust.invoice.data';

@Controller('cust')
export class PsCustApiController {
  constructor(
    private readonly secBService: PsSecBService,
    private readonly custBService: PsCustBService,
    private readonly serviceBService: PsServiceBService,
  ) {}

  @Post('login')
  async login(
    @Headers() headers: any,
    @Body() psCustLoginReq: PsCustLoginReq,
  ): Promise<PsCustLoginRes> {
    const res: PsCustLoginRes = new PsCustLoginRes();
    try {
      const appId: number = headers['app-id'];
      if (appId == null || appId == undefined) {
        throw new Error('app-id олдсонгүй');
      }

      const appSecret: string = headers['app-secret'];
      if (appSecret == null || appSecret == undefined) {
        throw new Error('app-secret олдсонгүй');
      }

      const custType: string = headers['cust-type'];
      if (custType == null || custType == undefined) {
        throw new Error('cust-type олдсонгүй');
      }

      const loginReq: PsSecLoginReq = new PsSecLoginReq();
      loginReq.appId = appId;
      loginReq.appSecret = appSecret;
      loginReq.custType = custType;
      loginReq.loginCode = psCustLoginReq.loginCode;
      loginReq.password = psCustLoginReq.password;
      loginReq.deviceId = psCustLoginReq.deviceId;
      loginReq.ip = psCustLoginReq.ip;
      res.session = await this.secBService.login(loginReq);
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('register')
  async register(
    @Headers() headers: any,
    @Body() psCustRegisterReq: PsCustRegisterReq,
  ): Promise<PsCustMainRes> {
    const res: PsCustMainRes = new PsCustMainRes();
    try {
      const custType: string = headers['cust-type'];
      if (custType == null || custType == undefined) {
        throw new Error('cust-type олдсонгүй');
      }

      const psRegisterReq: PsRegisterReq = new PsRegisterReq();
      psRegisterReq.custType = custType;
      psRegisterReq.firstname = psCustRegisterReq.firstname;
      psRegisterReq.lastname = psCustRegisterReq.lastname;
      psRegisterReq.mobileNo = psCustRegisterReq.mobileNo;
      psRegisterReq.registerCode = psCustRegisterReq.registerCode;
      psRegisterReq.password = psCustRegisterReq.password;
      this.custBService.register(psRegisterReq);
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('detailCust')
  async detailCust(@Headers() headers: any): Promise<PsCustRes> {
    const res = new PsCustRes();
    try {
      const operCode = '2002';
      const session: PsSecSessionClient = await this.secBService.checkSession(
        headers,
        operCode,
      );

      const cust: PsCustClient = await this.custBService.detailCust(
        session.custCode,
      );
      res.firstname = cust.firstname;
      res.lastname = cust.lastname;
      res.mobileNo = cust.lastname;
      res.registerCode = cust.registerCode;
      res.status = cust.status;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('selectCustAttr')
  async selectCustAttr(@Headers() headers: any): Promise<PsCustAttrRes> {
    const res: PsCustAttrRes = new PsCustAttrRes();
    try {
      const operCode = '2003';
      const session: PsSecSessionClient = await this.secBService.checkSession(
        headers,
        operCode,
      );

      const ret: VwPsCustAttrClient[] = await this.custBService.selectCustAttr(
        session.custCode,
        session.custType,
      );
      const data: PsCustAttrData[] = [];
      for (const attr of ret) {
        const d: PsCustAttrData = new PsCustAttrData();
        d.attrType = attr.attrType;
        d.name = attr.name;
        d.name2 = attr.name2;
        d.description = attr.description;
        d.description2 = attr.description2;
        d.value = attr.value;
        d.verfStatus = attr.verfStatus;
        d.isRequired = attr.isRequired;
        data.push(d);
      }
      res.resData = data;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('updateCustAttr')
  async updateCustAttr(
    @Headers() headers: any,
    @Body() custAttr: PsCustAttrReq,
  ): Promise<PsCustMainRes> {
    const res: PsCustMainRes = new PsCustMainRes();
    try {
      const operCode = '2004';
      const session: PsSecSessionClient = await this.secBService.checkSession(
        headers,
        operCode,
      );

      const attrs: VwPsCustAttrClient[] = [];
      for (const i of custAttr.custAttrs) {
        const attr: VwPsCustAttrClient = new VwPsCustAttrClient();
        attr.custCode = session.custCode;
        attr.custType = session.custType;
        attr.attrType = i.attrType;
        attr.name = i.name;
        attr.name2 = i.name2;
        attr.description = i.description;
        attr.description2 = i.description2;
        attr.value = i.value;
        attr.verfStatus = i.verfStatus;
        attr.isRequired = i.isRequired;
        attrs.push(attr);
      }
      await this.custBService.updateCustAttr(attrs);
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('selectPsychologist')
  async selectPsychologist(
    @Headers() headers: any,
  ): Promise<PsCustPsychologistRes> {
    const res: PsCustPsychologistRes = new PsCustPsychologistRes();
    try {
      const operCode = '2005';
      await this.secBService.checkSession(headers, operCode);

      const ret: VwPsCustPsychologistClient[] =
        await this.custBService.selectPsychologist();
      const data: PsCustPsychologistData[] = [];
      for (const i of ret) {
        const d: PsCustPsychologistData = new PsCustPsychologistData();
        d.custCode = i.custCode;
        d.custType = i.custType;
        d.custTypeName = i.custTypeName;
        d.firstname = i.firstname;
        d.lastname = i.lastname;
        d.registerCode = i.registerCode;
        d.status = i.status;
        d.mobileNo = i.mobileNo;
        d.experience = i.experience;
        d.about = i.about;
        data.push(d);
      }
      res.resData = data;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('detailPsychologist')
  async detailPsychologist(
    @Headers() headers: any,
    @Body() psCustCustReq: PsCustCustReq,
  ): Promise<PsCustPsychologistDetailRes> {
    const res: PsCustPsychologistDetailRes = new PsCustPsychologistDetailRes();
    try {
      const operCode = '2006';
      await this.secBService.checkSession(headers, operCode);

      const cust: VwPsCustPsychologistClient =
        await this.custBService.detailPsychologist(
          psCustCustReq.custCode,
          psCustCustReq.custType,
        );
      res.custCode = cust.custCode;
      res.custType = cust.custType;
      res.custTypeName = cust.custTypeName;
      res.firstname = cust.firstname;
      res.lastname = cust.lastname;
      res.registerCode = cust.registerCode;
      res.status = cust.status;
      res.mobileNo = cust.mobileNo;
      res.experience = cust.experience;
      res.about = cust.about;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('selectService')
  async selectService(
    @Headers() headers: any,
    @Body() psCustCustReq: PsCustCustReq,
  ): Promise<PsCustServiceRes> {
    const res: PsCustServiceRes = new PsCustServiceRes();
    try {
      const operCode = '2007';
      await this.secBService.checkSession(headers, operCode);

      const ret: PsServiceCustServiceClient[] =
        await this.serviceBService.selectCustService(
          psCustCustReq.custCode,
          psCustCustReq.custType,
        );

      const data: PsCustServiceData[] = [];
      for (const i of ret) {
        const d: PsCustServiceData = new PsCustServiceData();
        d.custType = i.custType;
        d.custCode = i.custCode;
        d.serviceType = i.serviceType;
        d.name = i.name;
        d.name2 = i.name2;
        d.description = i.description;
        d.description2 = i.description2;
        d.price = i.price;
        d.status = i.status;
        d.createdDatetime = i.createdDatetime;
        data.push(d);
      }
      res.resData = data;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('selectServiceReq')
  async selectServiceReq(
    @Headers() headers: any,
    @Body() psCustServiceReqReq: PsCustServiceReqReq,
  ): Promise<PsCustServiceReqRes> {
    const res: PsCustServiceReqRes = new PsCustServiceReqRes();
    try {
      const operCode = '2007';
      await this.secBService.checkSession(headers, operCode);

      const ret: PsServiceCustServiceReqClient[] =
        await this.serviceBService.selectCustServiceReq(
          psCustServiceReqReq.custCode,
          psCustServiceReqReq.custType,
          psCustServiceReqReq.serviceType,
        );

      const data: PsCustServiceReqData[] = [];
      for (const i of ret) {
        const d: PsCustServiceReqData = new PsCustServiceReqData();
        d.recId = i.recId;
        d.custCode = i.custCode;
        d.custType = i.custType;
        d.spCustCode = i.spCustCode;
        d.spCustType = i.spCustType;
        d.serviceType = i.serviceType;
        d.serviceDate = i.serviceDate;
        d.startDatetime = i.startDatetime;
        d.endDatetime = i.endDatetime;
        d.duration = i.duration;
        d.status = i.status;
        d.price = i.price;
        d.totalPrice = i.totalPrice;
        d.createdDatetime = i.createdDatetime;
        data.push(d);
      }
      res.resData = data;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('confirmServiceReq')
  async confirmServiceReq(
    @Headers() headers: any,
    @Body() psCustConfirmServiceReqReq: PsCustConfirmServiceReqReq,
  ): Promise<PsCustConfirmServiceReqRes> {
    const res: PsCustConfirmServiceReqRes = new PsCustConfirmServiceReqRes();
    try {
      const operCode = '2008';
      const session: PsSecSessionClient = await this.secBService.checkSession(
        headers,
        operCode,
      );

      const req: PsServiceConfirmServiceReq = new PsServiceConfirmServiceReq();
      req.serviceType = psCustConfirmServiceReqReq.serviceType;
      req.spCustCode = psCustConfirmServiceReqReq.spCustCode;
      req.spCustType = psCustConfirmServiceReqReq.spCustType;
      req.startDatetime = psCustConfirmServiceReqReq.startDatetime;
      req.duration = psCustConfirmServiceReqReq.duration;
      req.custCode = session.custCode;
      req.custType = session.custType;
      const ret: PsServiceConfirmServiceRes =
        await this.serviceBService.confirmServiceReq(req);

      res.payAmt = ret.payAmt;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('createServiceReq')
  async createServiceReq(
    @Headers() headers: any,
    @Body() psCustConfirmServiceReqReq: PsCustConfirmServiceReqReq,
  ): Promise<PsCustMainRes> {
    const res: PsCustMainRes = new PsCustMainRes();
    try {
      const operCode = '2009';
      const session: PsSecSessionClient = await this.secBService.checkSession(
        headers,
        operCode,
      );

      const req: PsServiceConfirmServiceReq = new PsServiceConfirmServiceReq();
      req.serviceType = psCustConfirmServiceReqReq.serviceType;
      req.spCustCode = psCustConfirmServiceReqReq.spCustCode;
      req.spCustType = psCustConfirmServiceReqReq.spCustType;
      req.startDatetime = psCustConfirmServiceReqReq.startDatetime;
      req.duration = psCustConfirmServiceReqReq.duration;
      req.custCode = session.custCode;
      req.custType = session.custType;
      await this.serviceBService.createServiceReq(req);
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('startServiceReq')
  async startServiceReq(
    @Headers() headers: any,
    @Body() psCustServiceReq: PsCustServiceReq,
  ) {
    const res: PsCustMainRes = new PsCustMainRes();
    try {
      const operCode = '2010';
      await this.secBService.checkSession(headers, operCode);

      await this.serviceBService.startServiceReq(psCustServiceReq.recId);
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
  }

  @Post('finishServiceReq')
  async finishServiceReq(
    @Headers() headers: any,
    @Body() psCustServiceReq: PsCustServiceReq,
  ) {
    const res: PsCustMainRes = new PsCustMainRes();
    try {
      const operCode = '2011';
      await this.secBService.checkSession(headers, operCode);

      await this.serviceBService.finishServiceReq(psCustServiceReq.recId);
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
  }

  @Post('detailBankAcnt')
  async detailBankAcnt(@Headers() headers: any): Promise<PsCustAcntRes> {
    const res: PsCustAcntRes = new PsCustAcntRes();
    try {
      const operCode = '2012';
      const session: PsSecSessionClient = await this.secBService.checkSession(
        headers,
        operCode,
      );

      const acnt: PsCustAcntClient = await this.custBService.detailBankAcnt(
        session.custCode,
        session.custType,
      );

      res.acntType = acnt.acntType;
      res.custCode = acnt.custCode;
      res.custType = acnt.custType;
      res.bankCode = acnt.bankCode;
      res.acntCode = acnt.acntCode;
      res.acntName = acnt.acntName;
      res.status = acnt.status;
      res.createdDatetime = acnt.createdDatetime;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }

  @Post('selectInvoice')
  async selectInvoice(@Headers() headers: any): Promise<PsCustInvoieRes> {
    const res: PsCustInvoieRes = new PsCustInvoieRes();
    try {
      const operCode = '2013';
      const session: PsSecSessionClient = await this.secBService.checkSession(
        headers,
        operCode,
      );

      const invoices: PsServiceInvoiceClient[] =
        await this.serviceBService.selectInvoice(
          session.custCode,
          session.custType,
        );

      const resData: PsCustInvoiceData[] = [];

      for (const i of invoices) {
        const data: PsCustInvoiceData = new PsCustInvoiceData();
        data.invoiceId = i.invoiceId;
        data.payAmt = i.payAmt;
        data.paidAmt = i.paidAmt;
        data.feeAmt = i.feeAmt;
        data.paidFeeAmt = i.paidFeeAmt;
        data.serviceType = i.serviceType;
        data.payCustCode = i.payCustCode;
        data.payCustType = i.payCustType;
        data.receiveCustCode = i.receiveCustCode;
        data.receiveCustType = i.receiveCustType;
        data.srcBankCode = i.srcBankCode;
        data.srcAcntCode = i.srcAcntCode;
        data.dstBankCode = i.dstBankCode;
        data.dstAcntCode = i.dstAcntCode;
        data.repayDate = i.repayDate;
        data.closedDatetime = i.closedDatetime;
        data.createdDatetime = i.createdDatetime;
        resData.push(data);
      }
      res.resData = resData;
    } catch (err) {
      res.responseCode = 99;
      res.responseDesc = err;
    }
    return res;
  }
}
