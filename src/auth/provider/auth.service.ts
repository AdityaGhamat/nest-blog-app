import { Injectable } from '@nestjs/common';
import { SignInDTO } from '../dto/signin.dto';

import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting signIn provider
     */
    private readonly signinProvider: SignInProvider,
    /**
     * Injecting Refresh Token Provider
     */
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}
  public async signIn(signInDto: SignInDTO) {
    return this.signinProvider.signIn(signInDto);
  }
  public async refreshToken(refreshTokenDto: RefreshTokenDTO) {
    return this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
