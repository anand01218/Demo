"use client";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

type Variant = "default" | "danger" | "warning";

export interface SmallModalOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  variant?: Variant;
  isLogout?: boolean;
}

interface InternalModalState extends SmallModalOptions {
  open: boolean;
}

// Store reference for showing modal
// eslint-disable-next-line no-unused-vars -- Function signature requires parameter name
let showModal: ((options: SmallModalOptions) => void) | null = null;

// 🔑 Define a custom type that extends React.FC with a static method
interface SmallModalComponent extends React.FC {
  // eslint-disable-next-line no-unused-vars -- Interface requires parameter name
  confirm: (options: SmallModalOptions) => void;
}

const SmallModal: SmallModalComponent = () => {
  const [state, setState] = useState<InternalModalState>({
    open: false,
    title: "",
    content: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "default",
    isLogout: false,
    onConfirm: undefined,
  });

  // Expose confirm method globally
  React.useEffect(() => {
    showModal = (options: SmallModalOptions) => {
      setState((prev) => ({
        ...prev,
        open: true,
        ...options,
      }));
    };
  }, []);

  const handleClose = () =>
    setState((prev) => ({
      ...prev,
      open: false,
    }));

  const handleConfirm = async () => {
    if (state.onConfirm) {
      await state.onConfirm();
    }
    handleClose();
  };

  const isDanger = state.isLogout || state.variant === "danger";
  const isWarning = state.variant === "warning";

  const getHeaderBg = () => {
    return "bg-gray-50 dark:bg-gray-800";
  };

  const getTitleColor = () => {
    if (isDanger) return "text-red-700 dark:text-red-300";
    if (isWarning) return "text-yellow-700 dark:text-yellow-300";
    return "text-gray-900 dark:text-white";
  };

  return (
    <Dialog
      open={state.open}
      onClose={handleClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: "280px",
          borderRadius: "16px",
          boxShadow: isDanger
            ? "0 25px 50px -12px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(239, 68, 68, 0.05)"
            : isWarning
              ? "0 25px 50px -12px rgba(245, 158, 11, 0.25), 0 0 0 1px rgba(245, 158, 11, 0.05)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <DialogTitle
        className={`${getHeaderBg()} border-b border-gray-100 dark:border-gray-700 m-0 flex justify-between items-center p-6 pb-4`}
      >
        {isDanger && (
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        )}
        {isWarning && (
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        )}
        {!isDanger && !isWarning && (
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
        <h5 className={`font-semibold text-xl ${getTitleColor()}`}>
          {state.title}
        </h5>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: isDanger ? "#ef4444" : isWarning ? "#f59e0b" : "#6b7280",
            "&:hover": {
              backgroundColor: isDanger
                ? "rgba(239, 68, 68, 0.1)"
                : isWarning
                  ? "rgba(245, 158, 11, 0.1)"
                  : "rgba(107, 114, 128, 0.1)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        className="bg-white dark:bg-gray-800 p-0"
        sx={{ padding: 0 }}
      >
        <div className="p-6 pt-2">
          {state.content ? (
            <p
              className={`text-base leading-relaxed text-gray-700 dark:text-gray-300`}
            >
              {state.content}
            </p>
          ) : (
            // children || (
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              This is a vertically centered modal.
            </p>
            // )
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-2 pt-2 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-200"
            onClick={handleClose}
          >
            {state.cancelText}
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 focus:ring-4 focus:outline-none ${
              isDanger
                ? "border-2 border-red-600 text-red-600 hover:bg-red-700 hover:text-white focus:ring-red-300 dark:focus:ring-red-800"
                : isWarning
                  ? "border-2 border-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300 dark:focus:ring-yellow-800"
                  : "border-2 border-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800"
            }`}
            onClick={handleConfirm}
          >
            {state.confirmText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Attach static confirm method safely
// eslint-disable-next-line no-unused-vars -- API surface requires named parameter
SmallModal.confirm = (options: SmallModalOptions) => {
  if (showModal) {
    showModal(options);
  }
};

export default SmallModal;
