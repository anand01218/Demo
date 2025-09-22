"use client";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import React, { useState } from "react";
import LeaveSummary from "./LeaveSummary";
import LeaveTable from "./LeaveTable";
import { Plus } from "lucide-react";
import { useCreateLeaveMutation } from "@/redux/slices/LeaveRequestAction";
import LeaveRequestModal from "./LeaveRequestModal";

const LeaveMainArea = () => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [createLeave] = useCreateLeaveMutation();
  const handleLeaveSubmit = async (formData: any) => {
    try {
      await createLeave(formData).unwrap();
      setShowLeaveModal(false);
    } catch (error) {
      // Failed to create leave
    }
  };

  return (
    <>
      <div className="app__slide-wrapper">
        <div className="flex items-center justify-between mb-2">
          <Breadcrumb breadTitle="Leave Management" subTitle="Home" />
          <button
            onClick={() => setShowLeaveModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Leave
          </button>
        </div>
        <div className="grid grid-cols-12 gap-x-2 maxXs:gap-x-0">
          <LeaveSummary />
          <LeaveTable />
        </div>
      </div>

      <LeaveRequestModal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        onSubmit={handleLeaveSubmit}
      />
    </>
  );
};

export default LeaveMainArea;
