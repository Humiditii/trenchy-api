import {
    Get,
    Post,
    Res,
    HttpCode,
    Controller,
    Body,
    HttpException,
    HttpStatus,
    Req,
    Request,
    UseGuards
} from '@nestjs/common';
import {Response} from 'express';
import { Model } from 'mongoose';
import {AuthService} from './auth.service';
import {CreateUserDto} from './dtos/create-user.dto';
import {SigninDto} from './dtos/signin-user.dto';
import {UserI, JwtPayLoad} from './interfaces/user.interface';
import { Auth, AuthDocument } from './schemas/auth.schema';
import {JwtAuthGuard} from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    @HttpCode(201)
    async signup(
        @Body() userDetails: CreateUserDto,
        @Res() res: Response): Promise<Response> {
            const checkUser = await this.authService.getUser(userDetails.email)
            if(checkUser){
                return res.status(400).json({msg: 'User exists'})
            }
    
            const newUser = await this.authService.registerNewUsers(userDetails)
            return res.json({
                msg: 'New user created',
                data: newUser
            })
            
    }

    @Post('/signin')
    async signin(
        @Res() res: Response,
        @Body() loginDetails: SigninDto): Promise<any|Response|Auth>{

            const checkUser = await this.authService.getUser(loginDetails.email, true)
            if(!checkUser){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            }
            const user: AuthDocument = checkUser as AuthDocument
            const isSame = this.authService.passwordServiceMethod(loginDetails.password, user.password)
            if(isSame){
                const payload:JwtPayLoad = {
                    userMail: user.email,
                    userId: user._id
                }
                const jwt_token = await this.authService.signUser(payload)
                return res.json({
                    checkUser,
                    jwt_token
                })
            }
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED)           
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(
        @Request() req,
        @Res() res: Response){
            const this_user = await this.authService.getUser(req.user.username, true)
            return res.status(HttpStatus.OK).json({
                this_user
            })
    }

}