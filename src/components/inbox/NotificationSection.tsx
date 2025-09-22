"use client";
import React, { useState } from "react";
import { InboxActivity } from "@/interface/inbox.interface";
import {
  getActivityIcon,
  getActivityColor,
  getPriorityColor,
  formatTimestamp,
} from "@/data/inbox-data";

interface NotificationSectionProps {
  activities: InboxActivity[];
  // eslint-disable-next-line no-unused-vars -- keep named parameter for clarity
  onActivityClick?: (activity: InboxActivity) => void;
  // eslint-disable-next-line no-unused-vars -- keep named parameter for clarity
  onMarkAsRead?: (activityId: string) => void;
  className?: string;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  activities = [],
  onActivityClick,
  onMarkAsRead,
  className,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const notificationFilters = [
    {
      id: "all",
      name: "All",
      icon: "fa-solid fa-list",
      count: activities.length,
    },
    {
      id: "unread",
      name: "Unread",
      icon: "fa-solid fa-envelope",
      count: activities.filter((activity) => !activity.isRead).length,
    },
    {
      id: "read",
      name: "Read",
      icon: "fa-solid fa-envelope-open",
      count: activities.filter((activity) => activity.isRead).length,
    },
    {
      id: "important",
      name: "Important",
      icon: "fa-solid fa-star",
      count: activities.filter((activity) => activity.priority === "high")
        .length,
    },
  ];

  const getFilteredActivities = () => {
    let filtered = activities;

    // Apply filter
    switch (selectedFilter) {
      case "unread":
        filtered = filtered.filter((activity) => !activity.isRead);
        break;
      case "read":
        filtered = filtered.filter((activity) => activity.isRead);
        break;
      case "important":
        filtered = filtered.filter((activity) => activity.priority === "high");
        break;
      default:
        // "all" - no filtering needed
        break;
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          activity.metadata?.employeeName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredActivities = getFilteredActivities();

  const handleActivityClick = (activity: InboxActivity) => {
    if (!activity.isRead && onMarkAsRead) {
      onMarkAsRead(activity.id);
    }
    if (onActivityClick) {
      onActivityClick(activity);
    }
  };

  const handleMarkAllAsRead = () => {
    const unreadActivities = filteredActivities.filter(
      (activity) => !activity.isRead
    );
    unreadActivities.forEach((activity) => {
      if (onMarkAsRead) {
        onMarkAsRead(activity.id);
      }
    });
  };

  return (
    <div className={className}>
      <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h2>
            {filteredActivities.some((activity) => !activity.isRead) && (
              <button
                onClick={handleMarkAllAsRead}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              >
                <i className="fa-solid fa-check text-sm" />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-search text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {notificationFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      : "bg-white text-gray-600 dark:bg-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <i className={filter.icon} />
                  {filter.name}
                  {filter.count > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div
          className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-1 min-h-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-700
          [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:border-none
          hover:[&::-webkit-scrollbar-thumb]:bg-blue-700 dark:hover:[&::-webkit-scrollbar-thumb]:bg-blue-200`}"
        >
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className={`p-6 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  !activity.isRead
                    ? "bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      !activity.isRead
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    <i
                      className={`${getActivityIcon(activity.type)} ${getActivityColor(
                        activity.type
                      )}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`text-sm font-semibold ${
                              !activity.isRead
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {activity.title}
                          </h3>
                          {!activity.isRead && (
                            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full font-medium ${getPriorityColor(
                              activity.priority
                            )}`}
                          >
                            {activity.priority} priority
                          </span>

                          {activity.metadata?.employeeName && (
                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                              <i className="fa-solid fa-user text-xs" />
                              <span>{activity.metadata.employeeName}</span>
                            </div>
                          )}

                          {activity.metadata?.departmentName && (
                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                              <i className="fa-solid fa-building text-xs" />
                              <span>{activity.metadata.departmentName}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                        {activity.actionUrl && (
                          <i className="fa-solid fa-arrow-right text-xs text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-bell text-2xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No notifications found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery
                  ? `No notifications match "${searchQuery}" in ${
                      notificationFilters.find((f) => f.id === selectedFilter)
                        ?.name || "this filter"
                    }`
                  : `No notifications in ${
                      notificationFilters.find((f) => f.id === selectedFilter)
                        ?.name || "this category"
                    }`}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
