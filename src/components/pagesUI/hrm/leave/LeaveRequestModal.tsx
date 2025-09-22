"use client";
import React, { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { useGetDepartmentListQuery } from "@/redux/slices/DepartmentAction";
import { useGetEmployeesByDepartmentQuery } from "@/redux/slices/EmployeeAction";
import { toast } from "sonner";

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (_data: LeaveFormData) => void;
}

interface LeaveFormData {
  depId: string;
  empId: string;
  leaveType: string;
  from: string;
  to: string;
  noOfDays: number;
  note: string;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<LeaveFormData>({
    depId: "",
    empId: "",
    leaveType: "",
    from: "",
    to: "",
    noOfDays: 0,
    note: "",
  });

  const { data: departmentsResponse } = useGetDepartmentListQuery({});
  const departments = useMemo(
    () => departmentsResponse?.data || [],
    [departmentsResponse?.data]
  );
  const { data: employees = [] } = useGetEmployeesByDepartmentQuery(
    formData.depId,
    { skip: !formData.depId }
  );

  const leaveTypes = [
    "Annual Leave",
    "Sick Leave",
    "Casual Leave",
    "Medical Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Emergency Leave",
  ];

  const calculateDays = (from: string, to: string): number => {
    if (!from || !to) return 0;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    const days = calculateDays(formData.from, formData.to);
    setFormData((prev) => ({ ...prev, noOfDays: days }));
  }, [formData.from, formData.to]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.depId) {
      toast.error("Please select a department");
      return;
    }

    if (!formData.empId) {
      toast.error("Please select an employee");
      return;
    }

    if (!formData.leaveType) {
      toast.error("Please select a leave type");
      return;
    }

    if (!formData.from) {
      toast.error("Please select a start date");
      return;
    }

    if (!formData.to) {
      toast.error("Please select an end date");
      return;
    }

    if (new Date(formData.from) > new Date(formData.to)) {
      toast.error("End date cannot be earlier than start date");
      return;
    }

    if (!formData.note.trim()) {
      toast.error("Please provide a reason for the leave");
      return;
    }

    if (formData.noOfDays <= 0) {
      toast.error("Invalid date range selected");
      return;
    }

    try {
      onSubmit(formData);
      toast.success("Leave request submitted successfully!");
      onClose();

      // Reset form data
      setFormData({
        depId: "",
        empId: "",
        leaveType: "",
        from: "",
        to: "",
        noOfDays: 0,
        note: "",
      });
    } catch (error) {
      toast.error("Failed to submit leave request. Please try again.");
    }
  };

  const handleInputChange = (
    field: keyof LeaveFormData,
    value: string | number
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // If department changes, clear employee selection
      if (field === "depId" && value !== prev.depId) {
        newData.empId = "";
      }

      return newData;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">New Leave Request</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              value={formData.depId}
              onChange={(e) => handleInputChange("depId", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept: any) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Employee</label>
            <select
              value={formData.empId}
              onChange={(e) => handleInputChange("empId", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              required
              disabled={!formData.depId}
            >
              <option value="">Select Employee</option>
              {employees.map((emp: any) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Leave Type</label>
            <select
              value={formData.leaveType}
              onChange={(e) => handleInputChange("leaveType", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <input
                type="date"
                value={formData.from}
                onChange={(e) => handleInputChange("from", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <input
                type="date"
                value={formData.to}
                onChange={(e) => handleInputChange("to", e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                min={formData.from}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">No of Days</label>
            <input
              type="text"
              value={`${formData.noOfDays} days`}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              value={formData.note}
              onChange={(e) => handleInputChange("note", e.target.value)}
              placeholder="Enter reason for leave..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none h-20 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
