import { IsNotEmpty } from 'class-validator';

export class FindByGoogleDTO {
  @IsNotEmpty()
  googleId: string;
}
