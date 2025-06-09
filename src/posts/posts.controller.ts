import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './provider/posts.service';
import { CreatePostDTO } from './dto/create-posts.dto';
import { Body } from '@nestjs/common';
import { UpdatePostDTO } from './dto/update-posts.dto';
import { GetPostsDTO } from './dto/get-all-posts-param.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/auth/interface/active-user.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDTO,
    @ActiveUser() activeUser: ActiveUserInterface,
  ) {
    return this.postService.createPost(createPostDto, activeUser);
  }

  @Get()
  public getAllPosts(@Query() getPostsDto: GetPostsDTO) {
    return this.postService.findAllPosts(getPostsDto);
  }

  @Patch()
  public editPost(@Body() updatePostDto: UpdatePostDTO) {
    return this.postService.editPost(updatePostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }

  @Delete('soft-delete')
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.postService.softDeletePost(id);
  }
}
