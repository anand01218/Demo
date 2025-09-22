import React from "react";

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className = "" }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
      <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
  );
};

export default Header;
