import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Staff } from "../staff/ScStaff";

@Entity()
export class StaffRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Staff, (staff) => staff.id, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  staff: Staff[];
}
