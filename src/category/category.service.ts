import { Injectable, Res } from "@nestjs/common";
import { CreateCategoryDto } from "./dtos/CreateCategory.dto";
import { Response } from "express";

@Injectable()
export class CategoryService {
  addCategory(dto: CreateCategoryDto, @Res() res: Response) {
    return console.log(dto);
  }
}
