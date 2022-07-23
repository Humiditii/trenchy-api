import {
    Get,
    Post,
    Param,
    Delete,
    Patch,
    ParseIntPipe,
    ParseArrayPipe,
    Controller,
    Res,
    HttpCode,
    Body,
    UseGuards,
    Request,
    HttpException
} from '@nestjs/common';

import {Response, NextFunction} from 'express';
import {JwtAuthGuard} from '../Auth/guards/jwt-auth.guard';

import {PostService} from './post.service';
import {writePostDto} from './dtos/write-post.dto';
import {Post as postType} from './schemas/post.schema';
import {EPost} from './interfaces/edit-post.interface';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private postService: PostService){}

    @Get('')
    @HttpCode(200)
    getDefault(
        @Res() res: Response
    ):Response{
        return res.json({msg: this.postService.getDefaultPost()})
    }

    @Post('/write')
    async writePost(
        @Body() writePostDto:writePostDto,
        @Request() req,
        @Res() res
    ):Promise<Response|postType>{
        writePostDto.writer = req.user.userId
        const new_post = await this.postService.writePost(writePostDto)
        return res.status(201).json({
            message: `new post uploaded by ${req.user.username}`,
            data: new_post
        })
    }

    @Patch('/edit/:postId')
    async editPost(
        @Request() req,
        @Param('postId') postId,
        @Res() res,
        @Body() {post}
    ): Promise<Response>{
        if(!post){
            return res.status(422).json({
                message:'Post parameter required'
            })  
        }
        const editPayload:EPost = {
            postId: postId,
            post: post
        }
        const edited = await this.postService.editPost(editPayload)

        return res.status(200).json({
            message: 'success',
            data:edited
        })
    }

    @Get('/posts')
    async getAllPosts(
        @Res() res,
        @Request() req,
        ): Promise<postType|Response>{
            try {
                const posts = await this.postService.getUserPosts(req.user.userId)
                return res.status(200).json({
                    message: 'user posts fetched',
                    data: posts
                })
            } catch (error) {
                throw new HttpException('server error', 500)
            }
        
    }

    @Delete('/delete/:postId')
    async deletePost(
        @Param('postId') postId,
        @Res() res
    ): Promise<Response>{
        const deleted = await this.postService.deletePost(postId)
        if(!deleted){
            throw new HttpException('server error', 500)
        }
        return res.status(200).json({message: 'post deleted'})
    }

    // @Get('/post/:postId/comment')
    // async getCommentsOnPost(
    //     @Param('postId') postId
    // ){
        
    // }

}