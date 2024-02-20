import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: new wDate() })
  CreatedAt: Date;

  @Column()
  password: string;

  @Column()
  email: string;
}
