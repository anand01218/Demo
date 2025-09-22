"use client";
import { Clock } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-6 mb-6">
        <Clock size={48} className="text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
        {description ||
          "This feature is currently under development. Stay tuned for updates!"}
      </p>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-yellow-800 dark:text-yellow-200 font-medium">
          Coming Soon
        </h3>
      </div>
    </div>
  );
};

export default ComingSoon;
