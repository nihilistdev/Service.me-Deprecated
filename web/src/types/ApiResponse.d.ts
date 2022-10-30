declare global {
  export interface ApiResponse<T> {
    data: T;
    httpStatusCode: number;
    message: string;
  }

  export interface PaginatedApiResponse<T> {
    startIndex: number;
    endIndex: number;
    pages: number;
    next: {
      page: number;
      limit: number;
    };
    previous: {
      page: number;
      limit: number;
    };
    results: T[];
  }
}

export {};
