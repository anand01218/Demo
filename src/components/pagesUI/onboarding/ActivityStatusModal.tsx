"use client";
import React from "react";
import { OnboardingStep, OnboardingCandidate } from "@/data/onboarding-data";

interface ActivityStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: OnboardingCandidate | null;
  steps: OnboardingStep[];
}

const ActivityStatusModal: React.FC<ActivityStatusModalProps> = ({
  isOpen,
  onClose,
  candidate,
  steps,
}) => {
  if (!isOpen || !candidate) return null;

  const getStepStatus = (stepId: number) => {
    if (stepId < candidate.currentStep) return "completed";
    if (stepId === candidate.currentStep) return "current";
    return "pending";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "fa-solid fa-check-circle text-green-500";
      case "current":
        return "fa-solid fa-clock text-blue-500";
      case "pending":
        return "fa-solid fa-circle text-gray-300";
      default:
        return "fa-solid fa-circle text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-50";
      case "current":
        return "border-blue-500 bg-blue-50";
      case "pending":
        return "border-gray-300 bg-gray-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Onboarding Progress
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {candidate.name} - {candidate.position}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fa-solid fa-times text-xl" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Overall Progress
                  </span>
                  <span className="text-sm text-gray-500">
                    {candidate.currentStep - 1} of {candidate.totalSteps}{" "}
                    completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((candidate.currentStep - 1) / candidate.totalSteps) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const status = getStepStatus(stepNumber);

                  return (
                    <div
                      key={step.id}
                      className={`border-l-4 pl-4 py-3 rounded-r-lg ${getStatusColor(status)}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <i className={`${getStatusIcon(status)} text-lg`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900">
                              Step {stepNumber}: {step.title}
                            </h4>
                            {status === "completed" && step.completedDate && (
                              <span className="text-xs text-gray-500">
                                Completed on{" "}
                                {new Date(
                                  step.completedDate
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {step.description}
                          </p>
                          {status === "current" && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <i className="fa-solid fa-spinner fa-spin mr-1" />
                                In Progress
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Current Status:
                    </span>
                    <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        candidate.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : candidate.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : candidate.status === "paused"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {candidate.status.charAt(0).toUpperCase() +
                        candidate.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Join Date:{" "}
                    {new Date(candidate.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStatusModal;
