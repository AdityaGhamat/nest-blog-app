import { Injectable } from '@nestjs/common';
import { SignInDTO } from '../dto/signin.dto';

import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting signIn provider
     */
    private readonly signinProvider: SignInProvider,
  ) {}
  public async signIn(signInDto: SignInDTO) {
    return this.signinProvider.signIn(signInDto);
  }
}
