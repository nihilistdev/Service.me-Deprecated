import { Ticket } from "@database/entities/ticket/Ticket";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class TicketStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Ticket, (ticket) => ticket.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  ticket: Ticket[];
}
