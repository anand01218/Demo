"use client";
import React, { useState, useEffect } from "react";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} from "@/redux/slices/authAction";
import Preloader from "@/common/Preloader/Preloader";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  DollarSign,
  Badge,
  MapPin,
  Edit,
  Shield,
  Clock,
  Star,
  TrendingUp,
  Save,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

const ProfileMainArea = () => {
  const {
    data: profileData,
    isLoading,
    error,
    refetch,
  } = useGetUserProfileQuery({});
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateUserProfileMutation();
  const [changePassword, { isLoading: passwordLoading }] =
    useChangePasswordMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    position: "",
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (profileData?.employee) {
      const employee = profileData.employee;
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        address: employee.address || "",
        dateOfBirth: formatDateForInput(employee.dateOfBirth),
        position: employee.position || "",
      });
    }
  }, [profileData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        id: profileData?.employee?.id,
        ...formData,
      }).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch();
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profileData?.employee) {
      const employee = profileData.employee;
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        address: employee.address || "",
        dateOfBirth: formatDateForInput(employee.dateOfBirth),
        position: employee.position || "",
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Real-time validation for confirm password
    if (
      name === "confirmPassword" &&
      passwordData.newPassword &&
      value !== passwordData.newPassword
    ) {
      setPasswordErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else if (
      name === "confirmPassword" &&
      value === passwordData.newPassword
    ) {
      setPasswordErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validatePassword = () => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword =
        "New password must be different from current password";
    }

    setPasswordErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();

      toast.success("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to update password";
      toast.error(errorMessage);
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswords({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Preloader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading profile data
      </div>
    );
  }

  const user = profileData;
  const employee = user?.employee;

  return (
    <div className="app__slide-wrapper min-h-screen dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex items-center justify-between mb-3">
        <Breadcrumb breadTitle="My Profile" subTitle="Home" />
        {!isEditing ? (
          <div className="flex gap-1">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="group flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-md font-medium hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Shield size={18} />
              Change Password
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="group flex items-center gap-2 px-4 py-2 bg-blue-600 text-white transition-colors rounded-md hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Edit
                size={18}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={updateLoading}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              <Save size={18} />
              {updateLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Header Card */}
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-3 overflow-hidden">
        <div className="relative p-4">
          <div className="flex items-start gap-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-sm">
              {employee?.firstName?.[0] || ""}
              {employee?.lastName?.[0] || ""}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  {employee?.firstName || ""} {employee?.lastName || ""}
                </h1>
                <Star className="text-yellow-500 fill-current" size={24} />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 font-medium">
                {employee?.position || "N/A"}
              </p>
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded-xl text-xs font-semibold shadow-sm ${
                    employee?.status === "ACTIVE"
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-600 border border-green-500"
                      : "bg-gradient-to-r from-red-50 to-rose-50 text-rose-600 border border-red-200"
                  }`}
                >
                  {employee?.status || "N/A"}
                </span>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Calendar size={16} />
                  <span className="text-sm font-medium">
                    Joined {formatDate(employee?.hireDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Personal Information */}
        <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300 border border-gray-100 dark:border-gray-700 dark:hover:border-blue-600">
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <User className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Personal Information
              </h2>
            </div>
            <br />
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <div className="p-2 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center dark:group-hover/item:bg-blue-800 transition-colors">
                      <Mail
                        className="text-blue-600 dark:text-blue-400"
                        size={18}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                        Email Address
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {employee?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center dark:group-hover/item:bg-green-800 transition-colors">
                      <Phone
                        className="text-green-600 dark:text-green-400"
                        size={18}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                        Phone Number
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {employee?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center dark:group-hover/item:bg-purple-800 transition-colors">
                      <Calendar
                        className="text-purple-600 dark:text-purple-400"
                        size={18}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                        Date of Birth
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formatDate(employee?.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center group-hover/item:bg-orange-200 dark:group-hover/item:bg-orange-800 transition-colors">
                      <MapPin
                        className="text-orange-600 dark:text-orange-400"
                        size={18}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                        Address
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {employee?.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Work Information */}
        <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600">
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Building className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Work Information
              </h2>
            </div>
            <br />
            <div className="space-y-2">
              <div className="p-2 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800 transition-colors">
                    <Building
                      className="text-green-600 dark:text-green-400"
                      size={18}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                      Department
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {employee?.department?.name || "N/A"}
                    </p>
                    {/* <p className="text-sm text-gray-600 dark:text-gray-400">{employee?.department?.description}</p> */}
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800 transition-colors">
                    <Calendar
                      className="text-blue-600 dark:text-blue-400"
                      size={18}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                      Hire Date
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {formatDate(employee?.hireDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center group-hover/item:bg-emerald-200 dark:group-hover/item:bg-emerald-800 transition-colors">
                    <DollarSign
                      className="text-emerald-600 dark:text-emerald-400"
                      size={18}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                      Salary
                    </p>
                    <p className="text-gray-900 dark:text-white font-bold text-xl">
                      ₹{employee?.salary?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center group-hover/item:bg-indigo-200 dark:group-hover/item:bg-indigo-800 transition-colors">
                    <Clock
                      className="text-indigo-600 dark:text-indigo-400"
                      size={18}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                      Work Type
                    </p>
                    <span className="inline-flex items-center text-violet-800 rounded-xl text-sm font-semibold">
                      {employee?.workingDayType || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="group bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600">
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Account Information
              </h2>
            </div>

            <div className="space-y-6">
              <div className="group/item p-4 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center group-hover/item:bg-purple-200 dark:group-hover/item:bg-purple-800 transition-colors">
                    <Badge
                      className="text-purple-600 dark:text-purple-400"
                      size={18}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                      Role
                    </p>
                    <span className="inline-flex items-center text-purple-800 rounded-xl text-md font-semibold shadow-sm">
                      {typeof user?.role === "object"
                        ? user?.role?.name || "N/A"
                        : user?.role || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="group/item p-4 rounded-xl dark:hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800 transition-colors">
                    <TrendingUp
                      className="text-green-600 dark:text-green-400"
                      size={18}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                      Account Status
                    </p>
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold shadow-sm ${
                        user?.isActive
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                      }`}
                    >
                      {user?.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Account Timeline
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Created: {formatDate(user?.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Updated: {formatDate(user?.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reset Password
              </h3>
              <button
                onClick={handlePasswordCancel}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.currentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                      passwordErrors.currentPassword
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        currentPassword: !prev.currentPassword,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.currentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                      passwordErrors.newPassword
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        newPassword: !prev.newPassword,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.newPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.newPassword}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Password must be at least 6 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                      passwordErrors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handlePasswordCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMainArea;
