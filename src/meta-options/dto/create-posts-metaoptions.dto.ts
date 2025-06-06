import { IsNotEmpty, IsJSON } from 'class-validator';

export class CreatePostsMetaOptionDTO {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
