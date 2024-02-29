import { EntitySchema } from "typeorm";
import { User } from "../user/entities/user.entity";

export const UserSchema = new EntitySchema<User>({
  name: "User",
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
});
