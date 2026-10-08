export interface CreateServiceDto {
  title: string;
  shortDescription: string;
  description: string;
  icon?: string;
  thumbnail?: string;
}

export interface UpdateServiceDto {
  title?: string;
  shortDescription?: string;
  description?: string;
  icon?: string;
  thumbnail?: string;
  isActive?: boolean;
  order?: number;
}

export interface ServiceQueryDto {
  page?: number;
  limit?: number;

  search?: string;

  isActive?: boolean;

  sortBy?:
    | "title"
    | "createdAt"
    | "updatedAt"
    | "order";

  sortOrder?: "asc" | "desc";

}


