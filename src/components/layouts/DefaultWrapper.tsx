"use client";
import React from "react";
import { usePathname } from "next/navigation";
import BackToTop from "@/common/BackToTop/BackToTop";
import DashboardHeader from "./header/DashboardHeader";
import DashBoardSidebar from "./sidebar/DashBoardSidebar";
import useGlobalContext from "@/hooks/use-context";
import sidebarData from "@/data/sidebar-data";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const { theme } = useGlobalContext();
  const pathName = usePathname();

  const renderHeader = () => {
    switch (pathName) {
      default:
        return <DashboardHeader />;
    }
  };

  const { isCollapse } = useGlobalContext();

  // Check if current path belongs to a sub-item (indicating sub-sidebar should be open)
  const hasActiveSubSidebar = () => {
    for (const category of sidebarData) {
      for (const item of category.items) {
        if (item.subItems) {
          const hasActiveSubItem = item.subItems.some(
            (subItem) => pathName === subItem.link
          );
          if (hasActiveSubItem) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const subSidebarActive = hasActiveSubSidebar();

  return (
    <>
      <div className={`min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
        <DashBoardSidebar />
        <div
          className={`transition-all duration-300 pt-16 px-3 sm:px-6 ${
            isCollapse
              ? subSidebarActive
                ? "ml-0 lg:ml-64"
                : "ml-0 lg:ml-16"
              : subSidebarActive
                ? "ml-0 lg:ml-56"
                : "ml-0 lg:ml-56"
          }`}
        >
          <BackToTop />
          {renderHeader()}
          <div className="w-full max-w-full overflow-x-auto">{children}</div>
          {/* {renderFooter()} */}
        </div>
      </div>
    </>
  );
};

export default Wrapper;
