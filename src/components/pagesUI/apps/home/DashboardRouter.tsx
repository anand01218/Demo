"use client";
import React from "react";
import HomeMainArea from "./AdminDashboard/HomeMainArea";
import EmployeeDashboard from "./EmployeeDashboard/EmployeeDashboard";

const DashboardRouter = () => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  //   const { hasPermission } = usePermission();

  // Show employee dashboard for employee role or users without admin permissions
  if (user.role === "EMPLOYEE") {
    return <EmployeeDashboard />;
  }

  // Show admin dashboard for privileged users
  return <HomeMainArea />;
};

export default DashboardRouter;
