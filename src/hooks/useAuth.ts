import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const hasRole = (role: string) => auth.role === role;

  const hasPermission = (permission: string) =>
    auth.permissions.includes(permission);

  const hasAnyRole = (roles: string[]) => roles.includes(auth.role || "");

  const hasAnyPermission = (permissions: string[]) =>
    permissions.some((permission) => auth.permissions.includes(permission));

  return {
    ...auth,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
  };
};
