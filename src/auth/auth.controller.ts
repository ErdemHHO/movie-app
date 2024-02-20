import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninUserDto } from "./dtos/SigninUser.dto";
import { Response } from "express";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post("signup")
  // signup() {
  //   return this.authService.signup();
  // }

  @Post("signin")
  signin(@Body() dto: SigninUserDto, @Res() res: Response) {
    return this.authService.signin(dto, res);
  }
}
