import { HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserParams } from "src/utils/types";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //Create User
  async createUser(dto: CreateUserParams, @Res() res: Response) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    console.log(user);

    if (user)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Email already exist" });

    if (dto.password != dto.confirmPassword) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Passwords are not same" });
    }

    console.log("Parola kontrolü geçti");

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    console.log("Password hashed");

    const newUser = await this.usersRepository.create({
      ...dto,
      password: hashedPassword,
      createdAt: new Date(),
      role: dto.role || "user",
    });

    await this.usersRepository.save(newUser);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: "User saved", newUser });
  }

  async findUser(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
