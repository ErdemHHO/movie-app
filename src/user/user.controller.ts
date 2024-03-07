import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { AuthGuard } from '../strategies/auth.guard';
import { RoleGuard } from '../strategies/role.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  @SetMetadata('roles', ['admin'])
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
