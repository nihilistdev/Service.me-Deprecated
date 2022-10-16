import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { City } from "../city/City";
import { CustomersInServiceCenter } from "../customers_in_service_center/CustomersInServiceCenter";
import { Staff } from "../staff/ScStaff";
import { Ticket } from "../ticket/Ticket";
import { User } from "../user/user";

@Entity()
export class ServiceCenter extends BaseEntity {
  @PrimaryGeneratedColumn()
  sc_id!: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  city_id: number;

  @Column()
  phone: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  id_number: string;

  @Column({ nullable: true })
  owner_id: number;

  @OneToMany(
    () => CustomersInServiceCenter,
    (customer) => customer.service_centers_sc_id,
    {
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    }
  )
  customers: CustomersInServiceCenter[];

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  owner: User;

  @ManyToOne(() => City, (city) => city.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  city: City;

  @ManyToOne(() => Ticket, (ticket) => ticket.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  ticket: Ticket;

  @OneToMany(() => Staff, (s) => s.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  staff: Staff[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
