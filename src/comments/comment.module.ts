import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {Comment, CommentSchema} from './schemas/comment.schema';

@Module({
    providers: [CommentService],
    controllers: [CommentController],
    exports: [],
    imports: [MongooseModule.forFeature([{name:Comment.name, schema:CommentSchema}])]
})

export class CommentModule {}