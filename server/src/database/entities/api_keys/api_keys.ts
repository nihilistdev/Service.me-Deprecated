import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "@database/entities/user/user";

@Entity()
export class ApiKeys extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  key: string;

  @ManyToOne(() => User, (user) => user.id)
  user_api_key: number;
}
