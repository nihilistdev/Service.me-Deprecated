import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Customers } from "../customers/customers";
import { ServiceCenter } from "../service_center/ServiceCenter";
import { Staff } from "../staff/ScStaff";
import { TicketStatus } from "../ticket_status/TicketStatus";

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

  @Column({ type: "tsvector", select: false, nullable: true })
  document_with_weights: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Staff, (staff) => staff.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  staff: Staff[];

  @ManyToOne(() => Customers, (customers) => customers.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  customer: Customers[];

  @ManyToOne(() => ServiceCenter, (sc) => sc.sc_id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  sc: ServiceCenter[];

  @ManyToOne(() => TicketStatus, (t_status) => t_status.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  ticket_status: TicketStatus;
}
