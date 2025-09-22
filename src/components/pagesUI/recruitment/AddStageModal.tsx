"use client";
import React, { useState, useEffect } from "react";
import { RecruitmentStage } from "@/interface/recruitment.interface";
import { stageTypes } from "@/data/recruitment-data";
import * as Yup from "yup";
import {
  useCreateRecruitmentStageMutation,
  useUpdateRecruitmentStageMutation,
} from "@/redux/slices/recruitmentAction";
import { toast } from "sonner";
import { useModale } from "@/context/ModaleContext";
import ModaleCostom from "@/components/common/ModelCustom";

interface AddStageModalProps {
  stage?: RecruitmentStage | null;
}

// ✅ Yup schema
const stageSchema = Yup.object().shape({
  name: Yup.string().required("Stage name is required"),
  type: Yup.string().required("Stage type is required"),
  manager: Yup.string().required("Stage manager is required"),
});

const AddStageModal: React.FC<AddStageModalProps> = ({ stage }) => {
  const { modaleOpen, modaleClose, editData } = useModale();
  const [formData, setFormData] = useState({
    name: "",
    type: "SCREENING" as RecruitmentStage["type"],
    manager: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createRecruitmentStage, { isLoading: addLoading }] =
    useCreateRecruitmentStageMutation();
  const [updateRecruitmentStage, { isLoading: updateLoading }] =
    useUpdateRecruitmentStageMutation();

  const reset = () => {
    setFormData({
      name: "",
      type: "SCREENING" as RecruitmentStage["type"],
      manager: "",
    });
    setErrors({});
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        type: editData.type,
        manager: editData.manager,
      });
      setErrors({});
    } else {
      setFormData({
        name: "",
        type: "SCREENING",
        manager: "",
      });
      setErrors({});
    }
  }, [editData, modaleOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await stageSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const newStage: RecruitmentStage = {
        id: stage?.id || Date.now().toString(),
        name: formData.name,
        type: formData.type,
        manager: formData.manager,
        order: stage?.order || 999,
      };

      if (editData) {
        await updateRecruitmentStage({
          data: newStage,
          id: editData.id,
        }).unwrap();
        toast.success("Stage updated successfully!");
        modaleClose();
        return;
      } else {
        await createRecruitmentStage(newStage).unwrap();
        toast.success("Stage created successfully!");
        modaleClose();
      }
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((error: any) => {
        if (error.path) {
          newErrors[error.path] = error.message;
        }
      });
      setErrors(newErrors);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <ModaleCostom
        id="add-stage-modal"
        title={`${editData ? "Edit Stage" : "Add New Stage"} `}
        reset={reset}
        actionButton={() => (
          <button
            type="submit"
            form="stageForm"
            disabled={addLoading || updateLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            {editData
              ? `${updateLoading ? "Update Stage..." : "Update Stage"}`
              : `${addLoading ? "Add Stage..." : "Add Stage"}`}
          </button>
        )}
      >
        <form id="stageForm" onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Stage Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200`}
                placeholder="Enter stage name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Stage Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.type
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200`}
              >
                {stageTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Stage Manager *
              </label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.manager
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200`}
                placeholder="Enter manager name"
              />
              {errors.manager && (
                <p className="text-red-500 text-sm mt-1">{errors.manager}</p>
              )}
            </div>
          </div>
        </form>
      </ModaleCostom>
    </>
  );
};

export default AddStageModal;
