import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Customers } from "../customers/customers";
import { ServiceCenter } from "../service_center/ServiceCenter";

@Entity("customer_in_service_center")
export class CustomersInServiceCenter extends BaseEntity {
  @PrimaryColumn()
  customers_id: number;

  @PrimaryColumn()
  service_centers_sc_id: number;

  @ManyToOne(() => Customers, (customer) => customer.id)
  Customers: Customers;

  @ManyToOne(() => ServiceCenter, (serviceCenter) => serviceCenter.sc_id)
  ServiceCenters: ServiceCenter;
}
