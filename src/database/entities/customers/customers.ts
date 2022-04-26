import { Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class Customers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  last_name!: string;

  @Column()
  email: string;

  @Column({ unique: true, type: "bigint" })
  pin!: number;

  @Column()
  phone!: string;
}
