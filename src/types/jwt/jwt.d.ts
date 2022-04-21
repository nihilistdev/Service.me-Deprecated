declare global {
  type JwtPayload = {
    id: number;
    name: string;
    surname: string;
    email: string;
    create_at: Date;
  };
}

export {};
