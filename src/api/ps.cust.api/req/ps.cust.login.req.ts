import {
  IsNotEmpty,
  IsNumberString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class PsCustLoginReq {
  @IsNotEmpty()
  @IsNumberString()
  readonly loginCode: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(16)
  readonly password: string;

  @IsNotEmpty()
  readonly deviceId: string;

  @IsNotEmpty()
  readonly ip: string;
}
