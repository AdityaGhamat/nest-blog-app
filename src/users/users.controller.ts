import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './provider/users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateManyUserDTO } from './dto/create-many-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
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
