import Wrapper from "@/components/layouts/DefaultWrapper";
import ShiftMainArea from "@/components/pagesUI/hrm/shift/ShiftMainArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Shift Management">
        <Wrapper>
          <ShiftMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
