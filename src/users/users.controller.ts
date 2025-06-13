import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './provider/users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateManyUserDTO } from './dto/create-many-users.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @Auth(AuthType.None)
  public createUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto);
  }

  @Post('create-many')
  public createUsers(@Body() createUsesrDto: CreateManyUserDTO) {
    return this.userService.createMany(createUsesrDto);
  }
  @Get('/something')
  public getSomething() {
    return 'Returning Something';
  }
}
