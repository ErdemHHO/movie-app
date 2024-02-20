import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  categoryName: string;
}
