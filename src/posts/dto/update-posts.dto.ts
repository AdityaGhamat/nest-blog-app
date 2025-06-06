import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './create-posts.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
