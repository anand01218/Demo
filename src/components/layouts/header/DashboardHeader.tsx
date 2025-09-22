"use client";
import React from "react";
import HeaderAction from "./components/HeaderAction";
import useGlobalContext from "@/hooks/use-context";

const DashboardHeader = () => {
  const { sidebarHandle, isCollapse } = useGlobalContext();

  return (
    <>
      {/* -- App header area start -- */}
      <div
        className={`fixed top-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm z-30 transition-all duration-300 ${
          isCollapse ? "left-0 lg:left-16" : "left-0 lg:left-56"
        }`}
      >
        <div className="px-3 sm:px-6 py-1 flex items-center justify-between h-12">
          <div className="app__header-left">
            <div className="flex">
              <button
                id="sidebar__active"
                onClick={sidebarHandle}
                className="app__header-toggle"
              >
                <div className="bar-icon-2">
                  <span />
                  <span />
                  <span />
                </div>
              </button>
            </div>
          </div>
          <div className="app__header-right">
            <HeaderAction />
          </div>
        </div>
      </div>
      <div className="body__overlay" />
      {/* -- App header area end -- */}
    </>
  );
};

export default DashboardHeader;
