"use client";
import React, { useState, useMemo } from "react";
import { Mail, FileText, Eye, FileIcon } from "lucide-react";
import { candidatesData, recruitmentStages } from "@/data/recruitment-data";
import { Candidate } from "@/interface/recruitment.interface";
import TableComponent from "@/components/ui/TableComponent";
import { TableColumn } from "@/interface/tableComponent.interface";

interface CandidateTableViewProps {
  searchTerm: string;
  // eslint-disable-next-line no-unused-vars
  onEmailCandidate: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onAddNote: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewNotes: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewResume: (_resumeUrl: string) => void;
}

const CandidateTableView: React.FC<CandidateTableViewProps> = ({
  searchTerm,
  onEmailCandidate,
  onAddNote,
  onViewNotes,
  onViewResume,
}) => {
  const [candidates] = useState<Candidate[]>(candidatesData);

  const filteredCandidates = useMemo(() => {
    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.contact.includes(searchTerm)
    );
  }, [candidates, searchTerm]);

  const getStageName = (stageId: string) => {
    const stage = recruitmentStages.find((s) => s.id === stageId);
    return stage?.name || "Unknown Stage";
  };

  const getStageColor = (stageId: string) => {
    const stage = recruitmentStages.find((s) => s.id === stageId);
    const colors = {
      SCREENING:
        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
      INTERVIEW:
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
      ASSESSMENT:
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700",
      FINAL:
        "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
      OFFER:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
      ONBOARDING:
        "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700",
    };
    return (
      colors[stage?.type as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns: TableColumn<Candidate>[] = [
    {
      key: "name",
      label: "Candidate",
      sortable: true,
      // eslint-disable-next-line no-unused-vars
      render: (_, row) => (
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {row.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Applied {formatDate(row.appliedDate)}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Contact Information",
      sortable: true,
      // eslint-disable-next-line no-unused-vars
      render: (_, row) => (
        <div>
          <div className="text-gray-900 dark:text-gray-100 text-sm">
            {row.email}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {row.contact}
          </div>
        </div>
      ),
    },
    {
      key: "stageId",
      label: "Current Stage",
      sortable: true,
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(value)}`}
        >
          {getStageName(value)}
        </span>
      ),
    },
    {
      key: "notes",
      label: "Notes",
      // eslint-disable-next-line no-unused-vars
      render: (_, row) => (
        <div className="flex items-center">
          {row.notes && row.notes.length > 0 ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {row.notes.length} note{row.notes.length > 1 ? "s" : ""}
            </span>
          ) : (
            <span className="text-gray-400 text-xs">No notes</span>
          )}
        </div>
      ),
    },
    {
      key: "action",
      label: "Actions",
      // eslint-disable-next-line no-unused-vars
      render: (_, row) => (
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEmailCandidate(row)}
            className="p-2.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group"
            title="Send Email"
          >
            <Mail
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={() => onAddNote(row)}
            className="p-2.5 text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 group"
            title="Add Note"
          >
            <FileText
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={() => onViewNotes(row)}
            className="p-2.5 text-purple-600 hover:text-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200 group"
            title="View Notes"
          >
            <Eye
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={() => onViewResume(row.resumeUrl || "")}
            className="p-2.5 text-orange-600 hover:text-orange-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            title="View Resume"
            disabled={!row.resumeUrl}
          >
            <FileIcon
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Candidate Overview
            </h3>
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredCandidates.length} candidate
              {filteredCandidates.length !== 1 ? "s" : ""} in pipeline
            </span>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {
                  filteredCandidates.filter(
                    (c) =>
                      recruitmentStages.find((s) => s.id === c.stageId)
                        ?.type === "SCREENING"
                  ).length
                }
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Screening
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {
                  filteredCandidates.filter(
                    (c) =>
                      recruitmentStages.find((s) => s.id === c.stageId)
                        ?.type === "INTERVIEW"
                  ).length
                }
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Interview
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {
                  filteredCandidates.filter(
                    (c) =>
                      recruitmentStages.find((s) => s.id === c.stageId)
                        ?.type === "OFFER"
                  ).length
                }
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Offers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 p-6">
        <TableComponent
          data={filteredCandidates}
          columns={columns}
          pageSize={10}
          loading={false}
          emptyMessage="No candidates found matching your search criteria"
          pageSizeOptions={[5, 10, 15, 25]}
        />
      </div>
    </div>
  );
};

export default CandidateTableView;
