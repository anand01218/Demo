import Wrapper from "@/components/layouts/DefaultWrapper";
import DepartmentMainArea from "@/components/pagesUI/hrm/department/DepartmentMainArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Department">
        <Wrapper>
          <DepartmentMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
