import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class PsCustRegisterReq {
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly mobileNo: string;

  @IsNotEmpty()
  readonly registerCode: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(16)
  readonly password: string;
}
