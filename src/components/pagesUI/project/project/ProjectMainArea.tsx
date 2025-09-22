"use client";

import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import TableComponent from "@/components/ui/TableComponent";
import TableHeader from "@/components/common/TableHeader";
import SummarySingleCard from "@/components/common/SummarySingleCard";
import projectData from "@/data/project-data";
import React, { useState } from "react";
import { Plus } from "lucide-react";

const ProjectMainArea = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate summary statistics
  const totalProjects = projectData.length;
  const activeProjects = projectData.filter(
    (p) => p.status === "Active"
  ).length;
  const completedProjects = projectData.filter(
    (p) => p.status === "Completed"
  ).length;
  const onHoldProjects = projectData.filter(
    (p) => p.status === "On Hold"
  ).length;

  const summaryCards = [
    {
      title: "Total Projects",
      value: totalProjects,
      iconClass: "fa-solid fa-folder-open",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      iconClass: "fa-solid fa-play",
    },
    {
      title: "Completed",
      value: completedProjects,
      iconClass: "fa-solid fa-check-circle",
    },
    {
      title: "On Hold",
      value: onHoldProjects,
      iconClass: "fa-solid fa-pause",
    },
  ];

  const columns = [
    {
      key: "title",
      label: "Project Title",
      sortable: true,
      render: (value: string) => (
        <div className="font-medium text-gray-900 dark:text-white">{value}</div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => {
        const statusColors = {
          Active:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          Completed:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
          "On Hold":
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
          Cancelled:
            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "startDate",
      label: "Start Date",
      sortable: true,
    },
    {
      key: "endDate",
      label: "End Date",
      sortable: true,
    },
    {
      key: "projectProgress",
      label: "Progress",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                value >= 80
                  ? "bg-green-500"
                  : value >= 50
                    ? "bg-blue-500"
                    : value >= 25
                      ? "bg-yellow-500"
                      : "bg-red-500"
              }`}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[35px]">
            {value}%
          </span>
        </div>
      ),
    },
    {
      key: "member",
      label: "Members",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-1">
          <i className="fa-solid fa-users text-gray-500 text-sm" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "openTask",
      label: "Open Tasks",
      sortable: true,
      render: (value: number) => (
        <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-md text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      key: "completeTask",
      label: "Completed Tasks",
      sortable: true,
      render: (value: number) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md text-sm font-medium">
          {value}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="app__slide-wrapper">
        <div className="flex items-center justify-between mb-2">
          <Breadcrumb breadTitle="Projects" subTitle="Home" />
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 mb-2">
          {summaryCards.map((card, index) => (
            <SummarySingleCard
              key={index}
              iconClass={card.iconClass}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>

        {/* Projects Table */}
        <div className="bg-white p-4 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <TableHeader
            title="Projects"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search projects..."
          />
          <TableComponent
            data={projectData}
            columns={columns}
            pageSize={10}
            className="rounded-lg border border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
    </>
  );
};

export default ProjectMainArea;
