"use client";
import TableComponent from "@/components/ui/TableComponent";
import Headers from "@/components/common/Header";

interface Recruitment {
  id: number;
  candidateName: string;
  position: string;
  appliedDate: string;
  status: string;
  experience: string;
}

const MyTasks = () => {
  const recruitments: Recruitment[] = [
    {
      id: 1,
      candidateName: "John Smith",
      position: "Software Engineer",
      appliedDate: "2025-09-18",
      status: "Interview Scheduled",
      experience: "3 years",
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      position: "Product Manager",
      appliedDate: "2025-09-17",
      status: "Under Review",
      experience: "5 years",
    },
    {
      id: 3,
      candidateName: "Mike Wilson",
      position: "UI/UX Designer",
      appliedDate: "2025-09-16",
      status: "Shortlisted",
      experience: "4 years",
    },
    {
      id: 4,
      candidateName: "Emily Davis",
      position: "Data Analyst",
      appliedDate: "2025-09-15",
      status: "Offer Extended",
      experience: "2 years",
    },
    {
      id: 5,
      candidateName: "David Brown",
      position: "DevOps Engineer",
      appliedDate: "2025-09-14",
      status: "Rejected",
      experience: "6 years",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Offer Extended":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Shortlisted":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const columns = [
    {
      key: "candidateName",
      label: "Candidate",
      sortable: true,
      width: "30%",
      render: (value: string) => (
        <div
          className="font-medium text-gray-900 dark:text-white truncate"
          title={value}
        >
          {value}
        </div>
      ),
    },
    {
      key: "position",
      label: "Position",
      sortable: true,
      width: "25%",
      render: (value: string) => (
        <span
          className="text-sm text-gray-600 dark:text-gray-400 truncate"
          title={value}
        >
          {value}
        </span>
      ),
    },
    {
      key: "appliedDate",
      label: "Applied",
      sortable: true,
      width: "20%",
      render: (value: string) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "25%",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(value)}`}
          >
            {value}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center px-3 sm:px-4 lg:px-3 py-3 border-b border-gray-200 dark:border-gray-700">
        <Headers title="Recent Recruitment" />
      </div>
      <div className="overflow-x-auto">
        <TableComponent
          data={recruitments}
          columns={columns}
          pageSize={5}
          height="361px"
          showPaginationControls={false}
          className="rounded-none border-0 min-w-full"
        />
      </div>
    </div>
  );
};

export default MyTasks;
