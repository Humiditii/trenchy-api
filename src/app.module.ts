import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './Posts/post.module';
import {AuthModule} from './Auth/auth.module';
import {MongooseModule} from '@nestjs/mongoose';
import {CommentModule} from './comments/comment.module';

@Module({
  imports: [PostModule,AuthModule,CommentModule, MongooseModule.forRoot(process.env.MONGO || 'mongodb://localhost:27017/nest-post-api')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
