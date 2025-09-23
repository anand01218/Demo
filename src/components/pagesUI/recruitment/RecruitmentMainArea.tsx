"use client";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import React, { useState } from "react";
import { Search } from "lucide-react";
import CandidateGridView from "./CandidateGridView";
import AddCandidateModal from "./FormModel/AddCandidateModal";
import AddStageModal from "./FormModel/AddStageModal";
import EmailModal from "./FormModel/EmailModal";
import NoteModal from "./FormModel/NoteModal";
import ViewNotesModal from "./FormModel/ViewNotesModal";
import Header from "@/components/common/Header";
import { useModale } from "@/context/ModaleContext";

import { useGetRecruitmentStageQuery } from "@/redux/slices/recruitmentAction";

const RecruitmentMainArea = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showViewNotesModal, setShowViewNotesModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedStageId, setSelectedStageId] = useState<string>("");
  const { modaleShow } = useModale();

  const handleEmailCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowEmailModal(true);
  };

  const handleAddNote = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowNoteModal(true);
  };

  const handleViewNotes = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowViewNotesModal(true);
  };

  const handleViewResume = (resumeUrl: string) => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  };

  return (
    <>
      <div className="app__slide-wrapper">
        <div className="flex items-center justify-between mb-2">
          <Breadcrumb breadTitle="Recruitment" subTitle="Home" />
        </div>

        <div className="bg-white border border-gray-200 dark:border-gray-600 shadow-lg dark:bg-gray-800 rounded-sm overflow-hidden">
          {/* Enhanced Header */}
          <div className="bg-white dark:bg-gray-800 px-6 py-2 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center bg-white dark:bg-gray-800 justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <Header title="Recruitment Dashboard" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-64 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none shadow-sm transition-all duration-200"
                  />
                </div>
                <button
                  onClick={() => modaleShow("add-candidate-modal")}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  title="Add Candidate"
                >
                  Add Candidate
                </button>
                <button
                  onClick={() => modaleShow("add-stage-modal")}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  title="Add Stage"
                >
                  Add Stage
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex h-full gap-4">
            <div className="flex-1 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
              <CandidateGridView
                searchTerm={searchTerm}
                onEmailCandidate={handleEmailCandidate}
                onAddNote={handleAddNote}
                onViewNotes={handleViewNotes}
                onViewResume={handleViewResume}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddCandidateModal stageId={selectedStageId} />
      <AddStageModal />

      <EmailModal
        open={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        candidate={selectedCandidate}
      />

      <NoteModal
        open={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        candidate={selectedCandidate}
      />

      <ViewNotesModal
        open={showViewNotesModal}
        onClose={() => setShowViewNotesModal(false)}
        candidate={selectedCandidate}
      />
    </>
  );
};

export default RecruitmentMainArea;
