"use client";
import React, { useState, useMemo } from "react";
import {
  Plus,
  Mail,
  FileText,
  Eye,
  FileIcon,
  Edit2,
  Delete,
} from "lucide-react";
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
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { candidatesData } from "@/data/recruitment-data";
import { Candidate, RecruitmentStage } from "@/interface/recruitment.interface";
import AddStageModal from "./AddStageModal";
import { useModale } from "@/context/ModaleContext";
import {
  useDeleteRecruitmentStageMutation,
  useGetRecruitmentStageQuery,
} from "@/redux/slices/recruitmentAction";
import { toast } from "sonner";
import SmallModal from "@/components/elements/base-ui/modals/SmallModal";

interface CandidateGridViewProps {
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

interface SortableCandidateCardProps {
  candidate: Candidate;
  // eslint-disable-next-line no-unused-vars
  onEmailCandidate: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onAddNote: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewNotes: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewResume: (_resumeUrl: string) => void;
}

const SortableCandidateCard: React.FC<SortableCandidateCardProps> = ({
  candidate,
  onEmailCandidate,
  onAddNote,
  onViewNotes,
  onViewResume,
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 cursor-move hover:shadow-lg transition-all duration-200 group"
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
        </div>

        {candidate.notes && candidate.notes.length > 0 && (
          <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
            {candidate.notes.length} note{candidate.notes.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Drag indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1 h-4 bg-gray-300 dark:bg-gray-500 rounded-full" />
        <div className="w-1 h-4 bg-gray-300 dark:bg-gray-500 rounded-full mt-1" />
      </div>
    </div>
  );
};

interface DroppableStageProps {
  stage: RecruitmentStage;
  candidates: Candidate[];
  isOver: boolean;
  // eslint-disable-next-line no-unused-vars
  onEmailCandidate: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onAddNote: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewNotes: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewResume: (_resumeUrl: string) => void;
}

const DroppableStage: React.FC<DroppableStageProps> = ({
  stage,
  candidates,
  isOver,
  onEmailCandidate,
  onAddNote,
  onViewNotes,
  onViewResume,
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
      className={`flex-shrink-0 w-80 p-4 transition-all duration-200 ${
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
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => handleDeleteStage(stage.id)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            title="Delete Stage"
          >
            <Delete size={14} />
          </button>
        </div>
      </div>

      <SortableContext
        items={candidates.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
        id={stage.id}
      >
        <div
          className={`space-y-3 min-h-[400px] p-3 border-2 border-dashed rounded-xl transition-all duration-200 ${
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
              onEmailCandidate={onEmailCandidate}
              onAddNote={onAddNote}
              onViewNotes={onViewNotes}
              onViewResume={onViewResume}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

const CandidateGridView: React.FC<CandidateGridViewProps> = ({
  searchTerm,
  onEmailCandidate,
  onAddNote,
  onViewNotes,
  onViewResume,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>(candidatesData);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [stage, _onStageUpdate] = useState<RecruitmentStage>();

  const { modaleShow } = useModale();

  const { data } = useGetRecruitmentStageQuery(undefined);
  const recruitmentStages: RecruitmentStage[] = data;

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
      ?.sort((a, b) => a.order - b.order)
      .map((stage) => ({
        stage,
        candidates: filteredCandidates.filter(
          (candidate) => candidate.stageId === stage.id
        ),
      }));
  }, [filteredCandidates, recruitmentStages]);

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
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Recruitment Pipeline
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {filteredCandidates.length} candidate
                  {filteredCandidates.length !== 1 ? "s" : ""} • Drag to move
                  between stages
                </span>
              </div>
              <button
                onClick={() => modaleShow("add-stage-modal")}
                className="p-1 border border-blue-500 text-blue-500 rounded-md hover:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                title="Add New Stage"
              >
                <Plus size={20} />{" "}
                <span className="sr-only">Add New Stage</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-x-auto">
            <div
              className="flex gap-3 pb-4"
              style={{ minWidth: `${stageColumns?.length * 320}px` }}
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

      <AddStageModal stage={stage} />
    </>
  );
};

export default CandidateGridView;
