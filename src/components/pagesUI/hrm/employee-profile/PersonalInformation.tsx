"use client";
import Link from "next/link";
import React, { useState } from "react";
import UpdateEmployeeProfileModal from "./UpdateEmployeeProfileModal";
import { IEmployee } from "@/interface";

interface propsType {
  data: IEmployee | any;
}

const PersonalInformation = ({ data }: propsType) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Helper function to safely render values
  const safeRender = (value: any, fallback: string = "N/A"): string => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    if (typeof value === "object" && value !== null) {
      return value.name || value.title || value.label || fallback;
    }
    return fallback;
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-8 py-6 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Personal Information
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Employee profile details
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => setModalOpen(true)}
              >
                <i className="fa-solid fa-pencil text-sm" />
                <span className="font-medium">Edit</span>
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Left Column - Profile Summary */}
              <div className="space-y-6">
                <div className="text-center xl:text-left">
                  <div className="w-[4rem] h-[4rem] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto xl:mx-0 mb-4">
                    {data?.firstName?.[0] || ""}
                    {data?.lastName?.[0] || ""}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {data?.firstName || ""} {data?.lastName || ""}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
                      {safeRender(data?.position)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center xl:justify-start gap-2">
                      <i className="fa-solid fa-building text-sm" />
                      {safeRender(data?.department)}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Join Date
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {data?.hireDate
                          ? new Date(data.hireDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Salary
                      </span>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        ₹ {safeRender(data?.salary)}
                      </span>
                    </div>
                  </div>

                  {/* <div className="flex gap-3 mt-6 justify-center xl:justify-start">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                      <i className="fa-solid fa-message text-sm"></i>
                      Send Message
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                      <i className="fa-solid fa-phone text-sm"></i>
                      Call
                    </button>
                  </div> */}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                  Contact & Details
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-phone text-blue-600 dark:text-blue-400 w-5" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Phone
                      </span>
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {data?.phone ? (
                        <Link
                          href={`tel:${data.phone}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                          {data.phone}
                        </Link>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">
                          Not provided
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-envelope text-blue-600 dark:text-blue-400 w-5" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </span>
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {(() => {
                        const email =
                          data?.email?.replace?.("mailto:", "") ||
                          data?.user?.email?.replace?.("mailto:", "") ||
                          "";
                        return email ? (
                          <Link
                            href={`mailto:${email}`}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                          >
                            {email}
                          </Link>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">
                            Not provided
                          </span>
                        );
                      })()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-calendar text-blue-600 dark:text-blue-400 w-5" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Birthday
                      </span>
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {data?.dateOfBirth ? (
                        new Date(data.dateOfBirth).toLocaleDateString()
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">
                          Not provided
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-start justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-location-dot text-blue-600 dark:text-blue-400 w-5" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Address
                      </span>
                    </div>
                    <span className="text-gray-900 dark:text-white text-right max-w-xs">
                      {safeRender(data?.address)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-circle-check text-green-600 dark:text-green-400 w-5" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        data?.status === "ACTIVE"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {safeRender(data?.status)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-briefcase text-blue-600 dark:text-blue-400 w-5" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Work Type
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                      {safeRender(data?.workingDayType)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-user-shield text-blue-600 dark:text-blue-400 w-5" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Role
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                      {safeRender(data?.user?.role)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <UpdateEmployeeProfileModal
          open={modalOpen}
          setOpen={setModalOpen}
          data={data}
        />
      )}
    </>
  );
};

export default PersonalInformation;
