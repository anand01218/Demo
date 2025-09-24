"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const WelcomePackagePage = () => {
  const router = useRouter();
  const welcomeLetterRef = useRef<any>(null);
  const overviewRef = useRef<any>(null);
  const visionRef = useRef<any>(null);
  const missionRef = useRef<any>(null);
  const additionalInfoRef = useRef<any>(null);

  const handleSend = () => {
    toast.success("Welcome package saved successfully!");
    router.push("/settings/onboarding/onboarding-templates");
  };

  return (
    <>
      <MetaData pageTitle="Welcome Package">
        <Wrapper>
          <div className="app__slide-wrapper">
            <div className="flex items-center justify-between mb-2">
              <Breadcrumb breadTitle="Welcome Package" subTitle="Onboarding" />
              <div className="flex gap-2">
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium flex items-center gap-2 rounded-md"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
            <div className="col-span-12 mt-2 mb-6 bg-white dark:bg-gray-800 px-6 py-6 shadow-sm border border-gray-200 dark:border-gray-600">
              <form className="space-y-6">
                {/* Template Title, Description, Subject */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Template Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                      placeholder="Enter template title"
                      name="templateTitle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                      placeholder="Enter description"
                      name="description"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                      placeholder="Enter subject"
                      name="subject"
                    />
                  </div>
                </div>
                {/* Welcome Letter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Welcome Letter</h3>
                  <Editor
                    apiKey="uonxh66a1gnxnn8g0lsc2ow4pa5c9jys8sa0fadd1txn49y7"
                    onInit={(_evt, editor) =>
                      (welcomeLetterRef.current = editor)
                    }
                    initialValue=""
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: ["lists", "link", "code", "table"],
                      toolbar:
                        "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link code",
                    }}
                  />
                </div>

                {/* About Company */}
                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        About Company
                      </h3>
                      <Editor
                        apiKey="uonxh66a1gnxnn8g0lsc2ow4pa5c9jys8sa0fadd1txn49y7"
                        onInit={(_evt, editor) =>
                          (overviewRef.current = editor)
                        }
                        initialValue=""
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: ["lists", "link", "code"],
                          toolbar:
                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link",
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Vision</h3>
                      <Editor
                        apiKey="uonxh66a1gnxnn8g0lsc2ow4pa5c9jys8sa0fadd1txn49y7"
                        onInit={(_evt, editor) => (visionRef.current = editor)}
                        initialValue=""
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: ["lists", "link", "code"],
                          toolbar:
                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link",
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Mission</h3>
                      <Editor
                        apiKey="uonxh66a1gnxnn8g0lsc2ow4pa5c9jys8sa0fadd1txn49y7"
                        onInit={(_evt, editor) => (missionRef.current = editor)}
                        initialValue=""
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: ["lists", "link", "code"],
                          toolbar:
                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Offer Letters */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Offer Letters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Offer Letter
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <input
                          type="file"
                          className="hidden"
                          id="offer-letter"
                        />
                        <label
                          htmlFor="offer-letter"
                          className="cursor-pointer text-blue-600 hover:text-blue-700"
                        >
                          Click to upload offer letter
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Appointment Letter
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <input
                          type="file"
                          className="hidden"
                          id="appointment-letter"
                        />
                        <label
                          htmlFor="appointment-letter"
                          className="cursor-pointer text-blue-600 hover:text-blue-700"
                        >
                          Click to upload appointment letter
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Additional Information
                  </h3>
                  <Editor
                    apiKey="uonxh66a1gnxnn8g0lsc2ow4pa5c9jys8sa0fadd1txn49y7"
                    onInit={(_evt, editor) =>
                      (additionalInfoRef.current = editor)
                    }
                    initialValue=""
                    init={{
                      height: 250,
                      menubar: false,
                      plugins: ["lists", "link", "code", "table"],
                      toolbar:
                        "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link code",
                    }}
                  />
                </div>

                {/* Additional Attachments */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Additional Attachments
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="additional-attachments"
                    />
                    <label
                      htmlFor="additional-attachments"
                      className="cursor-pointer text-blue-600 hover:text-blue-700"
                    >
                      Click to upload additional attachments
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      You can select multiple files
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default WelcomePackagePage;
