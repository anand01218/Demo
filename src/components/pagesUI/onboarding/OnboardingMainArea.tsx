"use client";
import React, { useState } from "react";
import {
  OnboardingCandidate,
  onboardingCandidatesData,
  onboardingStepsData,
} from "@/data/onboarding-data";
import ActivityStatusModal from "./ActivityStatusModal";
import TableComponent from "@/components/ui/TableComponent";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";

const OnboardingMainArea: React.FC = () => {
  const [candidates, setCandidates] = useState<OnboardingCandidate[]>(
    onboardingCandidatesData
  );
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] =
    useState<OnboardingCandidate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      "in-progress":
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      paused:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusConfig[status as keyof typeof statusConfig] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleActivityStatus = (candidate: OnboardingCandidate) => {
    setSelectedCandidate(candidate);
    setIsActivityModalOpen(true);
  };

  const handleAddToEmployee = (candidateId: number) => {
    // Update the candidate status to completed and current step to total steps
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              status: "completed",
              currentStep: candidate.totalSteps,
            }
          : candidate
      )
    );
    alert("Candidate successfully added to employee list!");
  };

  const handleDelete = (candidateId: number) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      setCandidates((prev) =>
        prev.filter((candidate) => candidate.id !== candidateId)
      );
    }
  };

  // Table columns configuration
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: string, candidate: OnboardingCandidate) => (
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {candidate.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Join Date: {new Date(candidate.joinDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "position",
      label: "Position",
      sortable: true,
      render: (value: string, candidate: OnboardingCandidate) => (
        <div>
          <div className="text-sm text-gray-900 dark:text-white">
            {candidate.position}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {candidate.department}
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (value: string, candidate: OnboardingCandidate) => (
        <div>
          <div className="text-sm text-gray-900 dark:text-white">
            {candidate.email}
          </div>
          {candidate.phone && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {candidate.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: "progress",
      label: "Progress",
      render: (value: any, candidate: OnboardingCandidate) => (
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>
                Step {candidate.currentStep} of {candidate.totalSteps}
              </span>
              <span>
                {Math.round(
                  ((candidate.currentStep - 1) / candidate.totalSteps) * 100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                style={{
                  width: `${((candidate.currentStep - 1) / candidate.totalSteps) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "text-center w-32",
      render: (value: any, candidate: OnboardingCandidate) => (
        <div className="flex items-center justify-center">
          {/* Add to Employee */}
          {candidate.status !== "completed" && (
            <button
              onClick={() => handleAddToEmployee(candidate.id)}
              className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md text-green-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              title="Add to Employee"
            >
              <i className="fa-solid fa-user-plus" />
            </button>
          )}

          {/* Activity Status */}
          <button
            onClick={() => handleActivityStatus(candidate)}
            className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md text-blue-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            title="View Activity Status"
          >
            <i className="fa-solid fa-tasks" />
          </button>

          {/* Edit */}
          {/* <button
            onClick={() => handleEdit(candidate.id)}
            className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            title="Edit Candidate"
          >
            <i className="fa-solid fa-edit"></i>
          </button> */}

          {/* Delete */}
          <button
            onClick={() => handleDelete(candidate.id)}
            className="inline-flex items-center justify-center w-8 h-8 border border-transparent text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors dark:bg-transparent dark:hover:bg-red-600"
            title="Delete Candidate"
          >
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="app__slide-wrapper">
      <Breadcrumb breadTitle="Onboarding" subTitle="Home" />
      <div className="row mt-2">
        <div className="col-12">
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Onboarding Management
                  </h2>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fa-solid fa-search text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 dark:bg-gray-700/80 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:bg-gray-700 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:hover:border-gray-500 sm:text-sm"
                      placeholder="Search candidates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Add New Button */}
                  {/* <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add New Candidate
                  </button> */}
                </div>
              </div>
            </div>

            {/* Table */}
            <div>
              <TableComponent
                data={filteredCandidates}
                columns={columns}
                pageSize={10}
                height="600px"
                emptyMessage={
                  searchTerm
                    ? "No candidates found matching your search criteria."
                    : "Get started by adding your first onboarding candidate."
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Status Modal */}
      <ActivityStatusModal
        isOpen={isActivityModalOpen}
        onClose={() => {
          setIsActivityModalOpen(false);
          setSelectedCandidate(null);
        }}
        candidate={selectedCandidate}
        steps={onboardingStepsData}
      />
    </div>
  );
};

export default OnboardingMainArea;
