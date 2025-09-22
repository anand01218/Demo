"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { inboxActivitiesData } from "@/data/inbox-data";

interface InboxSidebarItemProps {
  isCollapse: boolean;
}

const InboxSidebarItem: React.FC<InboxSidebarItemProps> = ({ isCollapse }) => {
  const [activities] = useState(inboxActivitiesData);
  const pathName = usePathname();

  const unreadCount = activities.filter((activity) => !activity.isRead).length;
  const isActive = pathName === "/inbox";

  return (
    <Link
      href="/inbox"
      className={`group flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-violet-300 border-r-2 border-blue-600"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }`}
      title={isCollapse ? "Inbox" : ""}
    >
      <div
        className={`flex-shrink-0 w-5 flex justify-center ${isCollapse ? "lg:mx-auto" : ""}`}
      >
        <i
          className={`fa-solid fa-inbox text-lg ${
            isActive
              ? "text-blue-800 dark:text-violet-400"
              : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
          }`}
        />
      </div>
      <span className={`flex-1 truncate ${isCollapse ? "lg:hidden" : ""}`}>
        Inbox
      </span>
      {unreadCount > 0 && (
        <span
          className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[20px] h-5 ${
            isCollapse
              ? "lg:absolute lg:-top-1 lg:-right-1 lg:min-w-[18px] lg:h-[18px] lg:px-1.5"
              : ""
          }`}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
};

export default InboxSidebarItem;
