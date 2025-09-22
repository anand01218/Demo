"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Link from "next/link";

const OnboardingPage = () => {
  return (
    <>
      <MetaData pageTitle="Onboarding">
        <Wrapper>
          <div className="app__slide-wrapper">
            <div className="p-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Onboarding Management
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href="/settings/onboarding/onboarding-fields"
                  className="block"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Onboarding Fields
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Configure custom fields for employee onboarding process.
                    </p>
                  </div>
                </Link>
                <Link
                  href="/settings/onboarding/onboarding-templates"
                  className="block"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Onboarding Templates
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Manage onboarding templates and workflows for new
                      employees.
                    </p>
                  </div>
                </Link>
                <Link
                  href="/settings/onboarding/welcome-package"
                  className="block"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Welcome Package
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Configure welcome packages for new employees.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default OnboardingPage;
