import { Global, Module } from '@nestjs/common';
import { NotificationsService } from './providers/notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
@Global()
@Module({
  exports: [NotificationsService],
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('appConfig.nodemailer_host'),
          secure: false,
          port: config.get('appConfig.nodemailer_port'),
          auth: {
            user: config.get('appConfig.nodemailer_user'),
            pass: config.get('appConfig.nodemailer_password'),
          },
        },
        default: {
          from: `My blog <no-reply@nestjs-blog.com>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [NotificationsService],
})
export class NotificationsModule {}
