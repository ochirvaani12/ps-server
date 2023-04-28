import { IsNotEmpty } from 'class-validator';

export class PsCustServiceReq {
  @IsNotEmpty()
  readonly recId: number;
}
