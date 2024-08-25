export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type IFilterOptions = {
  searchTerm?: string;
};
