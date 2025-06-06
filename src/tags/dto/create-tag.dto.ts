import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTagDTO {
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  schema?: string;

  @IsString()
  @IsOptional()
  featuredImageUrl?: string;
}
