import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Customers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email: string;

  @Column({ unique: true, type: "bigint" })
  pin!: number;

  @Column()
  phone!: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_date: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column("tsvector", { select: false, nullable: true })
  document_with_weights: any;
}
