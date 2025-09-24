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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
      setIsCheckingAuth(false);
      return;
    }

    // If not authenticated and trying to access protected routes, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/auth/login");
      setIsCheckingAuth(false);
      return;
    }

    // If we reach here, user is on correct route
    setIsCheckingAuth(false);
  }, [isAuthenticated, isPublicRoute, router, pathname, isInitialLoad]);

  // Show loading during initial hydration or auth checking
  if (isInitialLoad || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Preloader />
      </div>
    );
  }

  // Only render children if user is authenticated and on protected route, 
  // or not authenticated and on public route
  if (
    (isAuthenticated && !isPublicRoute) || 
    (!isAuthenticated && isPublicRoute)
  ) {
    return <>{children}</>;
  }

  // Fallback loading state
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Preloader />
    </div>
  );
};

export default AuthWrapper;