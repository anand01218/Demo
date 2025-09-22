"use client";
import React, { useState } from "react";

interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  assignedTo?: string;
  status: "pending" | "in-progress" | "completed";
  category: "leave-request" | "onboarding-task" | "attendance";
}

interface TaskActionSectionProps {
  className?: string;
}

const TaskActionSection: React.FC<TaskActionSectionProps> = ({ className }) => {
  const [selectedTaskList, setSelectedTaskList] =
    useState<string>("leave-request");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const taskCategories = [
    {
      id: "leave-request",
      name: "Leave Request",
      icon: "fa-solid fa-calendar-days",
      count: 3,
    },
    {
      id: "onboarding-task",
      name: "Onboarding Task",
      icon: "fa-solid fa-user-plus",
      count: 2,
    },
    {
      id: "attendance",
      name: "Attendance",
      icon: "fa-solid fa-clock",
      count: 1,
    },
  ];

  const taskData: TaskItem[] = [
    {
      id: "1",
      title: "John Doe Leave Request",
      description: "Review and approve leave request for Dec 25-27, 2024",
      priority: "high",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
      assignedTo: "HR Manager",
      status: "pending",
      category: "leave-request",
    },
    {
      id: "2",
      title: "Sarah Wilson Leave Request",
      description: "Emergency leave request for family reasons",
      priority: "high",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48), // 2 days from now
      assignedTo: "HR Manager",
      status: "pending",
      category: "leave-request",
    },
    {
      id: "3",
      title: "Mike Johnson Leave Request",
      description: "Annual vacation leave for next month",
      priority: "medium",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 72), // 3 days from now
      assignedTo: "HR Manager",
      status: "in-progress",
      category: "leave-request",
    },
    {
      id: "4",
      title: "Complete New Employee Setup",
      description: "Set up workstation and system access for Mike Johnson",
      priority: "high",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
      assignedTo: "IT Admin",
      status: "pending",
      category: "onboarding-task",
    },
    {
      id: "5",
      title: "Orientation Schedule",
      description: "Schedule orientation session for new hires",
      priority: "medium",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48), // 2 days from now
      assignedTo: "HR Coordinator",
      status: "in-progress",
      category: "onboarding-task",
    },
    {
      id: "6",
      title: "Late Check-in Review",
      description: "Review Sarah Wilson's late check-in pattern",
      priority: "medium",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
      assignedTo: "Supervisor",
      status: "pending",
      category: "attendance",
    },
  ];

  const filteredTasks = taskData.filter(
    (task) => task.category === selectedTaskList
  );

  const getPriorityColor = (priority: TaskItem["priority"]): string => {
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

  const getStatusColor = (status: TaskItem["status"]): string => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`flex gap-6 h-full ${className}`}>
      {/* Task List Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Task Categories
          </h3>
        </div>
        <nav className="p-4 flex-shrink-0">
          <ul className="space-y-2">
            {taskCategories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => {
                    setSelectedTaskList(category.id);
                    setSelectedTask(null);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    selectedTaskList === category.id
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <i className={`${category.icon} text-base`} />
                  <span className="flex-1 text-left">{category.name}</span>
                  {category.count > 0 && (
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        selectedTaskList === category.id
                          ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {category.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Task List */}
        <div className="border-t border-gray-200 dark:border-gray-700 overflow-y-auto flex-1 min-h-0">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {taskCategories.find((cat) => cat.id === selectedTaskList)?.name}{" "}
              Tasks
            </h4>
            <div className="space-y-2">
              {filteredTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                    selectedTask?.id === task.id
                      ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                      : "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {task.title}
                    </h5>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Due: {formatDate(task.dueDate)}
                  </p>
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs rounded-full ${getStatusColor(task.status)}`}
                  >
                    {task.status.replace("-", " ")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Details */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
        {selectedTask ? (
          <div className="p-6 overflow-y-auto flex-1 min-h-0">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedTask.title}
                </h2>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(selectedTask.priority)}`}
                  >
                    {selectedTask.priority} priority
                  </span>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedTask.status)}`}
                  >
                    {selectedTask.status.replace("-", " ")}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Due Date
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatDate(selectedTask.dueDate)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Assignment Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-user text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Assigned to: {selectedTask.assignedTo || "Unassigned"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-folder text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Category: {selectedTask.category.replace("-", " ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <i className="fa-solid fa-check mr-2" />
                Mark Complete
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <i className="fa-solid fa-edit mr-2" />
                Edit Task
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <i className="fa-solid fa-user mr-2" />
                Reassign
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center flex-1 flex flex-col justify-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-tasks text-2xl text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Select a Task
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a task from the list to view its details and take action.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskActionSection;
