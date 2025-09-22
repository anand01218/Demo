import React from "react";
import SummarySingleCard from "@/components/common/SummarySingleCard";

const EmployeeAttendanceSummary = () => {
  return (
    <>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3">
        <SummarySingleCard
          iconClass="fa-solid fa-user-check"
          title="Total Present"
          value={4}
        />
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3">
        <SummarySingleCard
          iconClass="fa-solid fa-clock"
          title="Late Login"
          value={2}
        />
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3">
        <SummarySingleCard
          iconClass="fa-solid fa-user-xmark"
          title="Absent"
          value={8}
        />
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3">
        <SummarySingleCard
          iconClass="fa-solid fa-hand-paper"
          title="Permission"
          value={5}
        />
      </div>
    </>
  );
};

export default EmployeeAttendanceSummary;
