"use client";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import React, { useState } from "react";
import EmployeeAttendanceSummary from "./EmployeeAttendanceSummary";
import EmployeeAttendanceTable from "./EmployeeAttendanceTable";
import { useGetDepartmentListQuery } from "@/redux/slices/DepartmentAction";
import { useGetEmployeeListQuery } from "@/redux/slices/EmployeeAction";
import { useCheckInMutation } from "@/redux/slices/AttendanceAction";
import { Download, Upload } from "lucide-react";

const EmployeeAttendanceMainArea = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [importCondition1, setImportCondition1] = useState(false);
  const [importCondition2, setImportCondition2] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    employeeId: "",
    departmentId: "",
    attendanceMode: "WEB",
    reason: "",
  });

  const { data: employees } = useGetEmployeeListQuery({
    ...(formData.departmentId && { departmentId: formData.departmentId }),
  });
  const { data: departments } = useGetDepartmentListQuery({});
  const [checkIn, { isLoading }] = useCheckInMutation();

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset employee selection when department changes
      ...(field === "departmentId" && { employeeId: "" }),
    }));
  };

  const handleSave = async () => {
    try {
      await checkIn({
        ...formData,
        attendanceType: "CHECK_IN_OUT_BUTTON",
      }).unwrap();
      setShowModal(false);
      setFormData({
        employeeId: "",
        departmentId: "",
        attendanceMode: "WEB",
        reason: "",
      });
    } catch (error) {
      // Check-in failed
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({
      employeeId: "",
      departmentId: "",
      attendanceMode: "WEB",
      reason: "",
    });
  };

  return (
    <>
      <div className="app__slide-wrapper">
        <div className="flex items-center justify-between mb-2">
          <Breadcrumb breadTitle="Employee Attendance" subTitle="Home" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowImportModal(true)}
              className="px-3 py-1 border border-green-600 hover:bg-green-700 text-green-600 hover:text-white rounded-md transition-colors font-medium flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="px-3 py-1 border border-orange-600 hover:bg-orange-700 text-orange-600 hover:text-white rounded-md transition-colors font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
            >
              <i className="fa-solid fa-plus mr-2" />
              Mark Attendance
            </button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-2 maxXs:gap-x-0">
          <EmployeeAttendanceSummary />
          <EmployeeAttendanceTable />
        </div>

        {/* Attendance Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mark Attendance
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Department Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) =>
                      handleInputChange("departmentId", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Department</option>
                    {departments?.data?.map((dept: any) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Employee Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Employee
                  </label>
                  <select
                    value={formData.employeeId}
                    onChange={(e) =>
                      handleInputChange("employeeId", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Employee</option>
                    {employees?.data?.map((emp: any) => (
                      <option key={emp.id} value={emp.employeeId}>
                        {emp.firstName} {emp.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Attendance Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attendance Mode
                  </label>
                  <select
                    value={formData.attendanceMode}
                    onChange={(e) =>
                      handleInputChange("attendanceMode", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="WEB">Web</option>
                    <option value="MOBILE">Mobile</option>
                    <option value="DEVICE">Device</option>
                  </select>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) =>
                      handleInputChange("reason", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={3}
                    placeholder="Enter reason for check-in"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                >
                  {isLoading ? "Checking In..." : "Check In"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showImportModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowImportModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Import Attendance
                </h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              {/* File Uploader */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  dragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  const files = e.dataTransfer.files;
                  if (files[0]) setSelectedFile(files[0]);
                }}
              >
                {selectedFile ? (
                  <div className="text-green-600 dark:text-green-400">
                    <i className="fa-solid fa-file-excel text-2xl mb-2" />
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-sm">Supports: .xlsx, .csv files</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              {/* Conditions */}
              <div className="mt-4 space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={importCondition1}
                    onChange={(e) => setImportCondition1(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Overwrite existing attendance records
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={importCondition2}
                    onChange={(e) => setImportCondition2(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Send notification to employees
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={!selectedFile}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeAttendanceMainArea;
