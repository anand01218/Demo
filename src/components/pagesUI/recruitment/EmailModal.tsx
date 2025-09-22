"use client";
import React, { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Candidate } from "@/interface/recruitment.interface";

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

const EmailModal: React.FC<EmailModalProps> = ({
  open,
  onClose,
  candidate,
}) => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (candidate && open) {
      setFormData({
        to: candidate.email,
        subject: `Regarding your application - ${candidate.name}`,
        message: `Dear ${candidate.name},\n\nI hope this email finds you well.\n\n\n\nBest regards,\nHR Team`,
      });
    }
  }, [candidate, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset form and close modal
    setFormData({
      to: "",
      subject: "",
      message: "",
    });

    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!open || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Send Email to {candidate.name}
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {candidate.email}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <input
                type="email"
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                placeholder="Enter email subject"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-vertical transition-all duration-200"
                placeholder="Enter your message"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl"
            >
              <Send size={16} />
              <span>Send Email</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
