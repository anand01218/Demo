"use client";
import React from "react";
import TableComponent from "@/components/ui/TableComponent";
import { TableColumn } from "@/interface/tableComponent.interface";

interface Department {
  id: number;
  name: string;
  head: string;
  employees: number;
  budget: number;
  location: string;
  status: "Active" | "Inactive";
  createdDate: string;
}

const departmentData: Department[] = [
  {
    id: 1,
    name: "Engineering",
    head: "John Smith",
    employees: 25,
    budget: 500000,
    location: "Building A",
    status: "Active",
    createdDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Marketing",
    head: "Sarah Johnson",
    employees: 12,
    budget: 200000,
    location: "Building B",
    status: "Active",
    createdDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Human Resources",
    head: "Mike Wilson",
    employees: 8,
    budget: 150000,
    location: "Building C",
    status: "Active",
    createdDate: "2023-01-10",
  },
  {
    id: 4,
    name: "Finance",
    head: "Emily Davis",
    employees: 15,
    budget: 300000,
    location: "Building A",
    status: "Active",
    createdDate: "2023-03-05",
  },
  {
    id: 5,
    name: "Operations",
    head: "David Brown",
    employees: 20,
    budget: 400000,
    location: "Building B",
    status: "Inactive",
    createdDate: "2023-04-12",
  },
];

const columns: TableColumn<Department>[] = [
  {
    key: "name",
    label: "Department Name",
    sortable: true,
    render: (value) => (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <i className="fa-solid fa-building text-blue-600" />
        </div>
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "head",
    label: "Department Head",
    sortable: true,
    render: (value) => (
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-gray-600 font-medium text-sm">
            {value
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </span>
        </div>
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: "employees",
    label: "Employees",
    sortable: true,
    render: (value) => (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
        {value}
      </span>
    ),
  },
  {
    key: "budget",
    label: "Budget",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-green-600">
        ${value.toLocaleString()}
      </span>
    ),
  },
  { key: "location", label: "Location", sortable: true },
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
  {
    key: "createdDate",
    label: "Created Date",
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: "action",
    label: "Action",
    render: () => (
      <div className="flex gap-2">
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <i className="fa-solid fa-eye" />
        </button>
        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
          <i className="fa-solid fa-edit" />
        </button>
        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <i className="fa-solid fa-trash" />
        </button>
      </div>
    ),
  },
];

const DepartmentTable = () => {
  return (
    <TableComponent
      data={departmentData}
      columns={columns}
      pageSize={10}
      emptyMessage="No departments found"
    />
  );
};

export default DepartmentTable;
