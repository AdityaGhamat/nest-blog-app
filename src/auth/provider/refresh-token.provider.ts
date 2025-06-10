import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/provider/users.service';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokenProvider } from './generate-token.provider';
import { ActiveUserInterface } from '../interface/active-user.interface';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    /**
     * Injecting jwt service
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting jwt configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Injecting user service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userSerivce: UsersService,

    /**
     * Injecting generate token provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  public async refreshTokens(refreshTokenDto: RefreshTokenDTO) {
    //verify the refresh token
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserInterface, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      //fetch user from database
      const user = await this.userSerivce.findById(sub);
      //generate the token
      return this.generateTokenProvider.generateToken(user);
    } catch (error) {
      throw new BadRequestException(error, {
        description: 'Failed to create access token from refresh token',
      });
    }
  }
}
