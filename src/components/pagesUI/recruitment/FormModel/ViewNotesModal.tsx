"use client";
import React from "react";
import { X, Calendar, User, FileText, Pencil, Trash } from "lucide-react";
import { useModale } from "@/context/ModaleContext";
import { Candidate } from "@/interface/recruitment.interface";
import { candidateDataService } from "@/data/recruitment/candidate-data";
import { toast } from "sonner";
import SmallModal from "@/components/elements/base-ui/modals/SmallModal";

interface ViewNotesModalProps {
  open: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

const ViewNotesModal: React.FC<ViewNotesModalProps> = ({
  open,
  onClose,
  candidate,
}) => {
  const { modaleShow } = useModale();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!open || !candidate) return null;

  const handleDeleteNote = (noteId: string) => {
    SmallModal.confirm({
      title: "Delete Note?",
      content: `Are you sure you want to delete this note?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: () => {
        handleDeleteNoteConfirm(noteId);
      },
    });
  };

  const handleDeleteNoteConfirm = (noteId: string) => {
    candidateDataService.deleteNote(candidate.id, noteId);
    toast.success("Note deleted successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Notes for {candidate.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {candidate.notes && candidate.notes.length > 0 ? (
            <div className="space-y-4">
              {candidate.notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {note.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="text-blue-500 hover:text-blue-700 p-1 rounded-full"
                        title="Edit Note"
                        onClick={() =>
                          modaleShow("note-modal", {
                            ...note,
                            candidateId: candidate.id,
                          })
                        }
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 p-1 rounded"
                        title="Delete Note"
                        onClick={() => {
                          handleDeleteNote(note.id);
                        }}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">
                    {note.note}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{note.createdBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <FileText size={48} className="mx-auto" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No notes yet
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                No notes have been added for this candidate yet.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNotesModal;
