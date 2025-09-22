import { baseApi } from "./baseApi";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (departmentData) => ({
        url: "/department",
        method: "POST",
        body: departmentData,
      }),
      invalidatesTags: ["Department"],
    }),
    getDepartmentList: builder.query({
      query: (QP) => ({
        url: "/department",
        params: QP,
      }),
      providesTags: ["Department"],
    }),
    getDepartment: builder.query({
      query: (id) => `/department/${id}`,
      providesTags: (result, error, id) => [{ type: "Department", id }],
    }),
    updateDepartment: builder.mutation({
      query: ({ id, ...departmentData }) => ({
        url: `/department/${id}`,
        method: "PATCH",
        body: departmentData,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetDepartmentListQuery,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
