import { IsEmail, IsNotEmpty } from "class-validator";

export class SigninUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
