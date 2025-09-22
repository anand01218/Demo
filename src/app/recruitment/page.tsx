import Wrapper from "@/components/layouts/DefaultWrapper";
import RecruitmentMainArea from "@/components/pagesUI/recruitment/RecruitmentMainArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Recruitment">
        <Wrapper>
          <RecruitmentMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
