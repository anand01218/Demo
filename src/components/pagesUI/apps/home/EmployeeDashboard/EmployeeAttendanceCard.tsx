"use client";
import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const EmployeeAttendanceCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState<
    "checked-in" | "checked-out" | "not-checked-in"
  >("not-checked-in");
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString());
    setAttendanceStatus("checked-in");
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now.toLocaleTimeString());
    setAttendanceStatus("checked-out");
  };

  const getTodaysDate = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        Attendance
      </h3>

      {/* Current Date and Time */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          {getTodaysDate()}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {getCurrentTime()}
        </p>
      </div>

      {/* Attendance Status */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          {attendanceStatus === "checked-in" && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span className="font-medium">Checked In</span>
            </div>
          )}
          {attendanceStatus === "checked-out" && (
            <div className="flex items-center text-blue-600">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span className="font-medium">Checked Out</span>
            </div>
          )}
          {attendanceStatus === "not-checked-in" && (
            <div className="flex items-center text-red-600">
              <XCircle className="w-6 h-6 mr-2" />
              <span className="font-medium">Not Checked In</span>
            </div>
          )}
        </div>

        {/* Check In/Out Times */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Check In:
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {checkInTime || "-- : --"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Check Out:
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {checkOutTime || "-- : --"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {attendanceStatus === "not-checked-in" && (
          <button
            onClick={handleCheckIn}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Check In
          </button>
        )}

        {attendanceStatus === "checked-in" && (
          <button
            onClick={handleCheckOut}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Check Out
          </button>
        )}

        {attendanceStatus === "checked-out" && (
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            You have completed your shift for today
          </div>
        )}

        <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-md transition-colors">
          View Attendance History
        </button>
      </div>

      {/* Today's Summary */}
      <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
              Working Hours
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {checkInTime && checkOutTime ? "8h 30m" : "-- : --"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
              Status
            </p>
            <p className="text-sm font-medium text-green-600">
              {attendanceStatus === "checked-out" ? "Completed" : "In Progress"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceCard;
