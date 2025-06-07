import {
  Injectable,
  NotFoundException,
  Query,
  RequestTimeoutException,
} from '@nestjs/common';
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
    let response;
    try {
      response = await this.postRepository.find({
        relations: {
          author: true,
          tags: true,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return response;
  }

  public async editPost(updatePostDto: UpdatePostDTO) {
    //finding tags
    let tags = undefined;
    let post = undefined;
    try {
      tags = await this.tagService.findMultipleTags(updatePostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!tags) {
      throw new NotFoundException('Requested tag is not found', {
        description: 'Tag is not in database',
      });
    }
    //finding post
    try {
      post = await this.postRepository.findOneBy({
        id: updatePostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!post) {
      throw new NotFoundException('Requested post is not found', {
        description: 'Post is not in database',
      });
    }
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

  public async softDeletePost(id: number) {
    try {
      await this.postRepository.softDelete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return { deleted: true, id };
  }
}
