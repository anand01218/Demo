"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { inboxActivitiesData } from "@/data/inbox-data";

interface InboxComponentProps {
  isCollapse?: boolean;
}

const InboxComponent: React.FC<InboxComponentProps> = ({
  isCollapse = false,
}) => {
  const [activities] = useState(inboxActivitiesData);
  const pathName = usePathname();

  const unreadCount = activities.filter((activity) => !activity.isRead).length;
  const isActive = pathName === "/inbox";

  if (isCollapse) {
    // Collapsed view - just show inbox icon with badge
    return (
      <div className="px-2 mb-1">
        <Link
          href="/inbox"
          className={`group flex items-center justify-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
            isActive
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-violet-300 border-r-2 border-blue-600"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
          }`}
          title="Inbox"
        >
          <div className="flex-shrink-0 w-5 flex justify-center">
            <i
              className={`fa-solid fa-inbox text-lg ${
                isActive
                  ? "text-blue-800 dark:text-violet-400"
                  : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
              }`}
            />
          </div>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[18px] h-[18px]">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Link>
      </div>
    );
  }

  return (
    <div className="px-2 mb-1">
      <Link
        href="/inbox"
        className={`group flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-violet-300 border-r-2 border-blue-600"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        <div className="flex-shrink-0 w-5 flex justify-center">
          <i
            className={`fa-solid fa-inbox text-lg ${
              isActive
                ? "text-blue-800 dark:text-violet-400"
                : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            }`}
          />
        </div>
        <span className="flex-1 truncate">Inbox</span>
        {unreadCount > 0 && (
          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[20px] h-5">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default InboxComponent;
