import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => "/admin/dashboard",
      providesTags: ["Admin"],
    }),
    getProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useGetDashboardQuery, useGetProfileQuery } = adminApi;
