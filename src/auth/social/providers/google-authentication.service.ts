import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDTO } from '../dto/google-token.dto';
import { UsersService } from 'src/users/provider/users.service';
import { GenerateTokenProvider } from 'src/auth/provider/generate-token.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    /*
     *injecting jwt configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Injecting userservice
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userSerivce: UsersService,

    /**
     * Injecting generateTokenProvider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  onModuleInit() {
    this.oauthClient = new OAuth2Client(
      this.jwtConfiguration.googleOauthClientId,
      this.jwtConfiguration.googleOauthClientSecret,
    );
  }
  public async authenticate(googleTokenDto: GoogleTokenDTO) {
    //verify the google token sent by the user
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });
    //extract the payload from Google jwt
    const {
      email,
      sub: googleId,
      given_name: firstname,
      family_name: lastname,
    } = loginTicket.getPayload();
    //find the user in database by field googleId (commom in both both payload and database)
    const user = await this.userSerivce.findByGoogleId({
      googleId,
    });
    //if google id exits, go ahead and generate tokens
    if (user) {
      return this.generateTokenProvider.generateToken(user);
    }
    //if it doesnot got ahead and create user,and then generate token
    if (!user) {
    }
    //throw unauthorized exception
  }
}
