import { Category } from "src/entities/category.entity";
import { EntitySchema } from "typeorm";

export const CategorySchema = new EntitySchema<Category>({
  name: "Category",
  target: Category,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    categoryName: {
      type: String,
    },
  },
});
