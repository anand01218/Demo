"use client";
import React, { createContext, useContext } from "react";

type PermissionContextType = {
  role: string;
  permissions: string[];
  // eslint-disable-next-line no-unused-vars
  hasPermission: (_perm: string) => boolean;
  // eslint-disable-next-line no-unused-vars
  hasAnyPermission: (_perms: string[]) => boolean;
  // eslint-disable-next-line no-unused-vars
  hasRole: (_role: string) => boolean;
};

const PermissionContext = createContext<PermissionContextType | null>(null);

export const PermissionProvider: React.FC<{
  user: any;
  children: React.ReactNode;
}> = ({ user, children }) => {
  const role = user?.role || "";
  const permissions = user?.permissions || [];

  const hasPermission = (perm: string) => permissions.includes(perm);
  const hasAnyPermission = (perms: string[]) =>
    perms.some((p) => permissions.includes(p));
  const hasRole = (r: string) => role === r;

  return (
    <PermissionContext.Provider
      value={{ role, permissions, hasPermission, hasAnyPermission, hasRole }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const ctx = useContext(PermissionContext);
  if (!ctx)
    throw new Error("usePermission must be used within PermissionProvider");
  return ctx;
};
