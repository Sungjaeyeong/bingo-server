import { IsNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly accessToken: string;

  @IsNumber()
  readonly userId: number;

  @Length(1, 10)
  @IsString()
  readonly username: string;

  @IsString()
  readonly profileImage: string;
}