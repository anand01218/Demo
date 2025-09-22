"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import ComingSoon from "@/components/common/ComingSoon";

const AttendanceReportPage = () => {
  return (
    <>
      <MetaData pageTitle="Attendance Report">
        <Wrapper>
          <div className="app__slide-wrapper">
            <Breadcrumb breadTitle="Attendance Report" subTitle="Reports" />
            <ComingSoon
              title="Attendance Report"
              description="Advanced attendance tracking and reporting features are being developed."
            />
          </div>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default AttendanceReportPage;
