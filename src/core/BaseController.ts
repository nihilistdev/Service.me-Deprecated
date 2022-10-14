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

  async list(page: number, limit: number): Promise<T | T[]> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const count = await getRepository(this.repository).count();
    const pages = Math.ceil(count / limit);

    const data = {
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
      const query = await getRepository(this.repository)
        .createQueryBuilder(this.repository.toString()[0])
        .skip()
        .limit(limit)
        .getMany();
      return query as T | T[];
    } catch (err) {
      throw new HandleError(400, "Raw", err.message);
    }
  }

  async create(
    params?: ObjectLiteral | undefined,
    options?: OptionsParams
  ): Promise<InsertResult | undefined> {
    if (options?.checkIfAlreadyExists) this.checkIfExists(params || {});

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
        .where(where, parameters)
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

  async filter(param?: string): Promise<T | T[]> {
    if (!param) return {} as T;
    try {
      const query = await getRepository(this.repository)
        .createQueryBuilder()
        .select()
        .where(
          `document_with_weights @@ to_tsquery(concat(:query::text,':*'))`,
          {
            query: param,
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
