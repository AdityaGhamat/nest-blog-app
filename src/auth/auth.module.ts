import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';

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
  imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
