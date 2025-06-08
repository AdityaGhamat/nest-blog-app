import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  providers: [
    AuthService,
    BcryptProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, HashingProvider],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
