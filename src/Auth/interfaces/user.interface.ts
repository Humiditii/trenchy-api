export interface UserI{
    name: string,
    profile?: string
}

export type UserBool = UserI | boolean

export type Pwd = boolean | string

export interface JwtPayLoad {
    userMail: string;
    username:string;
    userId: string;
}