import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {

    @Prop({required:true})
    name: string;

    @Prop({required: true})
    password: string;

    @Prop({required: false})
    profile: string;

    @Prop({required:true})
    email:string

}


export const AuthSchema = SchemaFactory.createForClass(Auth);