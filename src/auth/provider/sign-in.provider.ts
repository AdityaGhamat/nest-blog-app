import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';
import { HashingProvider } from './hashing.provider';
import { User } from 'src/users/entity/user.entity';
import { SignInDTO } from '../dto/signin.dto';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Injecting user service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    /**
     * Injecting Hashing Provider
     */
    private readonly hashProvider: HashingProvider,

    /**
     * Injecting Generate Token Provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  public async signIn(signInDto: SignInDTO) {
    let user: undefined | User;
    let password;
    user = await this.userService.findByEmail(signInDto.email);
    password = await this.hashProvider.comparePassword(
      signInDto.password,
      user.password,
    );
    if (!password) {
      throw new BadRequestException('Failed to sign in', {
        description: 'Either email or password is incorrect.',
      });
    }

    return await this.generateTokenProvider.generateToken(user);
  }
}
