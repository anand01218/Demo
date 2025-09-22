"use client";
import React, { useState } from "react";
import { InboxActivity } from "@/interface/inbox.interface";
import {
  getActivityIcon,
  getActivityColor,
  getPriorityColor,
  formatTimestamp,
} from "@/data/inbox-data";

interface ArchiveSectionProps {
  archivedActivities: InboxActivity[];
  // eslint-disable-next-line no-unused-vars -- keep parameter name for clarity in docs/IDE hints
  onActivityClick?: (activity: InboxActivity) => void;
  // eslint-disable-next-line no-unused-vars -- keep parameter name for clarity in docs/IDE hints
  onRestoreActivity?: (activityId: string) => void;
  className?: string;
}

const ArchiveSection: React.FC<ArchiveSectionProps> = ({
  archivedActivities = [],
  onActivityClick = undefined,
  onRestoreActivity = undefined,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredActivities = archivedActivities.filter(
    (activity) =>
      searchQuery === "" ||
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.metadata?.employeeName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleSelectItem = (activityId: string) => {
    setSelectedItems((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredActivities.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredActivities.map((activity) => activity.id));
    }
  };

  const handleRestoreSelected = () => {
    selectedItems.forEach((activityId) => {
      if (onRestoreActivity) {
        onRestoreActivity(activityId);
      }
    });
    setSelectedItems([]);
  };

  const handleActivityClick = (activity: InboxActivity) => {
    if (onActivityClick) {
      onActivityClick(activity);
    }
  };

  return (
    <div className={className}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Archived Notifications
              </h2>
              <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full">
                {archivedActivities.length} items
              </span>
            </div>
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedItems.length} selected
                </span>
                <button
                  onClick={handleRestoreSelected}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200"
                >
                  <i className="fa-solid fa-undo text-sm" />
                  Restore Selected
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search and Controls */}
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
                  placeholder="Search archived notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Select All Control */}
            {filteredActivities.length > 0 && (
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      filteredActivities.length > 0 &&
                      selectedItems.length === filteredActivities.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Select All
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Activities List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-1 min-h-0">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-6 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(activity.id)}
                      onChange={() => handleSelectItem(activity.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  {/* Activity Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <i
                      className={`${getActivityIcon(activity.type)} ${getActivityColor(
                        activity.type
                      )} opacity-60`}
                    />
                  </div>

                  {/* Activity Content */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => handleActivityClick(activity)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {activity.title}
                          </h3>
                          <span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full">
                            Archived
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full font-medium opacity-75 ${getPriorityColor(
                              activity.priority
                            )}`}
                          >
                            {activity.priority} priority
                          </span>

                          {activity.metadata?.employeeName && (
                            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                              <i className="fa-solid fa-user text-xs" />
                              <span>{activity.metadata.employeeName}</span>
                            </div>
                          )}

                          {activity.metadata?.departmentName && (
                            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                              <i className="fa-solid fa-building text-xs" />
                              <span>{activity.metadata.departmentName}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onRestoreActivity) {
                              onRestoreActivity(activity.id);
                            }
                          }}
                          className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                        >
                          <i className="fa-solid fa-undo mr-1" />
                          Restore
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-archive text-2xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No archived notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery
                  ? `No archived notifications match "${searchQuery}"`
                  : "Archived notifications will appear here when you archive them."}
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

export default ArchiveSection;
