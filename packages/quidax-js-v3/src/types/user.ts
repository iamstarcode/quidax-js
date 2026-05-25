export interface SubAccount {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  sn: string;
  reference: string | null;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSubAccountRequest {
  email: string;
  first_name: string;
  last_name: string;
}

export interface EditSubAccountRequest {
  first_name?: string;
  last_name?: string;
}
