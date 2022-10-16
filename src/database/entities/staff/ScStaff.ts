import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServiceCenter } from "../service_center/ServiceCenter";
import { StaffRoles } from "../StaffRoles/StaffRoles";
import { Ticket } from "../ticket/Ticket";
import { User } from "../user/user";

@Entity()
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  sc_sc_id: number;

  @Column()
  roles_id: number;

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  user: User;

  @ManyToOne(() => ServiceCenter, (sc) => sc.sc_id, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  sc: ServiceCenter;

  @ManyToOne(() => StaffRoles, (sr) => sr.id, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  roles: StaffRoles;

  @ManyToOne(() => Ticket, (ticket) => ticket.id)
  ticket: Ticket;
}
