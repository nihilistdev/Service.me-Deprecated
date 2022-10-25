declare global {
  export interface Customers {
    address: string | null;
    created_at: string;
    deleted_date: string | null;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    phone: string;
    pin: string;
    updated_at: string;
  }
}

export {};
