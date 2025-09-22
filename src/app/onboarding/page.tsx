import Wrapper from "@/components/layouts/DefaultWrapper";
import { OnboardingMainArea } from "@/components/pagesUI/onboarding";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const OnboardingPage = () => {
  return (
    <>
      <MetaData pageTitle="Onboarding">
        <Wrapper>
          <OnboardingMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default OnboardingPage;
