import { useModale } from "@/context/ModaleContext";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface AddStageModalProps {
  id: string;
  actionButton?: ReactNode | (() => ReactNode);
  title?: string;
  children: React.ReactNode;
  backdropClose?: boolean;
  reset?: () => void;
}

const ModelCustom: React.FC<AddStageModalProps> = ({
  id,
  title,
  children,
  backdropClose = false,
  actionButton,
  reset,
}) => {
  const { activeModal, modaleClose } = useModale();

  const handleClose = () => {
    if (reset) reset();
    modaleClose();
  };

  if (activeModal !== id) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm"
        onClick={backdropClose ? handleClose : undefined}
      />
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-md w-full max-w-md mx-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 rounded-t-md">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {children}

        <div className="flex justify-end space-x-3 px-6 py-4 bg-blue-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          {actionButton &&
            (typeof actionButton === "function"
              ? actionButton()
              : actionButton)}
        </div>
      </div>
    </div>
  );
};

export default ModelCustom;
