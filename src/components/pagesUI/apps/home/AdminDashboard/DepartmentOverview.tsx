"use client";
import React from "react";
import { useGetDepartmentListQuery } from "@/redux/slices/DepartmentAction";
import { useGetEmployeeListQuery } from "@/redux/slices/EmployeeAction";
import { Building2 } from "lucide-react";
import Headers from "@/components/common/Header";

const DepartmentOverview = () => {
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartmentListQuery({});
  const { data: employees, isLoading: isEmployeesLoading } =
    useGetEmployeeListQuery({});

  const isLoading = isDepartmentsLoading || isEmployeesLoading;

  const getDepartmentEmployeeCount = () => {
    if (!departments?.data || !employees?.data) return [];

    return departments.data.map((dept: any) => {
      const employeeCount = employees.data.filter(
        (emp: any) => emp.departmentId === dept.id
      ).length;
      return {
        name: dept.name,
        count: employeeCount,
        percentage:
          employees.data.length > 0
            ? Math.round((employeeCount / employees.data.length) * 100)
            : 0,
      };
    });
  };

  const departmentData = getDepartmentEmployeeCount();

  return (
    <>
      <div className="w-full">
        <div className="bg-white dark:bg-gray-800 transition-all duration-300">
          <div className="mb-2 xs:mb-3 sm:mb-4 px-3 py-3 border-b border-gray-200 dark:border-gray-700">
            <Headers title="Department Overview" />
          </div>
          <div className="tab-content mb-2 xs:mb-3 sm:mb-4">
            {isLoading ? (
              <div className="flex flex-col sm:flex-row items-center justify-center py-6 xs:py-8 sm:py-10 md:py-12 gap-3 xs:gap-4">
                <div className="animate-spin h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full border-b-2 border-blue-600" />
                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 text-center">
                  Loading department data...
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1 mt-2 xs:space-y-2 sm:space-y-3 md:space-y-4">
                  {departmentData.map((dept: any, index: number) => {
                    const colors = [
                      {
                        bg: "bg-blue-600",
                        light: "bg-blue-100",
                        text: "text-blue-700 dark:text-blue-300",
                      },
                      {
                        bg: "bg-purple-600",
                        light: "bg-purple-100",
                        text: "text-purple-700 dark:text-purple-300",
                      },
                      {
                        bg: "bg-green-600",
                        light: "bg-green-100",
                        text: "text-green-700 dark:text-green-300",
                      },
                      {
                        bg: "bg-yellow-600",
                        light: "bg-yellow-100",
                        text: "text-yellow-700 dark:text-yellow-300",
                      },
                      {
                        bg: "bg-indigo-600",
                        light: "bg-indigo-100",
                        text: "text-indigo-700 dark:text-indigo-300",
                      },
                    ];
                    const color = colors[index % colors.length];
                    return (
                      <div
                        key={dept.name}
                        className="bg-gray-50 mx-2 xs:mx-3 sm:mx-3 md:mx-3 dark:bg-gray-800 p-2 xs:p-3 sm:p-3 md:p-3 lg:p-3 border border-gray-200 dark:border-gray-600 transition-all duration-300 group rounded"
                      >
                        <div className="flex justify-between sm:justify-between sm:items-center gap-1 xs:gap-2 sm:gap-3 md:gap-3 mb-2 xs:mb-2">
                          <div className="flex items-center space-x-2 xs:space-x-3">
                            <div
                              className={`w-2 h-2 xs:w-2 xs:h-2 rounded-full sm:w-2 sm:h-2 ${color.bg} shadow-sm flex-shrink-0`}
                            />
                            <h5 className="text-xs xs:text-sm sm:text-base md:text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                              {dept.name}
                            </h5>
                          </div>
                          <div className="flex items-center justify-end">
                            <span
                              className={`px-1 xs:px-1 sm:px-1 md:px-2 py-0.5 xs:py-1 rounded-full ${color.text} text-[10px] xs:text-xs sm:text-sm md:text-base font-medium whitespace-nowrap`}
                            >
                              {dept.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1 overflow-hidden">
                          <div
                            className={`h-full ${color.bg} transition-all duration-700 ease-out shadow-sm`}
                            style={{ width: `${dept.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {departmentData.length === 0 && (
                    <div className="text-center py-6 xs:py-8 sm:py-10 md:py-12">
                      <Building2 className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-300 dark:text-gray-600 mx-auto mb-3 xs:mb-4" />
                      <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400">
                        No department data available
                      </p>
                      <p className="text-xs xs:text-sm sm:text-base text-gray-400 dark:text-gray-500 mt-1 xs:mt-2">
                        Add departments and employees to see the distribution
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentOverview;
