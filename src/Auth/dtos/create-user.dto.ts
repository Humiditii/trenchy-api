
export class CreateUserDto {
    readonly name: string;
    password: string;
    readonly profile?:string;
    readonly confirmPwd: string;
}