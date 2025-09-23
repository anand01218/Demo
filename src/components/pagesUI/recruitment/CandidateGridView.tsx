"use client";
import React, { useState, useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  rectIntersection,
} from "@dnd-kit/core";
import { candidateDataService } from "@/data/recruitment/candidate-data";
import {
  CandidateGridViewProps,
  Candidate,
  RecruitmentStage,
} from "@/interface/recruitment.interface";
import { useGetRecruitmentStageQuery } from "@/redux/slices/recruitmentAction";

import DroppableStage from "./Stage/DroppableStage";

const CandidateGridView: React.FC<CandidateGridViewProps> = ({
  searchTerm,
  onEmailCandidate,
  onAddNote,
  onViewNotes,
  onViewResume,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const { data } = useGetRecruitmentStageQuery(undefined);
  const recruitmentStages: RecruitmentStage[] = data;

  React.useEffect(() => {
    setCandidates(candidateDataService.getCandidates());

    // subscribe to service updates so UI refreshes when candidates are added/updated
    const unsubscribe = candidateDataService.addListener(() => {
      setCandidates(candidateDataService.getCandidates());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const filteredCandidates = useMemo(() => {
    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.contact.includes(searchTerm)
    );
  }, [candidates, searchTerm]);

  const stageColumns = useMemo(() => {
    return recruitmentStages
      ? [...recruitmentStages]
          .sort((a, b) => a.order - b.order)
          .map((stage) => ({
            stage,
            candidates: filteredCandidates.filter(
              (candidate) => candidate.stageId === stage.id
            ),
          }))
      : [];
  }, [filteredCandidates, recruitmentStages]);

  const lastStageId =
    recruitmentStages && recruitmentStages.length > 0
      ? [...recruitmentStages].sort((a, b) => a.order - b.order).at(-1)?.id
      : undefined;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? (over.id as string) : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setOverId(null);

    if (!over) {
      return;
    }

    const candidateId = active.id as string;
    const overId = over.id as string;

    // Check if dropping on a stage column (stage IDs)
    const targetStage = recruitmentStages.find((stage) => stage.id === overId);

    if (targetStage) {
      candidateDataService.updateStage(candidateId, overId);

      // optional: update local state immediately for snappy UI (listener will re-sync)
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate.id === candidateId
            ? { ...candidate, stageId: overId }
            : candidate
        )
      );
    }
  };

  const activeDragCandidate = activeId
    ? candidates.find((c) => c.id === activeId)
    : null;

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 p-6 overflow-x-auto">
            <div
              className="flex gap-3 pb-4"
              style={{
                minWidth: `${stageColumns?.length * 320}px`,
                minHeight: "100%",
              }}
            >
              {stageColumns?.map(({ stage, candidates: stageCandidates }) => (
                <DroppableStage
                  key={stage.id}
                  stage={stage}
                  candidates={stageCandidates}
                  isOver={overId === stage.id}
                  onEmailCandidate={onEmailCandidate}
                  onAddNote={onAddNote}
                  onViewNotes={onViewNotes}
                  onViewResume={onViewResume}
                  lastStageId={lastStageId}
                />
              ))}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeDragCandidate ? (
            <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-blue-300 dark:border-blue-600 p-4 shadow-2xl rotate-3 transform scale-105">
              <div className="flex items-center space-x-3 mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    {activeDragCandidate.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Applied on {formatDate(activeDragCandidate.appliedDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                  Moving candidate...
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* <AddStageModal stage={stage} /> */}
    </>
  );
};

export default CandidateGridView;
