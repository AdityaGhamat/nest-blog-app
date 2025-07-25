import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
