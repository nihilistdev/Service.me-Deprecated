import { HandleError } from "@utils/response/errors/Error";
import {
  EntityTarget,
  getRepository,
  InsertResult,
  ObjectLiteral,
  UpdateResult,
} from "typeorm";

export default class BaseController<T extends EntityTarget<ObjectLiteral>>
  implements BaseControllerFunctions<T>
{
  constructor(private repository: T) {}

  async list(
    page: number,
    limit: number,
    where?: Where,
    params?: ObjectLiteral,
    normalList?: boolean,
    orderBy?: {
      fields?: string;
      direction?: "ASC" | "DESC" | undefined;
    }
  ): Promise<PaginatedResponse | any[]> {
    if (normalList) {
      return await getRepository(this.repository)
        .createQueryBuilder(this.repository.toString()[0])
        .where(where, params)
        .getMany();
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const count = await getRepository(this.repository)
      .createQueryBuilder(this.repository.toString()[0])
      .where(where, params)
      .getCount();
    const pages = Math.ceil(count / limit);

    const data: PaginatedResponse = {
      startIndex,
      endIndex,
      pages,
      next: {},
      previous: {},
      results: {},
    };

    if (endIndex < count) {
      data.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      data.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      if (page > pages) throw new HandleError(400, "Raw", "Page limit excided");
      data.results = await getRepository(this.repository)
        .createQueryBuilder(this.repository.toString()[0])
        .where(where, params)
        .offset(startIndex)
        .limit(limit)
        .orderBy(
          (orderBy?.fields as string) || "id",
          orderBy?.direction || "ASC"
        )
        .getMany();
      return data;
    } catch (err) {
      throw new HandleError(400, "Raw", err.message);
    }
  }

  async create(
    params?: ObjectLiteral | undefined,
    options?: OptionsParams
  ): Promise<InsertResult | undefined> {
    if (options?.checkIfAlreadyExists) {
      if (!(await this.checkIfExists(params as ObjectLiteral)))
        throw new HandleError(
          406,
          "Validation",
          "There is already record with given data"
        );
    }

    if (options?.checkTypes) {
      this.validateTypes(params || {});
      throw new HandleError(400, "General", "User exists by given details");
    }

    try {
      const query = await getRepository(this.repository)
        .createQueryBuilder()
        .insert()
        .into(this.repository)
        .values(params as ObjectLiteral)
        .returning("*")
        .execute();

      if (!query.raw[0]) {
        throw new HandleError(
          400,
          "General",
          "There was an error while creating account"
        );
      }
      return query;
    } catch (err) {
      throw new HandleError(400, "Raw", err.message);
    }
  }

  async update(
    instance: any,
    params?: ObjectLiteral | undefined,
    where?: Where,
    parameters?: ObjectLiteral | undefined
  ): Promise<UpdateResult | undefined> {
    try {
      if (!instance) {
        throw new HandleError(400, "Raw", "No instance is passed");
      }

      const query = await getRepository(this.repository)
        .createQueryBuilder()
        .update()
        .set(params as ObjectLiteral)
        .where(where || "")
        .setParameters(parameters || {})
        .returning("*")
        .execute();
      if (!query.raw[0]) {
        throw new HandleError(
          400,
          "Raw",
          "There was an error while updating customer"
        );
      }
      return query;
    } catch (err) {
      throw new HandleError(400, "Raw", err.message);
    }
  }

  async filter(
    param?: string,
    where?: Where,
    whereParams?: ObjectLiteral
  ): Promise<T | T[]> {
    if (!param) return {} as T;
    try {
      const query = await getRepository(this.repository)
        .createQueryBuilder()
        .select()
        .where(
          `document_with_weights @@ to_tsquery(concat(:query::text,':*')) ${
            where ? `and ${where}` : ""
          }`,
          {
            query: param,
            ...(whereParams || {}),
          }
        )
        .orderBy(
          "ts_rank(document_with_weights, to_tsquery(concat(:query::text,':*')))",
          "DESC"
        )
        .getMany();
      return query as T | T[];
    } catch (err) {
      throw new HandleError(400, err.field, err.message);
    }
  }

  async delete(param?: ObjectLiteral): Promise<boolean> {
    if (!param) return false;
    try {
      const query = await getRepository(this.repository).softDelete(param);
      if (query) return true;
    } catch (err) {
      throw new HandleError(400, "Raw", err.message);
    }
    return false;
  }

  private async checkIfExists(params: ObjectLiteral) {
    const query = await getRepository(this.repository).findOne({
      where: { ...params },
    });
    if (query) {
      return false;
    }
    return true;
  }

  async query(query: string, params?: any): Promise<any> {
    try {
      return await getRepository(this.repository).query(query, params);
    } catch (err) {
      throw new HandleError(400, "Raw", err.field, err.message);
    }
  }

  async paginationViewQuery(
    query: string,
    page: number,
    limit: number,
    where?: ViewQueryWhere,
    params?: ViewQueryParams
  ): Promise<PaginatedResponse | null> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const count = await getRepository(this.repository)
      .createQueryBuilder(this.repository.toString()[0])
      .where(where?.cnt || "")
      .setParameters(params?.cnt || {})
      .getCount();
    const pages = Math.ceil(count / limit) === 0 ? 1 : Math.ceil(count / limit);

    const data: PaginatedResponse = {
      startIndex,
      endIndex,
      pages,
      next: {},
      previous: {},
      results: {},
    };

    if (endIndex < count) {
      data.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      data.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      if (page > pages) throw new HandleError(400, "Raw", "Page max excided");
      data.results = await this.query(query, [
        limit,
        startIndex,
        ...(params?.q || ""),
      ]);
      return data;
    } catch (err) {
      throw new HandleError(400, "Raw", `${err.field}: ${err.message}`);
    }
  }

  async retriveInstance(id?: number, where?: ObjectLiteral) {
    if (id) return await getRepository(this.repository).findOneOrFail(id);
    if (where)
      return await getRepository(this.repository).findOneOrFail({
        where: where,
      });
    return undefined;
  }

  private shallowEqual(object1: ObjectLiteral, object2: ObjectLiteral) {
    delete object2.id;
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    for (let i = 0; i < keys1.length; i++) {
      if (!keys1[i].includes(keys2[i])) return false;
    }
    return true;
  }

  private validateTypes(params: ObjectLiteral) {
    const types = getRepository(this.repository).metadata.propertiesMap;
    if (this.shallowEqual(params, types)) return;
    throw new HandleError(400, "Validation", "Types are not matching");
  }
}
