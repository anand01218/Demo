"use client";
import React from "react";
import { Mail, FileText, Eye, FileIcon, Delete } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableCandidateCardProps } from "@/interface/recruitment.interface";
import { candidateDataService } from "@/data/recruitment/candidate-data";
import SmallModal from "@/components/elements/base-ui/modals/SmallModal";
import { toast } from "sonner";

const SortableCandidateCard: React.FC<SortableCandidateCardProps> = ({
  candidate,
  onEmailCandidate,
  onAddNote,
  onViewNotes,
  onViewResume,
  isLastStage,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    SmallModal.confirm({
      title: "Delete Candidate?",
      content: `Are you sure you want to delete "${candidate.name}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: async () => {
        candidateDataService.deleteCandidate(candidate.id);
        toast.success("Candidate deleted");
      },
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600 p-4 cursor-move hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              {candidate.name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Applied {formatDate(candidate.appliedDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {isLastStage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEmailCandidate(candidate);
              }}
              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group/btn"
              title="Send Email"
            >
              <Mail
                size={14}
                className="group-hover/btn:scale-110 transition-transform"
              />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddNote(candidate);
            }}
            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group/btn"
            title="Add Note"
          >
            <FileText
              size={14}
              className="group-hover/btn:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewNotes(candidate);
            }}
            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group/btn"
            title="View Notes"
          >
            <Eye
              size={14}
              className="group-hover/btn:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewResume(candidate.resumeUrl || "");
            }}
            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            title="View Resume"
            disabled={!candidate.resumeUrl}
          >
            <FileIcon
              size={14}
              className="group-hover/btn:scale-110 transition-transform"
            />
          </button>

          <button
            onClick={handleDelete}
            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all duration-200"
            title="Delete Candidate"
          >
            <Delete size={14} className="transition-transform" />
          </button>
        </div>

        {candidate.notes && candidate.notes.length > 0 && (
          <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
            {candidate.notes.length} note{candidate.notes.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Drag indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-500 rounded-full" />
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-500 rounded-full mt-1" />
      </div>
    </div>
  );
};

export default SortableCandidateCard;
