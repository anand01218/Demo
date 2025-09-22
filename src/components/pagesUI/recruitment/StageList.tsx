"use client";
import React, { useState } from "react";
import { Plus, Edit2 } from "lucide-react";
import { recruitmentStages } from "@/data/recruitment-data";
import { RecruitmentStage } from "@/interface/recruitment.interface";

interface StageListProps {
  // eslint-disable-next-line no-unused-vars
  onAddCandidate: (_stageId: string) => void;
}

const StageList: React.FC<StageListProps> = ({ onAddCandidate }) => {
  const [stages, setStages] = useState<RecruitmentStage[]>(recruitmentStages);
  // eslint-disable-next-line no-unused-vars -- Reserved for future modal functionality
  const [_showAddStageModal, _setShowAddStageModal] = useState(false);
  const [editingStage, setEditingStage] = useState<RecruitmentStage | null>(
    null
  );

  const handleEditStage = (stage: RecruitmentStage) => {
    setEditingStage(stage);
    _setShowAddStageModal(true);
  };

  // eslint-disable-next-line no-unused-vars
  const _handleStageUpdate = (updatedStage: RecruitmentStage) => {
    if (editingStage) {
      setStages((prev) =>
        prev.map((stage) =>
          stage.id === editingStage.id ? updatedStage : stage
        )
      );
    } else {
      setStages((prev) => [...prev, updatedStage]);
    }
    setEditingStage(null);
  };

  return (
    <>
      <div className="space-y-2">
        {stages
          .sort((a, b) => a.order - b.order)
          .map((stage, index) => (
            <div
              key={stage.id}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-3">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                    {stage.name}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-12">
                        Type:
                      </span>
                      <span
                        className={`inline-flex px-1 py-1 rounded-full text-xs font-medium ${
                          stage.type === "SCREENING"
                            ? "text-yellow-800 dark:text-yellow-200"
                            : stage.type === "INTERVIEW"
                              ? "text-blue-800 dark:text-blue-200"
                              : stage.type === "ASSESSMENT"
                                ? "text-purple-800 dark:text-purple-200"
                                : stage.type === "FINAL"
                                  ? "text-red-800 dark:text-red-200"
                                  : stage.type === "OFFER"
                                    ? "text-green-800 dark:text-green-200"
                                    : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {stage.type}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-12">
                        Lead:
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {stage.manager}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleEditStage(stage)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                    title="Edit Stage"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => onAddCandidate(stage.id)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                    title="Add Candidate"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Connection line to next stage */}
              {index < stages.length - 1 && (
                <div className="absolute -bottom-2 left-0 w-full flex justify-center">
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                </div>
              )}
            </div>
          ))}
      </div>

      {/* <AddStageModal
        open={_showAddStageModal}
        onClose={() => {
          _setShowAddStageModal(false);
          setEditingStage(null);
        }}
        stage={editingStage}
        onStageUpdate={_handleStageUpdate}
      /> */}
    </>
  );
};

export default StageList;
