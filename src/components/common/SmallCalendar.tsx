"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const SmallCalendar = () => {
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1); // Start with 1st of current month
  });

  // Static attendance data
  const attendanceData: Record<string, string> = {
    "2025-09-01": "present",
    "2025-09-02": "present",
    "2025-09-03": "absent",
    "2025-09-04": "present",
    "2025-09-05": "present",
    "2025-09-06": "leave",
    "2025-09-09": "present",
    "2025-09-10": "present",
    "2025-09-11": "late",
    "2025-09-12": "present",
    "2025-09-13": "absent",
    "2025-09-16": "present",
    "2025-09-17": "present",
    "2025-09-18": "present",
    "2025-09-19": "late",
    "2025-09-20": "present",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "late":
        return "bg-yellow-500";
      case "leave":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth(), 1); // Always set to 1st of month
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Generate calendar days for the month
  const generateCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    // Fill remaining cells to complete the grid (42 cells = 6 weeks × 7 days)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(null);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className=" border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center p-3 space-x-3">
            <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600" />
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Attendance Calendar
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft
                size={16}
                className="text-gray-600 dark:text-gray-400"
              />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={() => navigateMonth("next")}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronRight
                size={16}
                className="text-gray-600 dark:text-gray-400"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="py-8 px-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.slice(0, 42).map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="h-8" />;
            }

            const dateKey = formatDateKey(year, month, day);
            const status = attendanceData[dateKey];
            const isToday =
              new Date().toDateString() ===
              new Date(year, month, day).toDateString();

            return (
              <div
                key={`day-${day}-${index}`}
                className={`h-8 flex items-center justify-center text-sm relative rounded transition-colors duration-200 ${
                  isToday
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                }`}
              >
                {day}
                {status && (
                  <div
                    className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${getStatusColor(status)}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-600 dark:text-gray-400">Present</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-gray-600 dark:text-gray-400">Absent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-gray-600 dark:text-gray-400">Late</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-gray-600 dark:text-gray-400">Leave</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCalendar;
