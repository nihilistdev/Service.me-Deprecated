import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  iso2: string;

  @Column({ unique: true })
  iso3: string;

  @Column("tsvector", { select: false, nullable: true })
  document_with_weights: any;
}
