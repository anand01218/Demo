"use client";
import React, { useState } from "react";
import TableComponent from "@/components/ui/TableComponent";
import { TableColumn } from "@/interface/tableComponent.interface";
import { Trash, Edit } from "lucide-react";
import Header from "@/components/common/Header";
import ModelCustom from "@/components/common/ModelCustom";
import { useModale } from "@/context/ModaleContext";
interface Goal {
  id: number;
  name: string;
  description: string;
  progress: number;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "Overdue";
  assignee: string;
  priority: "Low" | "Medium" | "High";
}

const GoalsList: React.FC = () => {
  const { modaleShow, modaleClose } = useModale();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: "Increase Sales Revenue",
      description: "Achieve 20% increase in quarterly sales revenue",
      progress: 75,
      dueDate: "2025-12-31",
      status: "In Progress",
      assignee: "John Doe",
      priority: "High",
    },
    {
      id: 2,
      name: "Complete Leadership Training",
      description: "Finish advanced leadership certification program",
      progress: 100,
      dueDate: "2025-09-15",
      status: "Completed",
      assignee: "Sarah Smith",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Improve Customer Satisfaction",
      description: "Increase customer satisfaction score to 95%",
      progress: 60,
      dueDate: "2025-11-30",
      status: "In Progress",
      assignee: "Mike Johnson",
      priority: "High",
    },
    {
      id: 4,
      name: "Technical Certification",
      description: "Obtain AWS Solutions Architect certification",
      progress: 30,
      dueDate: "2025-10-15",
      status: "In Progress",
      assignee: "Emily Davis",
      priority: "Medium",
    },
    {
      id: 5,
      name: "Team Building Initiative",
      description: "Organize quarterly team building activities",
      progress: 0,
      dueDate: "2025-12-20",
      status: "Not Started",
      assignee: "David Wilson",
      priority: "Low",
    },
  ]);

  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    progress: 0,
    dueDate: "",
    status: "Not Started" as Goal["status"],
    assignee: "",
    priority: "Medium" as Goal["priority"],
  });

  const getStatusColor = (status: Goal["status"]) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Goal["priority"]) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      description: goal.description,
      progress: goal.progress,
      dueDate: goal.dueDate,
      status: goal.status,
      assignee: goal.assignee,
      priority: goal.priority,
    });
    modaleShow("goal-modal");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals(goals.filter((goal) => goal.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingGoal) {
      // Update existing goal
      setGoals(
        goals.map((goal) =>
          goal.id === editingGoal.id ? { ...goal, ...formData } : goal
        )
      );
    } else {
      // Add new goal
      const newGoal: Goal = {
        id: Math.max(...goals.map((g) => g.id)) + 1,
        ...formData,
      };
      setGoals([...goals, newGoal]);
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      progress: 0,
      dueDate: "",
      status: "Not Started",
      assignee: "",
      priority: "Medium",
    });
    setEditingGoal(null);
    modaleClose();
  };

  const openAddModal = () => {
    setEditingGoal(null);
    setFormData({
      name: "",
      description: "",
      progress: 0,
      dueDate: "",
      status: "Not Started",
      assignee: "",
      priority: "Medium",
    });
    modaleShow("goal-modal");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      progress: 0,
      dueDate: "",
      status: "Not Started",
      assignee: "",
      priority: "Medium",
    });
    setEditingGoal(null);
  };

  // Table columns configuration
  const columns: TableColumn<Goal>[] = [
    {
      key: "name",
      label: "Goal Name",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (value: string) => (
        <div className="text-sm text-gray-600 max-w-xs truncate">{value}</div>
      ),
    },
    {
      key: "progress",
      label: "Progress",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm text-gray-900 font-medium">{value}%</span>
        </div>
      ),
    },
    {
      key: "dueDate",
      label: "Due Date",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-900">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: Goal["status"]) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(value)}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "assignee",
      label: "Assignee",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-900">{value}</span>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (value: Goal["priority"]) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(value)}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row: Goal) => (
        <div className="flex  space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 py-2 hover:text-blue-900"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Header title="Goals Management" className="text-gray-600" />
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <i className="fa-solid fa-plus mr-2" />
          Add Goal
        </button>
      </div>

      {/* Goals Table */}
      <TableComponent
        data={goals}
        columns={columns}
        pageSize={10}
        showPaginationControls={true}
        pageSizeOptions={[5, 10, 25, 50]}
        emptyMessage="No goals found"
        className="rounded-lg shadow-md"
      />

      {/* Modal */}
      <ModelCustom
        id="goal-modal"
        title={editingGoal ? "Edit Goal" : "Add New Goal"}
        reset={resetForm}
        actionButton={
          <button
            type="submit"
            form="goal-form"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 font-medium"
          >
            {editingGoal ? "Update" : "Add"} Goal
          </button>
        }
      >
        <div className="p-6">
          <form id="goal-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Goal Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={formData.progress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    progress: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Date
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Goal["status"],
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Assignee
              </label>
              <input
                type="text"
                required
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as Goal["priority"],
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </form>
        </div>
      </ModelCustom>
    </div>
  );
};

export default GoalsList;
