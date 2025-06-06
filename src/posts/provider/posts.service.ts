import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../dto/create-posts.dto';
import { UsersService } from 'src/users/provider/users.service';
import { TagsService } from 'src/tags/provider/tags.service';
import { UpdatePostDTO } from '../dto/update-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    /*
        Injecting Post Entity
        */

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    /*
    Injecting User Service
    */
    private readonly userService: UsersService,

    /*
    Inject Tag service
    */
    private readonly tagService: TagsService,
  ) {}

  public async createPost(createPostDto: CreatePostDTO) {
    const author = await this.userService.findById(createPostDto.authorId);
    const tags = await this.tagService.findMultipleTags(createPostDto.tags);
    const response = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });
    return await this.postRepository.save(response);
  }

  public async findAllPosts() {
    const response = await this.postRepository.find({
      relations: {
        author: true,
        tags: true,
      },
    });
    return response;
  }

  public async editPost(updatePostDto: UpdatePostDTO) {
    //finding tags
    const tags = await this.tagService.findMultipleTags(updatePostDto.tags);

    //finding post
    const post = await this.postRepository.findOneBy({ id: updatePostDto.id });

    //updating post

    post.title = updatePostDto.title ?? post.title;
    post.content = updatePostDto.content ?? post.title;
    post.featuredUrlImage =
      updatePostDto.featuredImageUrl ?? post.featuredUrlImage;
    post.postType = updatePostDto.postType ?? post.postType;
    post.schema = updatePostDto.schema ?? post.schema;
    post.status = updatePostDto.status ?? post.status;
    post.publishedOn = updatePostDto.publishedOn ?? post.publishedOn;
    post.slug = updatePostDto.slug ?? post.slug;

    //updating tags
    post.tags = tags;

    return await this.postRepository.save(post);
  }

  public async deletePost(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true, id };
  }
}
