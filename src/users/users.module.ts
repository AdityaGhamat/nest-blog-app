import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './provider/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateManyUsersProvider } from './provider/create-many-users.provider';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './provider/create-user.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateManyUsersProvider, CreateUserProvider],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
