import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "../country/Country";
import { ServiceCenter } from "../service_center/ServiceCenter";

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  postal_code?: number;

  @Column({ nullable: true })
  country_name: string;

  @ManyToOne(() => Country, (country) => country.id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    nullable: true,
  })
  country: Country;

  @OneToMany(() => ServiceCenter, (sc) => sc.sc_id, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  sc: ServiceCenter[];

  @Column("tsvector", { select: false, nullable: true })
  document_with_weights: any;
}
