import { Injectable, Res } from "@nestjs/common";
import { CreateCategoryDto } from "./dtos/CreateCategory.dto";
import { Response } from "express";
import { BadRequestException } from "@nestjs/common";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}
  

  create (createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOneBy({id:id});
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    return category
  }

  async update(id: number, updateCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({id:id});
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    this.categoriesRepository.merge(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoriesRepository.findOneBy({id:id});
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    return this.categoriesRepository.remove(category);

  }



    
  



}
