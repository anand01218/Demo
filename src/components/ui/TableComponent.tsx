"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, OctagonX } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  // eslint-disable-next-line no-unused-vars
  render?: (_value: any, _row: T) => React.ReactNode;
  width?: string;
}

interface TableComponentProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
  height?: string;
  showPaginationControls?: boolean;
  pageSizeOptions?: number[];
  searchPlaceholder?: string;
  externalPagination?: {
    currentPage: number;
    totalPages: number;
    total: number;
    // eslint-disable-next-line no-unused-vars
    onPageChange: (_page: number) => void;
    // eslint-disable-next-line no-unused-vars
    onPageSizeChange?: (_size: number) => void;
  };
}

export default function TableComponent<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  className = "",
  emptyMessage = "No data available",
  loading = false,
  height,
  showPaginationControls = true,
  pageSizeOptions = [5, 10, 25, 50],
  externalPagination,
}: TableComponentProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const totalPages = externalPagination
    ? externalPagination.totalPages
    : Math.ceil(sortedData.length / currentPageSize);
  const startIndex = externalPagination
    ? (externalPagination.currentPage - 1) * currentPageSize
    : (currentPage - 1) * currentPageSize;
  const paginatedData = externalPagination
    ? sortedData
    : sortedData.slice(startIndex, startIndex + currentPageSize);
  const displayCurrentPage = externalPagination
    ? externalPagination.currentPage
    : currentPage;

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const goToPage = (page: number) => {
    if (externalPagination) {
      externalPagination.onPageChange(Math.max(1, Math.min(page, totalPages)));
    } else {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (externalPagination?.onPageSizeChange) {
      externalPagination.onPageSizeChange(newPageSize);
    } else {
      setCurrentPageSize(newPageSize);
      setCurrentPage(1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    let start = Math.max(1, displayCurrentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            i === displayCurrentPage
              ? "bg-blue-600 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const tableStyle = height ? { height } : {};

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-b-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col ${className}`}
      style={tableStyle}
    >
      <div
        className={`overflow-x-auto ${height ? "flex-1 overflow-y-auto" : ""} 
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-700
          [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:border-none
          hover:[&::-webkit-scrollbar-thumb]:bg-blue-700 dark:hover:[&::-webkit-scrollbar-thumb]:bg-blue-200`}
      >
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-3 sm:px-6 py-2 text-left text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase border-b border-gray-200 dark:border-gray-600 tracking-wider ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      : ""
                  } ${column.width || ""}`}
                  onClick={() =>
                    column.sortable && handleSort(String(column.key))
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <div
                          className={`w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent ${
                            sortConfig?.key === column.key &&
                            sortConfig.direction === "asc"
                              ? "border-b-gray-600 dark:border-b-gray-300"
                              : "border-b-gray-300 dark:border-b-gray-500"
                          }`}
                          style={{
                            borderBottomWidth: "4px",
                            marginBottom: "1px",
                          }}
                        />
                        <div
                          className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent ${
                            sortConfig?.key === column.key &&
                            sortConfig.direction === "desc"
                              ? "border-t-gray-600 dark:border-t-gray-300"
                              : "border-t-gray-300 dark:border-t-gray-500"
                          }`}
                          style={{ borderTopWidth: "4px" }}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <OctagonX className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                    <span>{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-3 sm:px-6 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                    >
                      {column.render
                        ? column.render(row[column.key as keyof T], row)
                        : String(row[column.key as keyof T] || "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPaginationControls &&
        (totalPages > 1 || pageSizeOptions.length > 1) && (
          <div className="px-3 sm:px-6 py-2 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {startIndex + 1} to{" "}
                {Math.min(
                  startIndex + currentPageSize,
                  externalPagination
                    ? externalPagination.total
                    : sortedData.length
                )}{" "}
                of{" "}
                {externalPagination
                  ? externalPagination.total
                  : sortedData.length}{" "}
                results
              </div>
              {pageSizeOptions.length > 1 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Show:
                  </span>
                  <select
                    value={externalPagination ? pageSize : currentPageSize}
                    onChange={(e) =>
                      handlePageSizeChange(Number(e.target.value))
                    }
                    className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    entries
                  </span>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                <button
                  onClick={() => goToPage(displayCurrentPage - 1)}
                  disabled={displayCurrentPage === 1}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex space-x-1 overflow-x-auto">
                  {renderPaginationButtons()}
                </div>

                <button
                  onClick={() => goToPage(displayCurrentPage + 1)}
                  disabled={displayCurrentPage === totalPages}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
