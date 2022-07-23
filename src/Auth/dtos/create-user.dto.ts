
export class CreateUserDto {
    readonly name: string;
    password: string;
    readonly email: string;
    readonly profile?: string;
    readonly confirmPwd: string;
}