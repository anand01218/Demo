"use client";
import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { initializeDropzone } from "@/lib/utils/dropzoneUtils";
import { useForm } from "react-hook-form";
import { ICreateProject } from "@/interface/table.interface";
import DatePicker from "react-datepicker";
const ProjectCreateForm: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [selectStartDate, setSelectStartDate] = useState<Date | null>(
    new Date()
  );
  const [selectEndDate, setSelectEndDate] = useState<Date | null>(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateProject>();

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const statusOptions = [
    { value: "planning", label: "Planning" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  // eslint-disable-next-line no-unused-vars
  const onSubmit = async (_data: ICreateProject) => {};

  //file handle
  useEffect(() => {
    const multiDropzone = initializeDropzone("multiFileUpload", 10);

    return () => {
      if (multiDropzone) {
        multiDropzone.destroy();
      }
    };
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-x-6 maxXs:gap-x-0">
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-x-6 maxXs:gap-x-0">
              <div className="col-span-12">
                <div className="card__wrapper">
                  <div className="grid grid-cols-12 gap-x-6 maxXs:gap-x-0 gap-y-6">
                    {/* Project Name */}
                    <div className="col-span-12">
                      <label
                        htmlFor="projectName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Project Name *
                      </label>
                      <input
                        id="projectName"
                        type="text"
                        {...register("projectName", {
                          required: "Project Name is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                      {errors.projectName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.projectName.message}
                        </p>
                      )}
                    </div>
                    {/* Project Thumbnail */}
                    <div className="col-span-12">
                      <div className="from__input-box">
                        <div className="form__input-title">
                          <label htmlFor="projectThumbnail">
                            Project Thumbnail<span>*</span>
                          </label>
                        </div>
                        <div className="form__input">
                          <input
                            className="form-control"
                            name="name"
                            id="projectThumbnail"
                            type="file"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Start Date */}
                    <div className="col-span-12 md:col-span-6 xl:col-span-6">
                      <label
                        htmlFor="selectStartDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Start Date
                      </label>
                      <div className="datepicker-style">
                        <DatePicker
                          id="selectStartDate"
                          selected={selectStartDate}
                          onChange={(date) => setSelectStartDate(date)}
                          showYearDropdown
                          showMonthDropdown
                          useShortMonthInDropdown
                          showPopperArrow={false}
                          peekNextMonth
                          dropdownMode="select"
                          isClearable
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Start date"
                          className="w-full"
                        />
                      </div>
                    </div>
                    {/* Deadline */}
                    <div className="col-span-12 md:col-span-6 xl:col-span-6">
                      <label
                        htmlFor="deadline"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Deadline
                      </label>
                      <div className="datepicker-style">
                        <DatePicker
                          id="deadline"
                          selected={selectEndDate}
                          onChange={(date) => setSelectEndDate(date)}
                          showYearDropdown
                          showMonthDropdown
                          useShortMonthInDropdown
                          showPopperArrow={false}
                          peekNextMonth
                          dropdownMode="select"
                          isClearable
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Deadline"
                          className="w-full"
                        />
                      </div>
                    </div>
                    {/* Priority */}
                    <div className="col-span-12 md:col-span-12 xl:col-span-6">
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        {...register("priority")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      >
                        <option value="">Select Priority</option>
                        {priorityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Status */}
                    <div className="col-span-12 md:col-span-12 xl:col-span-6">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        {...register("status")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      >
                        <option value="">Select Status</option>
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ====== Attached Files Section ====== */}
                    <div className="col-span-12 dropzone-wrapper dropzone-border">
                      <div className="from__input-box">
                        <div className="form__input-title">
                          <label>Attached files</label>
                        </div>
                      </div>
                      <div
                        className="dropzone dz-clickable"
                        id="multiFileUpload"
                      >
                        <div className="dz-default dz-message">
                          <i className="fa-thin fa-cloud-arrow-up" />
                          <h6>Drop files here or click to upload.</h6>
                          <span className="note needsclick">
                            (This is just a demo dropzone. Selected files are
                            not actually uploaded.)
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* ===== End of Attached Files Section ===== */}

                    {/* ===== from editor */}
                    <div className="col-span-12">
                      <div className="from__input-box">
                        <div className="form__input-title">
                          <label>
                            Project Description <span>*</span>
                          </label>
                        </div>
                        <Editor
                          apiKey="uonxh66a1gnxnn8g0lsc2ow4pa5c9jys8sa0fadd1txn49y7"
                          onInit={(_evt, editor) =>
                            (editorRef.current = editor)
                          }
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                              "code",
                              "table",
                              "lists",
                              "anchor",
                              "autolink",
                              "autosave",
                              "charmap",
                              "codesample",
                              "directionality",
                              "emoticons",
                              "fullscreen",
                              "help",
                              "image",
                              "importcss",
                              "insertdatetime",
                              "visualblocks",
                              "visualchars",
                              "wordcount",
                              "accordion",
                            ],
                            toolbar:
                              "undo redo | blockquote blocks | " +
                              "bold italic | alignleft aligncenter alignright | " +
                              "outdent indent code | anchor link restoredraft charmap | " +
                              "codesample ltr rtl emoticons fullscreen | " +
                              "help image insertdatetime lists media nonbreaking | " +
                              "pagebreak preview save searchreplace template | " +
                              "visualblocks visualchars wordcount accordion print",
                            toolbar_mode: "wrap",
                            link_default_target: "_blank",
                            quickbars_insert_toolbar: false,
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 flex justify-center items-center">
            <div className="submit__btn text-center mb-[20px]">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProjectCreateForm;
