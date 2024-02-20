import { Controller, Post, Res } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos/CreateCategory.dto";
import { Response } from "express";

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async addCategory(dto: CreateCategoryDto, @Res() res: Response) {
    return this.categoryService.addCategory(dto, res);
  }
}
