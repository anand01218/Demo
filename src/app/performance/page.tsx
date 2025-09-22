import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import PerformanceMainArea from "@/components/pagesUI/performance/PerformanceMainArea";
import React from "react";

const PerformancePage = () => {
  return (
    <>
      <MetaData pageTitle="Performance">
        <Wrapper>
          <PerformanceMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default PerformancePage;
