import { HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { CreateUserDto } from "./dtos/createUser.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async createUser(dto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Email already exists" });
    }

    if (dto.password !== dto.confirmPassword) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const newUser = this.usersRepository.create({
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    try {
      await this.usersRepository.save(newUser);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: "User saved", newUser });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occurred while saving user" });
    }
  }

  async findUser(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
