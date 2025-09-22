"use client";
import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/common/Header";
import SummarySingleCard from "@/components/common/SummarySingleCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Sample data for charts
const monthlyPerformanceData = [
  { month: "Jan", score: 85, reviews: 12 },
  { month: "Feb", score: 78, reviews: 10 },
  { month: "Mar", score: 92, reviews: 15 },
  { month: "Apr", score: 88, reviews: 13 },
  { month: "May", score: 95, reviews: 18 },
  { month: "Jun", score: 90, reviews: 16 },
];

const performanceDistributionData = [
  { name: "Excellent (90-100)", value: 35, color: "#10B981" },
  { name: "Good (80-89)", value: 40, color: "#3B82F6" },
  { name: "Average (70-79)", value: 20, color: "#F59E0B" },
  { name: "Below Average (60-69)", value: 5, color: "#EF4444" },
];

const goalProgressData = [
  { category: "Sales", completed: 8, total: 10, percentage: 80 },
  { category: "Leadership", completed: 6, total: 8, percentage: 75 },
  { category: "Technical", completed: 12, total: 15, percentage: 80 },
  { category: "Communication", completed: 5, total: 6, percentage: 83 },
];

const PerformanceDashboard: React.FC = () => {
  const kpiData = [
    {
      title: "Average Performance Score",
      value: "88.2",
      change: "+5.2%",
      trend: "up",
      icon: "fa-solid fa-chart-line",
      color: "bg-blue-500",
    },
    {
      title: "Reviews Completed",
      value: "84",
      change: "+12",
      trend: "up",
      icon: "fa-solid fa-clipboard-check",
      color: "bg-green-500",
    },
    {
      title: "Goals Achieved",
      value: "76%",
      change: "+8%",
      trend: "up",
      icon: "fa-solid fa-flag-checkered",
      color: "bg-purple-500",
    },
    {
      title: "Pending Reviews",
      value: "6",
      change: "-3",
      trend: "down",
      icon: "fa-solid fa-clock",
      color: "bg-orange-500",
    },
  ];

  // ApexCharts configurations
  const lineChartOptions = {
    chart: {
      id: "performance-trend",
      type: "line" as const,
      height: 300,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },
    colors: ["#3B82F6"],
    xaxis: {
      categories: monthlyPerformanceData.map((item) => item.month),
    },
    yaxis: {
      title: {
        text: "Performance Score",
      },
    },
    markers: {
      size: 5,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const lineChartSeries = [
    {
      name: "Performance Score",
      data: monthlyPerformanceData.map((item) => item.score),
    },
  ];

  const ReviewChartOptions = {
    chart: {
      id: "review-completion",
      type: "line" as const,
      height: 300,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },
    colors: ["#3B82F6"],
    xaxis: {
      categories: monthlyPerformanceData.map((item) => item.month),
    },
    yaxis: {
      title: {
        text: "Reviews Completed",
      },
    },
    markers: {
      size: 5,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const ReviewChartSeries = [
    {
      name: "Reviews Completed",
      data: monthlyPerformanceData.map((item) => item.reviews),
    },
  ];

  const pieChartOptions = {
    chart: {
      type: "pie" as const,
      height: 300,
    },
    labels: performanceDistributionData.map((item) => item.name),
    colors: performanceDistributionData.map((item) => item.color),
    legend: {
      position: "bottom" as const,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(0) + "%";
      },
    },
  };

  const pieChartSeries = performanceDistributionData.map((item) => item.value);

  const barChartOptions = {
    chart: {
      id: "goal-progress",
      type: "bar" as const,
      height: 300,
      toolbar: {
        show: false,
      },
    },
    colors: ["#8B5CF6"],
    xaxis: {
      categories: goalProgressData.map((item) => item.category),
    },
    yaxis: {
      title: {
        text: "Completion %",
      },
      max: 100,
    },
    grid: {
      borderColor: "#e7e7e7",
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val + "%";
      },
    },
  };

  const barChartSeries = [
    {
      name: "Completion %",
      data: goalProgressData.map((item) => item.percentage),
    },
  ];

  return (
    <div className="space-y-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <SummarySingleCard
            key={index}
            iconClass={kpi.icon}
            title={kpi.title}
            value={kpi.value}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Performance Trend */}
        <div className="bg-white border border-gray-200 shadow-sm p-6">
          <Header
            title="Monthly Performance Trend"
            className="mb-4 text-gray-900"
          />
          <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={300}
          />
        </div>

        {/* Performance Distribution */}
        <div className="bg-white border border-gray-200 shadow-sm p-6">
          <Header
            title="Performance Distribution"
            className="mb-4 text-gray-900"
          />
          <Chart
            options={pieChartOptions}
            series={pieChartSeries}
            type="pie"
            height={300}
          />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Review Completion Trend */}
        <div className="bg-white border border-gray-200 shadow-sm p-6">
          <Header
            title="Review Completion Trend"
            className="mb-4 text-gray-900"
          />
          <Chart
            options={ReviewChartOptions}
            series={ReviewChartSeries}
            type="line"
            height={300}
          />
        </div>

        {/* Goal Progress by Category */}
        <div className="bg-white border border-gray-200 shadow-sm p-6">
          <Header
            title="Goal Progress by Category"
            className="mb-4 text-gray-900"
          />
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={300}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <Header title="Recent Activity" className="mb-4 text-gray-900" />
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-medium text-gray-900">
                  John Doe completed Q2 Performance Review
                </p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              Score: 92
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-medium text-gray-900">
                  Sarah Smith achieved &quot;Sales Target Q2&quot; goal
                </p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              Goal Completed
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-medium text-gray-900">
                  Mike Johnson&apos;s mid-year review is due
                </p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
            </div>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
