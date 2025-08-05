export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiError {
  status?: number;
  name: string;
  message: string;
}

// Main Response Wrapper
export interface StrapiResponse<T> {
  data?: T | null;
  meta?: StrapiMeta;
  error?: StrapiError | null;
}
