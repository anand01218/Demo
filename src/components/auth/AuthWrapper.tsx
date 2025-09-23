"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Preloader from "@/common/Preloader/Preloader";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const publicRoutes = [
    "/auth/login",
    "/auth/signup-basic",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // Set initial load to false after hydration
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    // Wait for initial load to complete to avoid hydration issues
    if (isInitialLoad) return;

    // If authenticated and trying to access public routes, redirect to dashboard
    if (isAuthenticated && isPublicRoute) {
      router.replace("/");
      return;
    }

    // If not authenticated and trying to access protected routes, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/auth/login");
      return;
    }
  }, [isAuthenticated, isPublicRoute, router, pathname, isInitialLoad]);

  // Show loading during initial hydration to prevent flash
  if (isInitialLoad) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Preloader />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
