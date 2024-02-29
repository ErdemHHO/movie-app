import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { AuthGuard } from "src/strategies/auth.guard";
import { RoleGuard } from "src/strategies/role.guard";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  @SetMetadata("roles", ["admin"])
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    return this.userService.createUser(dto, res);
  }
}
