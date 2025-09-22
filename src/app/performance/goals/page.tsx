import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import GoalsList from "@/components/pagesUI/performance/GoalsList";
import React from "react";

const PerformanceGoalsPage = () => {
  return (
    <>
      <MetaData pageTitle="Performance Goals">
        <Wrapper>
          <GoalsList />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default PerformanceGoalsPage;
