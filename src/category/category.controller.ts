import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  ValidationPipe,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos/CreateCategory.dto";
import { Response } from "express";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/strategies/auth.guard";
import { RoleGuard } from "src/strategies/role.guard";

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @ApiTags("Category")
  @ApiOperation({ summary: "Create a new category" })
  @ApiCreatedResponse({ status: 200, description: "Category created" })
  @SetMetadata("roles", ["admin"])
  create(@Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiTags("Category")
  @ApiOperation({ summary: "Get all categories" })
  @ApiCreatedResponse({ status: 200, description: "Categories found" })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get("/:id")
  @ApiTags("Category")
  @ApiOperation({ summary: "Get category by id" })
  @ApiCreatedResponse({ status: 200, description: "Category found" })
  findOne(@Param("id") id: number) {
    console.log(id);
    return this.categoryService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Put("/:id")
  @ApiTags("Category")
  @ApiOperation({ summary: "Update category by id" })
  @ApiCreatedResponse({ status: 200, description: "Category updated" })
  @SetMetadata("roles", ["admin"])
  update(
    @Param("id") id: number,
    @Body(new ValidationPipe()) updateCategoryDto: CreateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Delete("/:id")
  @ApiTags("Category")
  @ApiOperation({ summary: "Delete category by id" })
  @ApiCreatedResponse({ status: 200, description: "Category deleted" })
  @SetMetadata("roles", ["admin"])
  remove(@Param("id") id: number) {
    return this.categoryService.remove(id);
  }
}
