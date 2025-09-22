"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import TableHeader from "@/components/common/TableHeader";
import DesignationTable from "@/components/pagesUI/designations/DesignationTable";
import { useState } from "react";
import { Plus } from "lucide-react";

const DesignationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <MetaData pageTitle="Designations">
        <Wrapper>
          <div className="app__slide-wrapper">
            <div className="flex items-center justify-between mb-2">
              <Breadcrumb breadTitle="Designations" subTitle="Home" />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Designation
              </button>
            </div>
            <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 px-4 py-4 gap-2 shadow-sm border border-gray-200 dark:border-gray-600 rounded-lg">
              <TableHeader
                title="Designations"
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search designations..."
              />
              <DesignationTable />
            </div>
          </div>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default DesignationsPage;
