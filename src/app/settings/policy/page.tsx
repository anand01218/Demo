"use client";
import DefaultWrapper from "@/components/layouts/DefaultWrapper";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const PolicyPage = () => {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: "Attendance Policy",
      description: "Guidelines for employee attendance and punctuality",
      category: "HR",
      status: "Active",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Leave Policy",
      description: "Rules and procedures for taking leave",
      category: "HR",
      status: "Active",
      createdDate: "2024-01-10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "HR",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPolicy) {
      setPolicies(
        policies.map((p) =>
          p.id === editingPolicy ? { ...p, ...formData } : p
        )
      );
    } else {
      setPolicies([
        ...policies,
        {
          id: Date.now(),
          ...formData,
          status: "Active",
          createdDate: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setShowModal(false);
    setEditingPolicy(null);
    setFormData({ title: "", description: "", category: "HR", content: "" });
  };

  const handleEdit = (policy: any) => {
    setEditingPolicy(policy.id);
    setFormData(policy);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setPolicies(policies.filter((p) => p.id !== id));
  };

  return (
    <DefaultWrapper>
      <div className="flex items-center justify-between mb-2">
        <Breadcrumb breadTitle="Policy Management" subTitle="Settings" />
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium flex items-center gap-2"
        >
          <Plus size={16} />
          Add Policy
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Company Policies
          </h2>
        </div>

        <div className="grid gap-4">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {policy.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {policy.category}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {policy.status}
                    </span>
                    <span>Created: {policy.createdDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(policy)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(policy.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
              {editingPolicy ? "Edit Policy" : "Add New Policy"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white h-20 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPolicy(null);
                    setFormData({
                      title: "",
                      description: "",
                      category: "HR",
                      content: "",
                    });
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingPolicy ? "Update" : "Create"} Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DefaultWrapper>
  );
};

export default PolicyPage;
