import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Request, Res, UseGuards } from "@nestjs/common";
import {JwtAuthGuard} from '../Auth/guards/jwt-auth.guard';
import {CommentService} from './comment.service';
import {WriteCommentDto} from './dtos/write.dto';
import {EditCommentDto} from './dtos/edit.dto';

@Controller('comment')
@UseGuards(JwtAuthGuard)
export class CommentController {
    constructor(
        private commentService: CommentService
    ){}

    @Get('/comments/:postId')
    async getCommentsOnPost(
        @Res() res,
        @Param('postId') postId
    ):Promise<Response>{
        const comments = await this.commentService.getCommentsOnPost(postId)
        return res.status(200).json({
            message: 'comments fetched',
            data: comments
        })
    }

    @Post('/write/:postId')
    async writeComment(
        @Body() writeCommentDto:WriteCommentDto,
        @Res() res,
        @Request() req,
        @Param('postId') postId
    ): Promise<Response>{
        writeCommentDto.postId = postId
        writeCommentDto.userId = req.user.userId
        const write_comment = await this.commentService.writeCommentOnPost(writeCommentDto)
        return res.status(201).json({
            message: 'comment sent!',
            data: write_comment
        })
    }

    @Delete('/delete/:commentId')
    async deleteComment(
        @Res() res,
        @Param('commentId') commentId
    ): Promise<Response>{
        try {

            await this.commentService.deleteCommentOnPost(commentId)

            return res.status(200).json({
                message:'deleted!'
            })

        } catch (error) {
            throw new HttpException('error deleting', 500)
        }
      
    }

    @Patch('/edit/:commentId')
    async editComment(
        @Param('commentId') commentId,
        @Res() res,
        @Body() editCommentDto: EditCommentDto
    ){
        editCommentDto.commentId = commentId
        const edited = await this.commentService.editCommentOnPost(editCommentDto)
        return res.status(200).json({
            message: 'comment edited',
            data: edited
        })
    }

}