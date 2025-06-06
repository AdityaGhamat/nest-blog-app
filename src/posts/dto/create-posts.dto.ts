import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
  IsISO8601,
  IsArray,
  IsInt,
} from 'class-validator';
import { PostTypes, POSTSTATUS } from '../enum/post.enum';
import { Tag } from 'src/tags/entity/tag.entity';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsEnum(PostTypes)
  @IsNotEmpty()
  postType: PostTypes;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEnum(POSTSTATUS)
  @IsNotEmpty()
  status: POSTSTATUS;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  schema?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishedOn: Date;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
