import {
  EntityTarget,
  getRepository,
  InsertResult,
  ObjectLiteral,
  UpdateResult,
} from "typeorm";

declare global {
  export interface OptionsParams {
    checkIfAlreadyExists?: boolean;
    checkTypes?:boolean;
  }
  export declare class BaseControllerFunctions<
    T extends EntityTarget<ObjectLiteral>
  > {
    list(
      page: number,
      limit: number,
      params?: ObjectLiteral | undefined
    ): Promise<T | T[]>;
    create(params?: ObjectLiteral): Promise<InsertResult | undefined>;
    update(
      instance: any,
      params?: ObjectLiteral,
      where?: Where
    ): Promise<UpdateResult | undefined>;
    filter(param?: string): Promise<T | T[]>;
    delete(param?: ObjectLiteral): Promise<boolean>;
  }
}

export {};
