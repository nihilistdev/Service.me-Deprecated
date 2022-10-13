declare global {
  export type Filter = { [key: string]: string } & undefined;

  export type Where =
    | string
    | ObjectLiteral
    | ObjectLiteral[]
    | Brackets
    | (((qb: UpdateQueryBuilder<ObjectLiteral>) => string) & undefined);
}

export {};