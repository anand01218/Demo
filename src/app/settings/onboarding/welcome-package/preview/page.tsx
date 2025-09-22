"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const WelcomePackagePreviewPage = () => {
  const router = useRouter();

  const handleFinalSubmit = () => {
    alert("Welcome package submitted successfully!");
  };

  return (
    <>
      <MetaData pageTitle="Welcome Package Preview">
        <Wrapper>
          <div className="app__slide-wrapper">
            <div className=" mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <h1 className="text-2xl font-bold">Welcome Package Preview</h1>
                <p className="text-blue-100">Review before final submission</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-3">
                    Employee Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Name:</span> John Doe
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      john.doe@company.com
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-3">Welcome Letter</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                    <p>Dear John Doe,</p>
                    <p className="mt-2">
                      Welcome to our company! We are excited to have you join
                      our team...
                    </p>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-3">About Company</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <p>
                      Our company is a leading provider of innovative
                      solutions...
                    </p>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-3">Vision</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <p>To be the global leader in our industry...</p>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-3">Mission</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <p>To deliver exceptional value to our customers...</p>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-3">
                    Attached Documents
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Offer Letter.pdf</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Appointment Letter.pdf</span>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-3">
                    Additional Information
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                    <p>
                      Please complete your onboarding process within the first
                      week...
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Additional Attachments
                  </h2>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Employee Handbook.pdf</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 flex justify-end gap-3">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                >
                  Final Submit
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default WelcomePackagePreviewPage;
