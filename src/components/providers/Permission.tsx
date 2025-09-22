import { usePermission } from "@/hooks/usePermissionProvider";

type Props = {
  permission?: string;
  anyOf?: string[];
  role?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function PermissionGate({
  permission,
  anyOf,
  role,
  children,
  fallback = null,
}: Props) {
  const { hasPermission, hasAnyPermission, hasRole } = usePermission();

  if (permission && !hasPermission(permission)) return <>{fallback}</>;
  if (anyOf && !hasAnyPermission(anyOf)) return <>{fallback}</>;
  if (role && !hasRole(role)) return <>{fallback}</>;

  return <>{children}</>;
}
