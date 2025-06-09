import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './provider/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostMetaOptionsEntity } from './entity/post.metaOptions.entity';
import { UsersService } from 'src/users/provider/users.service';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './provider/create-post.provider';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostProvider],
  imports: [
    TypeOrmModule.forFeature([Post]),
    UsersModule,
    forwardRef(() => TagsModule),
    PaginationModule,
  ],
  exports: [PostsService],
})
export class PostsModule {}
