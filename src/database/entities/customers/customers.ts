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
import { CustomersInServiceCenter } from "../customers_in_service_center/CustomersInServiceCenter";
import { Ticket } from "../ticket/Ticket";

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

  @Column({ nullable: true, unique: true, type: "bigint" })
  pin!: number;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_date: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column("tsvector", { select: false, nullable: true })
  document_with_weights: any;

  @OneToMany(
    () => CustomersInServiceCenter,
    (serviceCenter) => serviceCenter.customers_id
  )
  ServiceCenter: CustomersInServiceCenter[];

  @ManyToOne(() => Ticket, (ticket) => ticket.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  ticket: Ticket;
}
