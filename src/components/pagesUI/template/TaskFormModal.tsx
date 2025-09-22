"use client";
import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (_data: TaskFormData) => void;
}

interface TaskFormData {
  taskName: string;
  assignType: string;
  assign: string[];
  dueDay: string;
  dueType: string;
  description: string;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const editorRef = useRef<any>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    taskName: "",
    assignType: "",
    assign: [],
    dueDay: "",
    dueType: "",
    description: "",
  });

  const [assignInput, setAssignInput] = useState("");

  const assignTypes = ["Department", "Individual", "Role"];
  const dueDays = ["1", "2", "3", "5", "7", "10", "14", "30"];
  const dueTypes = ["Days", "Weeks", "Months"];

  const employees = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
    "Alice Brown",
    "Bob Davis",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const editorContent = editorRef.current?.getContent() || "";
    onSubmit({
      ...formData,
      description: editorContent,
    });
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFormData({
      taskName: "",
      assignType: "",
      assign: [],
      dueDay: "",
      dueType: "",
      description: "",
    });
    setAssignInput("");
    if (editorRef.current) {
      editorRef.current.setContent("");
    }
  };

  const handleInputChange = (field: keyof TaskFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addAssignee = (employee: string) => {
    if (employee && !formData.assign.includes(employee)) {
      setFormData((prev) => ({
        ...prev,
        assign: [...prev.assign, employee],
      }));
      setAssignInput("");
    }
  };

  const removeAssignee = (employee: string) => {
    setFormData((prev) => ({
      ...prev,
      assign: prev.assign.filter((emp) => emp !== employee),
    }));
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.toLowerCase().includes(assignInput.toLowerCase()) &&
      !formData.assign.includes(emp)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Task</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Task Name</label>
            <input
              type="text"
              value={formData.taskName}
              onChange={(e) => handleInputChange("taskName", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Assign Type
            </label>
            <select
              value={formData.assignType}
              onChange={(e) => handleInputChange("assignType", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Assign Type</option>
              {assignTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Assign (Employee Tag System)
            </label>
            <div className="relative">
              <input
                type="text"
                value={assignInput}
                onChange={(e) => setAssignInput(e.target.value)}
                placeholder="Type employee name..."
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              {assignInput && filteredEmployees.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {filteredEmployees.map((employee) => (
                    <button
                      key={employee}
                      type="button"
                      onClick={() => addAssignee(employee)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
                    >
                      {employee}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.assign.map((employee) => (
                <span
                  key={employee}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {employee}
                  <button
                    type="button"
                    onClick={() => removeAssignee(employee)}
                    className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Due Day</label>
              <select
                value={formData.dueDay}
                onChange={(e) => handleInputChange("dueDay", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select Days</option>
                {dueDays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Type</label>
              <select
                value={formData.dueType}
                onChange={(e) => handleInputChange("dueType", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select Type</option>
                {dueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Editor
              apiKey="uonxh66a1gnxnn8g0lsc2ow4pa5c9jys8sa0fadd1txn49y7"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue=""
              init={{
                height: 200,
                menubar: false,
                plugins: ["lists", "link", "code", "table", "codesample"],
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | " +
                  "bullist numlist | link code",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                handleReset();
                onClose();
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
