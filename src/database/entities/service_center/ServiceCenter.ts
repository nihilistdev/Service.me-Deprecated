import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomersInServiceCenter } from "../customers_in_service_center/CustomersInServiceCenter";

@Entity()
export class ServiceCenter extends BaseEntity {
  @PrimaryGeneratedColumn()
  sc_id!: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  id_number: string;

  @OneToMany(
    () => CustomersInServiceCenter,
    (customer) => customer.service_centers_sc_id
  )
  customers: CustomersInServiceCenter[];
}
