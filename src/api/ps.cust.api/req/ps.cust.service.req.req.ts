import { IsNotEmpty } from 'class-validator';

export class PsCustServiceReqReq {
  @IsNotEmpty()
  readonly custCode: string;

  @IsNotEmpty()
  readonly custType: string;

  @IsNotEmpty()
  readonly serviceType: string;
}
