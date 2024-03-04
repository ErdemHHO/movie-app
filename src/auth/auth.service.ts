import { Body, HttpStatus, Injectable, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dtos/SigninUser.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  signup() {}

  async signin(@Body() dto: SigninUserDto, @Res() res: Response): Promise<any> {
    const user = await this.userService.findUser(dto.email);

    if (!user)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Password is wrong' });

    const payload = { id: user.id, email: user.email, role: user.role };
    return res.status(HttpStatus.ACCEPTED).json({
      access_token: await this.jwtService.signAsync(payload),
    });
  }
}
