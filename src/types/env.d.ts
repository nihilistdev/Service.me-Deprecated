declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      PG_SOURCE: string;
      PG_PORT: string;
      PG_DATABASE: string;
      PG_USERNAME: string;
      PG_PASSWORD: string;
      JWT_SECRET: string;
      JWT_EXPIRATION: string;
    }
  }
}

export {}
