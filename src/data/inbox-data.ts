import { InboxActivity, InboxCategory } from "@/interface/inbox.interface";

// Sample inbox activities data
const inboxActivitiesData: InboxActivity[] = [
  {
    id: "1",
    type: "leave_request",
    title: "Leave Request Pending",
    description: "John Doe has submitted a leave request for Dec 25-27, 2024",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    priority: "high",
    actionUrl: "/leave/requests/1",
    metadata: {
      employeeName: "John Doe",
      employeeId: "EMP001",
      departmentName: "Engineering",
    },
  },
  {
    id: "2",
    type: "attendance_alert",
    title: "Late Check-in Alert",
    description: "Sarah Wilson checked in late at 10:15 AM today",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    priority: "medium",
    actionUrl: "/attendance/employee/EMP002",
    metadata: {
      employeeName: "Sarah Wilson",
      employeeId: "EMP002",
      departmentName: "Marketing",
    },
  },
  {
    id: "3",
    type: "employee_onboard",
    title: "New Employee Onboarding",
    description: "Mike Johnson has completed 75% of onboarding process",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    isRead: true,
    priority: "medium",
    actionUrl: "/onboarding/EMP003",
    metadata: {
      employeeName: "Mike Johnson",
      employeeId: "EMP003",
      departmentName: "Sales",
    },
  },
  {
    id: "4",
    type: "system_update",
    title: "System Maintenance",
    description: "Scheduled maintenance completed successfully",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    isRead: true,
    priority: "low",
    actionUrl: "/settings/system",
  },
  {
    id: "5",
    type: "document_review",
    title: "Document Review Required",
    description: "Employee handbook v2.1 needs your review and approval",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    isRead: false,
    priority: "high",
    actionUrl: "/settings/documents/handbook-v2.1",
    metadata: {
      documentName: "Employee Handbook v2.1",
    },
  },
  {
    id: "6",
    type: "task_assignment",
    title: "Task Assignment",
    description: "New performance review task assigned for Q4 2024",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    priority: "medium",
    actionUrl: "/tasks/performance-review-q4",
    metadata: {
      taskId: "TASK-PR-Q4-2024",
    },
  },
  {
    id: "7",
    type: "leave_request",
    title: "Leave Request Approved",
    description: "Anna Smith's vacation request has been approved",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: true,
    priority: "low",
    actionUrl: "/leave/requests/7",
    metadata: {
      employeeName: "Anna Smith",
      employeeId: "EMP007",
      departmentName: "HR",
    },
  },
];

// Sample inbox categories data
const inboxCategoriesData: InboxCategory[] = [
  {
    id: "all",
    name: "All Activities",
    count: inboxActivitiesData.length,
    activities: inboxActivitiesData,
  },
  {
    id: "unread",
    name: "Unread",
    count: inboxActivitiesData.filter((activity) => !activity.isRead).length,
    activities: inboxActivitiesData.filter((activity) => !activity.isRead),
  },
  {
    id: "high_priority",
    name: "High Priority",
    count: inboxActivitiesData.filter(
      (activity) => activity.priority === "high"
    ).length,
    activities: inboxActivitiesData.filter(
      (activity) => activity.priority === "high"
    ),
  },
  {
    id: "leave_requests",
    name: "Leave Requests",
    count: inboxActivitiesData.filter(
      (activity) => activity.type === "leave_request"
    ).length,
    activities: inboxActivitiesData.filter(
      (activity) => activity.type === "leave_request"
    ),
  },
  {
    id: "attendance",
    name: "Attendance",
    count: inboxActivitiesData.filter(
      (activity) => activity.type === "attendance_alert"
    ).length,
    activities: inboxActivitiesData.filter(
      (activity) => activity.type === "attendance_alert"
    ),
  },
];

// Helper function to get activity icon
export const getActivityIcon = (type: InboxActivity["type"]): string => {
  switch (type) {
    case "leave_request":
      return "fa-solid fa-calendar-days";
    case "attendance_alert":
      return "fa-solid fa-clock";
    case "employee_onboard":
      return "fa-solid fa-user-plus";
    case "system_update":
      return "fa-solid fa-gear";
    case "document_review":
      return "fa-solid fa-file-text";
    case "task_assignment":
      return "fa-solid fa-tasks";
    default:
      return "fa-solid fa-bell";
  }
};

// Helper function to get activity color
export const getActivityColor = (type: InboxActivity["type"]): string => {
  switch (type) {
    case "leave_request":
      return "text-blue-600 dark:text-blue-400";
    case "attendance_alert":
      return "text-orange-600 dark:text-orange-400";
    case "employee_onboard":
      return "text-green-600 dark:text-green-400";
    case "system_update":
      return "text-gray-600 dark:text-gray-400";
    case "document_review":
      return "text-purple-600 dark:text-purple-400";
    case "task_assignment":
      return "text-indigo-600 dark:text-indigo-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

// Helper function to get priority badge color
export const getPriorityColor = (
  priority: InboxActivity["priority"]
): string => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

// Helper function to format timestamp
export const formatTimestamp = (timestamp: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - timestamp.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return timestamp.toLocaleDateString();
  }
};

export { inboxActivitiesData, inboxCategoriesData };
