import { IsBoolean, IsNumber, isString, IsString } from "class-validator";

export class KakaoUserDto {
  @IsNumber()
  readonly id: number;
  readonly properties: Properties;
  readonly kakao_account: Kakao_accout;
  readonly profile: Profile;
}
class Properties {
  @IsString()
  nickname: string;
  @IsString()
  profile_image: string;
  @IsString()
  thumbnail_image: string;
}
class Kakao_accout {
  @IsBoolean()
  profile_needs_agreement: boolean;
}
class Profile {
  @IsString()
  nickname: string;
  @IsString()
  thumbnail_image_url: string;
  @IsString()
  profile_image_url: string;
}