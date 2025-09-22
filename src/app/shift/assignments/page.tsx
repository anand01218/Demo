import Wrapper from "@/components/layouts/DefaultWrapper";
import ShiftAssignmentsMainArea from "@/components/pagesUI/hrm/shift/ShiftAssignmentsMainArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Shift Assignments">
        <Wrapper>
          <ShiftAssignmentsMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
