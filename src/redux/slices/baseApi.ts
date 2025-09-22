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
    api.dispatch(logout());
    if (typeof window !== "undefined") {
      // toast.error("Unauthorized Access Please Login Again");
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 600);
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
