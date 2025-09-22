"use client";
import React from "react";
import ModelCustom from "@/components/common/ModelCustom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateEmployeeMutation } from "@/redux/slices/EmployeeAction";
import { useGetDepartmentListQuery } from "@/redux/slices/DepartmentAction";
import { useModale } from "@/context/ModaleContext";

interface AddNewEmployeeModalProps {
  modalId: string;
}

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  position: string;
  salary: number;
  departmentId: string;
  address: string;
}

const AddNewEmployeeModal = ({ modalId }: AddNewEmployeeModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>();
  const [createEmployee] = useCreateEmployeeMutation();
  const { data: departmentResponse } = useGetDepartmentListQuery({});
  const { modaleClose } = useModale();
  const departmentList = departmentResponse?.data || departmentResponse || [];

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      const formattedData = {
        ...data,
      };
      await createEmployee(formattedData).unwrap();
      toast.success("Employee added successfully!");
      reset();
      setTimeout(() => modaleClose(), 2000);
    } catch (error) {
      toast.error("Failed to add employee. Please try again.");
    }
  };

  const actionButton = (
    <button
      type="submit"
      form="employee-form"
      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
    >
      Add Employee
    </button>
  );

  return (
    <ModelCustom
      id={modalId}
      title="Add New Employee"
      actionButton={actionButton}
      reset={reset}
      backdropClose={false}
    >
      <div className="common-scrollbar max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <form id="employee-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white dark:bg-gray-900 p-4">
            <div className="">
              <div className="">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required",
                    validate: (value) => {
                      const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
                      if (!iso8601Regex.test(value)) {
                        return "Date must be in ISO 8601 format (YYYY-MM-DD)";
                      }
                      const date = new Date(value);
                      if (isNaN(date.getTime())) {
                        return "Please enter a valid date";
                      }
                      return true;
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Position
                </label>
                <input
                  id="position"
                  type="text"
                  {...register("position", {
                    required: "Position is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.position.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Salary
                </label>
                <input
                  id="salary"
                  type="number"
                  {...register("salary", {
                    required: "Salary is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid salary amount",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.salary && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.salary.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="departmentId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Department
                </label>
                <select
                  id="departmentId"
                  {...register("departmentId", {
                    required: "Department is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Department</option>
                  {departmentList?.map((department: any) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.departmentId.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </ModelCustom>
  );
};

export default AddNewEmployeeModal;
