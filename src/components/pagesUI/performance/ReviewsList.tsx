"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header";
import TableComponent from "@/components/ui/TableComponent";
import { TableColumn } from "@/interface/tableComponent.interface";
import SummarySingleCard from "@/components/common/SummarySingleCard";
import { Trash, Edit } from "lucide-react";

interface Review {
  id: number;
  reviewerName: string;
  employeeName: string;
  rating: number;
  comment: string;
  date: string;
  status: "Draft" | "Submitted" | "Approved" | "Needs Revision";
  reviewType: "Quarterly" | "Annual" | "Mid-Year" | "Project-based";
  period: string;
}

const ReviewsList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      reviewerName: "Sarah Johnson",
      employeeName: "John Doe",
      rating: 4.5,
      comment:
        "Excellent performance throughout the quarter. Shows strong leadership skills and consistently meets deadlines.",
      date: "2025-09-15",
      status: "Approved",
      reviewType: "Quarterly",
      period: "Q3 2025",
    },
    {
      id: 2,
      reviewerName: "Mike Wilson",
      employeeName: "Emily Davis",
      rating: 4.0,
      comment:
        "Good technical skills and team collaboration. Could improve on communication with stakeholders.",
      date: "2025-09-10",
      status: "Submitted",
      reviewType: "Quarterly",
      period: "Q3 2025",
    },
    {
      id: 3,
      reviewerName: "David Brown",
      employeeName: "Sarah Smith",
      rating: 4.8,
      comment:
        "Outstanding performance and innovation. Exceeds expectations in all areas.",
      date: "2025-09-08",
      status: "Approved",
      reviewType: "Annual",
      period: "2025",
    },
    {
      id: 4,
      reviewerName: "Lisa Garcia",
      employeeName: "Mike Johnson",
      rating: 3.5,
      comment:
        "Meets most expectations but needs improvement in project management skills.",
      date: "2025-09-05",
      status: "Needs Revision",
      reviewType: "Mid-Year",
      period: "H1 2025",
    },
    {
      id: 5,
      reviewerName: "Tom Anderson",
      employeeName: "Alex Wilson",
      rating: 0,
      comment: "",
      date: "2025-09-20",
      status: "Draft",
      reviewType: "Quarterly",
      period: "Q3 2025",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    reviewerName: "",
    employeeName: "",
    rating: 0,
    comment: "",
    date: "",
    status: "Draft" as Review["status"],
    reviewType: "Quarterly" as Review["reviewType"],
    period: "",
  });

  const getStatusColor = (status: Review["status"]) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Submitted":
        return "bg-blue-100 text-blue-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Needs Revision":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: Review["reviewType"]) => {
    switch (type) {
      case "Quarterly":
        return "bg-blue-100 text-blue-800";
      case "Annual":
        return "bg-purple-100 text-purple-800";
      case "Mid-Year":
        return "bg-green-100 text-green-800";
      case "Project-based":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fa-solid fa-star-half-alt text-yellow-500" />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="fa-regular fa-star text-gray-300" />
      );
    }

    return stars;
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      reviewerName: review.reviewerName,
      employeeName: review.employeeName,
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      status: review.status,
      reviewType: review.reviewType,
      period: review.period,
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingReview) {
      // Update existing review
      setReviews(
        reviews.map((review) =>
          review.id === editingReview.id ? { ...review, ...formData } : review
        )
      );
    } else {
      // Add new review
      const newReview: Review = {
        id: Math.max(...reviews.map((r) => r.id)) + 1,
        ...formData,
      };
      setReviews([...reviews, newReview]);
    }

    // Reset form
    setFormData({
      reviewerName: "",
      employeeName: "",
      rating: 0,
      comment: "",
      date: "",
      status: "Draft",
      reviewType: "Quarterly",
      period: "",
    });
    setEditingReview(null);
    setShowModal(false);
  };

  const openAddModal = () => {
    setEditingReview(null);
    setFormData({
      reviewerName: "",
      employeeName: "",
      rating: 0,
      comment: "",
      date: new Date().toISOString().split("T")[0],
      status: "Draft",
      reviewType: "Quarterly",
      period: "",
    });
    setShowModal(true);
  };

  // Table columns configuration
  const columns: TableColumn<Review>[] = [
    {
      key: "employeeName",
      label: "Employee",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "reviewerName",
      label: "Reviewer",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-1">
          {value > 0 ? (
            <>
              {renderStars(value)}
              <span className="ml-2 text-sm text-gray-600">({value})</span>
            </>
          ) : (
            <span className="text-sm text-gray-400">Not rated</span>
          )}
        </div>
      ),
    },
    {
      key: "comment",
      label: "Comment",
      render: (value: string) => (
        <div className="text-sm text-gray-600 max-w-xs truncate">
          {value || "No comment yet"}
        </div>
      ),
    },
    {
      key: "reviewType",
      label: "Type",
      sortable: true,
      render: (value: Review["reviewType"]) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(value)}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "period",
      label: "Period",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-900">{value}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-900">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: Review["status"]) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(value)}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row: Review) => (
        <div className="flex p-2 space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Header title="Performance Reviews" className="text-gray-900" />
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <i className="fa-solid fa-plus mr-2" />
          Add Review
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummarySingleCard
          iconClass="fa-solid fa-clipboard-check"
          title="Total Reviews"
          value={reviews.length}
        />

        <SummarySingleCard
          iconClass="fa-solid fa-check-circle"
          title="Approved Reviews"
          value={reviews.filter((r) => r.status === "Approved").length}
        />
        <SummarySingleCard
          iconClass="fa-solid fa-clock"
          title="Pending Reviews"
          value={
            reviews.filter(
              (r) => r.status === "Draft" || r.status === "Submitted"
            ).length
          }
        />

        <SummarySingleCard
          iconClass="fa-solid fa-star"
          title="Avg Rating"
          value={(
            reviews
              .filter((r) => r.rating > 0)
              .reduce((sum, r) => sum + r.rating, 0) /
              reviews.filter((r) => r.rating > 0).length || 0
          ).toFixed(1)}
        />

        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <i className="fa-solid fa-check-circle text-white text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === "Approved").length}
              </h3>
              <p className="text-gray-600 text-sm">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-lg">
              <i className="fa-solid fa-clock text-white text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === "Draft" || r.status === "Submitted").length}
              </h3>
              <p className="text-gray-600 text-sm">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <i className="fa-solid fa-star text-white text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {(reviews.filter(r => r.rating > 0).reduce((sum, r) => sum + r.rating, 0) / 
                  reviews.filter(r => r.rating > 0).length || 0).toFixed(1)}
              </h3>
              <p className="text-gray-600 text-sm">Avg Rating</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Reviews Table */}
      <TableComponent
        data={reviews}
        columns={columns}
        pageSize={10}
        showPaginationControls={true}
        pageSizeOptions={[5, 10, 25, 50]}
        emptyMessage="No reviews found"
        className="rounded-lg shadow-md"
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingReview ? "Edit Review" : "Add New Review"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.employeeName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          employeeName: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Reviewer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.reviewerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reviewerName: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rating (1-5)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Comment
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Enter review comments..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Review Type
                    </label>
                    <select
                      value={formData.reviewType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reviewType: e.target.value as Review["reviewType"],
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annual">Annual</option>
                      <option value="Mid-Year">Mid-Year</option>
                      <option value="Project-based">Project-based</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Period
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.period}
                      onChange={(e) =>
                        setFormData({ ...formData, period: e.target.value })
                      }
                      placeholder="e.g., Q3 2025"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Review["status"],
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Approved">Approved</option>
                      <option value="Needs Revision">Needs Revision</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    {editingReview ? "Update" : "Add"} Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
