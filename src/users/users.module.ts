import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './provider/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CreateManyUsersProvider } from './provider/create-many-users.provider';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './provider/create-user.provider';
import { FindByEmailProvider } from './provider/find-by-email.provider';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateManyUsersProvider,
    CreateUserProvider,
    FindByEmailProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [UsersService],
})
export class UsersModule {}
