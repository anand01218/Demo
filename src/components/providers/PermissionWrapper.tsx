"use client";
import { useSelector } from "react-redux";
import { PermissionProvider } from "@/hooks/usePermissionProvider";

interface PermissionWrapperProps {
  children: React.ReactNode;
}

const PermissionWrapper: React.FC<PermissionWrapperProps> = ({ children }) => {
  const { user } = useSelector((state: any) => state.auth);

  return <PermissionProvider user={user}>{children}</PermissionProvider>;
};

export default PermissionWrapper;
