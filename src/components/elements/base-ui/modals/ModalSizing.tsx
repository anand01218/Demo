"use client";
import React, { useState } from "react";
import ExtraLargeModal from "./ExtraLargeModel";
import LargeModal from "./LargeModal";
import SmallModal from "./SmallModal";

const ModalSizing = () => {
  const [extraLargeModalOpen, setExtraLargeModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);

  const handleShowSmallModal = () => {
    SmallModal.confirm({
      title: "Small Modal",
      content: "This is a small modal example with custom content.",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onConfirm: () => {
        // Handle small modal confirmation
      },
    });
  };

  return (
    <>
      <div className="card__wrapper">
        <div className="card__title-wrap mb-[20px]">
          <h5 className="card__heading-title">Modal Sizing</h5>
        </div>
        <div className="modal-btn-showcase">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setExtraLargeModalOpen(true)}
          >
            Extra large modal
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setLargeModalOpen(true)}
          >
            Large modal
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShowSmallModal}
          >
            Small modal
          </button>
        </div>
      </div>
      {/* -- App side area end -- */}
      {extraLargeModalOpen && (
        <ExtraLargeModal
          open={extraLargeModalOpen}
          setOpen={setExtraLargeModalOpen}
        />
      )}
      {largeModalOpen && (
        <LargeModal open={largeModalOpen} setOpen={setLargeModalOpen} />
      )}
      {/* SmallModal component needs to be rendered for the static method to work */}
      <SmallModal />
    </>
  );
};

export default ModalSizing;
