import React from "react";

interface CardProps {
  iconClass: string; // Font Awesome icon class
  title: string; // Title of the card
  value: string | number; // Main value to display
  description?: string; // Optional description
  percentageChange?: string; // Optional percentage change info
  isIncrease?: boolean; // Indicates if the change is positive or negative
}

const SummarySingleCard: React.FC<CardProps> = ({
  iconClass,
  title,
  value,
}) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 shadow-sm transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:-translate-y-1">
      {/* Content */}
      <div className="relative p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <i className={`${iconClass} text-lg`} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {typeof value === "number" ? value.toLocaleString() : value}
                </h3>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {title}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Icon */}
        <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <i className={`${iconClass} text-4xl text-gray-900`} />
        </div>
      </div>
    </div>
  );
};

export default SummarySingleCard;
