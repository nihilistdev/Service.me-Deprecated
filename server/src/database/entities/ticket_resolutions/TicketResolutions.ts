import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Staff } from "../staff/ScStaff";
import { Ticket } from "../ticket/Ticket";

@Entity()
export class TicketResolutions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  ticket_id: number;

  @Column()
  staff_id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  ticket: Ticket;

  @ManyToOne(() => Staff, (staff) => staff.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  staff: Staff;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
