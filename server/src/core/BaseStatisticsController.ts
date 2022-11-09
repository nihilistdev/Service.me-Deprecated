import { HandleError } from "@utils/response/errors/Error";
import { EntityTarget, getRepository, ObjectLiteral } from "typeorm";

export class BaseStatisticsController<T extends EntityTarget<ObjectLiteral>> {
  constructor(private repository: T) {}

  async monthOpened(month: number, sc_id: number): Promise<T> {
    try {
      const response = await getRepository(this.repository).query(
        `
            SELECT 
                count(*) as ticket_count
            FROM public.ticket 
            where 
                extract('month' from created_at) = $1 
            and 
                sc_sc_id = $2 
            and 
                ticket_status_id != 4
            `,
        [month, sc_id]
      );
      return response;
    } catch (err) {
      throw new HandleError(400, "Raw", `${err.field} ${err.message}`);
    }
  }

  async monthClosed(month: number, sc_id: number): Promise<T> {
    try {
      const response = await getRepository(this.repository).query(
        `
            SELECT 
                count(*) as ticket_count
            FROM public.ticket 
            where 
                extract('month' from created_at) = $1 
            and 
                sc_sc_id = $2 
            and 
                ticket_status_id = 4
            `,
        [month, sc_id]
      );
      return response;
    } catch (err) {
      throw new HandleError(400, "Raw", `${err.field} ${err.message}`);
    }
  }

  async range(from: string, to: string, sc_id: number): Promise<T> {
    try {
      const response = await getRepository(this.repository).query(
        `
              SELECT 
                  count(*) as ticket_count
              FROM public.ticket 
              where 
                  created_at between $1::timestamp and $2::timestamp
              and 
                  sc_sc_id = $3 
              and 
                  ticket_status_id != 4
              `,
        [from, to, sc_id]
      );
      return response;
    } catch (err) {
      throw new Error(`${err.field}: ${err.message}`);
    }
  }

  async monthlyStats() {
    try {
      const response = await getRepository(this.repository).query(
        `
       select
          DATE_TRUNC('month', created_at) as month
          , COUNT(id) as count
        from
          ticket
        group by
          DATE_TRUNC('month', created_at);
        `
      );
      return response;
    } catch (err) {
      throw new Error(`${err.field} ${err.message}`);
    }
  }
}
