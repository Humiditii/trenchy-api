import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {Auth} from '../../Auth/schemas/auth.schema';
import {Post} from '../../Posts/schemas/post.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {

    @Prop({required:true})
    comment:string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required:true })
    postId:Post

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required:true})
    userId: Auth

    @Prop({required:false})
    image: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)