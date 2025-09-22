import Wrapper from "@/components/layouts/DefaultWrapper";
import CreateShiftMainArea from "@/components/pagesUI/hrm/shift/CreateShiftMainArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Create Shift">
        <Wrapper>
          <CreateShiftMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
