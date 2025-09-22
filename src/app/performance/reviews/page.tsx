import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import ReviewsList from "@/components/pagesUI/performance/ReviewsList";
import React from "react";

const PerformanceReviewsPage = () => {
  return (
    <>
      <MetaData pageTitle="Performance Reviews">
        <Wrapper>
          <ReviewsList />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default PerformanceReviewsPage;
