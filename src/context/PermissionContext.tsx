"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";

type PermissionContextType = {
  permissions: string[];
  role: string;
  // eslint-disable-next-line no-unused-vars
  hasPermission: (permission: string) => boolean;
  // eslint-disable-next-line no-unused-vars
  hasAnyPermission: (permissions: string[]) => boolean;
  // eslint-disable-next-line no-unused-vars
  hasRole: (role: string) => boolean;
  isLoading: boolean;
};

const PermissionContext = createContext<PermissionContextType | null>(null);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        // Error parsing user info from localStorage
      }
    }
    setIsLoading(false);
  }, []);

  const permissions = useMemo(() => {
    return userInfo?.permissions || [];
  }, [userInfo]);

  const role = useMemo(() => {
    return userInfo?.role || "";
  }, [userInfo]);

  const hasPermission = (permission: string): boolean => {
    if (!permissions.length) return false;
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissionList: string[]): boolean => {
    if (!permissions.length || !permissionList.length) return false;
    return permissionList.some((permission) =>
      permissions.includes(permission)
    );
  };

  const hasRole = (targetRole: string): boolean => {
    return role === targetRole;
  };

  const value: PermissionContextType = {
    permissions,
    role,
    hasPermission,
    hasAnyPermission,
    hasRole,
    isLoading,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return context;
};
