import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import {MongooseModule} from '@nestjs/mongoose';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import  {Auth, AuthSchema} from './schemas/auth.schema';
import {config} from './configs/config';
import {JwtStrategy} from './guards/jwt.strategy';

@Module({
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([{name: Auth.name , schema: AuthSchema}]), 
        JwtModule.register({
            secret: config.jwtSecrete,
            signOptions: { expiresIn: '24h' },
            })
        ],
    exports: []
})

export class AuthModule {}  