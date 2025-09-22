export interface InboxActivity {
  id: string;
  type:
    | "leave_request"
    | "attendance_alert"
    | "employee_onboard"
    | "system_update"
    | "task_assignment"
    | "document_review";
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
  metadata?: {
    employeeName?: string;
    employeeId?: string;
    departmentName?: string;
    documentName?: string;
    taskId?: string;
    [key: string]: any;
  };
}

export interface InboxCategory {
  id: string;
  name: string;
  count: number;
  activities: InboxActivity[];
}

export interface InboxState {
  categories: InboxCategory[];
  unreadCount: number;
  isLoading: boolean;
  lastUpdated: Date;
}

export interface InboxProps {
  activities: InboxActivity[];
  // eslint-disable-next-line no-unused-vars -- Interface requires parameter name
  onActivityClick?: (_activity: InboxActivity) => void;
  // eslint-disable-next-line no-unused-vars -- Interface requires parameter name
  onMarkAsRead?: (_activityId: string) => void;
  onMarkAllAsRead?: () => void;
  isCompact?: boolean;
}
