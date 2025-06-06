import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  lastname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(256)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  password: string;
}
