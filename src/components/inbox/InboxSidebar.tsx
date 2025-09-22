"use client";
import React from "react";

export interface SidebarItem {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

interface InboxSidebarProps {
  activeSection: string;
  // eslint-disable-next-line no-unused-vars -- Interface requires parameter name
  onSectionChange: (section: string) => void;
  notificationCount?: number;
  archiveCount?: number;
  trashCount?: number;
  taskCount?: number;
}

const InboxSidebar: React.FC<InboxSidebarProps> = ({
  activeSection,
  onSectionChange,
  notificationCount = 0,
  archiveCount = 0,
  trashCount = 0,
  taskCount = 5,
}) => {
  const sidebarItems: SidebarItem[] = [
    {
      id: "notification",
      name: "Notification",
      icon: "fa-solid fa-bell",
      count: notificationCount,
    },
    {
      id: "task-action",
      name: "Task Action",
      icon: "fa-solid fa-tasks",
      count: taskCount,
    },
    {
      id: "archive",
      name: "Archive",
      icon: "fa-solid fa-archive",
      count: archiveCount,
    },
    {
      id: "trash",
      name: "Trash",
      icon: "fa-solid fa-trash",
      count: trashCount,
    },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Inbox Sections
        </h3>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <i className={`${item.icon} text-base`} />
                <span className="flex-1 text-left">{item.name}</span>
                {item.count && item.count > 0 && (
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      activeSection === item.id
                        ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default InboxSidebar;
