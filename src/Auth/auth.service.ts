import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {Auth, AuthDocument} from './schemas/auth.schema';
import {CreateUserDto} from './dtos/create-user.dto';
import {UserBool, Pwd, JwtPayLoad} from './interfaces/user.interface';
import {hashSync,genSaltSync,compareSync, hash} from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
        private jwtService: JwtService){}

    async registerNewUsers( createUserDto: CreateUserDto ): Promise<Auth> {

        const is_user = await this.getUser(createUserDto.email)

        if(is_user){
            throw new HttpException('User exist!', HttpStatus.FORBIDDEN);
        }

        if(createUserDto.confirmPwd !== createUserDto.password){
            throw new HttpException('mismatch password', HttpStatus.FORBIDDEN);
        }
        createUserDto.password = this.passwordServiceMethod(createUserDto.password) as string
        const newUser = new this.authModel(createUserDto)
        return newUser.save()
    }

    async signUser(signinPayload: JwtPayLoad): Promise<string>{
        const payload: JwtPayLoad = signinPayload
        const jwtToken:string = this.jwtService.sign(payload)
        return jwtToken
    }

    async getUser(email:string, show?:boolean): Promise<UserBool> {
        const get_user = await this.authModel.findOne({email:email})
        if(get_user && show){
            return get_user
        }
        if(get_user && !show){
            return true
        }
        return false
    }

    passwordServiceMethod(plain:string, encoded?:string):Pwd {
        if(!encoded){
            // hash plain-text
            const salt:string = genSaltSync()
            return hashSync(plain, salt)
        }
        // compare
        return compareSync(plain, encoded)
    }
}