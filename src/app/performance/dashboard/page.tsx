import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import PerformanceDashboard from "@/components/pagesUI/performance/PerformanceDashboard";
import React from "react";

const PerformanceDashboardPage = () => {
  return (
    <>
      <MetaData pageTitle="Performance Dashboard">
        <Wrapper>
          <PerformanceDashboard />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default PerformanceDashboardPage;
