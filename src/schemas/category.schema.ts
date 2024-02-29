import { Category } from "src/category/entities/category.entity";
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
    name: {
      type: String,
    },
  },
});
