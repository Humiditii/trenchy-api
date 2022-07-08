import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {CommentDocument, Comment} from './schemas/comment.schema';
import {Model} from 'mongoose';
import {WriteCommentDto} from './dtos/write.dto';
import {EditCommentDto} from './dtos/edit.dto';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument> ){}
    
    async writeCommentOnPost(writeCommentDto:WriteCommentDto):Promise<Comment>{
       
        const comment = new this.commentModel(writeCommentDto)

        return comment.save()
    }

    async deleteCommentOnPost(commentId):Promise<boolean>{
        // commentId, postId
        const del_comment = await this.commentModel.findByIdAndDelete(commentId).exec()
        return Boolean(del_comment)
    }

    async editCommentOnPost(editComment:EditCommentDto):Promise<CommentDocument>{
        // commentId, postId
        try {
            return this.commentModel.findByIdAndUpdate({_id:editComment.commentId}, {comment:editComment.comment}, {new: true})
        } catch (error) {
            throw new HttpException('error in editing comment', 500)
        }

    }

    async getCommentsOnPost(postId:string):Promise<Comment[]>{
        try {
            return this.commentModel.find({postRef:postId}).exec()
        } catch (error) {
            throw new HttpException('unable to get comments', 500)
        }
    }

}