import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {Auth} from '../../Auth/schemas/auth.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Auth'})
    writer:Auth;

    @Prop({required: true})
    post:string

    @Prop({required:false, default: 0})
    comment_count:number

    @Prop({default:new Date()})
    modified_date: Date

}

export const PostSchema = SchemaFactory.createForClass(Post);