"use client";
import React, { useState } from "react";
import DefaultWrapper from "@/components/layouts/DefaultWrapper";
import { InboxActivity } from "@/interface/inbox.interface";
import { inboxActivitiesData } from "@/data/inbox-data";
import InboxSidebar from "@/components/inbox/InboxSidebar";
import TaskActionSection from "@/components/inbox/TaskActionSection";
import NotificationSection from "@/components/inbox/NotificationSection";
import ArchiveSection from "@/components/inbox/ArchiveSection";
import TrashSection from "@/components/inbox/TrashSection";

const InboxPage = () => {
  const [activities, setActivities] =
    useState<InboxActivity[]>(inboxActivitiesData);
  const [archivedActivities, setArchivedActivities] = useState<InboxActivity[]>(
    []
  );
  const [deletedActivities, setDeletedActivities] = useState<InboxActivity[]>(
    []
  );
  const [activeSection, setActiveSection] = useState<string>("notification");
  // const [searchQuery, setSearchQuery] = useState<string>("");

  const handleMarkAsRead = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId ? { ...activity, isRead: true } : activity
      )
    );
  };

  // const handleMarkAllAsRead = () => {
  //   setActivities((prev) =>
  //     prev.map((activity) => ({ ...activity, isRead: true }))
  //   );
  // };

  const handleActivityClick = (activity: InboxActivity) => {
    if (!activity.isRead) {
      handleMarkAsRead(activity.id);
    }
    if (activity.actionUrl) {
      // Navigate to the action URL
      window.location.href = activity.actionUrl;
    }
  };

  // Archive functionality - ready for future implementation
  // const _handleArchiveActivity = (activityId: string) => {
  //   const activityToArchive = activities.find(
  //     (activity) => activity.id === activityId
  //   );
  //   if (activityToArchive) {
  //     setActivities((prev) =>
  //       prev.filter((activity) => activity.id !== activityId)
  //     );
  //     setArchivedActivities((prev) => [...prev, activityToArchive]);
  //   }
  // };

  const handleRestoreActivity = (activityId: string) => {
    const activityToRestore =
      archivedActivities.find((activity) => activity.id === activityId) ||
      deletedActivities.find((activity) => activity.id === activityId);
    if (activityToRestore) {
      setArchivedActivities((prev) =>
        prev.filter((activity) => activity.id !== activityId)
      );
      setDeletedActivities((prev) =>
        prev.filter((activity) => activity.id !== activityId)
      );
      setActivities((prev) => [...prev, activityToRestore]);
    }
  };

  const handlePermanentDelete = (activityId: string) => {
    setDeletedActivities((prev) =>
      prev.filter((activity) => activity.id !== activityId)
    );
  };

  const handleEmptyTrash = () => {
    setDeletedActivities([]);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "notification":
        return (
          <NotificationSection
            activities={activities}
            onActivityClick={handleActivityClick}
            onMarkAsRead={handleMarkAsRead}
            className="flex-1"
          />
        );
      case "task-action":
        return <TaskActionSection className="flex-1" />;

      case "archive":
        return (
          <ArchiveSection
            archivedActivities={archivedActivities}
            onActivityClick={handleActivityClick}
            onRestoreActivity={handleRestoreActivity}
            className="flex-1"
          />
        );
      case "trash":
        return (
          <TrashSection
            deletedActivities={deletedActivities}
            onActivityClick={handleActivityClick}
            onRestoreActivity={handleRestoreActivity}
            onPermanentDelete={handlePermanentDelete}
            onEmptyTrash={handleEmptyTrash}
            className="flex-1"
          />
        );
      default:
        return (
          <NotificationSection
            activities={activities}
            onActivityClick={handleActivityClick}
            onMarkAsRead={handleMarkAsRead}
            className="flex-1"
          />
        );
    }
  };

  return (
    <DefaultWrapper>
      <div className="py-2">
        <div className="mx-auto">
          {/* Main Content */}
          <div className="flex gap-6 h-[calc(100vh-95px)]">
            {/* Sidebar */}
            <InboxSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              notificationCount={activities.length}
              archiveCount={archivedActivities.length}
              trashCount={deletedActivities.length}
              taskCount={6}
            />

            {/* Active Section Content */}
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};

export default InboxPage;
