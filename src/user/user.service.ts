import { HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { GenericResponseErrMsg } from './generic-response-err-msg.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (user) {
      throw new GenericResponseErrMsg(
        'User already exists',
        HttpStatus.BAD_REQUEST,
        { ErrorType: 'DB', Date: new Date(), ServiceName: 'User Service' },
      );
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findUser(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
