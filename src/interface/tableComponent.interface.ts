import { ReactNode } from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  // eslint-disable-next-line no-unused-vars -- Interface requires parameter names
  render?: (_value: any, _row: T) => ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
  height?: string;
  showPaginationControls?: boolean;
  pageSizeOptions?: number[];
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}
