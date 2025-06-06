import { Module, forwardRef } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './provider/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag]), forwardRef(() => PostsModule)],
  exports: [TagsService],
})
export class TagsModule {}
