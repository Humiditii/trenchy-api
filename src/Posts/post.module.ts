import { Module } from "@nestjs/common";
import { PostController } from './post.controller';
import {PostService} from './post.service';
import {MongooseModule} from '@nestjs/mongoose';
import {PostSchema, Post} from './schemas/post.schema';


@Module({
    providers: [PostService],
    controllers:[PostController],
    imports: [MongooseModule.forFeature([{name:Post.name, schema: PostSchema}])],
    exports: []
})

export class PostModule {}