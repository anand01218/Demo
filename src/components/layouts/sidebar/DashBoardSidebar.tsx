"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import sidebarMainLogo from "../../../../public/assets/images/logo/logo.svg";
// import sidebarDarkLogo from "../../../../public/assets/images/logo/logo-white.svg";
import useGlobalContext from "@/hooks/use-context";
// import sidebarImg from "../../../../public/assets/images/bg/side-bar.png";
import sidebarData from "@/data/sidebar-data";
import { usePathname } from "next/navigation";
import { usePermission } from "@/hooks/usePermissionProvider";
import InboxSidebarItem from "./InboxSidebarItem";

const DashBoardSidebar = () => {
  const { isCollapse, setIsCollapse } = useGlobalContext();
  const { hasPermission, hasAnyPermission } = usePermission();
  // eslint-disable-next-line no-unused-vars -- State managed through setter, reserved for future UI state
  const [linkId, setlinkId] = useState<number | null>(null);
  const [linkIdTwo, setlinkIdTwo] = useState<number | null>(null);
  // eslint-disable-next-line no-unused-vars -- reserved for future nested menu state
  const [_linkIdThree, setlinkIdThree] = useState<number | null>(null);
  // eslint-disable-next-line no-unused-vars -- reserved for future nested menu state
  const [_linkIdFour, setlinkIdFour] = useState<number | null>(null);
  const [activeSubSidebar, setActiveSubSidebar] = useState<number | null>(null);
  const pathName = usePathname(); // Current route
  const subSidebarRef = useRef<HTMLDivElement>(null);

  // Helper function to check if user has permission for a menu item
  const hasMenuPermission = (item: any) => {
    // If no permission is required, allow access
    if (!item.permission && !item.permissions) {
      return true;
    }

    // Check single permission
    if (item.permission) {
      return hasPermission(item.permission);
    }

    // Check multiple permissions (user needs at least one)
    if (item.permissions && item.permissions.length > 0) {
      return hasAnyPermission(item.permissions);
    }

    return true;
  };

  // Filter sidebar items based on permissions
  const getFilteredSidebarData = () => {
    return sidebarData
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          // Check if user has permission for main item
          if (!hasMenuPermission(item)) {
            return false;
          }

          // If item has sub-items, filter them too
          if (item.subItems) {
            const filteredSubItems = item.subItems.filter((subItem) => {
              if (!hasMenuPermission(subItem)) {
                return false;
              }

              // If sub-item has nested sub-items, filter them too
              if (subItem.subItems) {
                const filteredNestedItems = subItem.subItems.filter(
                  (nestedItem) => hasMenuPermission(nestedItem)
                );
                subItem.subItems = filteredNestedItems;
                // Only include sub-item if it has at least one visible nested item or no nested items
                return (
                  filteredNestedItems.length > 0 || !subItem.subItems.length
                );
              }

              return true;
            });

            // Update the item's subItems with filtered ones
            item.subItems = filteredSubItems;
            // Only include main item if it has at least one visible sub-item or no sub-items requirement
            return filteredSubItems.length > 0;
          }

          return true;
        }),
      }))
      .filter((category) => category.items.length > 0); // Remove empty categories
  };

  const filteredSidebarData = getFilteredSidebarData();

  // Utility function to handle collapse behavior for screens with max-width: 1199px
  const handleCollapse = (shouldCollapse: boolean) => {
    if (window.matchMedia("(max-width: 1199px)").matches) {
      setIsCollapse(shouldCollapse);
    }
  };

  const handleClick = (id: number, hasSubItems: boolean) => {
    if (hasSubItems) {
      // Simple toggle for sub-sidebar
      if (activeSubSidebar === id) {
        setActiveSubSidebar(null);
        setlinkId(null); // Reset linkId when closing
      } else {
        setActiveSubSidebar(id);
        setlinkId(id); // Set linkId for visual feedback
      }
    } else {
      // For regular items, just close any open sub-sidebar
      setActiveSubSidebar(null);
      setlinkId(id);
      handleCollapse(true);
    }
  };

  const handleClickTwo = (id: number) => {
    if (linkIdTwo === id) {
      setlinkIdTwo(null);
      handleCollapse(true); // Collapse when closing
    } else {
      setlinkIdTwo(id);
      setlinkIdThree(null);
      setlinkIdFour(null);
      handleCollapse(true); // Expand when opening
    }
  };

  // Get active sub-sidebar data
  const getActiveSubSidebarData = () => {
    if (!activeSubSidebar) return null;

    for (const category of filteredSidebarData) {
      const item = category.items.find((item) => item.id === activeSubSidebar);
      if (item && item.subItems) {
        return { label: item.label, subItems: item.subItems };
      }
    }
    return null;
  };

  // ESC key and outside click handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeSubSidebar) {
        setActiveSubSidebar(null);
        setlinkId(null); // Reset arrow state
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeSubSidebar &&
        subSidebarRef.current &&
        !subSidebarRef.current.contains(event.target as Node)
      ) {
        const mainSidebar = document.querySelector(".main-sidebar");
        const clickedElement = event.target as Node;

        // Don't close if clicking on the main sidebar item that has sub-items
        const clickedOnMainSidebarItem =
          mainSidebar?.contains(clickedElement) &&
          (event.target as Element)?.closest('a[href="#"]');

        if (!clickedOnMainSidebarItem) {
          setActiveSubSidebar(null);
          setlinkId(null); // Reset arrow state
        }
      }
    };

    if (activeSubSidebar) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [activeSubSidebar]);

  // UseEffect to find and set the active menu based on the current path
  useEffect(() => {
    // TEMPORARILY DISABLED - path detection
    return;

    const findLayerIds = () => {
      let foundFirstLayerId = null;
      let foundSecondLayerId = null;
      let foundThirdLayerId = null;
      let foundActiveSubSidebar = null;

      // Iterate through filteredSidebarData to find the object that matches the pathName
      filteredSidebarData.forEach((category) => {
        category.items.forEach((item) => {
          // Check if the current pathName matches the link of the first level
          if (item.link === pathName) {
            foundFirstLayerId = item.id;
            foundSecondLayerId = null;
            foundThirdLayerId = null;
          } else if (item.subItems) {
            // Check within subItems recursively for the second layer
            item.subItems.forEach((subItem, subItemIndex) => {
              if (subItem.link === pathName) {
                foundFirstLayerId = item.id;
                foundSecondLayerId = subItemIndex;
                foundThirdLayerId = null;
                foundActiveSubSidebar = item.id; // Show sub-sidebar for active parent
              } else if (subItem.subItems) {
                subItem.subItems.forEach((thirdSubMenu, thirdSubIndex) => {
                  if (thirdSubMenu.link === pathName) {
                    foundFirstLayerId = item.id;
                    foundSecondLayerId = subItemIndex;
                    foundThirdLayerId = thirdSubIndex;
                    foundActiveSubSidebar = item.id;
                  }
                });
              }
            });
          }
        });
      });

      setlinkId(foundFirstLayerId);
      setlinkIdTwo(foundSecondLayerId);
      setlinkIdThree(foundThirdLayerId);

      // Only set activeSubSidebar if it's different from current and based on actual path match
      if (foundActiveSubSidebar !== activeSubSidebar) {
        setActiveSubSidebar(foundActiveSubSidebar);
      }
    };

    // Call the function to find the matching object when pathName changes
    findLayerIds();
  }, [pathName, filteredSidebarData, activeSubSidebar]);

  return (
    <>
      <div
        className={`main-sidebar fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isCollapse
            ? "-translate-x-full lg:translate-x-0 lg:w-16"
            : "translate-x-0 w-64 lg:w-56"
        }`}
      >
        <div className="flex items-center justify-center h-12 border-b border-gray-200 dark:border-gray-700 px-4">
          <Link href="/" className="flex items-center">
            <Image
              className={`transition-all duration-300 ${isCollapse ? "w-8 h-6 lg:w-16 lg:h-8" : "w-30 h-4 lg:w-full lg:h-10"}`}
              src={sidebarMainLogo}
              priority
              alt="logo"
            />
          </Link>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4">
          <nav className="px-2">
            <ul className="space-y-1">
              {filteredSidebarData.map((category) => (
                <React.Fragment key={category.id}>
                  <li
                    className={`px-3 py-2 mb-2 transition-all duration-300 overflow-hidden ${
                      isCollapse
                        ? "h-0 opacity-0 lg:h-0 lg:opacity-0"
                        : "h-auto opacity-100"
                    }`}
                  >
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {category.category}
                    </span>
                  </li>
                  {category.items.map((item) => {
                    const isActive =
                      pathName === item.link ||
                      (item.subItems &&
                        item.subItems.some(
                          (sub) =>
                            pathName === sub.link ||
                            (sub.subItems &&
                              sub.subItems.some(
                                (nested) => pathName === nested.link
                              ))
                        ));
                    return (
                      <li key={item.id} className="mb-1">
                        {item.label === "Inbox" ? (
                          <InboxSidebarItem isCollapse={isCollapse} />
                        ) : (
                          <Link
                            onClick={(e) => {
                              if (
                                !item.link ||
                                item.link === "#" ||
                                item.subItems
                              ) {
                                e.preventDefault();
                              }
                              handleClick(item.id, !!item.subItems);
                            }}
                            href={item.subItems ? "#" : item.link || "#"}
                            className={`group flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              isActive || activeSubSidebar === item.id
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-r-2 border-blue-600"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-400 dark:hover:text-white"
                            }`}
                            title={isCollapse ? item.label : ""}
                          >
                            {item.icon && (
                              <div
                                className={`flex-shrink-0 w-5 flex justify-center ${isCollapse ? "lg:mx-auto" : ""}`}
                              >
                                <i
                                  className={`${item.icon} text-lg ${isActive || activeSubSidebar === item.id ? "text-blue-800 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"}`}
                                />
                              </div>
                            )}
                            <span
                              className={`flex-1 truncate ${isCollapse ? "lg:hidden" : ""}`}
                            >
                              {item.label}
                            </span>
                            {item.subItems && !isCollapse && (
                              <i
                                className={`fa-regular fa-angle-down transition-transform duration-200 ${
                                  activeSubSidebar === item.id
                                    ? "rotate-180"
                                    : ""
                                } ${isCollapse ? "lg:hidden" : ""}`}
                              />
                            )}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </React.Fragment>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Sub-sidebar */}
      {activeSubSidebar && getActiveSubSidebarData() && (
        <div
          ref={subSidebarRef}
          className={`fixed top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out z-30 ${
            isCollapse ? "left-0 lg:left-12 w-48" : "left-64 lg:left-56 w-52"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {getActiveSubSidebarData()?.label}
            </h3>
            <button
              onClick={() => setActiveSubSidebar(null)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <i className="fa-solid fa-times text-sm" />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4">
            <nav className="px-2">
              <ul className="space-y-1">
                {getActiveSubSidebarData()?.subItems?.map((subItem, index) => {
                  const isSubActive = pathName === subItem.link;
                  const hasNestedSubItems =
                    subItem.subItems && subItem.subItems.length > 0;
                  return (
                    <li key={index}>
                      <Link
                        href={subItem.link || "#"}
                        onClick={(e) => {
                          if (hasNestedSubItems) {
                            e.preventDefault();
                            handleClickTwo(index);
                          } else {
                            // Close sub-sidebar on mobile after clicking
                            if (
                              window.matchMedia("(max-width: 1199px)").matches
                            ) {
                              setActiveSubSidebar(null);
                              setIsCollapse(true);
                            }
                          }
                        }}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isSubActive
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60" />
                        <span className="truncate flex-1">{subItem.label}</span>
                        {hasNestedSubItems && !isCollapse && (
                          <i
                            className={`fa-regular fa-angle-down transition-transform duration-200 ${
                              linkIdTwo === index ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </Link>
                      {hasNestedSubItems && linkIdTwo === index && (
                        <ul className="ml-6 mt-1 space-y-1">
                          {subItem.subItems?.map((nestedItem, nestedIndex) => {
                            const isNestedActive = pathName === nestedItem.link;
                            return (
                              <li key={nestedIndex}>
                                <Link
                                  href={nestedItem.link || "/"}
                                  onClick={() => {
                                    if (
                                      window.matchMedia("(max-width: 1199px)")
                                        .matches
                                    ) {
                                      setActiveSubSidebar(null);
                                      setIsCollapse(true);
                                    }
                                  }}
                                  className={`group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                                    isNestedActive
                                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                      : "text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
                                  }`}
                                >
                                  <div className="w-1 h-1 rounded-full bg-current mr-3 opacity-60" />
                                  <span className="truncate">
                                    {nestedItem.label}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      <div
        onClick={() => {
          setIsCollapse(true);
          setActiveSubSidebar(null);
        }}
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300 ${
          !isCollapse || activeSubSidebar
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
};

export default DashBoardSidebar;
