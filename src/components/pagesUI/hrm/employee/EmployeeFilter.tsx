"use client";
import React, { useState } from "react";
import AddNewEmployeeModal from "./AddNewEmployeeModal";
import { Download, Upload, FileText, FileSpreadsheet } from "lucide-react";
import { useModale } from "@/context/ModaleContext";
interface EmployeeFilterProps {
  employeeData?: any[];
}

const EmployeeFilter = ({ employeeData = [] }: EmployeeFilterProps) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importCondition1, setImportCondition1] = useState(false);
  const [importCondition2, setImportCondition2] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { modaleShow } = useModale();

  const exportToPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Employee Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Employee Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              ${employeeData
                .map(
                  (emp) => `
                <tr>
                  <td>${emp.firstName} ${emp.lastName}</td>
                  <td>${emp.position || "N/A"}</td>
                  <td>${emp.department?.name || "N/A"}</td>
                  <td>${emp.email}</td>
                  <td>${emp.phone || "N/A"}</td>
                  <td>${emp.status}</td>
                  <td>${new Date(emp.hireDate).toLocaleDateString()}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
    setShowExportModal(false);
  };

  const exportToXLSX = () => {
    const csvContent = [
      [
        "Name",
        "Position",
        "Department",
        "Email",
        "Phone",
        "Status",
        "Join Date",
      ],
      ...employeeData.map((emp) => [
        `${emp.firstName} ${emp.lastName}`,
        emp.position || "N/A",
        emp.department?.name || "N/A",
        emp.email,
        emp.phone || "N/A",
        emp.status,
        new Date(emp.hireDate).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `employees_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setShowExportModal(false);
  };
  return (
    <>
      <div className="flex items-center justify-end gap-2 mb-2">
        <button
          onClick={() => setShowImportModal(true)}
          className="px-3 py-1 border border-green-600 hover:bg-green-700 text-green-600 hover:text-white rounded-md transition-colors font-medium flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Import
        </button>
        <button
          onClick={() => setShowExportModal(true)}
          className="px-3 py-1 border border-orange-600 hover:bg-orange-700 text-orange-600 hover:text-white rounded-md transition-colors font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <button
          type="button"
          className="btn-sm rounded-md bg-blue-600 text-white font-medium px-4 py-2"
          onClick={() => modaleShow("add-employee-modal")}
        >
          Add Employee
        </button>
      </div>
      <AddNewEmployeeModal modalId="add-employee-modal" />

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
                Import Employees
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            </div>

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

            <div className="mt-4 space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={importCondition1}
                  onChange={(e) => setImportCondition1(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Overwrite existing employee records
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

      {showExportModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowExportModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Export Employees
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose export format for {employeeData.length} employees:
              </p>

              <button
                onClick={exportToPDF}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Export as PDF
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Printable format
                  </p>
                </div>
              </button>

              <button
                onClick={exportToXLSX}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <FileSpreadsheet size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Export as CSV
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Excel compatible
                  </p>
                </div>
              </button>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeFilter;
