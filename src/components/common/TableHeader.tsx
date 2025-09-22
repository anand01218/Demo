import React from "react";
import { Search } from "lucide-react";

interface TableHeaderProps {
  title: string;
  searchTerm: string;
  // eslint-disable-next-line no-unused-vars -- allow naming the parameter in function type for clarity
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  additionalFields?: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  additionalFields,
}) => {
  return (
    <div className="bg-transparent">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 px-6">
        <div className="flex items-center space-x-3">
          <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
          <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {additionalFields}
          <div className="relative group">
            <Search className="absolute left-3 top-[10px] text-gray-400 dark:text-gray-500 w-4 h-4 group-focus-within:text-blue-500 transition-colors duration-200 z-10" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-full border border-gray-200 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
