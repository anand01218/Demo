"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCandidateCard from "./CandidateCard";
import { useDeleteRecruitmentStageMutation } from "@/redux/slices/recruitmentAction";
import { useModale } from "@/context/ModaleContext";
import SmallModal from "@/components/elements/base-ui/modals/SmallModal";
import { toast } from "sonner";
import { Edit2, Delete } from "lucide-react";

import { DroppableStageProps } from "@/interface/recruitment.interface";

const StageCard: React.FC<DroppableStageProps> = ({
  stage,
  candidates,
  isOver,
  lastStageId,
}) => {
  const { setNodeRef } = useDroppable({
    id: stage.id,
  });

  const [deleteRecruitmentStage] = useDeleteRecruitmentStageMutation();
  const { modaleShow } = useModale();

  const handleDeleteStage = async (id: string) => {
    SmallModal.confirm({
      title: "Delete Item?",
      content: "Are you sure you want to delete this?",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: async () => {
        await deleteRecruitmentStage(id);
        toast.success("Stage deleted successfully!");
      },
    });
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-80 p-4 transition-all duration-200 rounded-lg ${
        isOver
          ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-600 shadow-lg"
          : "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h5 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {stage.name}
          </h5>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => modaleShow("add-stage-modal", stage)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            title="Edit Stage"
          >
            {/* icon kept intentionally minimal here; you can re-import Edit2 if needed */}
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => handleDeleteStage(stage.id)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            title="Delete Stage"
          >
            <Delete size={16} />
          </button>
        </div>
      </div>

      <SortableContext
        items={candidates.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
        id={stage.id}
      >
        <div
          className={`space-y-3 min-h-[600px] p-2 border-2 border-dashed rounded-lg transition-all duration-200 ${
            isOver
              ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/10"
              : "border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50"
          }`}
        >
          {candidates.length === 0 && (
            <div className="flex items-center justify-center h-32 text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <div className="text-3xl mb-2">📋</div>
                <p className="text-sm">No candidates yet</p>
                <p className="text-xs">Drop candidates here</p>
              </div>
            </div>
          )}
          {candidates.map((candidate) => (
            <SortableCandidateCard
              key={candidate.id}
              candidate={candidate}
              isLastStage={candidate.stageId === lastStageId}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default StageCard;
