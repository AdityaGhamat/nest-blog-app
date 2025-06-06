import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        url: 'postgresql://neondb_owner:npg_eq6joyVGu2XH@ep-fragrant-mouse-a1hlkbns-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
      }),
    }),
    UsersModule,
    MetaOptionsModule,
    PostsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
