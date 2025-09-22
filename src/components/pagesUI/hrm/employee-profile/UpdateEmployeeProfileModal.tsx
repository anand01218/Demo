import React, { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import { IEmployeeProfileDetails } from "@/interface";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { toast } from "sonner";
import { employeestatePropsType } from "@/interface/common.interface";
import { useGetDepartmentListQuery } from "@/redux/slices/DepartmentAction";
import {
  useGetEmployeeProfileQuery,
  useUpdateEmployeeMutation,
} from "@/redux/slices/EmployeeAction";

const UpdateEmployeeProfileModal = ({
  open,
  setOpen,
  data,
}: employeestatePropsType) => {
  const [selectStartDate, setSelectStartDate] = useState<Date | null>(null);
  const [selectDateOfBirth, setSelectDateOfBirth] = useState<Date | null>(null);
  const { register, handleSubmit, reset, setValue } =
    useForm<IEmployeeProfileDetails>();
  const { data: departments } = useGetDepartmentListQuery({});
  const { data: employeeProfile } = useGetEmployeeProfileQuery(data?.id, {
    skip: !data?.id,
  });
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  const handleToggle = () => setOpen(!open);

  useEffect(() => {
    if (data && open && departments?.data) {
      setValue("firstName", data.firstName || "");
      setValue("lastName", data.lastName || "");
      setValue("contactNumber", data.phone || "");
      setValue("email", data.email || "");
      setValue("address", data.address || "");
      setValue("employeeDesignation", data.position || "");
      setValue("department", data.departmentId || "");
      setSelectDateOfBirth(
        data.dateOfBirth ? new Date(data.dateOfBirth) : null
      );
      setSelectStartDate(data.hireDate ? new Date(data.hireDate) : null);
    }
  }, [data, open, setValue, employeeProfile, departments]);

  //handle image upload
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setUploadedImage(reader.result as string);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onSubmit = async (formData: IEmployeeProfileDetails) => {
    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        dateOfBirth: selectDateOfBirth?.toISOString(),
      };

      await updateEmployee({ id: data.id, ...updateData }).unwrap();
      toast.success("Profile updated successfully! 🎉");
      setTimeout(() => {
        setOpen(false);
        reset();
        setSelectDateOfBirth(null);
        setSelectStartDate(null);
      }, 1500);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="lg">
      <div className="bg-white rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Update Employee Profile
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Edit employee information
            </p>
          </div>
          <button
            onClick={handleToggle}
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-user text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date Of Birth
                  </label>
                  <div className="datepicker-style">
                    <DatePicker
                      id="dateOfBirth"
                      selected={selectDateOfBirth}
                      onChange={(date) => setSelectDateOfBirth(date)}
                      showYearDropdown
                      showMonthDropdown
                      useShortMonthInDropdown
                      showPopperArrow={false}
                      peekNextMonth
                      dropdownMode="select"
                      isClearable
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select date of birth"
                      className="w-full"
                      required={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-address-book text-blue-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    {...register("contactNumber")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    {...register("address")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-briefcase text-blue-600" />
                Employment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="joiningDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Joining Date
                  </label>
                  <div className="datepicker-style">
                    <DatePicker
                      id="joiningDate"
                      selected={selectStartDate}
                      onChange={(date) => setSelectStartDate(date)}
                      showYearDropdown
                      showMonthDropdown
                      useShortMonthInDropdown
                      showPopperArrow={false}
                      peekNextMonth
                      dropdownMode="select"
                      isClearable
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select joining date"
                      className="w-full"
                      required={false}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Position
                  </label>
                  <input
                    id="position"
                    type="text"
                    {...register("employeeDesignation")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    {...register("department")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="">Select Department</option>
                    {departments?.data?.map((dept: any) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleToggle}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isUpdating ? (
                  <i className="fa-solid fa-spinner fa-spin text-sm" />
                ) : (
                  <i className="fa-solid fa-save text-sm" />
                )}
                {isUpdating ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateEmployeeProfileModal;
