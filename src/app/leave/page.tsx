import Wrapper from "@/components/layouts/DefaultWrapper";
import LeaveMainArea from "@/components/pagesUI/hrm/leave/LeaveMainArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Leave Management">
        <Wrapper>
          <LeaveMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
