import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './provider/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateManyUsersProvider } from './provider/create-many-users.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateManyUsersProvider],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
