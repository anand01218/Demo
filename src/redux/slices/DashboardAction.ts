import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSystemStats: builder.query({
      query: () => "/admin/system/stats",
      providesTags: ["Admin"],
    }),
    getUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["Admin"],
    }),
    getUser: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Admin", id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Admin", id }],
    }),
    toggleUserStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/toggle-status`,
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),
    getAuditLogs: builder.query({
      query: () => "/admin/audit-logs",
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetSystemStatsQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useToggleUserStatusMutation,
  useGetAuditLogsQuery,
} = dashboardApi;
