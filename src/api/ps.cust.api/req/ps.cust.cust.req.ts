import { IsNotEmpty } from 'class-validator';

export class PsCustCustReq {
  @IsNotEmpty()
  readonly custCode: string;

  @IsNotEmpty()
  readonly custType: string;
}
