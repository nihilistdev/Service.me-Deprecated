import type { ObjectLiteral } from "typeorm";

declare global {
  export type Filter = Record<string, string> & undefined;

  export type ViewQueryWhere = {
    cnt: string;
    q: string;
  };

  export type ViewQueryParams = {
    cnt: ObjectLiteral;
    q: any[];
  };

  export type Where =
    | string
    | ObjectLiteral
    | ObjectLiteral[]
    | Brackets
    | (((qb: UpdateQueryBuilder<ObjectLiteral>) => string) & undefined);

  export type PaginatedResponse = {
    startIndex: number;
    endIndex: number;
    pages: number;
    next: any;
    previous: any;
    results: any;
  };

  export type OrderBy = {
    fields?: string;
    direction?: "ASC" | "DESC" | undefined;
  };
}

export {};
