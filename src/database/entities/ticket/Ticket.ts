import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Customers } from "../customers/customers";
import { ServiceCenter } from "../service_center/ServiceCenter";
import { Staff } from "../staff/ScStaff";

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  sc_sc_id: number;

  @Column()
  customer_id: number;

  @Column()
  staff_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Staff, (staff) => staff.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  staff: Staff[];

  @OneToMany(() => Customers, (customers) => customers.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  customer: Customers[];

  @OneToMany(() => ServiceCenter, (sc) => sc.sc_id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  sc: ServiceCenter[];
}
