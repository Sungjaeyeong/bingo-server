import { IsString } from 'class-validator';

export class GoogleUserDto {
  @IsString()
  readonly sub: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly given_name: string;

  @IsString()
  readonly picture: string;

  @IsString()
  readonly locale: string;

}