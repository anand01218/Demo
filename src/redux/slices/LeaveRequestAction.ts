import { baseApi } from "./baseApi";

export const leaveRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLeave: builder.mutation({
      query: (data) => ({
        url: "/leave",
        method: "POST",
        body: data,
      }),
    }),
    getLeaves: builder.query({
      query: (params = {}) => {
        const { page = 1, limit = 10, ...otherParams } = params;
        const searchParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...otherParams,
        });
        return `/leave?${searchParams}`;
      },
    }),
    getLeaveById: builder.query({
      query: (id) => `/leave/${id}`,
    }),
    updateLeave: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/leave/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `/leave/${id}`,
        method: "DELETE",
      }),
    }),
    getLeavesByEmployee: builder.query({
      query: (empId) => `/leave/employee/${empId}`,
    }),
  }),
});

export const {
  useCreateLeaveMutation,
  useGetLeavesQuery,
  useGetLeaveByIdQuery,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
  useGetLeavesByEmployeeQuery,
} = leaveRequestApi;
