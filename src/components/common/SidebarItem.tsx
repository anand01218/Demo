"use client";
import React from "react";
import Link from "next/link";
import PermissionGate from "@/components/PermissionGate";

interface SubItem {
  label: string;
  link?: string;
  subItems?: SubItem[];
  permission?: string;
  permissions?: string[];
  role?: string;
  roles?: string[];
}

interface MenuItem {
  id: number;
  label: string;
  icon?: string;
  link?: string;
  subItems?: SubItem[];
  permission?: string;
  permissions?: string[];
  role?: string;
  roles?: string[];
}

interface SidebarItemProps {
  item: MenuItem;
  className?: string;
  // eslint-disable-next-line no-unused-vars -- Function signature requires parameter name
  onItemClick?: (item: MenuItem) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  className = "",
  onItemClick,
}) => {
  const renderSubItems = (subItems: SubItem[], level: number = 1) => {
    return subItems.map((subItem, index) => (
      <PermissionGate
        key={`${subItem.label}-${index}`}
        permission={subItem.permission}
        permissions={subItem.permissions}
        role={subItem.role}
        roles={subItem.roles}
      >
        <div className={`ml-${level * 4} py-1`}>
          {subItem.link && subItem.link !== "#" ? (
            <Link href={subItem.link}>
              <span className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded">
                {subItem.label}
              </span>
            </Link>
          ) : (
            <span className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
              {subItem.label}
            </span>
          )}
          {subItem.subItems && (
            <div className="ml-2">
              {renderSubItems(subItem.subItems, level + 1)}
            </div>
          )}
        </div>
      </PermissionGate>
    ));
  };

  return (
    <PermissionGate
      permission={item.permission}
      permissions={item.permissions}
      role={item.role}
      roles={item.roles}
    >
      <li className={className}>
        {item.link && item.link !== "#" ? (
          <Link href={item.link}>
            <div
              className="flex items-center p-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => onItemClick?.(item)}
            >
              {item.icon && <i className={`${item.icon} mr-3`} />}
              <span>{item.label}</span>
            </div>
          </Link>
        ) : (
          <div
            className="flex items-center p-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-lg cursor-pointer"
            onClick={() => onItemClick?.(item)}
          >
            {item.icon && <i className={`${item.icon} mr-3`} />}
            <span>{item.label}</span>
          </div>
        )}
        {item.subItems && (
          <div className="ml-4 mt-2">{renderSubItems(item.subItems)}</div>
        )}
      </li>
    </PermissionGate>
  );
};

export default SidebarItem;
