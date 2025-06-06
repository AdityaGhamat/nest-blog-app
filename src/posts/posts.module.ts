import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './provider/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostMetaOptionsEntity } from './entity/post.metaOptions.entity';
import { UsersService } from 'src/users/provider/users.service';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    UsersModule,
    forwardRef(() => TagsModule),
  ],
  exports: [PostsService],
})
export class PostsModule {}
