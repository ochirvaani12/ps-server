import { IsNotEmpty } from 'class-validator';

export class PsCustConfirmServiceReqReq {
  @IsNotEmpty()
  readonly spCustCode: string;

  @IsNotEmpty()
  readonly spCustType: string;

  @IsNotEmpty()
  readonly serviceType: string;

  @IsNotEmpty()
  readonly startDatetime: Date;

  @IsNotEmpty()
  readonly duration: number;
}
