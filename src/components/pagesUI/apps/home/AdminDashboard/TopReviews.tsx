"use client";
import Header from "@/components/common/Header";
import React from "react";

interface TopReview {
  id: number;
  employeeName: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  reviewType: "Quarterly" | "Annual" | "Mid-Year" | "Project-based";
  period: string;
}

const TopReviews: React.FC = () => {
  // Sample data for top reviews
  const topReviews: TopReview[] = [
    {
      id: 1,
      employeeName: "Sarah Smith",
      reviewerName: "David Brown",
      rating: 4.8,
      comment:
        "Outstanding performance and innovation. Exceeds expectations in all areas.",
      date: "2025-09-08",
      reviewType: "Annual",
      period: "2025",
    },
    {
      id: 2,
      employeeName: "John Doe",
      reviewerName: "Sarah Johnson",
      rating: 4.5,
      comment:
        "Excellent performance throughout the quarter. Shows strong leadership skills.",
      date: "2025-09-15",
      reviewType: "Quarterly",
      period: "Q3 2025",
    },
    {
      id: 3,
      employeeName: "Emily Davis",
      reviewerName: "Mike Wilson",
      rating: 4.2,
      comment:
        "Good technical skills and team collaboration. Consistent delivery.",
      date: "2025-09-10",
      reviewType: "Quarterly",
      period: "Q3 2025",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={i} className="fa-solid fa-star text-yellow-500 text-xs" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          className="fa-solid fa-star-half-alt text-yellow-500 text-xs"
        />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i
          key={`empty-${i}`}
          className="fa-regular fa-star text-gray-300 text-xs"
        />
      );
    }

    return stars;
  };

  const getReviewTypeColor = (type: TopReview["reviewType"]) => {
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

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div>
            <Header title="Top Employee Reviews" />
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {topReviews.map((review, index) => (
          <div
            key={review.id}
            className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            {/* Ranking Badge */}
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                      ? "bg-gray-400"
                      : "bg-orange-400"
                }`}
              >
                {index + 1}
              </div>
            </div>

            {/* Review Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {review.employeeName}
                </h4>
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                  <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                    ({review.rating})
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                Reviewed by: {review.reviewerName}
              </p>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                {review.comment}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getReviewTypeColor(review.reviewType)}`}
                >
                  {review.reviewType}
                </span>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{review.period}</span>
                  <span>•</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Average Rating:{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              4.5/5
            </span>
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Total Reviews:{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              24
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopReviews;
