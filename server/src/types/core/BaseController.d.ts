import {
  type EntityTarget,
  type InsertResult,
  type ObjectLiteral,
  type UpdateResult,
} from "typeorm";

declare global {
  export type OptionsParams = {
    checkIfAlreadyExists?: boolean;
    checkTypes?: boolean;
  };
  export declare class BaseControllerFunctions<
    T extends EntityTarget<ObjectLiteral>
  > {
    list(
      page: number,
      limit: number,
      where?: Where,
      params?: ObjectLiteral,
      normalList?: boolean
    ): Promise<PaginatedResponse | any[]>;
    create(params?: ObjectLiteral): Promise<InsertResult | undefined>;
    update(
      instance: any,
      params?: ObjectLiteral,
      where?: Where
    ): Promise<UpdateResult | undefined>;
    filter(param?: string): Promise<T | T[]>;
    delete(param?: ObjectLiteral): Promise<boolean>;
    query(query: string, params?: any[]): Promise<any>;
    paginationViewQuery(
      query: string,
      page: number,
      limit: number,
      where: ViewQueryWhere,
      params: ViewQueryParams
    ): Promise<PaginatedResponse | null>;
  }
}

export {};
