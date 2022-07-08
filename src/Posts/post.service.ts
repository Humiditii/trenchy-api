import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {Post, PostDocument} from './schemas/post.schema';
import  {EPost} from './interfaces/edit-post.interface';
import {writePostDto} from './dtos/write-post.dto';
import {GPosts} from './interfaces/get-posts.interface';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument> ){}
    private readonly defaultPost: string = 'This is the default post of the post service';

    getDefaultPost(): string{
        return this.defaultPost
    }

    getUserPosts(writerId:GPosts): Promise<Post[]>{
        return this.postModel.find({writer:writerId}).exec()
    }

    async writePost(writePostDto:writePostDto): Promise<Post>{
        const new_post = new this.postModel(writePostDto)
        return new_post.save()
    }

    async deletePost(postId:string):Promise<boolean>{
        const delete_post = await this.postModel.findByIdAndRemove(postId)
        return Boolean(delete_post)
    }

    async editPost(editPost:EPost):Promise<Post>{
     
        try {

            const edit_post = this.postModel.findByIdAndUpdate({_id:editPost.postId},{post: editPost.post}, {new:true})
            return edit_post
        } catch (error) {
            throw new HttpException('invalid post selected', 500)
        }
    }
}