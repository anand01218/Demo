"use client";

import React from "react";
import TableComponent from "../ui/TableComponent";
import { TableColumn } from "../../interface/tableComponent.interface";

// Example data interface
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: "Active" | "Inactive";
}

// Sample data
const sampleEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    position: "Senior Developer",
    salary: 75000,
    joinDate: "2023-01-15",
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 65000,
    joinDate: "2023-03-20",
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    department: "HR",
    position: "HR Specialist",
    salary: 55000,
    joinDate: "2023-02-10",
    status: "Inactive",
  },
];

export default function TableExample() {
  const columns: TableColumn<Employee>[] = [
    {
      key: "id",
      label: "Employee ID",
      sortable: true,
      width: "w-24",
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-medium text-sm">
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      key: "position",
      label: "Position",
      sortable: true,
    },
    {
      key: "salary",
      label: "Salary",
      sortable: true,
      render: (value) => (
        <span className="font-medium text-green-600">
          ${value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "joinDate",
      label: "Join Date",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Employee Management
        </h1>
        <p className="text-gray-600">Manage and view employee information</p>
      </div>

      <TableComponent
        data={sampleEmployees}
        columns={columns}
        pageSize={10}
        emptyMessage="No employees found"
        className="shadow-lg"
      />
    </div>
  );
}
