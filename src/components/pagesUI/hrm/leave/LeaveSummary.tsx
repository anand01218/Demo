import React from "react";
import SummarySingleCard from "@/components/common/SummarySingleCard";

const LeaveSummary = () => {
  return (
    <>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3">
        <SummarySingleCard
          iconClass="fa-solid fa-calendar-days"
          title="Total Leaves"
          value={5}
        />
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3">
        <SummarySingleCard
          iconClass="fa-solid fa-calendar-check"
          title="Planned Leave"
          value={3}
        />
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3">
        <SummarySingleCard
          iconClass="fa-solid fa-calendar-xmark"
          title="Unplanned Leaves"
          value={1}
        />
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3">
        <SummarySingleCard
          iconClass="fa-solid fa-clock"
          title="Pending Requests"
          value={1}
        />
      </div>
    </>
  );
};

export default LeaveSummary;
