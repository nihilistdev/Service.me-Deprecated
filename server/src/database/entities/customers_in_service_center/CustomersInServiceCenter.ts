import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Customers } from "../customers/customers";
import { ServiceCenter } from "../service_center/ServiceCenter";
import { Staff } from "../staff/ScStaff";

@Entity("customer_in_service_center")
export class CustomersInServiceCenter extends BaseEntity {
  @PrimaryColumn()
  customers_id: number;

  @PrimaryColumn()
  service_centers_sc_id: number;

  @Column()
  staff_id: number;

  @ManyToOne(() => Customers, (customer) => customer.id)
  Customers: Customers;

  @ManyToOne(() => ServiceCenter, (serviceCenter) => serviceCenter.sc_id)
  ServiceCenters: ServiceCenter;

  @ManyToOne(() => Staff, (staff) => staff.id, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  staff: Staff;
}
