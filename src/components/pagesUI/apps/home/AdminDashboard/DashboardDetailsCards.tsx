import SummarySingleCard from "@/components/common/SummarySingleCard";
import { useGetSystemStatsQuery } from "@/redux/slices/DashboardAction";
import Preloader from "@/common/Preloader/Preloader";
import React from "react";

const DashboardDetailsCards = () => {
  const { data: statsData, isLoading } = useGetSystemStatsQuery({});
  const stats = statsData?.stats;

  if (isLoading) {
    return <Preloader />;
  }

  const cardsData = [
    {
      iconClass: "fa-sharp fa-regular fa-users",
      title: "Total Employees",
      value: stats?.totalEmployees || 0,
      percentageChange: "+0%",
      isIncrease: true,
    },
    {
      iconClass: "fa-sharp fa-regular fa-building",
      title: "Total Departments",
      value: stats?.totalDepartments || 0,
      description: "Active departments",
      percentageChange: "+0%",
      isIncrease: true,
    },
    {
      iconClass: "fa-sharp fa-regular fa-user-check",
      title: "Active Employees",
      value: stats?.activeEmployees || 0,
      description: "Currently active",
      percentageChange: "+0%",
      isIncrease: true,
    },
    {
      iconClass: "fa-sharp fa-regular fa-user-xmark",
      title: "Inactive Employees",
      value: stats?.inactiveEmployees || 0,
      description: "Currently inactive",
      percentageChange: "+0%",
      isIncrease: false,
    },
  ];

  if (isLoading) {
    return (
      <div className="col-span-12 flex justify-center items-center py-8">
        <div className="text-gray-500">Loading dashboard stats...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 lg:gap-3 xl:gap-4 w-full">
      {cardsData.map((card, index) => (
        <div key={index} className="w-full min-w-0">
          <SummarySingleCard {...card} />
        </div>
      ))}
    </div>
  );
};

export default DashboardDetailsCards;
