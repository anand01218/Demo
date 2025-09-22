"use client";
import React from "react";
import { Check } from "lucide-react";
import { FormStage } from "@/interface/applicationForm.interface";

interface StepperProps {
  stages: FormStage[];
  currentStage?: number;
}

const Stepper: React.FC<StepperProps> = ({ stages, currentStage = 0 }) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStage;
          const isActive = index === currentStage;
          const isDisabled = index > currentStage;

          return (
            <React.Fragment key={stage.id}>
              {/* Step Container */}
              <div
                className="flex flex-col items-center relative"
                aria-disabled={isDisabled}
              >
                {/* Step Circle */}
                <div
                  className={`
                  w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold text-sm z-10
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                  }
                `}
                >
                  {isCompleted ? <Check size={20} /> : <span>{stage.id}</span>}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <div
                    className={`
                    text-sm font-medium
                    ${
                      stage.isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : stage.isCompleted
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                    }
                  `}
                  >
                    {stage.title}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {stage.description}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div className="flex-1 h-0.5 mx-4">
                  <div
                    className={`
                    h-full w-full
                    ${
                      index + 1 <= currentStage
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }
                  `}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
