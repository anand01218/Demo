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
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );
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

  // Allow initial load to complete before making auth decisions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Don't redirect during initial load or if already on correct route type
    if (isInitialLoad) return;

    // console.log("AuthWrapper - Auth State:", { isAuthenticated, token, pathname });

    // Only redirect if user is authenticated and on public route
    if (isAuthenticated && isPublicRoute) {
      // console.log("Redirecting authenticated user away from public route");
      router.push("/");
      return;
    }

    // Only redirect to login if user is not authenticated, not on public route, and no token
    if (!isAuthenticated && !isPublicRoute && !token) {
      // console.log("Redirecting unauthenticated user to login");
      router.push("/auth/login");
      return;
    }
  }, [isAuthenticated, isPublicRoute, router, pathname, token, isInitialLoad]);

  // Show loading only during initial load and when redirecting authenticated users away from public routes
  if (isInitialLoad) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Preloader />
      </div>
    );
  }

  // Show loading when authenticated user is on public route (will redirect)
  if (isAuthenticated && isPublicRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Preloader />
      </div>
    );
  }

  // For unauthenticated users on protected routes, show loading while redirect happens
  if (!isAuthenticated && !isPublicRoute && !token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Preloader />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
