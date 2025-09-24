"use client";
import React, { useState } from "react";
import { Save } from "lucide-react";
import type { Candidate } from "@/interface/recruitment.interface";
import ModelCustom from "@/components/common/ModelCustom";
import { candidateDataService } from "@/data/recruitment/candidate-data";
import { toast } from "sonner";

interface NoteModalProps {
  candidate?: Candidate;
}

import { useModale } from "@/context/ModaleContext";

const NoteModal: React.FC<NoteModalProps> = ({ candidate }) => {
  const { modaleClose, editData } = useModale();
  const [formData, setFormData] = useState({
    title: "",
    note: "",
  });

  React.useEffect(() => {
    if (editData && typeof editData === "object") {
      setFormData({
        title: editData.title || "",
        note: editData.note || "",
      });
    } else {
      setFormData({ title: "", note: "" });
    }
  }, [editData]);

  // Add or update note logic
  const addOrUpdateNote = async (noteData: { title: string; note: string }) => {
    if (candidate) {
      if (editData && editData.id) {
        // Update note
        candidateDataService.updateNote(candidate.id, {
          ...editData,
          title: noteData.title,
          note: noteData.note,
        });
        toast.success("Note updated successfully!");
      } else {
        // Add note
        const newNote = {
          id: Date.now().toString(),
          title: noteData.title,
          note: noteData.note,
          createdAt: new Date().toISOString(),
          createdBy: "Current User", // Replace with actual user data
        };
        candidateDataService.addNote(candidate.id, newNote);
        toast.success("Note added successfully!");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addOrUpdateNote(formData);
    setFormData({ title: "", note: "" });
    modaleClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      note: "",
    });
  };

  if (!candidate) return null;

  return (
    <ModelCustom
      id="note-modal"
      title={editData && editData.id ? "Edit Note" : "Add Note"}
      reset={resetForm}
      actionButton={() => (
        <button
          type="submit"
          form="note-form"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl"
        >
          <Save size={16} />
          <span>{editData && editData.id ? "Update Note" : "Save Note"}</span>
        </button>
      )}
    >
      <form id="note-form" onSubmit={handleSubmit} className="p-6 space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
            placeholder="Enter note title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Note
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-vertical transition-all duration-200"
            placeholder="Enter your note or observations about this candidate"
          />
        </div>
      </form>
    </ModelCustom>
  );
};

export default NoteModal;
