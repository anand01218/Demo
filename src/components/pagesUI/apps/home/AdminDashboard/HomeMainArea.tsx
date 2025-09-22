"use client";
import React from "react";
import RecentEmployee from "./RecentEmployeeTable";
import DepartmentOverview from "./DepartmentOverview";
import Recentleave from "./Recentleave";
import DashboardDetailsCards from "./DashboardDetailsCards";
import Users from "./Users";
import MyTasks from "@/components/common/MyTasks";
import SmallCalendar from "@/components/common/SmallCalendar";
import TopReviews from "./TopReviews";

const HomeMainArea = () => {
  // Show admin/superadmin dashboard for privileged users
  return (
    <div className="min-h-screen bg-transparent dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Main Dashboard Content */}
      <div className="w-full">
        {/* Stats Cards */}
        <div className="mb-2 sm:mb-3 lg:mb-4">
          <DashboardDetailsCards />
        </div>

        {/* First Row - MyTasks, CustomerSatisfaction, SmallCalendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
          <div className="overflow-hidden">
            <MyTasks />
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <DepartmentOverview />
          </div>
          <div className="overflow-hidden">
            <SmallCalendar />
          </div>
        </div>

        {/* Second Row - RecentEmployee, UserActivity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
          <div className="bg-transparent dark:bg-transparent overflow-hidden h-full">
            <div className="overflow-x-auto">
              <RecentEmployee />
            </div>
          </div>
          <div className="bg-transparent overflow-hidden">
            <Recentleave />
            <div className="mt-4">
              <Users />
            </div>
          </div>
        </div>

        {/* Third Row - Top Reviews */}
        <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
          <div className="overflow-hidden">
            <TopReviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMainArea;
