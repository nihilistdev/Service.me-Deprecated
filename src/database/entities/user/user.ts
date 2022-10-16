import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ServiceCenter } from "../service_center/ServiceCenter";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true, default: false })
  confirmed: boolean;

  @Column({ nullable: true, default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ServiceCenter, (ServiceCenter) => ServiceCenter.sc_id, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  ownerOf: ServiceCenter[];
}
