"use client";
import React from "react";
import { usePermission } from "@/hooks/usePermissionProvider";

interface PermissionGateProps {
  children: React.ReactNode;
  permission?: string;
  permissions?: string[];
  role?: string;
  roles?: string[];
  fallback?: React.ReactNode;
  requireAll?: boolean; // For permissions array: true = all required, false = any required
}

const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permission,
  permissions = [],
  role,
  roles = [],
  fallback = null,
  requireAll = false,
}) => {
  const { hasPermission, hasAnyPermission, hasRole } = usePermission();

  // Check single permission
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // Check multiple permissions
  if (permissions.length > 0) {
    if (requireAll) {
      // All permissions must be present
      if (!permissions.every((perm) => hasPermission(perm))) {
        return <>{fallback}</>;
      }
    } else {
      // At least one permission must be present
      if (!hasAnyPermission(permissions)) {
        return <>{fallback}</>;
      }
    }
  }

  // Check single role
  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  // Check multiple roles
  if (roles.length > 0) {
    if (!roles.some((r) => hasRole(r))) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};

export default PermissionGate;
