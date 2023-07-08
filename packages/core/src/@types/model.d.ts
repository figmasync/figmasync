declare global {
  interface Polls {
    code_verifier: string;
    code_challenge: string;
    id?: number;
    is_active?: boolean;
    created_at?: Date;
    token?: Record<string, any>;
  }
}

export {};
