import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Clear auth state
    api.dispatch(logout());

    // Only redirect if we're in browser environment and not already on login page
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/auth/login")) {
        // Use Next.js router for navigation instead of window.location
        window.history.replaceState(null, "", "/auth/login");
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Admin",
    "Employee",
    "Department",
    "Role",
    "Permission",
    "User",
    "Attendance",
    // "Recruitment",
  ],
  endpoints: () => ({}),
});
